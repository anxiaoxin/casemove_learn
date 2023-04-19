/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { StringIndexMap } from '@/type';
import { Modal } from 'antd';
import permission from './permission';

export const comma = (num: string) => {
  const source = num.split('.'); //按小数点分成2部分
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,'); //只将整数部分进行都好分割
  return source.join('.'); //再将小数部分合并进来
};

export const getSearchParam = (key: string) => {
  const url = location.search;
  const searchParams = new URLSearchParams(url);
  return searchParams.get(key);
};

export const DeleteModal = (config: any) => {
  Modal.confirm({
    title: '删除确定',
    okType: 'danger',
    okText: '确认',
    cancelText: '取消',
    // icon: null,
    ...config,
  });
};
