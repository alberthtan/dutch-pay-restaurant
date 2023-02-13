import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Avatar, Dropdown } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
// import jwt_decode from "jwt-decode";
import "antd/dist/antd.css";

import { useNavigate } from "react-router-dom";

const { Header } = Layout;

function Navbar(props) {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem("authToken");
    // const user_data = jwt_decode(token);
    // const email = user_data["email"];
    // setUsername(email);
  }, []);

  function handleLogout() {
    // localStorage.removeItem("authToken");
    navigate("/");
  }

  function logoutMenu() {
    return (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        className="logo"
        style={{
          width: "40%",
          height: "100%",
          display: "flex",
        }}
      >
        <h2 style={{ color: "black" }}>Project Matching</h2>
      </div>
      <div>
        {/* <h3 style={{ color: "white" }}>{username}</h3> */}
        <Dropdown overlay={logoutMenu}>
          <a
            className="ant-dropdown-link"
            style={{ margin: "16px", color: "black" }}
            onClick={(e) => e.preventDefault()}
          >
            username <DownOutlined />
          </a>
        </Dropdown>
      </div>

      {/* <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
                  <Menu.Item key="1">nav 1</Menu.Item>
                  <Menu.Item key="2">nav 2</Menu.Item>
                  <Menu.Item key="3">nav 3</Menu.Item>
              </Menu> */}
    </Header>
  );
}

export default Navbar;
