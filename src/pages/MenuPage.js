import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { Form, List, Avatar, Layout, Menu, Typography, Button } from "antd";
import Navbar from '../components/Navbar';
import * as ReactBootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../layout.css'
import MenuButton from '../components/MenuButton';
import ContextMenu from '../components/ContextMenu';
import PopUp from '../components/Modal/PopUp';



import {
  IdcardOutlined,
  PartitionOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";


const { Content, Sider } = Layout;
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

// const { innerWidth: width, innerHeight: height } = window;
// const menuList = [
//   "breakfast",
//   "lunch",
//   "dinner",
// ]



const MenuPage = () => {
  let navigate = useNavigate();
  const { height, width } = useWindowDimensions();

  const [collapsed, setCollapsed] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("")
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  const [menuList, setMenuList] = useState([
    "Breakfast Menu",
    "Lunch Menu",
    "Dinner Menu",
  ])

  const [modal, setModal] = useState(false)

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

  const handleView = () => {
    console.log("handle view")
  }

  const handleDelete = () => {
    menuList.splice(0, 1);
    setMenuList(menuList)
  }

  useEffect(() => {
    const handleClick = () => setClicked(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  
  const toggleModal = () => {
    setModal(!modal)
  }
  
  
  return (
    <div>
      <PopUp toggled={modal} toggleModal={toggleModal}> hello</PopUp>
      
      {/* <Navbar /> */}
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

           

            <div style={{display:'flex'}}>

                {menuList.map((name, index) => {
                    return (
                        <div
                            key={index}
                            onContextMenu={(e) => {
                            e.preventDefault(); // prevent the default behaviour when right clicked
                            setClicked(true);
                            setSelectedMenu(name);
                            setPoints({
                                x: e.pageX,
                                y: e.pageY,
                            });
                        }}> 
                            <MenuButton menuName={name} width={width} navigate={navigate}/>
                        </div>
                    );
                })}
           
              
                {clicked && (
                    <ContextMenu x={points.x} y={points.y}
                      handleView={handleView} 
                      handleDelete={handleDelete}
                    />
                )}
            </div>

            {/* <ReactBootstrap.Button variant="outline-primary">Primary</ReactBootstrap.Button> */}
            {/* <ReactBootstrap.Button bsStyle="success" bsSize="small">
  Something
</ReactBootstrap.Button> */}

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
    color: 'green',
  },
}

export default MenuPage;