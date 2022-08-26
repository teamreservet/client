import { useContext } from 'react';
import { connect } from 'react-redux';

import CustomButtom from '../custom-button/custom-button.component';
import SignIn from '../signin/signin.component';

import { showDashboardContext } from '../../contexts';
import { auth, signOut } from '../../firebase/firebase.utils';

import logo from '../../assets/reservet-logo.png';

import './mobile-layout.styles.scss';

const MobileLayout = ({ currentUser }) => {
  const [showDashboard, setShowDashboard] = useContext(showDashboardContext);
  return (
    <div className='mobile-layout'>
      <span className='notch' />
      <div className='mobile-layout-container'>
        <div>
          <img src={logo} alt='logo' className='logo' />
        </div>
        {currentUser ? (
          <CustomButtom
            onClick={async () => {
              setShowDashboard(false);
              await signOut(auth);
            }}
          >
            SIGN OUT
          </CustomButtom>
        ) : null}
        <div className='mobile-layout-signin'>
          {currentUser ? (
            <p>
              Welcome <b>{currentUser.displayName}</b>, we are glad to see you!
            </p>
          ) : (
            <SignIn placeholder={true} />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(MobileLayout);
