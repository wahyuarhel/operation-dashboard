import axios from 'axios';
export const getToken = () =>
  localStorage.getItem('access') ? localStorage.getItem('access')! : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;
export default axios.create({
  baseURL: process.env.REACT_APP_PPI_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    // Authorization: getAuthorizationHeader()
  }
});
