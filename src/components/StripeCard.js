import React, {useState} from 'react';
import { useStripe} from '@stripe/react-stripe-js';

const StripeCard = () => {

const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const stripe = useStripe();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { token, error } = await stripe.createToken('bank_account', {
      country: 'US',
      currency: 'usd',
      routing_number: routingNumber,
      account_number: accountNumber,
      account_holder_name: 'Albert Tan', // replace with actual account holder name
      account_holder_type: 'individual', // or 'company'
    });

    const accessToken = localStorage.getItem("access")

    if (error) {
      console.log('Error creating bank account token:', error);
    } else {
      console.log('Bank account token created successfully:', token);
      // Send the token to your server to create a bank account for the seller
      // using the Stripe Connect API.
      // Use the `stripe_account` parameter to specify the seller's Stripe account ID.

          fetch('https://dutch-pay-test.herokuapp.com/merchant-add-bank/', {
            method: 'POST',
            headers: {
              Accept: '*/*',
              'Accept-Encoding': 'gzip,deflate,br',
              Connection: 'keep-alive',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
              // 'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            // mode: 'no-cors',
            body: JSON.stringify({
              token: token["id"],
            }),
          });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Routing number:
        <input type="text" value={routingNumber} onChange={(e) => setRoutingNumber(e.target.value)} />
      </label>
      <label>
        Account number:
        <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
      </label>
      <button style={{marginLeft: '20px'}} type="submit">Add bank account</button>
    </form>
  );
};

export default StripeCard;