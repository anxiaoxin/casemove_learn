/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { getImage } from '@/utils/appIcons';
import { useEffect, useState } from 'react';
import './index.less';

interface AppProps {
  id: number;
  name: string;
}

const App = (props: AppProps) => {
  const { id, name } = props;
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!id) return;
    getImage(id).then((data: Blob) => {
      if (data) setUrl(URL.createObjectURL(data));
    });
  }, [id]);

  return (
    <>
      <div className="app-item">
        {url ? (
          <img className="app-img" src={url} alt="" />
        ) : (
          <div className="app-img" />
        )}
        {name}
      </div>
    </>
  );
};

export default App;
