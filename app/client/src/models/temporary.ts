import { useState } from 'react';

const usegTemporary = () => {
  const [data, setData] = useState<any>();
  return { data, setData };
};

export default usegTemporary;
