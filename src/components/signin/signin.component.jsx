import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import CustomButtom from '../custom-button/custom-button.component';
import Loader from '../loader/loader.component';

import {
  auth,
  signInWithEmailAndPassword
} from '../../firebase/firebase.utils';

import './signin.styles.scss';

const SignIn = ({ placeholder }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const setRedirectUrl = useOutletContext();
  const [showLoader, setShowLoader] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  useEffect(() => {
    if (setRedirectUrl) {
      setRedirectUrl(location.state ? location.state.redirectUrl : '/');
    }
  }, [location.state, setRedirectUrl]);
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setShowLoader(true);
    const { email, password } = formData;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      window.alert('Auth error please try again!');
    }

    setShowLoader(false);
    setFormData({
      email: '',
      password: ''
    });
  };

  return (
    <div className='log-in-form'>
      {showLoader ? <Loader /> : null}
      <h1>Sign in</h1>
      <p>Use your Reservet Account</p>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <FormInput
            name='email'
            type='text'
            label={placeholder ? '' : 'Email'}
            value={formData.email}
            onChange={handleChange}
            placeholder={placeholder ? 'Email' : ''}
            required
          />
          <div className='password-input'>
            <FormInput
              name='password'
              type={passwordType}
              label={placeholder ? '' : 'Password'}
              value={formData.password}
              onChange={handleChange}
              placeholder={placeholder ? 'Password' : ''}
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

          <CustomButtom>Log in</CustomButtom>
        </form>
      </div>
      <div className='to-registration'>
        New to reservet?{' '}
        <span onClick={() => navigate('/authenticate/register')}>
          Click here
        </span>
      </div>
    </div>
  );
};

export default SignIn;
