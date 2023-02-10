import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Form, List, Avatar, Layout, Menu, Typography, Button } from "antd";
import Navbar from '../components/Navbar';
import * as ReactBootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../layout.css'
import CategoryButton from '../components/CategoryButton';
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





const CategoryPage = () => {
    let navigate = useNavigate();
    const { menuName } = useParams()
    const { height, width } = useWindowDimensions();

    const [collapsed, setCollapsed] = useState(false);

    

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
                    <div 
                      style={styles.headerBarGreenItem}>
                      Categories
                    </div>
                </div>
            </div>

            <Form.Item // Form Item (Register Button)
            name="addMenu"
            style={{display: 'flex', justifyContent: 'flex-end', marginRight: 10}}
            >
                <Button type="default" style={{fontWeight: 'bold'}} onClick={{}}>
                + New Category
                </Button>
            </Form.Item>

            <div style={{}}>
              <CategoryButton menuName={menuName} categoryName='Appetizer' navigate={navigate} width={width}/>
              <CategoryButton menuName={menuName} categoryName='Entree' navigate={navigate} width={width}/>
              <CategoryButton menuName={menuName} categoryName='Dessert' navigate={navigate} width={width}/>
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
    // borderRadius: '10px',
    // backgroundColor: 'green'
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

export default CategoryPage