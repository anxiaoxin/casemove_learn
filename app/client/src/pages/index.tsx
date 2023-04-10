/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import styles from './index.less';
import { useModel } from 'umi';

export default function IndexPage() {
  const { current } = useModel('headerTab');
  return (
    <div>
      <h1 className={styles.title}>Page index Hello Listen</h1>
      {current}
    </div>
  );
}
