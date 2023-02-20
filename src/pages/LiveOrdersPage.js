import React, {useState, useEffect, useRef, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { Form, List, Avatar, Layout, Menu, Typography, Button } from "antd";
import Navbar from '../components/Navbar/Navbar';
import SideNavbar from '../components/Navbar/SideNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../layout.css'
import ContextMenu from '../components/ContextMenu/ContextMenu';
import LiveTableButton from '../components/Buttons/LiveTableButton';

const { Title } = Typography;

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
  let navigate = useNavigate();
  const { height, width } = useWindowDimensions();

  const [allTables, setAllTables] = useState([])
  const [rightClicked, setRightClicked] = useState(false);
  const [selectedTableID, setSelectedTableID] = useState("")
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  const [modal, _setModal] = useState(false)
  const modalRef = useRef(modal);
  const setModal = data => {
    modalRef.current = data;
    _setModal(data);
  };
  const [renameModal, _setRenameModal] = useState(false)
  const renameModalRef = useRef(renameModal);
  const setRenameModal = data => {
    renameModalRef.current = data;
    _setRenameModal(data)
  }

  const toggleModal = () => {
    setModal(!modalRef.current)
  }

  const toggleRenameModal = () => {
    setRenameModal(!renameModalRef.current)
  }

  useEffect(() => {
    const handleClick = (e) => {
      setRightClicked(false);

      if(!e.target.className.includes('outline') && !renameModalRef.current) {
        setSelectedTableID('')
      }
      if(e.target.className.includes('toggleModal')) {
        toggleModal()
      }
      if(e.target.className.includes('toggleRenameModal')) {
        toggleRenameModal()
      }
    }
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    getTables()
  }, [])

  useEffect(() => {
    console.log(allTables)
  }, [allTables])

  const getTables = async () => {
    let userObj = JSON.parse(localStorage.getItem('userObj'))
    return fetch('/tables/',
    {
      method: 'GET',
    }).then((response) => response.json())
    .then(json => {
      console.log(userObj)
      let result = json.filter(table => table['restaurant'] == userObj['restaurant'])
      setAllTables(result)
      console.log(allTables)
    })
  }
  
  return (
    <div>
      <Navbar />
      
      {/* {modalRef.current && 
        <LiveTablePopUp toggleModal={toggleModal} getTables={getTables}/>
      } */}
      
      <Layout style={{ minHeight: "100vh"}}>
        <SideNavbar selectedKey={'5'}/>

        <div style={{display: 'flex', height: '100%',
                width: '100%'}}>
            {/* <div style={{width: '100%', height: 100}}>
                <Title>
                    Live Orders
                </Title>
            </div> */}

            <div style={{
                display: 'flex',
                // minWidth: 800,
                width: '100%',
                height: '100%',
                marginRight: 300,
            }}>
                    {allTables.map((table, index) => {
                    return (
                        <div
                            key={index}
                            style={{marginLeft: '50px'}}
                            onContextMenu={(e) => {
                            e.preventDefault(); // prevent the default behaviour when right clicked
                            setRightClicked(true);
                            setSelectedTableID(table.id);
                            setPoints({
                                x: e.clientX,
                                y: e.clientY,
                            });
                            console.log("OFFSET")
                            console.log(window.pageYOffset)
                        }}> 
                            <LiveTableButton 
                              selectedTableID={selectedTableID} 
                              setSelectedTableID={setSelectedTableID} 
                              table={table} 
                              width={width} 
                              navigate={navigate}
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
                backgroundColor: '#d4d4d4'
                }}>
                    <div style={{
                        width: '100%',
                        color: 'black',
                        textAlign: 'center',
                        marginTop: 10,
                        paddingBottom: 10,
                        fontSize: 30,
                        fontWeight: 'bold',
                        borderBottom: '2px solid #000000'
                    }}>
                        Live Orders
                    </div>

                    <div style={{
                            width: '100%',
                            backgroundColor: 'white',
                            borderBottom: '1px solid #000000',
                            paddingLeft: 10, 
                            paddingBottom: 5}}
                        onClick={() => {console.log('pressed')}}
                    >
                        <div style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            paddingTop: 5,
                        }}>
                            Table 1: ASDFF13 (ALLEN)
                        </div>
                        <div style={{marginLeft: 20, paddingTop: 5,}}>
                            <div style={{fontWeight: 'bold'}}>
                                Butter Chicken
                            </div>
                            <div style={{marginLeft: 10}}>
                                Notes: mild, no cheese
                            </div>
                        </div>
                        <div style={{marginLeft: 20, paddingTop: 5,}}>
                            <div style={{fontWeight: 'bold'}}>
                                Palak Paneer
                            </div>
                        </div>
                        <div style={{marginLeft: 20, paddingTop: 5,}}>
                            <div style={{fontWeight: 'bold'}}>
                                Mango Lasee
                            </div>
                        </div>
                        <div style={{marginLeft: 20, paddingTop: 5,}}>
                            <div style={{fontWeight: 'bold'}}>
                                Kishan Patel Specialty
                            </div>
                        </div>
                        <div style={{marginLeft: 20, paddingTop: 5,}}>
                            <div style={{fontWeight: 'bold'}}>
                            Abhijit Gupta’s Fire Curry
                            </div>
                        </div>
                    </div>





                    <div style={{
                            width: '100%',
                            backgroundColor: 'white',
                            borderBottom: '1px solid #000000',
                            paddingLeft: 10, 
                            paddingBottom: 5}}
                        onClick={() => {console.log('pressed')}}
                    >
                        <div style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            paddingTop: 5,
                        }}>
                            Table 10: ASGE15 (Albert)
                        </div>
                        <div style={{marginLeft: 20, paddingTop: 5,}}>
                            <div style={{fontWeight: 'bold'}}>
                                Butter Chicken
                            </div>
                            <div style={{marginLeft: 10}}>
                                Notes: mild, no cheese
                            </div>
                        </div>
                        <div style={{marginLeft: 20, paddingTop: 5,}}>
                            <div style={{fontWeight: 'bold'}}>
                                Palak Paneer
                            </div>
                        </div>
                        <div style={{marginLeft: 20, paddingTop: 5,}}>
                            <div style={{fontWeight: 'bold'}}>
                                Mango Lasee
                            </div>
                        </div>
                        <div style={{marginLeft: 20, paddingTop: 5,}}>
                            <div style={{fontWeight: 'bold'}}>
                                Kishan Patel Specialty
                            </div>
                        </div>
                        <div style={{marginLeft: 20, paddingTop: 5,}}>
                            <div style={{fontWeight: 'bold'}}>
                            Abhijit Gupta’s Fire Curry
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        










        {/* <div style={{width: width}}>

            <div style={{marginLeft: '30px', display: 'flex', width: '100%', height: 100, alignItems: 'center'}}>
              <div style={styles.headerBarContainer}>
     
                    <div 
                      style={styles.headerBarGreenItem}>
                      Live Orders
                    </div>
                </div>
            </div>

            <div style={{display:'flex', flexWrap: 'wrap'}}>

                {allMenus.map((menu, index) => {
                    return (
                        <div
                            key={index}
                            style={{marginLeft: '50px'}}
                            onContextMenu={(e) => {
                            e.preventDefault(); // prevent the default behaviour when right clicked
                            setRightClicked(true);
                            setSelectedMenuID(menu.id);
                            setPoints({
                                x: e.clientX,
                                y: e.clientY,
                            });
                            console.log("OFFSET")
                            console.log(window.pageYOffset)
                        }}> 
                            <MenuButton 
                              selectedMenuID={selectedMenuID} 
                              setSelectedMenuID={setSelectedMenuID} 
                              menu={menu} 
                              width={width} 
                              navigate={navigate}
                            />
                        </div>
                    );
                })}
           
              
                {rightClicked && (
                    <ContextMenu x={points.x} y={points.y} yOffset={window.pageYOffset}
                      handleRename={handleRename} 
                      handleDelete={handleDelete}
                    />
                )}
            </div>

        </div> */}

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