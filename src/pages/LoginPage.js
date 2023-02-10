import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, Typography } from "antd";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";



const LoginPage = () => {

  return (
    // <div>hello</div>
    <Layout style={{ minHeight: "100vh" }}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
        <LoginForm></LoginForm>
    </div>
     </Layout>
  );
};
  

export default LoginPage;
