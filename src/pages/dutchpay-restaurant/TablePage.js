import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Layout, Button } from "antd";
import Navbar from '../../components/Navbar/Navbar';
import SideNavbar from '../../components/Navbar/SideNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../layout.css'
import TableButton from '../../components/Buttons/TableButton';
import ContextMenu from '../../components/ContextMenu/ContextMenu';

import TablePopUp from '../../components/Modal/TablePopUp';
import RenameTablePopUp from '../../components/Modal/RenameTablePopUp';

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


const TablePage = () => {
  let navigate = useNavigate();
  const { width } = useWindowDimensions();

  const [allTables, setAllTables] = useState([])
  const [rightClicked, setRightClicked] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState("")
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

  const handleRename = () => {
    toggleRenameModal()
  }

  const handleDelete = async () => {
    let index = allTables.map(function(table) { return table.id }).indexOf(selectedTableId)
    allTables.splice(index, 1)
    setAllTables(allTables)
    const accessToken = localStorage.getItem("access")

    return fetch('https://dutch-pay-test.herokuapp.com/tables/' + selectedTableId + '/', 
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  useEffect(() => {
    const handleClick = (e) => {
      setRightClicked(false);

      if(!e.target.className.includes('outline') && !renameModalRef.current) {
        setSelectedTableId('')
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
    return fetch('https://dutch-pay-test.herokuapp.com/tables/',
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
      {modalRef.current && 
        <TablePopUp toggleModal={toggleModal} getTables={getTables}/>
      }
      {renameModalRef.current && 
        <RenameTablePopUp toggleModal={toggleRenameModal} getTables={getTables}
       table={allTables.find(obj => obj.id === selectedTableId)}/>
      }
      
      <Layout style={{ minHeight: "100vh" }}>
        <SideNavbar selectedKey={'3'}/>


        <div style={{width: width}}>

            <div style={{marginLeft: '30px', display: 'flex', width: '100%', height: 100, alignItems: 'center'}}>
              <div style={styles.headerBarContainer}>
     
                    <div 
                      style={styles.headerBarGreenItem}>
                      Tables
                    </div>
                </div>
            </div>

            <Form.Item // Form Item (Register Button)
            name="addTable"
            style={{display: 'flex', justifyContent: 'flex-end', marginRight: 10}}
            >
                <Button type="default" style={{fontWeight: 'bold'}} onClick={toggleModal}>
                + Add table
                </Button>
            </Form.Item>

            <div style={{display:'flex', flexWrap: 'wrap'}}>

                {allTables.map((table, index) => {
                    return (
                        <div
                            key={index}
                            style={{marginLeft: '50px'}}
                            onContextMenu={(e) => {
                            e.preventDefault(); // prevent the default behaviour when right clicked
                            setRightClicked(true);
                            setSelectedTableId(table.id);
                            setPoints({
                                x: e.clientX,
                                y: e.clientY,
                            });
                            console.log("OFFSET")
                            console.log(window.pageYOffset)
                        }}> 
                            <TableButton 
                              selectedTableId={selectedTableId} 
                              setSelectedTableId={setSelectedTableId} 
                              table={table} 
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

export default TablePage;