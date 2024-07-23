import axios from 'axios';

export const axiosInstance = axios.create({
  withCredentials: false,
  timeout: 5000,
})
