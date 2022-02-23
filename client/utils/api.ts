import axios from 'axios';
import { getCookie } from './general';
const { NEXT_PUBLIC_API_URL } = process.env;

const api = () => {
  const headers: { [prop: string]: any } = {};

  if (getCookie('token'))
    headers['Authentication'] = `Bearer ${getCookie('token')}`;

  if (getCookie('hToken'))
    headers['SuperAuthentication'] = `Bearer ${getCookie('hToken')}`;

  return axios.create({
    baseURL: NEXT_PUBLIC_API_URL ?? 'http://localhost/api',
    headers: {
      ...headers,
    },
  });
};

export { api };
