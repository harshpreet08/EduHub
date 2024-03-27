import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:6002',
});

export const http = {
  post: axiosInstance.post,
  get: axiosInstance.get,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};
