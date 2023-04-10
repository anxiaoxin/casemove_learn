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
  Row,
  Col,
  Select,
} from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import AddIcon from '@/assets/images/add@2x.png';
import styles from './index.less';
import { addCo, updateCo } from '@/request';
import Province from '@/constants/province.json';
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
  id = '',
) => {
  try {
    const values = await form.validateFields();
    const ips = [...(values.otherIp || []).filter((item: string) => item)];
    values.emailIp && ips.unshift(values.emailIp);
    const params = {
      ...values,
      name: values.adminName,
      email: values.adminEmail,
      phoneNumber: values.adminPhone,
      emailIp: ips.join(','),
    };

    if (!data) {
      await addCo({ ...params, createUserId: id });
    } else {
      await updateCo({ ...data, ...params });
    }
    return Promise.resolve();
  } catch (errorInfo) {
    console.log('Failed:', errorInfo);
    return Promise.reject();
  }
};

const CoInfoModal = (props: CoInfoProps) => {
  const { data, visible, onChange } = props;
  const I18n = useI18n();
  const [_visible, setVisible] = useState(visible);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { info, reload } = useModel('user');

  const resetFields = () => {
    !data && form.resetFields();
  };

  useEffect(() => {
    if (data) {
      const [emailIp, ...otherIp] = data.emailIp?.split(',') || [];
      const res = {
        ...data,
        emailIp: emailIp,
        otherIp: otherIp,
      };
      form.setFieldsValue(res);
    }
  }, [data]);

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  const onOk = () => {
    setConfirmLoading(true);
    submit(form, data, info.id)
      .then(() => {
        onChange(false, true);
        setConfirmLoading(false);
        resetFields();
      })
      .catch(() => {
        setConfirmLoading(false);
      });
  };

  const onProvinceChange = (value: string) => {
    form.setFieldsValue({ province: value });
  };

  return (
    <>
      <Modal
        title={I18n(!data ? 'add_co' : 'update_co')}
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
        {data ? '' : <div>{I18n('add_co_tip')}</div>}
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label={I18n('co_id')}
            name="accountId"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('manager_name')}
            name="adminName"
            rules={[{ required: true, message: 'Please input', max: 70 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('email')}
            name="adminEmail"
            rules={[
              { required: true, message: 'Invalid email', type: 'email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('phone')}
            name="adminPhone"
            rules={[
              {
                required: true,
                message: 'Invalid phone number',
                pattern: /^1[3456789]\d{9}$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label={I18n('local_province')}
            name="province"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Select onChange={onProvinceChange} allowClear>
              {Province.map((item, index) => (
                <Option value={index + 1}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item> */}
          <Form.Item
            label={I18n('email_ip')}
            name="emailIp"
            rules={[
              {
                pattern:
                  /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,
                message: 'Invalid Ip',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.List name="otherIp">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div style={{ position: 'relative' }} key={key}>
                    <Form.Item
                      label={I18n('email_ip')}
                      name={name}
                      wrapperCol={{ span: 16 }}
                      rules={[
                        {
                          pattern:
                            /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,
                          message: 'Invalid Ip',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined
                      style={{ position: 'absolute', top: 8, right: 10 }}
                      onClick={() => remove(name)}
                    />
                  </div>
                ))}
                <Form.Item>
                  <Row>
                    <Col span={8}></Col>
                    <Col span={16}>
                      <Button
                        onClick={() => add()}
                        className={styles['add-button']}
                        type="link"
                        block
                        icon={
                          <img
                            style={{ width: 14, height: 14, marginRight: 4 }}
                            src={AddIcon}
                          />
                        }
                      >
                        {I18n('add_ip')}
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
      <Modal></Modal>
    </>
  );
};

export default CoInfoModal;
