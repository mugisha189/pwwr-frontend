import axios from 'axios';
import Cookies from 'js-cookie';

export const baseUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
});

export const authApi = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
    'ngrok-skip-browser-warning': '69420',
  },
});

// fetch('https://api.career.ubuzima.rw').then(res=> console.log( res.json())).catch(er=> console.error(er))
