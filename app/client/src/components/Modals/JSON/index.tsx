/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { StringIndexMap } from '@/type';
import useI18n from '@/utils/hooks/useI18n';
import { Modal, Select, Button } from 'antd';
import { useEffect, useState } from 'react';

const Option = Select.Option;
interface CoInfoProps {
  data?: StringIndexMap;
  visible?: boolean;
  onChange: (visible: boolean, saved?: boolean) => void;
}

const JsonInfoModal = (props: CoInfoProps) => {
  const { visible, onChange, data } = props;
  const I18n = useI18n();
  const [_visible, setVisible] = useState(visible);

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  return (
    <>
      <Modal
        title={I18n('json_file')}
        centered
        visible={_visible}
        onCancel={() => {
          onChange(false);
        }}
        width={424}
        footer={
          <div onClick={() => onChange(false)} style={{ textAlign: 'center' }}>
            <Button type="primary">{I18n('ok')}</Button>
          </div>
        }
      >
        <pre>{JSON.stringify(JSON.parse(data?.params || '{}'), null, 2)}</pre>
      </Modal>
    </>
  );
};

export default JsonInfoModal;
