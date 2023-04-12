/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
export * from './base';
import { Delete, Get, Post, Put } from './base';
import {
  getPriceUrl,
  loginUrl, refreshInventoryUrl,
} from '@/constants/urls';


export const UserLogin = async (params: any): Promise<any> =>
  Post(loginUrl, params);

export const RefresInventory = async (params: any): Promise<any> =>
  Post(refreshInventoryUrl, params);

export const GetPrice =async (params: any): Promise<any> => {
  Get(getPriceUrl, params);
}
