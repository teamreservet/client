import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import ReservetLogo from '../../assets/reservet.svg';

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
      <h1 className='authenticate-heading'>Sign up and log in page</h1>
      <div className='background' />
      <div className='container'>
        <div className='reservet-logo-container'>
          <img src={ReservetLogo} alt='logo' className='reservet-logo' />
        </div>
        <div className='authentication'>
          <Outlet context={setRedirectUrl} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(SignUpAndLogInPage);
