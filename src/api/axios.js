import axios from 'axios';
const BASE_URL = 'http://localhost:3001'

const axiosEPropertyFolder = axios.create({
    baseURL: BASE_URL,
    timeout: 15000
})
// axiosEPropertyFolder.interceptors.request.use(config => {
//     config.headers['Content-Type'] = 'application/json';
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   })
export default axiosEPropertyFolder