import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:6001',
});

export const http = {
  post: axiosInstance.post,
  get: axiosInstance.get,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};
