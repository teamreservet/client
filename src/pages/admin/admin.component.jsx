import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const Admin = ({ currentUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate('/');
      return;
    }
  }, [currentUser, navigate]);
  return <Outlet />;
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Admin);
