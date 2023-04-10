/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { useEffect, useState } from 'react';
import { history, useModel } from 'umi';
const useHistory = () => {
  const [currentPath, setCurrentPath] = useState(history.location.pathname);

  const { update } = useModel('global');

  useEffect(() => {
    const unlisten = history.listen((location: any, action: any) => {
      setCurrentPath(location.pathname);
      update();
    });
    return unlisten;
  }, []);

  return { currentPath, setCurrentPath };
};

export default useHistory;
