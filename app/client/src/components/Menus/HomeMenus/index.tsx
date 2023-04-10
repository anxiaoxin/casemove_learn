/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { useEffect, useState } from 'react';
import useI18n from '@/utils/hooks/useI18n';
import { Menu } from 'antd';
import { history, useModel } from 'umi';
import CompanyGray from '@/assets/images/company_gray@2x.png';
import CompanyWhite from '@/assets/images/company_white@2x.png';
import RecordGray from '@/assets/images/record_gray@2x.png';
import RecordWhite from '@/assets/images/record_white@2x.png';
import WalletGray from '@/assets/images/wallet_gray@2x.png';
import WalletWhite from '@/assets/images/wallet_white@2x.png';
import ResourceGray from '@/assets/images/ziyuan_gray@2x.png';
import ResourceWhite from '@/assets/images/ziyuan_white@2x.png';
import './index.less';
import { PathName } from '@/routes';
import { MENU_KEYS, MENU_KEYS_I18N_MAP } from '@/constants';
import { filterByPer } from '@/utils';

const useMenuData = (selected: string) => {
  const I18n = useI18n();
  const MENU_DATA = [
    {
      key: MENU_KEYS.cloudpc,
      icon: (
        <img
          className="menu-icon"
          src={selected === MENU_KEYS.cloudpc ? CompanyWhite : CompanyGray}
        />
      ),
      label: I18n(MENU_KEYS_I18N_MAP.company),
      per: '2-1',
    },
    {
      key: MENU_KEYS.user,
      icon: (
        <img
          className="menu-icon"
          src={selected === MENU_KEYS.user ? WalletWhite : WalletGray}
        />
      ),
      label: I18n(MENU_KEYS_I18N_MAP.cost),
      per: '2-2',
    },
    {
      key: MENU_KEYS.mirror,
      icon: (
        <img
          className="menu-icon"
          src={selected === MENU_KEYS.mirror ? ResourceWhite : ResourceGray}
        />
      ),
      label: I18n(MENU_KEYS_I18N_MAP.resource),
      per: '2-3',
    },
    {
      key: MENU_KEYS.record,
      icon: (
        <img
          className="menu-icon"
          src={selected === MENU_KEYS.record ? RecordWhite : RecordGray}
        />
      ),
      label: I18n(MENU_KEYS_I18N_MAP.record),
      per: '2-4',
    },
  ];
  return MENU_DATA;
  return filterByPer(MENU_DATA);
};

const Menus = () => {
  const [selected, setSelected] = useState<string>(MENU_KEYS.company);
  const { currentPath } = useModel('history');
  const data = useMenuData(selected);
  const onSelect = (data: { key: string }) => {
    history.push(PathName[data.key]);
  };

  useEffect(() => {
    for (let key in PathName) {
      if (PathName[key] === currentPath) {
        if (key === MENU_KEYS.addUser) {
          setSelected(MENU_KEYS.user);
        } else if (key === MENU_KEYS.addcop) {
          setSelected(MENU_KEYS.cloudpc);
        } else if (key === MENU_KEYS.addmirror) {
          setSelected(MENU_KEYS.mirror);
        } else {
          setSelected(key);
        }
        break;
      }
    }
  }, [currentPath]);

  return (
    <>
      <Menu
        defaultSelectedKeys={['co_info']}
        style={{
          // padding: '12px 16px',
          height: '100%',
          backgroundColor: '#F0F2F5',
        }}
        items={data}
        onSelect={onSelect}
        selectedKeys={[selected]}
      />
    </>
  );
};

export default Menus;
