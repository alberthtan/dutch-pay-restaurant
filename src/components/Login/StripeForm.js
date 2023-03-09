import React, { useState, useContext } from "react";
import { Form, Typography, Input, Button, InputNumber } from "antd";
import "../../layout.css";
// import ProjectUtil from "../utils/ProjectUtil";
import { useNavigate } from "react-router-dom";
import { Context } from "../../globalContext/globalContext";

const StripeForm = ({setEmail, setIsVerified, accessToken, refreshToken}) => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const navigate = useNavigate();
  
  const globalContext = useContext(Context);
  const { setIsLoggedIn } = globalContext;
  

  const redirect = () => {
    let userObj = localStorage.getItem("userObj")
    console.log(userObj)
    console.log(JSON.parse(userObj).id)
    fetch('/connect_seller/' + JSON.parse(userObj).id + '/', {
      method: 'GET',
    })
    .then(response => response.text())
    .then(text => {
        console.log(text);
        // window.location.href = text; // Redirect to the URL
        window.open(text, '_blank')
      });
  }

  const handleSubmission = React.useCallback(
    (result) => {
      if (result.error) {
        // Handle Error here
      } else {
        // Handle Success here
        form.resetFields();
      }
    },
    [form]
  );

  const onSubmitLogin = React.useCallback(async () => {
    console.log("loggin in");
    let values
    try {
      values = await form.validateFields(); // Validate the form fields
      console.log(values.email);
      return fetch('/manager-send-email-code/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: values.email,
            is_register: false,
        })
      })
      .then(
        response => response.json()
      )
      .then(json => {
        setIsVerified(true)
        setEmail(values.email)
        console.log(json)
      })
      // navigate("/users");
    } catch (errorInfo) {
      console.log(errorInfo)
      return;
    }
    // setIsLoggedIn(true)
    // navigate("/home")
  }, [form, handleSubmission]);

  const createNewAccount = React.useCallback(async () => {
    // TODO: create_stripe_manager() fetch call
    setIsLoggedIn(true)
    navigate("/home");
    // console.log("register")
  }, [form, handleSubmission]);

  return (
    <div>
    
      <Form // Ant Design's Form Component
        name="project-form"
        layout="vertical"
        form={form}
        wrapperCol={{
          span: 6,
        }}
        style={{
          marginTop: 20,
          paddingBottom: 10,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >

        <Form.Item // Form Item (Login Button)
          name="createNewAccount"
        >
          <Button type="primary" onClick={createNewAccount}>
            Create New Stripe Account
          </Button>
        </Form.Item>

        <Form.Item // Form Item (Register Button)
          name="redirect"
        >
          <Button type="default" onClick={redirect}>
            Connect with Existing Stripe Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StripeForm;
