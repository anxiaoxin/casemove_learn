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
} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import AddIcon from '@/assets/images/add@2x.png';
import styles from './index.less';
import { addCo, addSub, batchAddSub, updateCo, updateSub } from '@/request';
import Province from '@/constants/province.json';
import { useModel } from 'umi';
import { CloudEntryType } from '@/constants';
import { update } from 'js-md5';

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
    const params = {
      ...values,
      cloudEntryType: values.cloudEntryType === 1 ? 'SYSTEM' : 'USER',
    };

    if (batch) {
      console.log(11111, values.file[0]);
      const formData = new FormData();
      formData.append('accessKeyId', params.accessKeyId);
      formData.append('accessKeySecret', params.accessKeySecret);
      formData.append('cloudEntryType', params.cloudEntryType);
      formData.append('domain', params.domain);
      formData.append('file', values.file[0].originFileObj);
      await batchAddSub(formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      if (data) {
        await updateSub({ ...data, ...params });
      } else {
        await addSub({ ...params });
      }
    }

    return Promise.resolve();
  } catch (errorInfo) {
    console.log('Failed:', errorInfo);
    return Promise.reject();
  }
};

const SubInfoModal = (props: CoInfoProps) => {
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

  const onTypeChange = (e: any) => {
    console.log(11111, e);
  };

  const onBatchChange = (e: CheckboxChangeEvent) => {
    setBatchAdd(e.target.checked);
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <Modal
        title={I18n(!data ? 'add_sub' : 'update_sub')}
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
        {!data && (
          <div style={{ marginBottom: 10 }}>
            <Checkbox onChange={onBatchChange}>批量添加</Checkbox>
          </div>
        )}
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
            label="accessKeyId"
            name="accessKeyId"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="accessKeySecret"
            name="accessKeySecret"
            rules={[{ required: true, message: 'Please input', max: 70 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('domain_id')}
            name="domain"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          {batchAdd && (
            <Form.Item
              name="file"
              label="file"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true }]}
              // extra="longgggggggggggggggggggggggggggggggggg"
            >
              <Upload name="logo" maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          )}
          {!batchAdd && (
            <>
              <Form.Item
                label={I18n('entity_name')}
                name="entityName"
                rules={[
                  {
                    required: true,
                    message: 'Please input',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={I18n('cloud_entry_type')}
                name="cloudEntryType"
                rules={[{ required: true, message: 'Please input' }]}
              >
                <Select onChange={onTypeChange}>
                  {CloudEntryType.map((item, index) => (
                    <Option value={index + 1}>{item}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={I18n('entity_identifier')}
                name="entityIdentifier"
                rules={[
                  {
                    required: true,
                    message: 'Please input',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
      <Modal></Modal>
    </>
  );
};

export default SubInfoModal;
