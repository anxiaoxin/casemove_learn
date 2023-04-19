/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
export * from './base';
import { Delete, Get, Post, Put } from './base';
import {
  getCasketContentsUrl,
  getPriceUrl,
  loginUrl, moveInUrl, moveOutUrl, refreshInventoryUrl,
} from '@/constants/urls';
import ContentsJSON from './getCasketContents.json'
import UserInfo from '../pages/login/res.json';

// 针对同一个请求不同参数的批量操作
export const MultipleRequest = (request: (params: any) => Promise<any>, paramList: any[], cb: (res: any, finish: boolean) => any) => {
  let currentReqNum = 5;
  let currentIndex = 0;
  const req = () => {
    let res: any;
    request(paramList[currentIndex]).then((data) => {
      if (data.status === 0) {
        res = true;
      }
    }).catch(() => {
      res = false;
    }).finally(() => {
      let finish = currentIndex === (paramList.length - 1);
      cb(res, finish);
      if (!finish) {
        currentIndex += 1;
        req();
      }
    })
  }
  for (let i = 0; i < currentReqNum; i++) {
    req();
    currentIndex += 1;
  }
}

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

export const MoveIn = async (params: any): Promise<any> =>
  Post(moveInUrl, params);

export const MoveOut = async (params: any): Promise<any> =>
  Post(moveOutUrl, params);
