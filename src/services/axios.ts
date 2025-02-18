import axios from 'axios';

const API_END_POINT = process.env.REACT_APP_API_END_POINT;  

const axiosInstance = axios.create({
  baseURL: API_END_POINT,
});

export default axiosInstance;
