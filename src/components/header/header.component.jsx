import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import TicketHousePopUp from '../ticket-house-pop-up/ticket-house-pop-up.component';

import ReservetLogo from '../../assets/reservet.svg';

import { auth, signOut } from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = ({ currentUser }) => {
  const [PopUp, setPopUp] = useState(false);
  const [hoverOn, setHoverOn] = useState('');
  const navigate = useNavigate();

  return (
    <div className='header'>
      <div className='header-elements'>
        <div className='logo-container' onClick={() => navigate('/')}>
          <img src={ReservetLogo} alt='logo' className='logo' />
        </div>
        <div className='options' onMouseLeave={() => setPopUp(false)}>
          {currentUser && currentUser.isAdmin ? (
            <Link className='option' to='/admin/upload-monuments'>
              Upload Monuments
            </Link>
          ) : null}
          <Link
            className='option'
            to='/ticket-house'
            onMouseEnter={e => {
              setHoverOn(e.target.innerHTML);
              setPopUp(true);
            }}
            onClick={() => setPopUp(false)}
          >
            Ticket House
          </Link>
          <TicketHousePopUp
            PopUp={PopUp}
            setPopUp={setPopUp}
            hoverOn={hoverOn}
          />
          <Link
            className='option'
            to='/'
            onMouseEnter={e => {
              setHoverOn(e.target.innerHTML);
              setPopUp(true);
            }}
          >
            FAQs
          </Link>
          <Link className='option' to='/'>
            Contact us
          </Link>
        </div>
        {currentUser ? (
          <div
            className='authenticate'
            onClick={async () => await signOut(auth)}
          >
            Sign out
          </div>
        ) : (
          <Link className='authenticate' to='/authenticate/register'>
            Register
          </Link>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);
