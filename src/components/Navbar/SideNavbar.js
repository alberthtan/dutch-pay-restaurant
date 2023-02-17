import React, {useState} from 'react'
import { Layout, Menu } from "antd";
import {
    IdcardOutlined,
    PartitionOutlined,
    TeamOutlined,
    UserOutlined,
  } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Content, Sider } = Layout;


const SideNavbar = ({selectedKey}) => {

    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    const onClick = (e) => {
        console.log("click ", e);
        if (e.key === "1") {
          navigate("/home");
        } else if (e.key === "2") {
          navigate("/menus");
        } else if (e.key === "3") {
          navigate("/tables");
        } else if (e.key === "4") {
          navigate("/order-history");
        } else if (e.key === "5") {
          navigate("/payment");
        }
    };

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
        getItem("Menus", "2", <UserOutlined />),
        getItem("Tables", "3", <TeamOutlined />),
        getItem("Order History", "4", <IdcardOutlined />),
        getItem("Payment", "5", <PartitionOutlined />),
    ]

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div className="logo" />
            <Menu
            theme="dark"
            selectedKeys={[selectedKey]}
            mode="inline"
            items={items}
            onClick={onClick}
            />


        </Sider>
    );
}

export default SideNavbar;
