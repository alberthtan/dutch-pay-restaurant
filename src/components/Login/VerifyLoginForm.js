import React, { useContext } from "react";
import { Form, Typography, Input, Button, } from "antd";
import "../../layout.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../globalContext/globalContext";

const VerifyLoginForm = ({email}) => {
  const globalContext = useContext(Context);
  const { setIsLoggedIn } = globalContext;
  const [form] = Form.useForm();
  const { Title, Text } = Typography;

  

  const navigate = useNavigate();


  //TODO: send to the register page
  const onSubmitRegister = React.useCallback(async () => {
    // console.log(values.code)
    let values;
    console.log(email)
    try {
      values = await form.validateFields(); // Validate the form fields
      return fetch('https://dutch-pay-test.herokuapp.com/manager-login-verify-email-code/', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          code: values.code,
        }),
      })
        .then(res => res.json())
        .then(json => {
          console.log(json)
            if(json['email'] === email) {
                localStorage.setItem("access", json.token.access)
                localStorage.setItem("refresh", json.token.refresh)
                localStorage.setItem("userObj", JSON.stringify(json))
                setIsLoggedIn(true)
                navigate('/home')
            } else {
                console.log("you entered the wrong code " + values.code)
            }
        })
    }
    catch (errorInfo) {
        return;
    }
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

export default VerifyLoginForm;
