/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { MENU_KEYS_I18N_MAP } from '@/constants';
import { PathName } from '@/routes';
import useI18n from '@/utils/hooks/useI18n';
import { Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import './index.less';

const genBreadCrumbArray = (path: string): string[] => {
  const tmpArray = path.split('/');
  const [empty, ...res] = tmpArray;
  return res;
};

const MyBreadcrumb = () => {
  const { currentPath } = useModel('history');
  const { name, id } = useModel('global');

  const I18n = useI18n();
  const [breadCrumbArray, setBreadCrumbArray] = useState<string[]>(
    genBreadCrumbArray(currentPath) || [],
  );

  const onClick = (index: number) => {
    if (PathName[breadCrumbArray[index]]) {
      history.push(PathName[breadCrumbArray[index]]);
    }
  };

  useEffect(() => {
    if (name) {
      setBreadCrumbArray([...genBreadCrumbArray(currentPath), name]);
    } else {
      setBreadCrumbArray(genBreadCrumbArray(currentPath));
    }
  }, [currentPath, name]);

  useEffect(() => {
    if (name) {
      setBreadCrumbArray([...genBreadCrumbArray(currentPath), name]);
    }
  }, [name]);

  return (
    <>
      <Breadcrumb className="breadcrumb-container">
        {breadCrumbArray.map((item: string, index: number) => (
          <Breadcrumb.Item key={item}>
            <a onClick={() => onClick(index)}>
              {I18n(MENU_KEYS_I18N_MAP[item] || item)}
            </a>{' '}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </>
  );
};

export default MyBreadcrumb;
