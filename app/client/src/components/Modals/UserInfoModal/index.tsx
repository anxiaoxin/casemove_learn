/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { StringIndexMap } from '@/type';
import useI18n from '@/utils/hooks/useI18n';
import { Modal, Form, Input, FormInstance, Select } from 'antd';
import { useEffect, useState } from 'react';
import { AddUser, GetRoles, UpdateUser } from '@/request';
import useChanged from '@/utils/hooks/useChanged';

const Option = Select.Option;
interface CoInfoProps {
  data?: StringIndexMap;
  visible?: boolean;
  onChange: (visible: boolean, saved?: boolean) => void;
}

const getRoles = async () => {
  try {
    const res = await GetRoles();
    return res.result;
  } catch (error) {
    return [];
  }
};

const submit = async (form: FormInstance, data: StringIndexMap | undefined) => {
  try {
    const values = await form.validateFields();
    const params = {
      ...values,
    };

    if (!data) {
      await AddUser(params);
    } else {
      await UpdateUser({ ...data, ...params });
    }
    return Promise.resolve();
  } catch (errorInfo) {
    console.log('Failed:', errorInfo);
    return Promise.reject();
  }
};

const UserInfoModal = (props: CoInfoProps) => {
  const { data, visible, onChange } = props;
  const I18n = useI18n();
  const [roles, setRoles] = useState<{ roleId: number; roleName: string }[]>(
    [],
  );
  const [_visible, setVisible] = useState(visible);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const resetFields = () => {
    !data && form.resetFields();
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data, roleId: +data.roleId });
    }
  }, [data]);

  useEffect(() => {
    setVisible(visible);
    if (visible) {
      getRoles().then((res) => {
        setRoles(res);
      });
    }
  }, [visible]);

  const onRoleChange = (value: string) => {
    form.setFieldsValue({ roleId: value });
  };

  const onOk = () => {
    setConfirmLoading(true);
    submit(form, data)
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
        title={I18n(!data ? 'add_user' : 'update_user')}
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
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label={I18n('user_name')}
            name="userName"
            rules={[{ required: true, message: 'Please input', max: 70 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('role')}
            name="roleId"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Select onChange={onRoleChange} allowClear>
              {roles.map((item) => (
                <Option value={item.roleId}>{item.roleName}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={I18n('it_code')}
            name="itCodeAmount"
            rules={[{ required: true, message: 'Please input' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={I18n('phone')}
            name="phone"
            rules={[
              {
                required: false,
                message: 'Invalid phone number',
                pattern: /^1[3456789]\d{9}$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserInfoModal;
