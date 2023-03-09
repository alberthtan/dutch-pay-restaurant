import React, { useState, useContext } from "react";
import { Form, Typography, Input, Button, Select, InputNumber } from "antd";
import "../../layout.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../globalContext/globalContext";

const VerifyRegisterForm = ({email, firstName, lastName, phoneNumber, setIsVerified2}) => {
  const globalContext = useContext(Context);
  const { setIsLoggedIn } = globalContext;
  const [form] = Form.useForm();
  const { Title, Text } = Typography;

  const navigate = useNavigate();

  //TODO: send to the register page
  const onSubmitRegister = React.useCallback(async () => {
    let restaurantId
    // console.log(values.code)
    return fetch('/restaurants/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

    }),
        })
        .then(response => response.json())
        .then(json => {
          restaurantId=json.id
        })
        .then(async () =>{
          let values;
    if(restaurantId){
      try {
        values = await form.validateFields(); // Validate the form fields
        return fetch('/manager-verify-email-code/', {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            code: values.code,
            is_register: true,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            restaurant: restaurantId
          }),
        })
          .then(res => res.json())
          .then(json => {
            console.log(json)
              if(json['email'] === email) {
                  localStorage.setItem("access", json.token.access)
                  localStorage.setItem("refresh", json.token.refresh)
                  localStorage.setItem("userObj", JSON.stringify(json))

                  setIsVerified2(true)
              } else {
                  console.log("you entered the wrong code " + values.code)
              }
          })
      }
      catch (errorInfo) {
          return;
      }

    }
        }
          
        )
})
  

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
        Enter your code
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
          label="Email Code"
          name="code"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter the email code!",
            },
          ]}
        >
          <Input type="tel" placeholder="000 000" maxLength={6} style={{display: 'flex', width: 250, textAlign: 'center'}}/>
        </Form.Item>
       


        <Form.Item // Form Item (Register Button)
          name="register"
        >
          <Button type="default" onClick={onSubmitRegister}>
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyRegisterForm;
