import React, {useState} from 'react';
import { CardElement, useStripe, createToken, useElements, IdealBankElement, IbanElement, AuBankAccountElement} from '@stripe/react-stripe-js';
import { CreateTokenBankAccountData } from '@stripe/stripe-js';


const StripeCard = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [loading, setLoading] = useState(false);
//     // const [cardDetails, setCardDetails] = useState(CardFieldInput | null);
    
//     //   const handleCardDetailsChange = (details) => {
//     //     setCardDetails(details);
//     //     console.log(cardDetails)
//     //   };


//     // const handleCreatePaymentMethod = async () => {
//     //     setLoading(true);
//     //     console.log(cardDetails.last4)
//     //     const { token, error: tokenError } = await createToken({
//     //         ...cardDetails,
//     //         type: 'Card',
//     //       });
//     //       if (tokenError) {
//     //         console.log(tokenError);
//     //         setLoading(false);
//     //         return;
//     //       }

//     //     console.log(token)
//     //     console.log(token["livemode"])
//     //     // delete token["card"]
//     //     console.log(token["id"])

//     //     // const paymentMethodId = paymentMethod.id;
//     //     const accessToken = localStorage.getItem("access")
//     //     console.log(accessToken)

//     //     console.log("STRIPE")
//     //     console.log(token["card"]["id"])
//     //     fetch('https://dutch-pay-test.herokuapp.com/merchant-add-card/', {
//     //       method: 'POST',
//     //       headers: {
//     //         'Content-Type': 'application/json',
//     //         Authorization: `Bearer ${accessToken}`,
//     //       },
//     //       body: JSON.stringify({
//     //         token: token["id"],
//     //       }),
//     //     });
//     //     setLoading(false);
//     // };




//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const accessToken = localStorage.getItem("access")
//     console.log(accessToken)

//     const cardElement = elements.getElement(CardElement);

//     const ibanElement = elements.getElement(IbanElement);

//     const { error, token } = await stripe.createToken(cardElement);

//     if (error) {
//       // setError(error.message);
//       console.error(error);
//     } else {
//       console.log(token);
//     }

//     console.log(token['id'])

//     fetch('https://dutch-pay-test.herokuapp.com/merchant-add-card/', {
//       method: 'POST',
//       headers: {
//         Accept: '*/*',
//         'Accept-Encoding': 'gzip,deflate,br',
//         Connection: 'keep-alive',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//         // 'Access-Control-Allow-Origin': 'http://localhost:3000'
//       },
//       // mode: 'no-cors',
//       body: JSON.stringify({
//         token: token["id"],
//       }),
//     });
//     setLoading(false);
// };

//   return (

//   <form onSubmit={handleSubmit} style={{width:'50vh'}}>
//     {/* <CardElement 
//     />
//     <IdealBankElement/> */}
//     <IbanElement
//   options={{
//     style: {
//       base: {
//         fontSize: '16px',
//         color: '#424770',
//         '::placeholder': {
//           color: '#aab7c4',
//         },
//       },
//       invalid: {
//         color: '#9e2146',
//       },
//     },
//     supportedCountries: ['US'],
//     placeholderCountry: 'DE',
//   }}
// />
// <AuBankAccountElement/>
//     <button type="submit">Submit</button>
//   </form>
//   );
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
      <button type="submit">Add bank account</button>
    </form>
  );
};

export default StripeCard;