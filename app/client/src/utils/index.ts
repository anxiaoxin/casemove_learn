/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { StringIndexMap } from '@/type';
import { Modal } from 'antd';
import permission from './permission';
import { AES, enc, mode, pad } from 'crypto-js';

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

export const encode = (text: string) => {
    const key = enc.Utf8.parse('2e35f242a46d67eeb74aabc37d5e5d05');
    const iv = enc.Utf8.parse('Psz4QMjfl6fDXxv6');
    const res = AES.encrypt(text, key, {
      iv,
      mode: mode.CBC,
      padding: pad.Pkcs7 
    })
    return res.toString();
}

export const formatDate = (value = Date.now(), format = "Y-M-D h:m:s") => {
    const formatNumber = (n: any) => `0${n}`.slice(-2);
    const date = new Date(value);
    const formatList = ["Y", "M", "D", "h", "m", "s"];
    const resultList = [];
    resultList.push(date.getFullYear().toString());
    resultList.push(formatNumber(date.getMonth() + 1));
    resultList.push(formatNumber(date.getDate()));
    resultList.push(formatNumber(date.getHours()));
    resultList.push(formatNumber(date.getMinutes()));
    resultList.push(formatNumber(date.getSeconds()));
    for (let i = 0; i < resultList.length; i++) {
        format = format.replace(formatList[i], resultList[i]);
    }
    return format;
}