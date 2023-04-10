/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import styles from './index.less';

const Main = (props: any) => {
  console.log(props);
  return (
    <>
      {props.children}
    </>
  );
};

export default Main;
