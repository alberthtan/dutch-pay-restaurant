import React from 'react'
import { useNavigate } from "react-router-dom";
import { Layout, Typography } from "antd";
import Navbar from '../../components/Navbar/Navbar';
import SideNavbar from '../../components/Navbar/SideNavbar';
import StripeCard from '../../components/StripeCard';
import { Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51Mg3eiFsXLeRVzOVijgZAOahtncfYOPii0G3aA4W5QMAeQb4dw0Pl1FazfIwZzfYCjNjbU7iDydGVVC8DLCJf5O800lrWkkMUq');

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

        <Elements stripe={stripePromise}>
          <StripeCard/>
        </Elements>

        </div>

      </Layout>

    </div>
  )
}

export default PaymentPage;