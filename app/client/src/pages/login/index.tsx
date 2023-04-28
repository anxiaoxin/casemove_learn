import React, { useEffect } from 'react';
import { Form, Button, Input } from "antd-mobile";
import SteamLogo from '../../../assets/images/logo_steam.svg';
import Loading from '@/components/loading/loding';
import { history, useModel } from 'umi';
import { PathName } from '@/constants';
import './index.less';

const Login = () => {
  const { haslogin, login, loading } = useModel('user');

  useEffect(() => {
    if (haslogin) {
      history.push(PathName.home);
    }
  }, [haslogin])

  const onFinish = (values:any) => {
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

