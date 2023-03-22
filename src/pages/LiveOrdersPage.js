import React, {useState, useEffect, useRef, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import Navbar from '../components/Navbar/Navbar';
import SideNavbar from '../components/Navbar/SideNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../layout.css'
import LiveTableButton from '../components/Buttons/LiveTableButton';
import LiveOrderButton from '../components/Buttons/LiveOrderButton';
import LiveOrderPopUp from '../components/Modal/LiveOrderPopUp';
import { Context } from '../globalContext/globalContext';
import LiveTablePopUp from '../components/Modal/LiveTablePopUp';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const LiveOrdersPage = () => {

  const globalContext = useContext(Context)
  const { ws, setWs } = globalContext

  let navigate = useNavigate();
  const { height, width } = useWindowDimensions();

  const [allTables, setAllTables] = useState([])
  const [rightClicked, setRightClicked] = useState(false);
  const [selectedTableID, setSelectedTableID] = useState("")
  const [selectedOrderID, setSelectedOrderID] = useState("")
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  const [items, setItems] = useState([])
  const [itemsList, setItemsList] = useState([])
  const [groupedItemsList, setGroupedItemsList] = useState([])

  useEffect(()=>{
    let wsTemp  = new WebSocket('wss://dutch-pay-ws.herokuapp.com/');
    setWs(wsTemp)
    wsTemp.onopen = () => {
      console.log('opening ws in camera')
      let userObj = JSON.parse(localStorage.getItem('userObj'))

      fetch('https://dutch-pay-test.herokuapp.com/tables/',
          {
            method: 'GET',
          }).then((response) => response.json())
          .then(json => {
            // console.log(userObj)
            let tables = json.filter(table => table['restaurant'] == userObj['restaurant'])
            wsTemp.send(JSON.stringify({
              'restaurant': true,
              'table_id_list': tables.map(table => table.id)
            }))
            setAllTables(tables)
      })

      
      // setWs(wsTemp)
      
      };
  
      wsTemp.onclose = (e) => {
          console.log('Disconnected. Check internet or server.')
          console.log(e.message)
      };
  
      wsTemp.onerror = (e) => {
          console.log('error')
          console.log(e.message);
      };

      wsTemp.onmessage = ({data}) => {
        console.log("ACQUIRING MESSAGE IN MENU")
        // console.log(items)
        
        data = JSON.parse(data)
        console.log(data)

        if(data['refresh']) {
            let msg = JSON.parse(data['json_message'])
            let new_items = []
            for(let j=0; j < msg.length; j++) {
              for(let i=0; i < JSON.parse(msg[j]).length; i++) {
                new_items.push(JSON.parse(msg[j])[i])
              }
            }

            // Clearing Table
            if(new_items.length == 0) {
              delete items[data["table_id"]] 
              setItems(JSON.parse(JSON.stringify(items)))
              let temp = Object.values(items).flat(1)
              setItemsList(temp)
            } 
            // Refresh
            else {
              for(let i=0; i < new_items.length; i++) {
                if(!(new_items[i].table_id in items)) {
                  items[new_items[i].table_id] = []
                }
                items[new_items[i].table_id].push(new_items[i])
              }
              console.log("GOT HERE")
              setItems(JSON.parse(JSON.stringify(items)))
              setItemsList(new_items)
              // groupOrders(new_items)
            }   
        } 
        // Modification to table
        else {
          items[data['table_id']] = JSON.parse(data['json_message'])
          let temp = Object.values(items).flat(1)
          setItemsList(temp)
          setItems(JSON.parse(JSON.stringify(items)))
          console.log("ITEMS FOR DELETE")
          console.log(items)
          // groupOrders(items)
        }
      }

      return () => {
        // Disconnect from websocket when component unmounts
        wsTemp.close();
      };

  }, [])


  const [tableModal, _setTableModal] = useState(false)
  const tableModalRef = useRef(tableModal);
  const setTableModal = data => {
    tableModalRef.current = data;
    _setTableModal(data);
  };
  const [orderModal, _setOrderModal] = useState(false)
  const orderModalRef = useRef(orderModal);
  const setOrderModal = data => {
    orderModalRef.current = data;
    _setOrderModal(data)
  }

  const toggleTableModal = () => {
    // console.log("click")
    setTableModal(!tableModalRef.current)
  }

  const toggleOrderModal = () => {
    setOrderModal(!orderModalRef.current)
  }

  useEffect(() => {
    const handleClick = (e) => {
      setRightClicked(false);

      // if(!e.target.className.includes('outline') && !tableModalRef.current) {
      //   setSelectedTableID('')
      // }
      if(e.target.className.includes('toggleTableModal')) {
        toggleTableModal()
      }
      if(e.target.className.includes('toggleOrderModal')) {
        toggleOrderModal()
      }
    }
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleSend = (table_id, item_id) => {
    console.log("HANDLE SEND")
    if(ws) {
      ws.send(JSON.stringify({
        'restaurant': false,
        'table_id': table_id,
        'item_id': item_id,
        'action': 'send'
      }))
    }
  }

  const handleDelete = (table_id, item_id) => {
    console.log("HANDLE DELETE")
    console.log(table_id)
    console.log(item_id)
    if(ws) {
      console.log("sending message")
      ws.send(JSON.stringify({
        'restaurant': false,
        'table_id': table_id,
        'item_id': item_id,
        'action': 'delete'
      }))
    }
  }

  const clearTable = (table_id) => {
      // Clear Users
      if(ws) {
        console.log("CLEARed")
        ws.send(JSON.stringify({
          'restaurant': false,
          'table_id': table_id,
          'action': 'clear'
        }))
      }
  }

  const groupOrders = () => {
    let prev_id = -1
    let result = []
    let groupedItems = []
    console.log(itemsList)
    // console.log(itemsList[0])
    // console.log(typeof itemsList)
    // console.log(typeof itemsList[0])
    for (let i=0; i < itemsList.length; i++) {
      console.log("GOT HERE F")
      console.log(itemsList[i])

      if (prev_id !== itemsList[i].order_id) {
        if (groupedItems.length !== 0) {
          result.push(groupedItems) 
        }
        console.log(itemsList[i])
        prev_id = itemsList[i].order_id
        console.log("ORDER IDs")
        console.log(itemsList[i].order_id)
        console.log(prev_id)
        groupedItems = []
        groupedItems.push(itemsList[i])
      } else {
        console.log("ELSE ORDER IDs")
        console.log(itemsList[i])
        groupedItems.push(itemsList[i])
      }
    }

    if (groupedItems.length !== 0) {
      result.push(groupedItems) 
    }

    // const result = itemsList.reduce((accumulator, currentValue) => {
    //   const group = accumulator.find(group => group[0].order_id === currentValue.name);
    //   if (group) {
    //     group.push(currentValue);
    //   } else {
    //     accumulator.push([currentValue]);
    //   }
    //   return accumulator;
    // }, []);



    console.log('grouped items list')


    console.log(result)
    setGroupedItemsList(result)
  }

  useEffect(()=> {
    if(itemsList && itemsList.length !== 0) {
      groupOrders()
    }
  }, [itemsList])

  return (
    <div>
      <Navbar />
      
      {tableModalRef.current && 
        <LiveTablePopUp 
        toggleModal={toggleTableModal}
          table={allTables.find(table => table['id'] === selectedTableID)}
          items={items[selectedTableID]}
          handleDelete={handleDelete}
          clearTable={clearTable}
        />
      }

      {orderModalRef.current && 
        <LiveOrderPopUp 
          toggleModal={toggleOrderModal} 
          items={groupedItemsList.find(items => items[0].order_id === selectedOrderID)} 
          table={allTables.find(table => table['id'] === (itemsList.find(item => item.order_id === selectedOrderID)['table_id']))}
          handleDelete={handleDelete}
          handleSend={handleSend}
        />
      }
      
      <Layout style={{ minHeight: "100vh"}}>
        <SideNavbar selectedKey={'4'}/>

        <div style={{display: 'flex',
                width: '100%'}}>
            {/* <div style={{width: '100%', height: 100}}>
                <Title>
                    Live Orders
                </Title>
            </div> */}

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                // minWidth: 800,
                width: '100%',
                // height: '100%',
                // marginRight: 300,
                overflowY: 'scroll',
                // gap: 20
                // backgroundColor: 'blue'
            }}>
                    {allTables.map((table, index) => {
                    return (
                        <div
                            key={index}
                            style={{display: 'flex', marginLeft: 50, marginRight: 50, marginBlockEnd: 50}}
                            onContextMenu={(e) => {
                            e.preventDefault(); // prevent the default behaviour when right clicked
                            setRightClicked(true);
                            setSelectedTableID(table.id);
                            setPoints({
                                x: e.clientX,
                                y: e.clientY,
                            });
                            // console.log("OFFSET")
                            // console.log(window.pageYOffset)
                        }}> 
                            <LiveTableButton 
                              // selectedTableID={selectedTableID} 
                              setSelectedTableID={setSelectedTableID}
                              onClick={toggleTableModal}
                              table={table}
                              // width={width} 
                              // navigate={navigate}
                            />
                        </div>
                    );
                })}
            </div>

            <div style={{
                width: 300,
                position: 'absolute',
                right: 0,
                height: '100%',
                borderLeft: '2px solid #000000',
                backgroundColor: '#d4d4d4',
                overflowY: 'scroll',
                // paddingTop: 40,
                }}>
                    <div style={{
                        width: '100%',
                        color: 'black',
                        textAlign: 'center',
                        marginTop: 10,
                        paddingBottom: 10,
                        fontSize: 30,
                        fontWeight: 'bold',
                        borderBottom: '2px solid #000000',
                    }}>
                        Live Orders
                    </div>

                    {allTables.length !== 0 && groupedItemsList.map((items, index) => {
                      console.log("LIVE ORDER BUTTON")
                      console.log(items)
                      // console.log(item.status)
                      return(
                        (items[0].status === "ordered" ? 
                        <LiveOrderButton key={index} 
                          onClick={toggleOrderModal} 
                          setSelectedOrderID={setSelectedOrderID}
                          items={items} 
                          table={allTables.find(table => table['id'] === items[0]['table_id'])}/> : 
                        <></>
                        )

                    )})}
            </div>
        </div>


      </Layout>



    </div>
  )
}

const styles = {
  headerBarContainer: {
    flexDirection: 'row', 
    display: 'flex', 
    alignItems: 'center',
  },




  headerBarGreenItem: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: '5px',
    color: 'green',
  },
}

export default LiveOrdersPage;