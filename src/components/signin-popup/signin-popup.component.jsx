import { useEffect } from 'react';
import { useState } from 'react';
import logo from '../../assets/reservet.svg';

import './signin-popup.styles.scss';

const SignInPopup = ({ setShowSignInPopUp, currentUser }) => {
  const [mode, setMode] = useState('User');
  useEffect(() => {
    if (currentUser.isAdmin) {
      setMode('Admin');
    } else if (currentUser.isGateKeeper) {
      setMode('Entry Personel');
    }
  }, [currentUser])
  return (
    <div className='signin-popup' onClick={() => setShowSignInPopUp(false)}>
      <div className='container' onClick={e => e.stopPropagation()}>
        <div className='inner-div'>
          <img src={logo} className='edit-pop' />
          <h1>Welcome to Reservet</h1>

          <h2>Successfully Logged In !!!</h2>
          <h3>You are now logged in as {currentUser.displayName}</h3>
          <h3 className='mode'>Mode: {mode}</h3>
        </div>
      </div>
    </div>
  );
};

export default SignInPopup;
