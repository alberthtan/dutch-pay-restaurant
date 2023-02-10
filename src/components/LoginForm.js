import React, { useState } from "react";
import { Form, Typography, Input, Button, InputNumber } from "antd";
import "../layout.css";
// import ProjectUtil from "../utils/ProjectUtil";
import { useNavigate } from "react-router-dom";
// const axios = require("axios").default;

const LoginForm = () => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const navigate = useNavigate();

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

    navigate("/home")

    // navigate("/projects");
    // let values;
    // try {
    //   values = await form.validateFields(); // Validate the form fields
    //   // navigate("/users");
    // } catch (errorInfo) {
    //   return;
    // }

    // axios
    //   .post("http://localhost:5001/login", values)
    //   .then((reponse) => {
    //     console.log("login result is ", reponse);
    //     localStorage.setItem("authToken", reponse.data.token);
    //     navigate("/projects");
    //   })
    //   .catch((err) => {
    //     console.log("error submitting login ", err);
    //   });
  }, [form, handleSubmission]);

  // //TODO: send to the register page
  const onSubmitRegister = React.useCallback(async () => {
    // navigate("/register");
    console.log("register")
  }, [form, handleSubmission]);

  return (
    <div>
       <Title // Form's Title
        level={3}
        style={{
          marginBottom: 0,
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        
        Login
      </Title>
    
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
        <Form.Item // Form Item (Project Name)
          label="Email"
          name="email"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
          ]}
        >
          <Input placeholder="email" />
        </Form.Item>

        <Form.Item // Form Item (Project Name)
          label="Password"
          name="password"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input.Password style={{ width: "400px" }} />
        </Form.Item>

        <Form.Item // Form Item (Login Button)
          name="submit"
        >
          <Button type="primary" onClick={onSubmitLogin}>
            Login
          </Button>
        </Form.Item>

        <Form.Item // Form Item (Register Button)
          name="register"
        >
          <Button type="default" onClick={onSubmitRegister}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
