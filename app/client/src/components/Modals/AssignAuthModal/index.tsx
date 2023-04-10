import { Radio, RadioChangeEvent, Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useEffect, useState } from 'react';
import style from './index.less';
interface AuthShowProps {
  data?: any;
  visible?: boolean;
}
const a = [1, 2, 3, 4, 5, 6];
const AssignAuthModal = (props: AuthShowProps) => {
  const { visible } = props;
  const [value, setValue] = useState();
  useEffect(() => {
    console.log('effect');
  });

  const genItem = () => {
    return a.map((item) => <Radio value={item}>{item}</Radio>);
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    console.log(value);
  };
  return (
    <>
      <div>
        <Modal
          title="选取用户权限"
          visible={visible}
          width={700}
          footer={[
            <Button key="cancel">取消</Button>,
            <Button key="confirm" type="primary">
              确定
            </Button>,
          ]}
        >
          <Radio.Group value={value} onChange={onChange}>
            {genItem()}
          </Radio.Group>
        </Modal>
      </div>
    </>
  );
};
export default AssignAuthModal;
