import React, { useState, useEffect, useContext } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { Context } from "../../globalContext/globalContext";

const { Header } = Layout;

function Navbar(props) {
    const globalContext = useContext(Context);
    const { setIsLoggedIn } = globalContext;

    const userObj = JSON.parse(localStorage.getItem('userObj'))

    const navigate = useNavigate();

    function getItem(label, key) {
        return {
          key,
          label,
        };
    }
    
    const items = [
        getItem("Logout", "1"),
    ];

    const onClick = (e) => {
      console.log("click ", e);
      if (e.key === "1") {
        handleLogout()
      }
    };

    const handleLogout = async () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("userObj")
        setIsLoggedIn(false)
        navigate("/");
    }

    function logoutMenu() {
        return (
          <Menu
            theme="dark"
            items={items}
            onClick={onClick}
          />
        );
    }

    return (
      <Header
        style={{
          // display: "flex",
          // justifyContent: "space-between",
          // position: 'fixed', top: 0, left: 0, width: '100%'
        }}
      >
        <div style={{backgroundColor: '#112545', width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
          <Dropdown overlay={logoutMenu}>
            <a
              className="ant-dropdown-link"
              style={{ margin: "16px", color: "white" }}
              onClick={(e) => e.preventDefault()}
              
            >
              {userObj["email"]} 
            </a>
          </Dropdown>
        </div>
      </Header>
    );
}

export default Navbar;
