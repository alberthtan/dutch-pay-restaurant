import React from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Layout, Typography, Button } from "antd";
import Navbar from '../components/Navbar/Navbar';
import SideNavbar from '../components/Navbar/SideNavbar';
import StripeCard from '../components/StripeCard';
import { Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51MiXZ5Gm1KJ3T3rGwmjYZV0tDN20lAOZJRWaK1YXcMJGykBkuXlcHpP8GLK7EaJCHmJADGr3dwNAPk3jMVxeO8Bv00qeBgh7C8');

const { Title } = Typography;

const PaymentPage = () => {
  let navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <Layout style={{ minHeight: "100vh" }}>
      <SideNavbar selectedKey={'6'}/>

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
        <Elements stripe={stripePromise}>
          <StripeCard/>
        </Elements>


            <div style={{width: 100, height: 100, backgroundColor: 'gray'}}>
            </div>

        </div>

      </Layout>

    </div>
  )
}

export default PaymentPage;