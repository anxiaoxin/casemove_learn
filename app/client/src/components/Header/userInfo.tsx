/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { Popover, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Down from '@/assets/images/down.png';
import styles from './index.less';
import { useModel } from 'umi';
import useI18n from '@/utils/hooks/useI18n';
import Cookies from 'js-cookie';
import config from '@/utils/config';
import { PostUserName } from '@/request';

const UserInfo = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('user');
  // const { info } = useModel('user');
  const I18n = useI18n();

  const logout = () => {
    // Cookies.set('X-Token', '');
    Cookies.remove('X-Token');
    window.location.replace(
      'https://stscn.lenovo.com/adfs/ls/?wa=wsignoutcleanup1.0',
    );
  };
  useEffect(() => {
    PostUserName({}).then((res: any) => {
      // console.log(res);
      if (res) {
        setName(res.result.displayName);
      }
    });
  });

  return (
    <>
      <Popover
        placement="bottomRight"
        content={
          <>
            <div className={styles['user-info']}>
              <div style={{ fontSize: 16, lineHeight: 2 }}>{name}</div>
              {/* <div style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.4)' }}>
                {name}
              </div> */}
              <div
                style={{
                  cursor: 'pointer',
                  borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                  lineHeight: '40px',
                }}
                onClick={logout}
              >
                {I18n('logout')}
              </div>
            </div>
          </>
        }
        trigger="click"
        visible={visible}
        onVisibleChange={(current) => setVisible(current)}
      >
        <Avatar
          size="large"
          style={{ cursor: 'pointer' }}
          icon={<UserOutlined />}
        />
        <img className={styles['down-icon']} src={Down} alt="" />
      </Popover>
    </>
  );
};

export default UserInfo;
