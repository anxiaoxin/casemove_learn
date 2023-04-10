/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { useEffect, useState } from 'react';

const useChanged = (cb: any, watched: any) => {
  const [isfirst, setIsfirst] = useState(true);
  useEffect(() => {
    if (!isfirst) {
      cb();
      return;
    }
    setIsfirst(false);
  }, watched);
};

export default useChanged;
