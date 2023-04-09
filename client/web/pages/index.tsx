import { Form, Button, Input } from 'antd-mobile';
import SteamCtrl, { LOGINTYPE } from './api/steam';

const steamCtrl = new SteamCtrl();

export default function Home() {
  const onFinish = (values: any) => {
    steamCtrl.login(LOGINTYPE.guard, values);
    console.log(values);
  } 
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>hello next</div>
        <Form
        layout='horizontal'
        onFinish={onFinish}
        footer={
          <Button block type='submit' color='primary' size='large'>
            提交
          </Button>
        }
      >
        <Form.Header>水平布局表单</Form.Header>
        <Form.Item
          name='accountName'
          label='用户名'
          rules={[{ required: true, message: '姓名不能为空' }]}
        >
          <Input onChange={console.log} placeholder='请输入姓名' />
        </Form.Item>
        <Form.Item
          name='password'
          label='密码'
          rules={[{ required: true, message: '姓名不能为空' }]}
        >
          <Input onChange={console.log} placeholder='请输入姓名' />
        </Form.Item>
        <Form.Item
          name='twoFactorCode'
          label='令牌'
          rules={[{ required: true, message: '姓名不能为空' }]}
        >
          <Input onChange={console.log} placeholder='请输入姓名' />
        </Form.Item>
        </Form>
    </main>
  )
}
