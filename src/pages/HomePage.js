import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from "react-router-dom";
import { Form, List, Avatar, Layout, Menu, Typography, Button } from "antd";
import Navbar from '../components/Navbar/Navbar';
import ContextMenu from '../components/ContextMenu/ContextMenu';
import ViewMenus from '../components/ViewMenus';
import ProfilePopUp from '../components/Modal/ProfilePopUp';

import {
  IdcardOutlined,
  PartitionOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";


const { Content, Sider } = Layout;
const { Title } = Typography;

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

const { innerWidth: width, innerHeight: height } = window;



const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [allMenus, setAllMenus] = useState([])
  const [restaurant, setRestaurant] = useState('')
  const [restaurantDescription, setRestaurantDescription] = useState('')
  const [restaurantAddress, setRestaurantAddress] = useState('')
  const [activeMenu, setActiveMenu] = useState(null)
  let navigate = useNavigate();

  const [modal, _setModal] = useState(false)
  const modalRef = useRef(modal);
  const setModal = data => {
    modalRef.current = data;
    _setModal(data);
  };

  const toggleModal = () => {
    setModal(!modalRef.current)
  }

  const getMenus = async () => {
    let userObj = JSON.parse(localStorage.getItem('userObj'))
    return fetch('/menus/', 
    {
      method: 'GET',
    }).then((response) => response.json())
    .then(json => {
      let result = json.filter(menu => menu['restaurant'] == userObj['restaurant'])
      setAllMenus(result)
    })
  }

  const getRestaurant = async () => {
    let userObj = JSON.parse(localStorage.getItem('userObj'))
    return fetch('/restaurants/' + userObj["restaurant"] + '/', 
    {
      method: 'GET',
    }).then((response) => response.json())
    .then(json => {
      console.log(json)
      setRestaurant(json)
      setRestaurantDescription(json.description)
      setRestaurantAddress(json.address)
      console.log(json.active_menu)
      setActiveMenu(json.active_menu)
    })
  }

  const deactivateAllMenus = async () => {
    let formdata = new FormData();
    formdata.append("active_menu", "none")
    setActiveMenu("none")
    return fetch('/restaurants/' + restaurant.id + '/', {
        method: 'PATCH',
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip,deflate,br',
          Connection: 'keep-alive',
          // Authorization: authorization
        },
        body: formdata
      })
      .then(
        response => response.json()
      )
      .then(json => {
        console.log(json)
      })
  }

  useEffect(() => {
    getMenus()
    getRestaurant()
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if(e.target.className.includes('toggleModal')) {
        toggleModal()
      }
    }
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

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
  return (
    <div>
      <Navbar />

      {modalRef.current && 
        <ProfilePopUp toggleModal={toggleModal} getRestaurant={getRestaurant} restaurant={restaurant}/>
      }

      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            selectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={onClick}
          />


        </Sider>

        <div style={styles.container}>

            <div style={styles.restaurantContainer}>
                <div style={{
                    width: '100%', 
                    flex: 1,
                    marginBottom: '10px',
                    // backgroundColor: 'blue',
                    }}>
                      <h4>Profile</h4>
                </div>
                <Form.Item // Form Item (Register Button)
                  name="addMenu"
                  style={{display: 'flex', justifyContent: 'flex-end', marginRight: 10}}
                >
                <Button type="default" style={{fontWeight: 'bold'}} onClick={toggleModal}>
                Edit Information
                </Button>
            </Form.Item>
                <div style={styles.restaurantBodyContainer}>
                  <div style={styles.restaurantTop}>
                        <div style={{
                          display: 'flex', 
                          flex: 1, 
                          // backgroundColor: 'green',
                          height: '100%', 
                          alignItems: 'center', 
                          justifyContent: 'center'}}>
                            <div style={{
                                overflow: 'hidden',
                                width: '180px',
                                height: '120px',
                                alignItems: 'center',
                                display: 'flex',
                                backgroundColor: '#CACACA'
                            }}>
                              <img src={restaurant.restaurant_image} style={{width: '100%'}}/>
                            </div>
                          
                        </div>

                        <div style={styles.restaurantTopRight}>

                            <div style={styles.restaurantName}>
                              {restaurant.name}
                            </div>

                            <div style={styles.restaurantTopDescription}>
  
                                <div style={{flex: 1,}}>
                                    <div style={{
                                        width: '100%',
                                        paddingRight: '5%',
                                        display: 'flex', 
                                        alignItems: 'center'
                                      }}>
                                          <div style={styles.grayText}>
                                              Phone: 
                                          </div>
                                          <div style={styles.blackText}>
                                              {restaurant.phone_number}
                                          </div>
                                    </div>
                                    
                                </div>

                                <div style={{flex: 2}}>
                                    <div style={{
                                      width: '100%',
                                      paddingRight: '5%',
                                      display: 'flex', 
                                      alignItems: 'center'
                                    }}>
                                        <div style={styles.grayText}>
                                            Email: 
                                        </div>
                                        <div style={styles.blackText}>
                                            {restaurant.email}
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', height: '50%'}}>
                      <div style={{flex: 2}}>
                          <div style={{
                            width: '100%', 
                            height: '100%',
                            paddingLeft: '12%',
                            paddingRight: '8%',
                            paddingTop: '5%',
                            // minWidth: 0,
                            // overflow: 'hidden',
                            // paddingBottom: '5%',
                            // backgroundColor: 'green',
                          }}>
                              <div style={styles.grayText}>
                                  Description
                              </div>
                              <div style={styles.blackText}>
                                {restaurant.description}
                              </div>
                          </div>
                      </div>

                      <div style={{flex: 1}}>
                          <div style={{
                            width: '100%',
                            height: '100%',
                            paddingLeft: '8%',
                            paddingRight: '8%',
                            paddingTop: '10%',
                            paddingBottom: '10%',
                            // backgroundColor: 'blue',
                          }}>
                            <div style={styles.grayText}>
                                Address
                            </div>
                            <div style={styles.blackText}>
                              {restaurant.address}
                            </div>
                          </div>
                            
                        </div>
                        
                        <div style={{flex: 1}}>
                            <div style={{
                              width: '100%',
                              height: '100%',
                              paddingLeft: '8%',
                              paddingRight: '8%',
                              paddingTop: '10%',
                              paddingBottom: '10%',
                              // backgroundColor: 'pink',
                            }}>
                                <div style={styles.grayText}>
                                    Hours Today
                                </div>
                                <div style={styles.blackText}>
                                    8:00 AM - 12:00 AM
                                </div>
                            </div>
                           
                        </div>
                    </div>
                  </div>
                </div>


            <div style={{
              display: 'flex',
              width: '100%', 
              justifyContent: 'center',
              flexDirection: 'column',
              // backgroundColor: 'gray',
              }}>
                <div style={{
                    width: '100%', 
                    flex: 1,
                    marginBottom: '10px',
                    // backgroundColor: 'blue'
                    }}>
                      <h4>
                        Menus
                      </h4>
                </div>
                <Form.Item // Form Item (Register Button)
                  name="addMenu"
                  style={{display: 'flex', justifyContent: 'flex-end', marginRight: 10}}
                >
                <Button type="default" style={{fontWeight: 'bold'}} onClick={deactivateAllMenus} disabled={(activeMenu == "none")}>
                Deactivate All Menus
                </Button>
              </Form.Item>

              {activeMenu &&
                <div style={{
                    display: 'flex',
                    width: '100%',
                    marginBottom: '10px',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems:'center',
                    borderColor: 'green',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    // border: '0.5px solid',
                    borderRadius: '10px',
                    // backgroundColor: 'blue'
                    }}>

                      {allMenus.map((menu, index) => {
                        return(
                          <ViewMenus menuId={menu.id} menuName={menu.name} activeMenu={activeMenu} setActiveMenu={setActiveMenu} restaurant={restaurant}/>
                        )
                      })}
                </div>
              }
            </div>
            
           
        </div>
        

      </Layout>



    </div>
  )
}

const styles = {
    container: {
      width: '100%', 
      margin: '20px',
    }, 

    restaurantContainer: {
      width: '100%', 
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'column',
    },
    
    restaurantHeaderContainer: {
      width: '100%', 
      flex: 1,
      marginBottom: '10px',
    },

    restaurantBodyContainer: {
      width: '100%', 
      marginBottom: '10px',
      borderRadius: 15,
      border: '0.5px solid #000000',
      height: 300
    },

    restaurantTop: {
      display: 'flex', 
      flexDirection: 'row', 
      height: '50%', 
      alignItems: 'center',
      borderBottom: '0.5px solid #D6D6D6',
      // backgroundColor: 'green'
    },

    restaurantImageContainer: {
      display: 'flex', 
      flex: 1, 
      height: '100%', 
      alignItems: 'center', 
      justifyContent: 'center'
    },


    restaurantTopRight: {
      display: 'flex', 
      flex:3, 
      flexDirection: 'column', 
      height: '80%',
      // backgroundColor: 'green',
    },

    restaurantName: {
      display: 'flex', 
      flex: 1,
      height: '30%', 
      alignItems: 'center', 
      fontWeight: 'bold', 
      fontSize: 18
    },

    restaurantTopDescription: {
      display: 'flex', 
      flexDirection: 'row', 
      height: '20%', 
      alignItems: 'center',
      flex: 1,
    },

    grayText: {
      fontSize: 12,
      color: '#8d8d8d',
      paddingRight: 5,
      // backgroundColor: 'pink'
    },
    
    blackText: {
      fontSize: 14,
      color: 'black',
      wordBreak: 'break-word'
    }
}

export default HomePage;