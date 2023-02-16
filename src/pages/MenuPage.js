import React, {useState, useEffect, useRef, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { Form, List, Avatar, Layout, Menu, Typography, Button } from "antd";
import Navbar from '../components/Navbar/Navbar';
import * as ReactBootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../layout.css'
import MenuButton from '../components/Buttons/MenuButton';
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


const MenuPage = () => {
  let navigate = useNavigate();
  const { height, width } = useWindowDimensions();

  const [allMenus, setAllMenus] = useState([])
  const [collapsed, setCollapsed] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const [selectedMenuID, setSelectedMenuID] = useState("")
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
    let index = allMenus.map(function(menu) { return menu.id }).indexOf(selectedMenuID)
    allMenus.splice(index, 1)
    setAllMenus(allMenus)

    return fetch('/menus/' + selectedMenuID + '/', 
    {
      method: 'DELETE',
    })
  }

  useEffect(() => {
    const handleClick = (e) => {
      setRightClicked(false);

      if(!e.target.className.includes('outline') && !renameModalRef.current) {
        setSelectedMenuID('')
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
    getMenus()
  }, [])

  useEffect(() => {
    console.log(allMenus)
  }, [allMenus])

  const getMenus = async () => {
    let userObj = JSON.parse(localStorage.getItem('userObj'))
    return fetch('/menus/', 
    {
      method: 'GET',
    }).then((response) => response.json())
    .then(json => {
      console.log(userObj)
      let result = json.filter(menu => menu['restaurant'] == userObj['restaurant'])
      setAllMenus(result)
      console.log(allMenus)
    })
  }
  
  return (
    <div>
      <Navbar />
      {modalRef.current && 
        <MenuPopUp toggleModal={toggleModal} getMenus={getMenus}/>
      }

      {renameModalRef.current && 
        <RenameMenuPopUp toggleModal={toggleRenameModal} getMenus={getMenus}
       menu={allMenus.find(obj => obj.id === selectedMenuID)}/>
      }
      
      <Layout style={{ minHeight: "100vh" }}>
      <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            selectedKeys={["2"]}
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
                      Menus
                    </div>
                </div>
            </div>

            <Form.Item // Form Item (Register Button)
            name="addMenu"
            style={{display: 'flex', justifyContent: 'flex-end', marginRight: 10}}
            >
                <Button type="default" style={{fontWeight: 'bold'}} onClick={toggleModal}>
                + New menu
                </Button>
            </Form.Item>

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

export default MenuPage;