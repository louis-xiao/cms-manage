import { Form, Input, Button, message } from 'antd';
import {Link, useNavigate} from 'react-router-dom'
import './Less/Login.less'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import logo from '../assets/imgs/logo.png'
import { LoginApi } from '../request/api';

export default function Login() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log('Success:', values);
    LoginApi({
      username: values.username,
      password: values.password
    }).then(res=>{
      if(res.errCode===0){
        message.success(res.message)
        setTimeout(()=>{
          navigate('/')
        },1500)
      }else{
        message.error(res.message)
      }
    })
  };

 
  return (
    <div className="login">
      <div className="loginBox">
      <img src={logo}></img>
      <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名！' }]}
      >
        <Input prefix={<UserOutlined/>} size='large' placeholder='请输入用户名！'/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码！' }]}
      >
        <Input.Password prefix={<LockOutlined/>} size='large' placeholder='请输入密码！' />
      </Form.Item>
      <Form.Item>
        <Link to='/register'>还没账号？立即注册！</Link>
      </Form.Item>
      <Form.Item>
        <Button size='large' type="primary" htmlType="submit" block>
          登录
        </Button>
      </Form.Item>
    </Form>
      </div>
    </div>
  )
}
