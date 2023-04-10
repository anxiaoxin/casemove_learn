import { UserLogin } from "@/request";
import { Form, Button, Input } from "antd-mobile";

const Login = () => {
  const onFinish = (values:any) => {
    console.log(values);
    UserLogin(values).then(data => {
      console.log(111, data);
    })
  }

  return <>
    <Form
    layout='horizontal'
    onFinish={onFinish}
    footer={
      <Button block type='submit' color='primary' size='large'>
        登录
      </Button>
      }
    >
      <Form.Item
        name='accountName'
        label='姓名'
        rules={[{ required: true, message: '姓名不能为空' }]}
      >
        <Input placeholder='请输入姓名' />
      </Form.Item>
      <Form.Item
        name='password'
        label='密码'
        rules={[{ required: true, message: '姓名不能为空' }]}
      >
        <Input placeholder='请输入姓名' />
      </Form.Item>
      <Form.Item
        name='twoFactorCode'
        label='令牌'
        rules={[{ required: true, message: '姓名不能为空' }]}
      >
        <Input placeholder='请输入姓名' />
      </Form.Item>
    </Form>
  </>;
}

export default Login;
