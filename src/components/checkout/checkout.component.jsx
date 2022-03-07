import { useState } from 'react';
import { connect } from 'react-redux';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

import FormInput from '../form-input/form-input.component';

import './checkout.styles.scss';

const CheckoutBox = ({ checkoutMonumentDetails, currentUser }) => {
  const { images, name: monumentName } = checkoutMonumentDetails;
  const [userDetails, setUserDetails] = useState({
    username: currentUser.displayName,
    email: currentUser.email,
    phone: '',
    date: ''
  });
  const [indianCount, setIndianCount] = useState(0);
  const [foreignerCount, setForeignerCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
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

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'reservet'
    }
  });

  const img = cld.image(images[0]);
  img.resize(fill().width(300).height(200)).quality(100);

  return (
    <div className='checkout-box' onClick={e => e.stopPropagation()}>
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
              required
            />
          </div>
          <div className='label-input'>
            <label>Email:</label>
            <FormInput
              name='email'
              type='text'
              value={userDetails.email}
              onChange={handleChange}
              required
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
              required
            />
          </div>
          <div className='label-input'>
            <label>Date:</label>
            <FormInput
              name='date'
              type='date'
              value={userDetails.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className='categories'>
          <div className='category-group'>
            <input type='radio' name='category' value='indian' id='indian' />
            <label htmlFor='indian'>
              <span onClick={decrementCount}>&#8722;</span>Indian
              <span onClick={incrementCount}>&#x2b;</span>
            </label>
            <p> x {indianCount}</p>
          </div>
          <div className='category-group'>
            <input
              type='radio'
              name='category'
              value='foreigner'
              id='foreigner'
            />
            <label htmlFor='foreigner'>
              <span onClick={decrementCount}>&#8722;</span>Foreigner
              <span onClick={incrementCount}>&#x2b;</span>
            </label>
            <p> x {foreignerCount}</p>
          </div>
          <div className='category-group'>
            <input
              type='radio'
              name='category'
              value='children'
              id='children'
            />
            <label htmlFor='children'>
              <span onClick={decrementCount}>&#8722;</span>Children
              <span onClick={incrementCount}>&#x2b;</span>
            </label>
            <p> x {childrenCount}</p>
          </div>
        </div>
      </div>
      <div className='checkout-box-child checkout-box-right'>
        <AdvancedImage cldImg={img} />
        <h1>{monumentName.toUpperCase()}</h1>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(CheckoutBox);
