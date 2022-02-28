import { connect } from 'react-redux';

import CustomButtom from '../custom-button/custom-button.component';
import SignIn from '../signin/signin.component';

import logo3 from '../../assets/reservet-logo3.png';

import './mobile-layout.styles.scss';

const MobileLayout = ({ currentUser }) => (
  <div className='mobile-layout'>
    <div className='mobile-layout-container'>
      <span className='notch' />
      <div>
        <img src={logo3} alt='logo' className='logo' />
      </div>
      <CustomButtom bookNow>BOOK NOW</CustomButtom>
      <div className='mobile-layout-signin'>
        {currentUser ? (
          <p>Welcome {currentUser.displayName}, we are glad to see you!</p>
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(MobileLayout);