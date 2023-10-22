import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import jwtDecode from 'jwt-decode';

interface RetryConfig extends AxiosRequestConfig {
  retry: boolean;
}

type decodeToken = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
};

export const getToken = () =>
  localStorage.getItem('access') ? localStorage.getItem('access')! : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const config = {
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: getAuthorizationHeader()
  }
};
const instance: AxiosInstance = axios.create(config);

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh');
  const decodedRefreshToken: decodeToken = jwtDecode(refreshToken!);
  const expirationRefreshTime = decodedRefreshToken.exp * 1000;
  if (expirationRefreshTime > Date.now()) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}users/refresh/`,
        {
          refresh: refreshToken
        }
      );
      const accessToken = response.data.access;
      localStorage.setItem('access', accessToken);
      return accessToken;
    } catch (err) {
      localStorage.clear();
      window.location.reload();
      throw err;
    }
  } else {
    localStorage.clear();
    window.location.reload();
  }
};

instance.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError) => {
    const statusCode = error.response ? error.response.status : null;
    let config: RetryConfig = { ...error?.config, retry: false };

    if (statusCode === 401) {
      const accessToken = await refreshAccessToken();
      config.headers!.Authorization = `Bearer ${accessToken}`;
      return instance(config);
    }
    if (statusCode === 500) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default instance;
