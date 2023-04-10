/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { GetIcon } from '@/request';

const cache = new Map();

export const getImage = async (id: number) => {
  let res = cache.get(id);
  if (res) {
    return res;
  }
  const icon = await GetIcon({ softwareId: id });
  cache.set(id, icon);
  return cache.get(id);
};
