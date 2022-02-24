import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import axios from 'axios';

const firebaseConfig = {
  apiKey: 'AIzaSyDdvNweU0Sj9uTcYTHv-b80P-izYmtwHTE',
  authDomain: 'reservet-aab8e.firebaseapp.com',
  projectId: 'reservet-aab8e',
  storageBucket: 'reservet-aab8e.appspot.com',
  messagingSenderId: '514186109093',
  appId: '1:514186109093:web:7e389db972a69a6e402d4c',
  measurementId: 'G-65T5799FSD'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const createUserProfile = async (baseUrl, user, otherDetails) => {
  if (!user) {
    return;
  }
  try {
    const newUser = await axios.post(`${baseUrl}/api/user/create`, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      ...otherDetails
    });
    return newUser.data;
  } catch (err) {
    console.log('Error creating user');
    return null;
  }
};

const getUserProfile = async (baseUrl, user) => {
  if (!user) return;
  try {
    const foundUser = await axios.post(`${baseUrl}/api/user/get`, {
      uid: user.uid
    });
    const token = foundUser.data.token;
    return { token, ...foundUser.data.user };
  } catch (err) {
    console.log(
      'Error searching user from the server, and the error message is ',
      err.message
    );
    return null;
  }
};

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  auth,
  onAuthStateChanged,
  createUserProfile,
  getUserProfile
};
