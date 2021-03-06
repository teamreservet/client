import axios from 'axios';
import { useContext } from 'react';
import { connect } from 'react-redux';
import ShortUniqueId from 'short-unique-id';

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
  monumentPlace,
  childrenCount,
  date,
  setTicketId,
  setPaymentSuccess,
  validateDetails
}) => {
  const uid = new ShortUniqueId({
    length: 10,
    dictionary: [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ]
  });

  const serverBaseUrl = useContext(serverBaseUrlContext);

  const handlePayment = async () => {
    if (!validateDetails()) {
      alert('Validation error!');
      return;
    }

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
    const ticket_id = uid();
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
            monumentPlace,
            childrenCount,
            indianCount,
            foreignerCount,
            date,
            issuer: currentUser.displayName,
            ticket_id
          },
          {
            headers: {
              'x-api-authentication': currentUser.token
            }
          }
        );
        alert(resp ? 'Payment is successful' : 'Payment is unsuccessful');
        setTicketId(ticket_id);
        setPaymentSuccess(resp);
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
