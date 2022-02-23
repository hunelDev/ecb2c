import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { api } from './api';
import { Category, ImageObjectType } from './types';
import React from 'react';
import axios from 'axios';

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

export const checkForExcludeProps = (key: string, excludeProps?: string[]) => {
  let excludeState = false;
  if (excludeProps && excludeProps.length > 0) {
    excludeState = excludeProps.some((prop) => prop === key);
  }

  return excludeState;
};

export const iterator = (start: number, len: number) => {
  if (start < 0) start = 0;
  if (len < 0) len = 0;

  return Array.from(Array(len), (_, index) => start + index);
};

export const getUniqeFilteredArray = (array: any[]) => {
  return array.filter((val, index, arr) => arr.indexOf(val) === index);
};

export const convertFormatedValueToFloat = (value: string) => {
  const trimedValue = value.trim();
  if (trimedValue !== '') {
    const floatValue = trimedValue.replace('.', '').replace(',', '.');
    if (floatValue !== 'NaN') return +floatValue;
  }

  return null;
};

export const getValueAsFormated = (value: string) => {
  const trimedFloatValue = convertFormatedValueToFloat(value.trim());
  if (trimedFloatValue != null) {
    const formatedVal = Intl.NumberFormat('Tr-tr', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 2,
    })
      .format(trimedFloatValue)
      .replace(/[₺$€]/, '');

    if (formatedVal !== 'NaN') return formatedVal;
  }

  return '0,00';
};

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const findIndexInObjectsArray = (
  objArray: { [prop: string]: any }[],
  srcKey: string,
  srcValue: string | number
) => {
  return objArray.findIndex((obj) => obj[srcKey] === srcValue);
};

type RefinedFilesType = { src: string; file: File }[];

export async function refineMulitpleFiles(files: File[]) {
  return new Promise<RefinedFilesType>((res, _) => {
    var reader = new FileReader();
    var arr: RefinedFilesType = [];
    function readFile(index: number = 0) {
      if (index >= files.length) {
        res(arr);
        return;
      }
      var file = files[index];
      reader.onload = function (e) {
        arr.push({
          src: e.target!.result as string,
          file,
        });
        readFile(index + 1);
      };
      reader.readAsDataURL(file);
    }
    readFile();
  });
}

export const uploadImages = async (
  imagesObjectsList: ImageObjectType[],
  cb: (res: {
    index: number;
    id: string;
    status: 'success' | 'unsuccess';
    data?: any;
  }) => void
) => {
  return new Promise<boolean>(async (res, _) => {
    if (!imagesObjectsList.length) {
      res(false);
      return;
    }

    const { data } = await api().post('/admin/image');
    const { result } = data;

    if (!result) {
      res(false);
      return;
    }

    upload();

    function upload(index = 0) {
      if (index >= imagesObjectsList.length) {
        res(true);
        return;
      }

      if (imagesObjectsList[index].status !== 'pending') {
        upload(index + 1);
        return;
      }

      const formData = new FormData();
      formData.append('file', imagesObjectsList[index].file);
      formData.append('api_key', result.api_key);
      formData.append('eager', result.eager);
      formData.append('timestamp', result.timestamp);
      formData.append('signature', result.signature);

      axios
        .post(`http://api.cloudinary.com/v1_1/daohkc3zs/image/upload`, formData)
        .then(({ data }) => {
          cb({
            index,
            id: imagesObjectsList[index].id,
            status: 'success',
            data,
          });
        })
        .catch(() => {
          cb({ index, id: imagesObjectsList[index].id, status: 'unsuccess' });
        })
        .finally(() => {
          upload(index + 1);
        });
    }
  });
};

export const destoryImage = async (public_id: string) => {
  try {
    const { data } = await api().post('/admin/image', {
      public_id,
    });
    const { result } = data;
    const formData = new FormData();

    formData.append('api_key', result.api_key);
    formData.append('public_id', public_id);
    formData.append('timestamp', result.timestamp);
    formData.append('signature', result.signature);

    await axios.post(
      `http://api.cloudinary.com/v1_1/daohkc3zs/image/destroy`,
      formData
    );
    return true;
  } catch (e) {
    return false;
  }
};
