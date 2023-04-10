/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import useI18n from '@/utils/hooks/useI18n';
import { history, useModel } from 'umi';
import styles from './index.less';
import { HEADER_TAB } from '@/constants';
import { PathName } from '@/routes';
import Permission from '../Permission';

const MidTab: React.FC = () => {
  const { current } = useModel('headerTab');
  const I18n = useI18n();
  return (
    <>
      <div className={styles['header-mid']}>
        <Permission per="1">
          <div
            className={
              current === HEADER_TAB.OVERVIEW ? styles['header-mid-active'] : ''
            }
          >
            <span onClick={() => history.push(PathName.overview)}>
              {I18n('overview')}
            </span>
          </div>
        </Permission>
        <Permission per="2">
          <div
            className={
              current === HEADER_TAB.CO_MANAGE
                ? styles['header-mid-active']
                : ''
            }
            onClick={() => history.push(PathName.company)}
          >
            {I18n('co_manage')}
          </div>
        </Permission>
        <Permission per="3">
          <div
            className={
              current === HEADER_TAB.PLATFORM_MANAGE
                ? styles['header-mid-active']
                : ''
            }
            onClick={() => history.push(PathName.role)}
          >
            {I18n('plateform_manage')}
          </div>
        </Permission>
        <Permission per="3">
          <div
            className={
              current === HEADER_TAB.MAINTENANCE
                ? styles['header-mid-active']
                : ''
            }
            onClick={() => history.push(PathName.subManager)}
          >
            {I18n('maintenance')}
          </div>
        </Permission>
      </div>
    </>
  );
};

export default MidTab;
