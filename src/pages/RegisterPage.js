import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, Typography } from "antd";
import { Navigate } from "react-router-dom";
import VerifyRegisterForm from "../components/Login/VerifyRegisterForm"

import RegisterForm from "../components/Login/RegisterForm";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const RegisterPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')


  if(localStorage.getItem('access')) {
    console.log("home")
    return (<Navigate to="/home" />)
  } else {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {isVerified ? <VerifyRegisterForm email={email} firstName={firstName} lastName={lastName} phoneNumber={phoneNumber}/>  : 
          <RegisterForm setEmail={setEmail} setFirstName={setFirstName} setLastName={setLastName} setPhoneNumber={setPhoneNumber} setIsVerified={setIsVerified}/>}
          
        </div>
      </Layout>
    );
  }
  
};

export default RegisterPage;
