import React, {useState, useEffect, useRef, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { Form, List, Avatar, Layout, Menu, Typography, Button } from "antd";
import Navbar from '../components/Navbar/Navbar';
import * as ReactBootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../layout.css'
import TableButton from '../components/Buttons/TableButton';
import ContextMenu from '../components/ContextMenu/ContextMenu';
import MenuPopUp from '../components/Modal/MenuPopUp';
import RenameMenuPopUp from '../components/Modal/RenameMenuPopUp';

import {
  IdcardOutlined,
  PartitionOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

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


function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Home", "1", <TeamOutlined />),
  getItem("Menu", "2", <UserOutlined />),
  getItem("Table", "3", <TeamOutlined />),
  getItem("Order History", "4", <IdcardOutlined />),
  getItem("Payment", "5", <PartitionOutlined />),
];



const TablePage = () => {
  let navigate = useNavigate();
  const { height, width } = useWindowDimensions();

  const [allTables, setAllTables] = useState([])
  const [collapsed, setCollapsed] = useState(false);
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

  const onClick = (e) => {
    console.log("click ", e);
    if (e.key === "1") {
      navigate("/home");
    } else if (e.key === "2") {
      navigate("/menu");
    } else if (e.key === "3") {
      navigate("/table");
    } else if (e.key === "4") {
      navigate("/order-history");
    } else if (e.key === "5") {
      navigate("/payment");
    }
  };

  const handleRename = () => {
    toggleRenameModal()
  }

  const handleDelete = async () => {
    let index = allTables.map(function(table) { return table.id }).indexOf(selectedTableId)
    allTables.splice(index, 1)
    setAllTables(allTables)

    return fetch('/tables/' + selectedTableId + '/', 
    {
      method: 'DELETE',
    })
  }

  useEffect(() => {
    const handleClick = (e) => {
      setRightClicked(false);

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

  const addTable = async () => {
    let userObj = JSON.parse(localStorage.getItem('userObj'))
    return fetch('/tables/',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          capacity: 4,
          restaurant: userObj["restaurant"],
      })
    })
    .then((response) => response.json())
    .then(json => {
      console.log(json)
      getTables()
    })
  }
  
  return (
    <div>
      <Navbar />
      
      <Layout style={{ minHeight: "100vh" }}>
      <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            selectedKeys={["3"]}
            mode="inline"
            items={items}
            onClick={onClick}
          />


      </Sider>


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
                <Button type="default" style={{fontWeight: 'bold'}} onClick={addTable}>
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