import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import HomePage from './pages/homepage/homepage.component';
import SignUpAndLogInPage from './pages/sign-up-log-in-page/sign-up-log-in-page.component';
import TicketHouse from './pages/ticket-house/ticket-house.component';

import Header from './components/header/header.component';
import NewMonument from './components/admin/new-monument/new-monument.component';
import NotFound from './components/not-found/not-found.component';
import SignUp from './components/signup/signup.component';
import SignIn from './components/signin/signin.component';
import Admin from './components/admin/admin.component';

import {
  onAuthStateChanged,
  auth,
  getUserProfile
} from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.action';
import { loadMonuments } from './redux/monument/monuments.action';

import { serverBaseUrlContext } from './contexts';

import './App.css';

function App({ setCurrentUser, loadMonuments }) {
  // base url of our server
  const baseUrl =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:8080'
      : 'https://teamreservet.herokuapp.com';

  // Auth change listner
  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const currentUser = await getUserProfile(baseUrl, user);
        setCurrentUser(currentUser);
      } else {
        setCurrentUser(user);
      }
    });
  });

  // Load monuments
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        'https://teamreservet.herokuapp.com/api/monuments'
      );
      loadMonuments(data);
    })();
  });

  return (
    <serverBaseUrlContext.Provider value={baseUrl}>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/ticket-house' element={<TicketHouse />} />
          <Route path='/authenticate' element={<SignUpAndLogInPage />}>
            <Route path='register' element={<SignUp />} />
            <Route path='login' element={<SignIn />} />
          </Route>
          <Route path='/*' element={<NotFound />} />
          <Route path='/admin' element={<Admin />}>
            <Route path='upload-monuments' element={<NewMonument />} />
          </Route>
        </Routes>
      </div>
    </serverBaseUrlContext.Provider>
  );
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  loadMonuments: monuments => dispatch(loadMonuments(monuments))
});

export default connect(null, mapDispatchToProps)(App);
