/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { Button } from 'antd';
import { StringIndexMap } from '@/type';
import DownloadIcon from '@/assets/images/download_gray@2x.png';
import config from '@/utils/config';

interface ButtonProps {
  url?: string;
  style?: StringIndexMap;
}

const DownLoadButton = (props: ButtonProps) => {
  const { style = {}, url } = props;

  const download = async () => {
    if (!url) return;
    const a = document.createElement('a');
    a.href = config.baseUrl + url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <img
        style={{
          width: 28,
          height: 28,
          padding: 4,
          border: '1px solid rgba(0,0,0,0.1500)',
          cursor: 'pointer',
          ...style,
        }}
        src={DownloadIcon}
        onClick={download}
      />
    </>
  );
};

export default DownLoadButton;
