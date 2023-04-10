/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
export * from './base';
import { Delete, Get, Post, Put } from './base';
import {
  loginUrl,
} from '@/constants/urls';


export const UserLogin = async (params: any): Promise<any> =>
  Post(loginUrl, params);
