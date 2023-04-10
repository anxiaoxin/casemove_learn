/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
// 全局共享数据示例
import { getSearchParam } from '@/utils';
import { useState } from 'react';

const useGlobal = () => {
  const [name, setName] = useState(getSearchParam('name'));
  const [id, setId] = useState(getSearchParam('id'));
  const update = () => {
    setName(getSearchParam('name'));
    setId(getSearchParam('id'));
  };
  return { name, id, update };
};

export default useGlobal;
