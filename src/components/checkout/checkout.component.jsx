import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

import FormInput from '../form-input/form-input.component';
import PaymentButton from '../payment-button/payment-button.component';
import Ticket from '../ticket/ticket.component';

import './checkout.styles.scss';

const CheckoutBox = ({
  checkoutMonumentDetails,
  currentUser,
  setCheckoutMonumentDetails
}) => {
  const {
    images,
    name: monumentName,
    ticket_pricing,
    location: monumentPlace
  } = checkoutMonumentDetails;
  const [userDetails, setUserDetails] = useState({
    username: currentUser.displayName,
    email: currentUser.email,
    phone: ''
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [visitDate, setVisitDate] = useState('');
  const [indianCount, setIndianCount] = useState(1);
  const [foreignerCount, setForeignerCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(ticket_pricing.indian_tourist);
  const [ticketId, setTicketId] = useState('');

  const checkoutRef = useRef(null);

  useEffect(() => {
    checkoutRef.current.focus();
  }, [checkoutRef]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const incrementCount = e => {
    const category = e.target.parentElement.htmlFor;
    switch (category) {
      case 'indian': {
        setIndianCount(indianCount + 1);
        break;
      }
      case 'foreigner': {
        setForeignerCount(foreignerCount + 1);
        break;
      }
      case 'children': {
        setChildrenCount(childrenCount + 1);
        break;
      }
      default:
        return;
    }
  };
  const decrementCount = e => {
    const category = e.target.parentElement.htmlFor;
    if (
      (indianCount === 1 && foreignerCount === 0) ||
      (indianCount === 0 && foreignerCount === 1)
    ) {
      return;
    }
    switch (category) {
      case 'indian': {
        if (indianCount === 0) return;
        setIndianCount(indianCount - 1);
        break;
      }
      case 'foreigner': {
        if (foreignerCount === 0) return;
        setForeignerCount(foreignerCount - 1);
        break;
      }
      case 'children': {
        if (childrenCount === 0) return;
        setChildrenCount(childrenCount - 1);
        break;
      }
      default:
        return;
    }
  };

  useEffect(() => {
    setTotalPrice(
      indianCount * parseInt(ticket_pricing.indian_tourist.slice(4)) +
        foreignerCount * parseInt(ticket_pricing.foreign_tourist.slice(4))
    );
  }, [
    indianCount,
    foreignerCount,
    ticket_pricing.indian_tourist,
    ticket_pricing.foreign_tourist
  ]);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'reservet'
    }
  });

  const imgs = images.map((image, idx) => {
    const img = cld.image(image);
    if (idx === 1) {
      img.resize(fill().width(250).height(200)).quality(100);
    } else {
      img.resize(fill().width(100).height(80)).quality(100);
    }
    return img;
  });

  return (
    <div
      onClick={e => e.stopPropagation()}
      onKeyDown={e => e.key === 'Escape' && setCheckoutMonumentDetails(null)}
      tabIndex='0'
      ref={checkoutRef}
    >
      {paymentSuccess ? (
        <Ticket
          monumentName={monumentName}
          childrenCount={childrenCount}
          indianCount={indianCount}
          foreignerCount={foreignerCount}
          amount={totalPrice}
          date={visitDate}
          issuer={userDetails.username}
          ticketId={ticketId}
          monumentPlace={monumentPlace}
        />
      ) : (
        <div className='checkout-box'>
          <span
            className='cross-sign'
            onClick={() => setCheckoutMonumentDetails(null)}
          >
            x
          </span>
          <div className='checkout-box-child checkout-box-left'>
            <h1>Payment Details</h1>
            <div className='user-details'>
              <div className='label-input'>
                <label>Name:</label>
                <FormInput
                  name='username'
                  type='text'
                  value={userDetails.username}
                  onChange={handleChange}
                />
              </div>
              <div className='label-input'>
                <label>Email:</label>
                <FormInput
                  name='email'
                  type='text'
                  value={userDetails.email}
                  onChange={handleChange}
                />
              </div>
              <div className='label-input'>
                <label>Phone:</label>
                <FormInput
                  name='phone'
                  type='text'
                  value={userDetails.phone}
                  onChange={handleChange}
                  placeholder='Phone Number'
                />
              </div>
              <div className='label-input'>
                <label>Date:</label>
                <FormInput
                  name='date'
                  type='date'
                  value={visitDate}
                  onChange={e => setVisitDate(e.target.value)}
                />
              </div>
            </div>
            <div className='categories'>
              <div className='category-group'>
                <input
                  type='radio'
                  name='category'
                  value='indian'
                  id='indian'
                />
                <p>
                  <b>{ticket_pricing.indian_tourist}</b>
                </p>
                <label htmlFor='indian'>
                  <span onClick={decrementCount}>&#8722;</span>Indian
                  <span onClick={incrementCount}>&#x2b;</span>
                </label>
                <p>
                  <b> x {indianCount}</b>
                </p>
              </div>
              <div className='category-group'>
                <input
                  type='radio'
                  name='category'
                  value='foreigner'
                  id='foreigner'
                />
                <p>
                  <b>{ticket_pricing.foreign_tourist}</b>
                </p>
                <label htmlFor='foreigner'>
                  <span onClick={decrementCount}>&#8722;</span>Foreigner
                  <span onClick={incrementCount}>&#x2b;</span>
                </label>
                <p>
                  <b> x {foreignerCount}</b>
                </p>
              </div>
              <div className='category-group'>
                <input
                  type='radio'
                  name='category'
                  value='children'
                  id='children'
                />
                <p>
                  <b>{ticket_pricing.children_below_15_years}</b>
                </p>
                <label htmlFor='children'>
                  <span onClick={decrementCount}>&#8722;</span>Children
                  <span onClick={incrementCount}>&#x2b;</span>
                </label>
                <p>
                  <b> x {childrenCount}</b>
                </p>
              </div>
            </div>
          </div>
          <div className='checkout-box-child checkout-box-right'>
            <div className='images'>
              {imgs.map((img, idx) => (
                <AdvancedImage cldImg={img} key={idx} />
              ))}
            </div>
            <h3>{monumentName.toUpperCase()}</h3>
            <h1>Subtotal: Rs. {totalPrice}</h1>
            <PaymentButton
              amount={totalPrice}
              indianCount={indianCount}
              foreignerCount={foreignerCount}
              childrenCount={childrenCount}
              phone={userDetails.phone}
              monumentName={monumentName}
              monumentPlace={monumentPlace}
              date={visitDate}
              setPaymentSuccess={setPaymentSuccess}
              setTicketId={setTicketId}
            >
              Purchase Now
            </PaymentButton>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(CheckoutBox);
