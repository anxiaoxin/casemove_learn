import React, { useEffect } from 'react';
import { Form, Button, Input, Modal } from "antd-mobile";
import SteamLogo from '../../../assets/images/logo_steam.svg';
import Loading from '@/components/loading/loding';
import { history, useModel } from 'umi';
import { PathName } from '@/constants';
import './index.less';
import { encode } from '@/utils';
import Cookies from 'js-cookie';

const Login = () => {
  const { haslogin, login, loading } = useModel('user');
  const [form] = Form.useForm()

  useEffect(() => {
    if (haslogin) {
      history.push(PathName.home);
    }
  }, [haslogin])

  useEffect(()=>{
    console.log('login page');
    const name = Cookies.get('name');
    if (name) {
      form.setFieldValue('accountName', name);
    }

    // if (!Cookies.get('noprompt')) {
      Modal.confirm({
        title: '声明',
        content: <div>
          1. 本站不会存储用户steam相关的任何信息，包括但不限于steam登录密码、令牌、steam用户信息、库存信息。
          <div></div>
          2. 本站不会分析用户的任何数据。
          <div></div>
          3. 非本人操作，不要使用令牌确认任何登录、交易操作。
          <div></div>
          4. 请在安全的网络环境中使用本站。
        </div>,
        cancelText: '不在提示',
        confirmText: '确定',
        onCancel: () => {
          Cookies.set('noprompt', '1');
        }
      })
    // }

  }, [])

  const onFinish = (values:any) => {
    values.password = encode(values.password);
    values.skey = encode(values.skey);
    values.twoFactorCode = encode(values.twoFactorCode);
    login(values);
  }

  return <>
    <div className='container'>
      <div className='app-logo-container'>
         CSGO TOOLS
      </div>

      <div className='login-card'>
        <div className='login-logo-container'>
          <img width={180} src={SteamLogo} alt="" />
          Connect to Steam
        </div>
        <Form
        layout='vertical'
        onFinish={onFinish}
        form={form}
        mode='card'
        footer={
          <Button block type='submit'
            style={{backgroundColor: 'rgb(79, 70, 225)', color: 'white', borderColor: 'rgb(79, 70, 225)'}}
            size='large'>
            登录
          </Button>
          }
        >
          <Form.Item
            name='accountName'
            label='Steam用户名'
            rules={[{ required: true, message: '用户名不能为空' }]}
          >
            <Input placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item
            name='password'
            label='Steam密码'
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input placeholder='请输入密码' type='password' />
          </Form.Item>
          <Form.Item
            name='skey'
            label='卡密'
            rules={[{ required: true, message: '请输入卡密' }]}
          >
            <Input placeholder='请输入卡密' />
          </Form.Item>
          <Form.Item
            name='twoFactorCode'
            label='令牌'
            rules={[{ required: true, message: '请输入令牌' }]}
          >
            <Input placeholder='请输入令牌' />
          </Form.Item>
        </Form>
      </div>
    </div>
    {loading && <Loading></Loading>}
  </>;
}

export default Login;

