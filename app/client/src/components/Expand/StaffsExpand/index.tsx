/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { getCoStaffs } from '@/request';
import { useEffect, useState } from 'react';
import './index.less';

interface ExpandProps {
  id: number;
}

const Expand = (props: ExpandProps) => {
  const companyId = props.id;
  const [staffs, setStaffs] = useState<string[]>([]);

  useEffect(() => {
    try {
      getCoStaffs({ companyId }).then((data) => {
        setStaffs(data.result || []);
      });
    } catch (error) {}
  }, []);

  return (
    <>
      <div className="expand-container">
        {staffs
          .reduce(
            (pre: Array<Array<string>>, item: string) => {
              if (pre[pre.length - 1].length < 10) {
                pre[pre.length - 1].push(item);
              } else {
                pre.push([item]);
              }
              return pre;
            },
            [[]],
          )
          .map((item) => (
            <div className="expand-row">
              {item.map((staff) => (
                <div className="expand-item">{staff}</div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default Expand;
