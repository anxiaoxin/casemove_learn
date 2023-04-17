/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
export * from './base';
import { Delete, Get, Post, Put } from './base';
import {
  getCasketContentsUrl,
  getPriceUrl,
  loginUrl, refreshInventoryUrl,
} from '@/constants/urls';
import ContentsJSON from './getCasketContents.json'
import UserInfo from '../pages/login/res.json';

export const UserLogin = async (params: any): Promise<any> =>
  Promise.resolve(UserInfo);
  // Post(loginUrl, params);

export const RefresInventory = async (params: any): Promise<any> =>
  Post(refreshInventoryUrl, params);

export const GetPrice =async (params: any): Promise<any> => 
  Get(getPriceUrl, params);


export const GetCasketContents = async (params: any): Promise<any> => 
  // return Promise.resolve(ContentsJSON);
  Get(getCasketContentsUrl, params);

