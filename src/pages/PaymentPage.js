import React from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Layout, Typography, Button } from "antd";
import Navbar from '../components/Navbar/Navbar';
import SideNavbar from '../components/Navbar/SideNavbar';

const { Title } = Typography;

const PaymentPage = () => {
  let navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <Layout style={{ minHeight: "100vh" }}>
      <SideNavbar selectedKey={'5'}/>

        <div style={{flexDirection:'column'}}>

            <div style={{width: '100%', height: 100}}>
                <Title>
                    Payments
                </Title>
            </div>

            <Form.Item // Form Item (Register Button)
          name="addMenu"
        >
          <Button type="default" onClick={{}}>
          + Add new menu
          </Button>
        </Form.Item>


            <div style={{width: 100, height: 100, backgroundColor: 'gray'}}>
            </div>

        </div>

      </Layout>

    </div>
  )
}

export default PaymentPage;