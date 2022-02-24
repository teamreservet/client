import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButtom from '../custom-button/custom-button.component';
import { setCurrentUser } from '../../redux/user/user.action';

import {
  auth,
  signInWithEmailAndPassword
} from '../../firebase/firebase.utils';

import './signin.styles.scss';

const SignIn = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = formData;
    await signInWithEmailAndPassword(auth, email, password);

    setFormData({
      email: '',
      password: ''
    });
  };

  return (
    <div className='log-in-form'>
      <h1>Sign in form</h1>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
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

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(SignIn);
