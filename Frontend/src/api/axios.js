import axios from 'axios';

const api = axios.create({
    baseURL:"https://hostle-app-2.onrender.com",
    withCredentials:true
});

export default api;