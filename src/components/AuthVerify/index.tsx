import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { useAppDispatch } from 'redux/store/hooks';
import { refreshTokenAction } from 'redux/action/userAction';

type decodeToken = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
};

const AuthVerify = props => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');

  useEffect(() => {
    if (accessToken) {
      const decodedToken: decodeToken = jwtDecode(accessToken!);
      const decodedRefreshToken: decodeToken = jwtDecode(refreshToken!);
      const expirationTokenTime = decodedToken.exp * 1000;
      const expirationRefreshTime = decodedRefreshToken.exp * 1000;

      if (expirationTokenTime < Date.now()) {
        if (expirationRefreshTime < Date.now()) {
          localStorage.clear();
          navigate('/login');
        } else {
          dispatch(refreshTokenAction({ refresh: refreshToken! }));
        }
      }
    } else {
      localStorage.clear();
      navigate('/login');
    }
  }, [location.pathname]);

  return <div></div>;
};

export default AuthVerify;
