import axios from 'axios';

export default (baseURL, accessToken) => axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'PRIVATE-TOKEN': accessToken,
  },
});
