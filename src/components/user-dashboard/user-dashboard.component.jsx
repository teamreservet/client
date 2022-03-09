import { auth, signOut } from '../../firebase/firebase.utils';

import './user-dashboard.styles.scss';

const UserDashboard = ({ showDashboard }) => {
  return (
    <div className={`user-dashboard ${showDashboard ? 'show' : 'hide'}`}>
      <h1>Dashboard</h1>
      <div className='authenticate' onClick={async () => await signOut(auth)}>
        Sign out
      </div>
    </div>
  );
};

export default UserDashboard;
