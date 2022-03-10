import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Ticket from '../ticket/ticket.component';

import { auth, signOut } from '../../firebase/firebase.utils';

import usericon from '../../assets/user-icon.svg';

import './user-dashboard.styles.scss';

const UserDashboard = ({ showDashboard, currentUser, setShowDashboard }) => {
  const [selected, setSelected] = useState(-2);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [showTicket, setShowTicket] = useState(null);

  useEffect(() => {
    if (currentUser) setUpcomingTrips(currentUser.upcomingTrips);
  }, [currentUser]);
  const data = [
    {
      ques: 'Previous Trips',
      ans: 'No previous Trips'
    },
    {
      ques: 'Email',
      ans: currentUser ? currentUser.email : ''
    },
    {
      ques: 'About us',
      ans: 'Reservet is an online portal that allows user to buy e-tickets from anywhere and at anytime. A completely contactless ticketing environment that solely focuses on eradicating the use of paper in this domain.'
    },
    {
      ques: 'Customer Support',
      ans: 'this is customer support'
    }
  ];

  const toggle = i => {
    if (selected === i) {
      return setSelected(null);
    }
    return setSelected(i);
  };
  return (
    <div
      className={`user-dashboard ${showDashboard ? 'show' : 'hide'}`}
      onClick={e => e.stopPropagation()}
    >
      {showTicket ? (
        <div className='user-ticket' onClick={() => setShowTicket(null)}>
          <Ticket
            {...showTicket}
            ticketId={showTicket.id}
            amount={showTicket.totalPrice}
            onClick={e => e.stopPropagation()}
          />
        </div>
      ) : null}
      <h1>User Dashboard</h1>
      <img src={usericon} className='logo' alt='' />
      <p className='greet'>
        <b>
          Welcome, {currentUser ? currentUser.displayName.split(' ')[0] : ''}
        </b>
      </p>
      <div className='toggle'>
        <div className='item'>
          <div className='questions' onClick={() => toggle(-1)}>
            <h3>Upcoming Trips</h3>
            <span>{selected === -1 ? '-' : '+'}</span>
          </div>
          <div className={selected === -1 ? 'description_all' : 'description'}>
            <div className='ans upcoming-trips'>
              {upcomingTrips.length !== 0
                ? upcomingTrips.map((trip, idx) => (
                    <p key={idx} onClick={() => setShowTicket(trip)}>
                      {trip.monumentName}, {trip.monumentPlace.split(',')[0]}
                    </p>
                  ))
                : 'No upcoming trips'}
            </div>
          </div>
        </div>

        {data.map((item, i) => (
          <div className='item' key={i} onClick={() => toggle(i)}>
            <div className='questions'>
              <h3>{item.ques}</h3>
              <span>{selected === i ? '-' : '+'}</span>
            </div>
            <div className={selected === i ? 'description_all' : 'description'}>
              <div className='ans'>{item.ans}</div>
            </div>
          </div>
        ))}
      </div>
      <div
        className='authenticate'
        onClick={async () => {
          setShowDashboard(false);
          await signOut(auth);
        }}
      >
        Sign out
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(UserDashboard);
