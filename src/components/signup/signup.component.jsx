import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import CustomButtom from '../custom-button/custom-button.component';
import Loader from '../loader/loader.component';

import {
  auth,
  createUserWithEmailAndPassword,
  createUserProfile
} from '../../firebase/firebase.utils';

import { serverBaseUrlContext } from '../../contexts';

import './signup.styles.scss';

const SignUp = () => {
  const serverBaseUrl = useContext(serverBaseUrlContext);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setShowLoader(true);
    if (formData.password !== formData.confirmPassword) {
      alert("Password and confirm password doesn't match");
      return;
    }

    const { email, password, firstName, lastName } = formData;

    await createUserProfile(serverBaseUrl, email, {
      displayName: `${firstName} ${lastName}`
    });
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      window.alert(err.message);
    }
    setShowLoader(false);

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className='registration-form'>
      {showLoader ? <Loader /> : null}
      <div className='signup-title'>
        <h1>Sign up</h1>
        <p>Create your Reservet Account</p>
      </div>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div className='user-name'>
            <FormInput
              name='firstName'
              type='text'
              label='First Name'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <FormInput
              name='lastName'
              type='text'
              label='Last Name'
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <FormInput
            name='email'
            type='text'
            label='Email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className='password-input'>
            <FormInput
              name='password'
              type={passwordType}
              label='Password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => {
                passwordType === 'password'
                  ? setPasswordType('text')
                  : setPasswordType('password');
              }}
            >
              &#128065;
            </span>
          </div>
          <FormInput
            name='confirmPassword'
            type={passwordType}
            label='Confirm Password'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <CustomButtom>Sign up</CustomButtom>
        </form>
      </div>
      <div className='to-log-in'>
        Already have an accout?{' '}
        <span onClick={() => navigate('/authenticate/login')}>Sign in</span>
      </div>
    </div>
  );
};

export default SignUp;
