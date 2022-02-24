import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo3 from '../../assets/reservet-logo3.png';

import { auth, signOut } from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = ({ currentUser }) => {
  const navigate = useNavigate();
  return (
    <div className='header'>
      <div className='header-elements'>
        <div className='logo-container' onClick={() => navigate('/')}>
          <img src={Logo3} alt='logo' className='logo' />
        </div>
        <div className='options'>
          {currentUser && currentUser.isAdmin ? (
            <Link className='option' to='/admin/upload-monuments'>
              Upload Monuments
            </Link>
          ) : null}
          <Link className='option' to='/ticket-house'>
            Ticket House
          </Link>
          {currentUser ? (
            <div className='option' onClick={async () => await signOut(auth)}>
              Sign out
            </div>
          ) : (
            <Link className='option' to='/authenticate/login'>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);
