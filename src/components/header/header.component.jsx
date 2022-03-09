import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import TicketHousePopUp from '../ticket-house-pop-up/ticket-house-pop-up.component';
import UserDashboard from '../user-dashboard/user-dashboard.component';

import { showDashboardContext } from '../../contexts';

import ReservetLogo from '../../assets/reservet.svg';
import verticalLines from '../../assets/vertical-lines.svg';

import './header.styles.scss';

const Header = ({ currentUser }) => {
  const [PopUp, setPopUp] = useState(false);
  const [hoverOn, setHoverOn] = useState('');
  const [showDashboard, setShowDashboard] = useContext(showDashboardContext);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 300);
  }, [setAnimate]);

  const navigate = useNavigate();

  return (
    <div className={`header ${animate ? 'animate' : ''}`}>
      <div className='header-elements'>
        <div className='logo-container' onClick={() => navigate('/')}>
          <img src={ReservetLogo} alt='logo' className='logo' />
        </div>
        <div className='all-options'>
          <div className='options' onMouseLeave={() => setPopUp(false)}>
            {currentUser && currentUser.isAdmin ? (
              <div className='admin-options'>
                <div>
                  <Link className='option' to='/verify-ticket'>
                    Verify Ticket
                  </Link>
                </div>
                <div>
                  <Link className='option' to='/admin/upload-monuments'>
                    Upload Monuments
                  </Link>
                </div>
              </div>
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
              Ticket Counter
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
              className='profile-icon'
              onClick={e => {
                e.stopPropagation();
                setShowDashboard(true);
              }}
            >
              <img src={verticalLines} alt='' className='vertical-lines' />
            </div>
          ) : (
            <Link className='authenticate' to='/authenticate/register'>
              Register
            </Link>
          )}
        </div>
      </div>
      <UserDashboard showDashboard={showDashboard} />
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);
