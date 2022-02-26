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
  const [formData, setFormData] = useState({
    name: '',
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

    const { email, password, name } = formData;
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await createUserProfile(serverBaseUrl, user, { displayName: name });
    setShowLoader(false);

    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className='registration-form'>
      {showLoader ? <Loader /> : null}
      <h1>Sign Up form</h1>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <FormInput
            name='name'
            type='text'
            label='Name'
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FormInput
            name='email'
            type='text'
            label='Email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormInput
            name='password'
            type='password'
            label='Password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FormInput
            name='confirmPassword'
            type='password'
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
