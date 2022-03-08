import axios from 'axios';
import { useContext } from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';

import { serverBaseUrlContext } from '../../contexts';

import './payment-button.styles.scss';

const addScript = src => {
  const script = document.createElement('script');
  script.src = src;
  document.querySelector('body').appendChild(script);
};

const PaymentButton = ({
  amount,
  indianCount,
  foreignerCount,
  currentUser,
  phone,
  monumentName,
  childrenCount,
  date
}) => {
  const serverBaseUrl = useContext(serverBaseUrlContext);

  const handlePayment = async () => {
    addScript('https://checkout.razorpay.com/v1/checkout.js');

    let response = await axios.post(
      `${serverBaseUrl}/api/payment/create-order`,
      {
        amount,
        indianCount,
        foreignerCount,
        monumentName,
        childrenCount
      },
      {
        headers: {
          'x-api-authentication': currentUser.token
        }
      }
    );
    response = response.data;
    const options = {
      key: 'rzp_test_La3jvp1V30zIWs',
      amount: amount,
      currency: 'INR',
      name: 'Reservet',
      description: 'Test Transaction',
      order_id: response.id,
      handler: async res => {
        let resp = await axios.post(
          `${serverBaseUrl}/api/payment/verify-payment`,
          {
            ...res,
            order_id: response.id,
            amount,
            monumentName,
            childrenCount,
            indianCount,
            foreignerCount,
            date,
            issuer: currentUser.displayName
          },
          {
            headers: {
              'x-api-authentication': currentUser.token
            }
          }
        );
        alert(resp ? 'Payment is successful' : 'Payment is unsuccessful');
      },
      prefill: {
        name: currentUser.displayName,
        email: currentUser.email,
        contact: phone
      },
      theme: {
        color: '#3399cc'
      }
    };
    const razorpay = window.Razorpay(options);
    razorpay.open();
  };
  return <CustomButton onClick={handlePayment}>Purchase Now</CustomButton>;
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(PaymentButton);
