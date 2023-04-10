import { Modal, Button } from 'antd';
import { useEffect, useState } from 'react';
interface CoInfoProps {
  visible?: boolean;
  _title?: string;
  _text?: string;
  ok?: any;
}
const TextModal = (props: CoInfoProps) => {
  const { visible, _title, _text, ok } = props;

  const [_visible, setVisible] = useState(visible);
  useEffect(() => {
    setVisible(visible);
  }, [visible]);
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <Modal
        onCancel={handleCancel}
        title={_title}
        visible={_visible}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="confirm" onClick={ok} type="primary">
            确定
          </Button>,
        ]}
      >
        <div>{_text}</div>
      </Modal>
    </>
  );
};
export default TextModal;
