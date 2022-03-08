import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import authPageImg from '../../assets/auth-page-img.svg';
import reservetLogo from '../../assets/reservet-logo.png';

import './sign-up-log-in-page.styles.scss';

const SignUpAndLogInPage = ({ currentUser }) => {
  const navigate = useNavigate();
  const [redirectUrl, setRedirectUrl] = useState('/');
  useEffect(() => {
    if (currentUser) {
      navigate(redirectUrl);
    }
  }, [currentUser, redirectUrl, navigate]);
  return (
    <div className='sign-up-and-log-in-page'>
      {/* <h1 className='authenticate-heading'>Sign up and log in page</h1> */}
      <div className='background' />
      <div className='container'>
        <div className='authentication'>
          <Outlet context={setRedirectUrl} />
        </div>
        <div className='auth-page-img-wrapper'>
          <img src={reservetLogo} alt='' className='auth-page-img-1' />
          <img src={authPageImg} alt='' className='auth-page-img-2' />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(SignUpAndLogInPage);
