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
  const [isVerified, setIsVerified] = useState(false);
  const [isVerified2, setIsVerified2] = useState(false);
  // const [userObj, setUserObj] = useState(null)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const navigate = useNavigate();
  
  const globalContext = useContext(Context);
  const { isLoggedIn, setIsLoggedIn } = globalContext;

  const checkStripeAccountExists = () => {
    let accessToken = localStorage.getItem('access')
    if(accessToken) {
      console.log("access token exists!")
      let authorization = "Bearer".concat(" ", accessToken)
      return fetch('get-stripe-merchant', {
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
        setIsLoggedIn(true)
        navigate('/home')
        // console.log("IS LOGGED IN HAH")
        // setIsLoggedIn(true)
        // console.log(isLoggedIn)
        localStorage.removeItem('stripe_connect_in_progress');
      })
    }
    
  }

  useEffect(() => {
      console.log("use effect called")
      let isConnecting = localStorage.getItem('stripe_connect_in_progress')
      console.log(isConnecting)
      if(isConnecting !== null) { // check if it's done
          checkStripeAccountExists()
      }
  })


  if(isLoggedIn && localStorage.getItem('stripe_connect_in_progress') == null) {
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
            />
          ) :
            isVerified ? 
              <VerifyRegisterForm
                email={email}
                firstName={firstName}
                lastName={lastName}
                phoneNumber={phoneNumber}
                setIsVerified2={setIsVerified2}
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
