import React, { useState, useEffect, useContext } from "react";
import { Breadcrumb, Layout, Menu, Typography } from "antd";
import { Navigate } from "react-router-dom";
import VerifyRegisterForm from "../components/Login/VerifyRegisterForm"

import RegisterForm from "../components/Login/RegisterForm";
import StripeForm from "../components/Login/StripeForm";

import { useNavigate } from "react-router-dom";
import { Context } from "../globalContext/globalContext";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;


const RegisterPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isVerified2, setIsVerified2] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('')
  // const [userObj, setUserObj] = useState(null)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const navigate = useNavigate();
  
  const globalContext = useContext(Context);
  const { setIsLoggedIn } = globalContext;

  const checkStripeAccountExists = () => {
    let userObj = localStorage.getItem('userObj')
    let token = localStorage.getItem('access')
    let authorization = "Bearer".concat(" ", token)
    if(userObj) {
      return fetch('get-stripe-merchant/' + userObj.id + '/', {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip,deflate,br',
          Connection: 'keep-alive',
          'Content-Type': 'application/json',
          Authorization: authorization
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        localStorage.setItem("access", accessToken)
        localStorage.setItem("refresh", refreshToken)
        setIsLoggedIn(true)
        navigate('/home')
      })
    }
  }

  useEffect(() => {
      
  })


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
          {
        isVerified2 ? (
            <StripeForm
              accessToken={accessToken}
              refreshToken={refreshToken}
            />
          ) :
            isVerified ? 
              <VerifyRegisterForm
                email={email}
                firstName={firstName}
                lastName={lastName}
                phoneNumber={phoneNumber}
                setIsVerified2={setIsVerified2}
                setAccessToken={setAccessToken}
                setRefreshToken={setRefreshToken}
              />
             : 
              <RegisterForm
                setEmail={setEmail}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setPhoneNumber={setPhoneNumber}
                setIsVerified={setIsVerified}
              />
        }
          
          
        </div>
      </Layout>
    );
  }
  
};

export default RegisterPage;
