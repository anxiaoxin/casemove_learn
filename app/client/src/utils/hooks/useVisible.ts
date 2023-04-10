/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { useState } from 'react';

export const useVisible = () => {
  const [visible, setVisible] = useState(false);

  const onChange = (current: boolean) => {
    setVisible(current);
  };
  return { visible, setVisible, onChange };
};
