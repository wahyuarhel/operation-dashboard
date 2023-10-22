import React, { ReactNode, useEffect } from 'react';
import { Navigate, useNavigate, RouteProps } from 'react-router-dom';
import { setAuthorizedForUMS } from 'redux/slice/userSlice';
import Dashboard from '../pages/Dashboard/index';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';

const AuthorizedRoute = ({ children }: RouteProps): JSX.Element => {
  const isUmsAdmin = localStorage.getItem('authorized');
  return <>{isUmsAdmin === 'true' ? children : <Navigate to='/' />}</>;
};

const AuthOutlet: React.FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem('access');
  const umsAuthorized = localStorage.getItem('authorized');
  useEffect(() => {
    if (umsAuthorized === 'true') {
      dispatch(setAuthorizedForUMS(true));
    }
  }, []);
  return accessToken ? <Dashboard /> : <Navigate to='/login' />;
};

export default { AuthOutlet, AuthorizedRoute };
