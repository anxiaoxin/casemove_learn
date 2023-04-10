/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import useI18n from '@/utils/hooks/useI18n';
import UserInfo from './userInfo';
import Logo from '@/assets/images/logo.png';
import styles from './index.less';

const Header: React.FC = () => {
  const I18n = useI18n();
  return (
    <>
      <div className={styles['page-header']}>
        <div className={styles.logo}>
          <img src={Logo} alt="logo" />
          <span>{I18n('product_title')}</span>
        </div>
        <UserInfo />
      </div>
    </>
  );
};

export default Header;
