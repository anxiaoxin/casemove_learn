/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { StringIndexMap } from '@/type';
import { useEffect, useRef } from 'react';
import { initSliceShape } from '@/utils';

const SliceShape = (props: {
  data: { type: string; value: number }[];
  config?: StringIndexMap;
}) => {
  const { data, config } = props;
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      initSliceShape(data, divRef.current, config);
    }
  }, []);

  return (
    <>
      <div style={{ display: 'inline-block' }} ref={divRef}></div>
    </>
  );
};

export default SliceShape;
