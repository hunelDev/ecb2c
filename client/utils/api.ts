import axios from 'axios';
import { getCookie } from './general';
const { NEXT_PUBLIC_API_URL } = process.env;

const api = () => {
  return axios.create({
    baseURL: NEXT_PUBLIC_API_URL ?? 'http://localhost/api',
    headers: {
      Authentication: `Bearer ${getCookie('token')!}`,
    },
  });
};

export { api };
