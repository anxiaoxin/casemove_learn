/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { UpdateCmpImageId } from '@/request';
import { StringIndexMap } from '@/type';
import useI18n from '@/utils/hooks/useI18n';
import { Modal, Form, Input, FormInstance, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

const Option = Select.Option;
interface CoInfoProps {
  data?: StringIndexMap;
  visible?: boolean;
  onChange: (visible: boolean, saved?: boolean) => void;
}

const submit = async (
  form: FormInstance,
  data: StringIndexMap | undefined,
  batch: boolean,
) => {
  try {
    const values = await form.validateFields();
    const res = await UpdateCmpImageId({
      imageId: data?.id,
      name: values.name,
    });
    return Promise.resolve();
  } catch (errorInfo) {
    console.log('Failed:', errorInfo);
    return Promise.reject();
  }
};

const DtoModal = (props: CoInfoProps) => {
  const { data, visible, onChange } = props;
  const I18n = useI18n();
  const [_visible, setVisible] = useState(visible);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [batchAdd, setBatchAdd] = useState(false);
  const [form] = Form.useForm();

  const resetFields = () => {
    !data && form.resetFields();
  };

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  const onOk = () => {
    setConfirmLoading(true);
    submit(form, data, batchAdd)
      .then(() => {
        onChange(false, true);
        setConfirmLoading(false);
        resetFields();
      })
      .catch(() => {
        setConfirmLoading(false);
      });
  };

  return (
    <>
      <Modal
        title={I18n('update_mirror')}
        centered
        visible={_visible}
        confirmLoading={confirmLoading}
        onOk={onOk}
        onCancel={() => {
          onChange(false);
          resetFields();
        }}
        width={424}
        okText={I18n('ok')}
        cancelText={I18n('cancel')}
      >
        <div>{I18n('update_dto_tip')}</div>
        <Form
          name="basic"
          labelCol={{ span: 7 }}
          labelAlign="left"
          wrapperCol={{ span: 17 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label={I18n('new_mirror_id')}
            name="name"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input placeholder={I18n('update_dto_placeholder')} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal></Modal>
    </>
  );
};

export default DtoModal;
