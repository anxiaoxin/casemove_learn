/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import Main from '@/pages/Main';
import './app.less';

const App = (props: any) => {

  return <>{<Main children={props.children}></Main>}</>;
};

export default App;
