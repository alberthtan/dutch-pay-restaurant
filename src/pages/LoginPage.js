import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "antd";
import LoginForm from "../components/LoginForm";
import VerifyLoginForm from "../components/VerifyLoginForm";
import { Context } from "../globalContext/globalContext.js"



const LoginPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('')

  const globalContext = useContext(Context);


  console.log(localStorage.getItem('access'))
  if(localStorage.getItem('access')) {
    return (<Navigate to="/home" />)
  } else {
    return (
      <Layout style={{ minHeight: "100vh" }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
  
      {isVerified ? 
          <VerifyLoginForm email={email} />  : 
          <LoginForm setEmail={setEmail} setIsVerified={setIsVerified}/>
      }
  
      </div>
       </Layout>
    );
  }
  
};
  

export default LoginPage;
