import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { useValidator } from 'react-joi';

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
import { useEffect } from 'react';

const SignUp = () => {
  const serverBaseUrl = useContext(serverBaseUrlContext);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [isDisabled, setDisabled] = useState(true);

  const { state, setData, setExplicitField, validate } = useValidator({
    initialData: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    schema: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: false }
        })
        .required(),
      password: Joi.string()
        .min(6)
        .required(),
      confirmPassword: Joi.string()
        .min(6)
        .required()
    }),
    explicitCheck: {
      firstName: false,
      lastName: false,
      email: false
    },
    validationOptions: {
      abortEarly: true
    }
  });

  const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (
      state.$data.firstName.length >= 1 &&
      state.$data.lastName.length > 1 &&
      state.$data.email.length > 1 &&
      state.$data.password.length > 1 &&
      state.$data.confirmPassword.length > 1 &&
      valid
    ) {
      return valid;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (validateForm(state.$errors)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [state]);

  const handleChange = e => {
    e.persist();
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    setData(old => ({
      ...old,
      [name]: value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();

    if (state.$data.password != state.$data.confirmPassword) {
      alert("Password doesn't match with confirm password");
      return;
    }

    setShowLoader(true);

    const { email, password, firstName, lastName } = state.$data;

    await createUserProfile(serverBaseUrl, email, {
      displayName: `${firstName} ${lastName}`
    });
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      window.alert(err.message);
    }
    setShowLoader(false);
  };

  return (
    <div className='registration-form'>
      {showLoader ? <Loader /> : null}
      <div className='signup-title'>
        <h1>Sign up</h1>
        <p>Create your Reservet Account</p>
      </div>
      <div className='form-container'>
        <form onSubmit={handleSubmit} noValidate>
          <div className='user-name'>
            <div>
              <FormInput
                name='firstName'
                type='text'
                label='First Name'
                value={state.$data.firstName}
                onChange={handleChange}
                onBlur={() => setExplicitField('firstName', true)}
              />
              <p className='error-msg'>
                {state.$errors.firstName.map(data => data.$message).join(',')}
              </p>
            </div>
            <div>
              <FormInput
                name='lastName'
                type='text'
                label='Last Name'
                value={state.$data.lastName}
                onChange={handleChange}
                onBlur={() => setExplicitField('lastName', true)}
              />
              <p className='error-msg'>
                {state.$errors.lastName.map(data => data.$message).join(',')}
              </p>
            </div>
          </div>
          <div>
            <FormInput
              name='email'
              type='text'
              label='Email'
              onChange={handleChange}
              value={state.$data.email}
              onBlur={() => setExplicitField('email', true)}
            />
            <p className='error-msg'>
              {state.$errors.email
                .map(data =>
                  data.$message
                    .split(' ')
                    .slice(1)
                    .join(' ')
                )
                .join(',')}
            </p>
          </div>
          <div className='password-input'>
            <div>
              <FormInput
                name='password'
                type={passwordType}
                label='Password'
                value={state.$data.password}
                onChange={handleChange}
                onBlur={() => setExplicitField('password', true)}
              />
              <p className='error-msg'>
                {state.$errors.password.map(data => data.$message).join(',')}
              </p>
            </div>
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
          <div>
            <FormInput
              name='confirmPassword'
              type={passwordType}
              label='Confirm Password'
              value={state.$data.confirmPassword}
              onChange={handleChange}
              onBlur={() => setExplicitField('confirmPassword', true)}
            />
            <p className='error-msg'>
              {state.$errors.confirmPassword
                .map(data => data.$message)
                .join(',')}
            </p>
          </div>
          <CustomButtom
            disabled={isDisabled}
            style={{ width: '100px', margin: 'auto' }}
          >
            Sign up
          </CustomButtom>
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
