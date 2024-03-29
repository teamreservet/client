import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import SignUpAndLogInPage from './pages/sign-up-log-in-page/sign-up-log-in-page.component';
import TicketHouse from './pages/ticket-house/ticket-house.component';
import NewMonument from './pages/admin/new-monument/new-monument.component';
import VerifyTicket from './pages/admin/verify-ticket/verify-ticket.component';
import Admin from './pages/admin/admin.component';

import Header from './components/header/header.component';
import NotFound from './components/not-found/not-found.component';

import SignUp from './components/signup/signup.component';
import SignIn from './components/signin/signin.component';
import SignInPopup from './components/signin-popup/signin-popup.component';

import {
  onAuthStateChanged,
  auth,
  getUserProfile
} from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.action';
import { loadMonuments } from './redux/monument/monuments.action';
import { loadStates } from './redux/state/state.action';

import {
  serverBaseUrlContext,
  searchQueryContext,
  showDashboardContext
} from './contexts';

import './App.css';

function App({ currentUser, setCurrentUser, loadMonuments, loadStates }) {
  const [shopSignInPopup, setShowSignInPopUp] = useState(false);

  // base url of our server
  const baseUrl =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:8080'
      : 'https://server-teamreservet.vercel.app';

  // Auth change listner
  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const currentUser = await getUserProfile(baseUrl, user);
        setCurrentUser(currentUser);
        setShowSignInPopUp(true);
      } else {
        setCurrentUser(user);
      }
    });
  }, []);

  // Load monuments
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${baseUrl}/api/monuments`);
      loadMonuments(data);
    })();
  }, []);

  // Get States data
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${baseUrl}/api/states`);
      loadStates(data);
    })();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <serverBaseUrlContext.Provider value={baseUrl}>
      <searchQueryContext.Provider value={[searchQuery, setSearchQuery]}>
        <showDashboardContext.Provider
          value={[showDashboard, setShowDashboard]}
        >
          <div className='App' onClick={() => setShowDashboard(false)}>
            {shopSignInPopup ? (
              <div>
                <SignInPopup
                  setShowSignInPopUp={setShowSignInPopUp}
                  currentUser={currentUser}
                />
              </div>
            ) : null}
            <Header />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/ticket-house' element={<TicketHouse />} />
              <Route path='/authenticate' element={<SignUpAndLogInPage />}>
                <Route path='register' element={<SignUp />} />
                <Route path='login' element={<SignIn />} />
              </Route>
              <Route path='/verify-ticket/:id' element={<VerifyTicket />} />
              <Route path='/verify-ticket' element={<VerifyTicket />} />
              <Route path='/*' element={<NotFound />} />
              <Route path='/admin' element={<Admin />}>
                <Route path='upload-monuments' element={<NewMonument />} />
              </Route>
            </Routes>
          </div>
        </showDashboardContext.Provider>
      </searchQueryContext.Provider>
    </serverBaseUrlContext.Provider>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  loadMonuments: monuments => dispatch(loadMonuments(monuments)),
  loadStates: statesData => dispatch(loadStates(statesData))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
