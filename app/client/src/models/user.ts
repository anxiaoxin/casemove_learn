/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { GetUser } from '@/request';
import permission from '@/utils/permission';
import { useEffect, useState } from 'react';

interface UserInfo {
  name: string;
}

const request = async () => {
  try {
    // const res = await GetUser();
    // return res.result;
    return {};
  } catch (error) {}
};

const useUser = () => {
  const [info, setInfo] = useState<UserInfo>({ name: '123' });

  const reload = () => {
    request().then((data) => {
      // setInfo(data);
      // permission.setCodes(data?.codes || []);
    });
  };

  return { info, reload };
};

export default useUser;
