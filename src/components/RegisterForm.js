import React, { useState } from "react";
import { Form, Typography, Input, Button, Select, InputNumber } from "antd";
import "../layout.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
// import ProjectUtil from "../utils/ProjectUtil";
import { useNavigate } from "react-router-dom";

// const axios = require("axios").default;

const RegisterForm = ({setEmail, setFirstName, setLastName, setPhoneNumber, setIsVerified}) => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const { Option } = Select;

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const navigate = useNavigate();

  // const handleSubmission = React.useCallback(
  //   (result) => {
  //     if (result.error) {
  //       // Handle Error here
  //     } else {
  //       // Handle Success here
  //       form.resetFields();
  //     }
  //   },
  //   [form]
  // );

  //TODO: send to the register page
  const onSubmitRegister = React.useCallback(async () => {
    let values;
    try {
      values = await form.validateFields(); // Validate the form fields
      console.log(values);
      return fetch('/manager-send-email-code/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: values.email,
            is_register: true,
        })
      })
      .then(
        response => response.json()
      )
      .then(json => {
        setIsVerified(true)
        setEmail(values.email)
        setFirstName(values.first_name)
        setLastName(values.last_name)
        setPhoneNumber(values.phone_number)
      })
      // navigate("/users");
    } catch (errorInfo) {
      return;
    }
  });
    // const result = await ProjectUtil(values); // Submit the form data to the backend
    // handleSubmission(result); // Handle the submission after the API Call

  //   const user = {
  //     first_name: values.first_name,
  //     last_name: values.last_name,
  //     email: values.email,
  //     accountType: values.user_type,
  //     password: values.password,
  //   };
  //   console.log(values.user_type);

  //   if (user.type == "student") {
  //     user.project_preferences = [];
  //   }

  //   axios
  //     .post("http://localhost:5001/register/", user)
  //     .then((response) => {
  //       console.log(response);
  //       console.log(user);
  //       navigate("/");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [form, handleSubmission]);

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
        Register
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
          label="First Name"
          name="first_name"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter your first name!",
            },
          ]}
        >
          <Input placeholder="first name" />
        </Form.Item>
        <Form.Item // Form Item (Project Name)
          label="Last Name"
          name="last_name"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter your last name!",
            },
          ]}
        >
          <Input placeholder="last name" />
        </Form.Item>
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
          label="Phone Number"
          name="phone_number"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter your phone number!",
            },
          ]}
        >
          <PhoneInput
                placeholder="phone number" style={{width: 300}}/>
          {/* <Input type="number" placeholder="phone number"/> */}
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

export default RegisterForm;
