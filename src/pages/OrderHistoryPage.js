import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Form, List, Avatar, Layout, Menu, Typography, Button } from "antd";
import Navbar from '../components/Navbar/Navbar';

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



const OrderHistoryPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  let navigate = useNavigate();

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
      <Layout style={{ minHeight: "100vh" }}>
      <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            selectedKeys={["4"]}
            mode="inline"
            items={items}
            onClick={onClick}
          />


        </Sider>

        <div style={{flexDirection:'column'}}>

            <div style={{width: '100%', height: 100}}>
                <Title>
                    Order History
                </Title>
            </div>

            <Form.Item // Form Item (Register Button)
          name="addMenu"
        >
          <Button type="default" onClick={{}}>
          + Add new menu
          </Button>
        </Form.Item>


            <div style={{width: 100, height: 100, backgroundColor: 'gray'}}>
            </div>

        </div>

      </Layout>



    </div>
  )
}

export default OrderHistoryPage;