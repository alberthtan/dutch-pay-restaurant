import React, { useState, useContext } from "react";
import { Form, Typography, Input, Button, InputNumber } from "antd";
import "../../layout.css";
// import ProjectUtil from "../utils/ProjectUtil";
import { useNavigate } from "react-router-dom";
import { Context } from "../../globalContext/globalContext";

const StripeForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  const globalContext = useContext(Context);
  const { setIsLoggedIn } = globalContext;

  const createStripeManager = () => {
    let userObj = localStorage.getItem("userObj")
    fetch('/create-stripe-manager/', {
      method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: JSON.parse(userObj).email,
            user_id: JSON.parse(userObj).id,
        })
    })
    .then(response => {
      if(response.status === 200) {
        navigate('/home')
      }
    })
  }
  

  const redirect = () => {
    let userObj = localStorage.getItem("userObj")
    localStorage.setItem('stripe_connect_in_progress', true);
    fetch('/connect_seller/' + JSON.parse(userObj).id + '/', {
      method: 'GET',
    })
    .then(response => response.text())
    .then(text => {
        console.log(text);
        window.location.href = text; // Redirect to the URL
        // window.open(text, '_blank')
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

  const createNewAccount = React.useCallback(async () => {
    setIsLoggedIn(true)
    createStripeManager();
    // navigate("/home");
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
