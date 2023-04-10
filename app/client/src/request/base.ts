/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { StringIndexMap } from '@/type';
import Config from '@/utils/config';
import { Modal } from 'antd';
import axsio from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';
import { adLoginUrl } from '@/constants/urls';

interface ResponseType {
  message: string;
  result: any;
  status: number;
}

if (Config.currentEnv !== 'dev') {
  window.document.domain = Config.domain;
}

const IconAuth = {
  username: Config.authName,
  password: Config.authPassword,
};

const http = axsio.create({
  baseURL: Config.baseUrl,
  timeout: 15000,
});

http.interceptors.request.use((config) => {
  return {
    ...config,
    paramsSerializer: (params: any) => {
      return qs.stringify(params, { indices: false });
    },
    headers: {
      Authorization:
        config.url?.indexOf('dtaas') === -1
          ? `Bearer ${Cookies.get('token')}`
          : undefined,

      // 'X-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiJ6aGFuZ2NoYW80MSIsImZpcnN0TmFtZSI6IkNoYW8iLCJsYXN0TmFtZSI6IlpoYW5nIiwiZG9tYWluVHlwZSI6ImFkZnMtYWRtaW4iLCJkaXNwbGF5TmFtZSI6IkNoYW8gQ2hhbzQxIFpoYW5nIiwiZXhwIjoxNjc2NDQxNDU4LCJpYXQiOjE2NzYzNTUwNTgsImVtYWlsIjoiemhhbmdjaGFvNDFAbGVub3ZvLmNvbSJ9.hFvN7QJeg7HseMXpHn0E0pFULSrdLP8GvL4ARPuOgO8',
      'X-Token': Cookies.get('X-Token'),
    },
    baseURL:
      config.url?.indexOf('dtaas') === -1 ? config.baseURL : Config.iconUrl,
    auth: config.url?.indexOf('dtaas') === -1 ? '' : IconAuth,
  };
});

http.interceptors.response.use(
  (response) => {
    const data = response.data;

    if (data?.status == 100004) {
      Cookies.remove('X-Token', { path: '/', domain: document.domain });
      window.location.reload();
    }

    if ([200, 202].indexOf(response.status) === -1) {
      return Promise.reject({});
    }
    // 100004 == token过期
    if (
      data?.status !== 0 &&
      data?.status !== 100005 &&
      !(data instanceof Blob)
    ) {
      Modal.destroyAll();
      Modal.error({
        title: 'error',
        content: data.message,
      });
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    const response = error.response;
    Modal.destroyAll();
    switch (response?.status) {
      case 401:
        return;
        window.location.replace(
          Config.baseUrl + adLoginUrl + `?issuerValue=${Config.issuerValue}`,
        );
        break;
      case 404:
        return Promise.resolve();
      // 超时的情况
      case undefined:
        return Promise.resolve();
      default:
        Modal.error({
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
