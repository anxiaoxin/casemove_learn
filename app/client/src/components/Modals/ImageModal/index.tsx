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
import { addSub, updateSub, upsertImage, upsertSegment } from '@/request';
import { useModel } from 'umi';
import { PlatformType } from '@/constants';

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
    params = { ...params, ...values };
    console.log(111111, params);
    await upsertImage({
      ...params,
      platform: PlatformType[values.platform - 1],
    });
    return Promise.resolve();
  } catch (errorInfo) {
    console.log('Failed:', errorInfo);
    return Promise.reject();
  }
};

const ImageModal = (props: CoInfoProps) => {
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
        title={I18n(!data ? 'add_image' : 'update_image')}
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
            label={I18n('base_image_id')}
            name="baseImageId"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('company_id')}
            name="companyId"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('dtaas_image_id')}
            name="dtaasImageId"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('image_id')}
            name="imageId"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('mirror_name')}
            name="imageName"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('location')}
            name="location"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('os')}
            name="osType"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('os_version')}
            name="osVersion"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('platform')}
            name="platform"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Select>
              {PlatformType.map((item, index) => (
                <Option value={index + 1}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={I18n('software_id_list')}
            name="softwareIdList"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal></Modal>
    </>
  );
};

export default ImageModal;
