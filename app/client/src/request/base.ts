/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { StringIndexMap } from '@/type';
import Config from '@/utils/config';
import { Modal } from 'antd-mobile';
import axsio from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';
import { history } from 'umi';
import { PathName } from '@/constants';
import eventBus from '@/utils/eventBus';

interface ResponseType {
  message: string;
  result: any;
  status: number;
}

const IconAuth = {
  username: Config.authName,
  password: Config.authPassword,
};

const http = axsio.create({
  // baseURL: '10.109.70.105:3001/',
  // baseURL: '43.138.19.3:3001/',
  // baseURL: 'localhost:3001/',
  timeout: 30000,
});

http.interceptors.request.use((config: any) => {
  return {
    ...config,
    paramsSerializer: (params: any) => {
      return qs.stringify(params, { indices: false });
    },
    headers: {
      Authorization: `${Cookies.get('t-token')}`,
    },
    // baseURL: 'http://10.109.70.105:3001',
    // baseURL: 'http://localhost:3001',
    baseURL: 'http://43.138.19.3:3001/',
  };
});

http.interceptors.response.use(
  (response) => {
    const data = response.data;

    if ([200, 202].indexOf(response.status) === -1) {
      return Promise.reject({});
    }

    if(data?.status === 2) {
      Modal.alert({
        title: 'error',
        content: 'steam 登录过期，请重新登录',
        confirmText: '确定',
        onClose: () => {
          eventBus.emit('resetLogin');
        }
      })
      return Promise.reject(data);
    } else if(data?.status !== 0) {
      Modal.alert({
        title: 'error',
        content: data.message,
      });
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    const response = error.response;
    switch (response?.status) {
      case 401:
        history.push(PathName.login);
        break;
      case 404:
        return Promise.resolve();
      // 超时的情况
      case undefined:
        return Promise.resolve();
      default:
        Modal.alert({
          title: 'error',
          content: response.data?.message || 'Network error',
        });
        return Promise.resolve();
    }
  },
);

const Get = async (
  url: string,
  params: StringIndexMap,
  config: StringIndexMap = {},
): Promise<any> => http(url, { method: 'get', params, ...config });

const Post = async (
  url: string,
  params: StringIndexMap,
  config: StringIndexMap = {},
): Promise<any> => http(url, { method: 'post', data: params, ...config });

const Put = async (
  url: string,
  params: StringIndexMap,
  config: StringIndexMap = {},
): Promise<any> => http(url, { method: 'put', data: params, ...config });

const Delete = async (
  url: string,
  params: StringIndexMap,
  config: StringIndexMap = {},
): Promise<any> => http(url, { method: 'delete', data: params, ...config });

export { Get, Post, Put, Delete };
