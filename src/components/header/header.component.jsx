import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import TicketHousePopUp from '../ticket-house-pop-up/ticket-house-pop-up.component';
import UserDashboard from '../user-dashboard/user-dashboard.component';

import { showDashboardContext } from '../../contexts';

import ReservetLogo from '../../assets/reservet.svg';
import verticalLines from '../../assets/vertical-lines.svg';

import './header.styles.scss';

const ContactUsHover = ({ setContactUsHover, contactUsHover }) => {
  return (
    <div
      className={`contact-us-hover ${contactUsHover ? 'show' : 'hide'}`}
      onMouseLeave={() => setContactUsHover(false)}
    >
      <div>
        <a href='tel:+917999956584'>Contact number - 7999956584</a>
        <a href='mailto:teamreservet@gmail.com'>
          Email us - teamreservet@gmail.com
        </a>
        <p>Address - Gokalpur, Jabalpur, Madhya Pradesh, 482011</p>
      </div>
    </div>
  );
};

const Header = ({ currentUser }) => {
  const [PopUp, setPopUp] = useState(false);
  const [hoverOn, setHoverOn] = useState('');
  const [showDashboard, setShowDashboard] = useContext(showDashboardContext);
  const [animate, setAnimate] = useState(false);
  const [contactUsHover, setContactUsHover] = useState(false);

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
          <div
            className='options'
            onMouseLeave={() => {
              setPopUp(false);
              setContactUsHover(false);
            }}
          >
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
            <Link
              className='option'
              to='/'
              onMouseEnter={() => setContactUsHover(true)}
            >
              Contact us
            </Link>
            <ContactUsHover
              contactUsHover={contactUsHover}
              setContactUsHover={setContactUsHover}
            />
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
      <UserDashboard
        showDashboard={showDashboard}
        setShowDashboard={setShowDashboard}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);
