import CustomButtom from '../custom-button/custom-button.component';
import SignIn from '../signin/signin.component';

import logo3 from '../../assets/reservet-logo3.png';

import './mobile-layout.styles.scss';

const MobileLayout = () => (
  <div className='mobile-layout'>
    <div className='mobile-layout-container'>
      <span className='notch' />
      <div>
        <img src={logo3} alt='logo' className='logo' />
      </div>
      <CustomButtom>BOOK NOW</CustomButtom>
      <div className='mobile-layout-signin'>
        <SignIn />
      </div>
    </div>
  </div>
);

export default MobileLayout;
