/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import permission from '@/utils/permission';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

const Permission = (props: any) => {
  const { info } = useModel('user');
  const [codes, setCodes] = useState<string[]>([]);
  const { children, per } = props;

  useEffect(() => {
    setCodes(info?.codes || []);
  }, [info]);

  if (permission.hasPer(per)) {
    return (
      <>
        {(Array.isArray(children) ? children : [children]).map(
          (item: any) => item,
        )}
      </>
    );
  } else {
    return null;
  }
};

export default Permission;
