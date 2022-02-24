import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import Logo from '../../assets/reservet.png';

import './sign-up-log-in-page.styles.scss';

const SignUpAndLogInPage = ({ currentUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);
  return (
    <div className='sign-up-and-log-in-page'>
      <h1>Sign up and log in page</h1>
      <div className='container'>
        <div className='reservet-logo-container'>
          <img src={Logo} alt='logo' className='reservet-logo' />
        </div>
        <div className='authentication'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(SignUpAndLogInPage);
