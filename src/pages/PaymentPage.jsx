import React, { useState } from 'react';
import './Payment.css';
import axios from 'axios';

const PaymentPage = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(5000);

  // Initialize payment and handle API call
  const initializePayment = async (user) => {
    try {
      // Call the backend API to initialize the payment
      const response = await axios.post('http://localhost:5000/initialize-payment', user);

      if (response.status === 200) {
        const { authorization_url } = response.data;
        // Redirect the user to Paystack for payment
        window.location.href = authorization_url;
      } else {
        alert('Payment initialization failed!');
      }
    } catch (error) {
      console.error('Error initializing payment:', error);
      alert('Payment failed');
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Create user object for payment initialization
    const user = {
      email,
      amount,
    };

    // Call the API to initialize payment
    await initializePayment(user);
  };

  return (
    <section className='background'>
      <aside className='inner'>
        <div className='head'>
          <h1>PAY NOW</h1>
        </div>
        <form onSubmit={handlePayment}>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              name='email'
              id='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='number'>Amount:</label>
            <input
              type='number'
              name='number'
              id='number'
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </div>

          <button type="submit" className='submit-btn'>Pay Now</button>
        </form>
      </aside>
    </section>
  );
};

export default PaymentPage;
