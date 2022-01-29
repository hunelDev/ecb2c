import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { api } from './api';

type Request = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

export const checkToken = async (req: Request, isAuth: boolean = true) => {
  if (req) {
    const { token } = req.cookies;

    if (isAuth) {
      if (!token) return false;

      const { data } = await api().get('/user-check', {
        headers: {
          Authentication: `Bearer ${token}`,
        },
      });

      if (data.error) return false;

      return data.result;
    }
    return !token;
  }

  return false;
};

export const getCookie = (name: string) => {
  if (typeof window !== 'undefined') {
    const value = window.document.cookie.match(`${name}=(.*)`);
    if (!value) return null;
    const value2 = value[1].match('(.*);');
    if (!value2) return value[1];
    return value2[1];
  }

  return null;
};

export const dateFormat = (date: Date | number, minusYear: number = 0) => {
  let ye =
    parseInt(new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)) -
    minusYear;
  let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

  return `${ye}-${mo}-${da}`;
};

export const checkForSomeChanged = (changedData: any, referanceData: any) => {
  const keys = Object.keys(changedData);
  return keys.some((key) => changedData[key] !== (referanceData[key] ?? ''));
};
