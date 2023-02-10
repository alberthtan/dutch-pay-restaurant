import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Form, List, Avatar, Layout, Menu, Typography, Button } from "antd";
import Navbar from '../components/Navbar';
import * as ReactBootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../layout.css'
import ItemsButton from '../components/ItemsButton';
import frontArrowIcon from '../assets/icons/frontarrow.png';

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

const ItemsPage = () => {
    const { menuName, categoryName } = useParams()
    const [collapsed, setCollapsed] = useState(false);
    let navigate = useNavigate();

    const { height, width } = useWindowDimensions();

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
                    <div className='HeaderBarItem' style={styles.headerBarItem} onClick={() => {navigate('/menu')}}>
                        {menuName}
                    </div>
                    <img src={frontArrowIcon} style={styles.frontArrowIcon} alt=">"/>
                    <div className='HeaderBarItem' style={styles.headerBarItem} onClick={() => {navigate('/categories/' + menuName)}}>
                        {categoryName}
                    </div>
                    <img src={frontArrowIcon} style={styles.frontArrowIcon} alt=">"/>
                    <div 
                      style={styles.headerBarGreenItem}>
                      Items
                    </div>
                </div>
            </div>

            <Form.Item // Form Item (Register Button)
            name="addMenu"
            style={{display: 'flex', justifyContent: 'flex-end', marginRight: 10}}
            >
                <Button type="default" style={{fontWeight: 'bold'}} onClick={{}}>
                + New Item
                </Button>
            </Form.Item>

            <div style={{display: 'flex', borderTop: '1px solid #D6D6D6', paddingTop: 10, paddingBottom: 10}}>
                <div style={{marginLeft: width * 0.1}}>
                    Image
                </div>
                <div style={{marginLeft: width * 0.12}}>
                    Name
                </div>
                <div style={{marginLeft: width * 0.18}}>
                    Description
                </div>
                <div style={{marginLeft: width * 0.2}}>
                    Price
                </div>
            </div>

            <div style={{}}>

              <ItemsButton name="Chicken Karaage" description="Fried chicken wings glazed with IPPUDO’s special black pepper sauce and sprinkled with sesame seeds." price="$5.80" width={width}/>

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

  headerBarItem: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: '3px',
    borderRadius: '10px',
  },

  frontArrowIcon: {
    flex: 1,
    height: '20px',
    width: '20px',
    marginLeft: '20px',
    marginRight: '20px',
  },

  headerBarGreenItem: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
}

export default ItemsPage