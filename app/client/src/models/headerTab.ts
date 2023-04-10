/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { HEADER_TAB } from '@/constants';
import { PathName } from '@/routes';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

const genCurrent = (path: string) => {
  switch (path) {
    case PathName.overview:
      return HEADER_TAB.OVERVIEW;
    case PathName.company:
    case PathName.cost:
    case PathName.resource:
    case PathName.record:
    case PathName.costentry:
      return HEADER_TAB.CO_MANAGE;
    case PathName.role:
    case PathName.user:
    case PathName.dataManage:
      return HEADER_TAB.PLATFORM_MANAGE;
    case PathName.subManager:
    case PathName.virtualNetworkSegment:
    case PathName.image:
      return HEADER_TAB.MAINTENANCE;
  }
};

const useHeaderTab = () => {
  const { currentPath } = useModel('history');
  const [current, setCurrent] = useState(genCurrent(currentPath));
  useEffect(() => {
    setCurrent(genCurrent(currentPath));
  }, [currentPath]);
  return { current, setCurrent };
};

export default useHeaderTab;
