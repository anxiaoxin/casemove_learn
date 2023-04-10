/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { StringIndexMap } from '@/type';
import useI18n from '@/utils/hooks/useI18n';
import {
  Modal,
  Form,
  Input,
  Button,
  FormInstance,
  Select,
  Checkbox,
  Upload,
  Switch,
} from 'antd';
import { useEffect, useState } from 'react';
import { addSub, updateSub, upsertSegment } from '@/request';
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
    let params;
    if (data) params = { ...data };
    params = { ...params, ...values, inuse: !!values.inuse };
    await upsertSegment({ ...params, deleted: data ? data.deleted : 0 });
    return Promise.resolve();
  } catch (errorInfo) {
    console.log('Failed:', errorInfo);
    return Promise.reject();
  }
};

const SegmentInfoModal = (props: CoInfoProps) => {
  const { data, visible, onChange } = props;
  const I18n = useI18n();
  const [_visible, setVisible] = useState(visible);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [batchAdd, setBatchAdd] = useState(false);
  const [form] = Form.useForm();
  const { info, reload } = useModel('user');

  const resetFields = () => {
    !data && form.resetFields();
  };

  useEffect(() => {
    if (data) {
      const res = {
        ...data,
      };
      form.setFieldsValue(res);
    }
  }, [data]);

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
        title={I18n(!data ? 'add_segment' : 'update_segment')}
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
            label={I18n('address_count')}
            name="addressCount"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('address_start')}
            name="addressStart"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('address_end')}
            name="addressEnd"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('address_space')}
            name="addressSpace"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={I18n('inuse')} valuePropName="checked" name="inuse">
            <Switch
              checkedChildren={I18n('yes')}
              unCheckedChildren={I18n('no')}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal></Modal>
    </>
  );
};

export default SegmentInfoModal;
