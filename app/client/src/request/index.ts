/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
export * from './base';
import { Delete, Get, Post, Put } from './base';
import {
  addUsersUrl,
  deleteUsersUrl,
  genSkeyUrl,
  getBaseInfoUrl,
  getCasketContentsUrl,
  getPriceUrl,
  getUsersUrl,
  loginUrl, moveInUrl, moveOutUrl, refreshInventoryUrl, renameStorageUnitUrl, updateUsersUrl,
} from '@/constants/urls';
import ContentsJSON from './getCasketContents.json'
import UserInfo from '../pages/login/res.json';

// 针对同一个请求不同参数的批量操作
export const MultipleRequest = (request: (params: any) => Promise<any>, paramList: any[], cb: (res: any, finish: boolean) => any) => {
  let currentReqNum = 1;
  let currentIndex = 0;
  let finished  = 0;
  let succedNum = 0;
  let failedNum = 0
  const req = () => {
    console.log('param', paramList[currentIndex], currentIndex);
    request(paramList[currentIndex]).then((data) => {
      succedNum += 1;
      if (!data.data) {
        failedNum += 1;
      }
    }).catch(() => {
      failedNum += 1;
    }).finally(() => {
      finished += 1;
      let finish = currentIndex >= paramList.length;
      cb({succedNum, failedNum}, finished == paramList.length);
      if (failedNum) return;
      if (!finish) {
        req();
        currentIndex += 1;
      }
    })
  }
  for (let i = 0; i < currentReqNum; i++) {
    if (i == paramList.length) {
      break;
    }
    req();
    currentIndex += 1;
  }
}

export const UserLogin = async (params: any): Promise<any> =>
  // Promise.resolve(UserInfo);
  Post(loginUrl, params);

export const GetUsers =async (params: any): Promise<any> =>
  Get(getUsersUrl, params);

export const AddUser = async (params: any): Promise<any> =>
  Post(addUsersUrl, params);

export const UpdateUser = async (params: any): Promise<any> =>
  Post(updateUsersUrl, params);

export const DeleteUser = async (params: any): Promise<any> =>
  Post(deleteUsersUrl, params);

export const GetBaseInfo =async (params: any): Promise<any> =>
  Get(getBaseInfoUrl, params);

export const RefresInventory = async (params: any): Promise<any> =>
  Post(refreshInventoryUrl, params);

export const GetPrice =async (params: any): Promise<any> =>
  Get(getPriceUrl, params);

export const GetSkey =async (params: any): Promise<any> =>
  Get(genSkeyUrl, params);

export const GetCasketContents = async (params: any): Promise<any> =>
  // return Promise.resolve(ContentsJSON);
  Get(getCasketContentsUrl, params);

export const MoveIn = async (params: any): Promise<any> =>
  Post(moveInUrl, params);

export const MoveOut = async (params: any): Promise<any> =>
  Post(moveOutUrl, params);

export const RenameStorageUnit = async (params: any): Promise<any> =>
  Post(renameStorageUnitUrl, params);
