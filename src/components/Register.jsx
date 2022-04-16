import { Form, Input, Button, message } from 'antd';
import {Link, useNavigate} from 'react-router-dom'
import {RegisterApi} from '../request/api'
import './Less/Login.less'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../assets/imgs/logo.png'

export default function Register() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Success:', values);
      RegisterApi({
        username: values.username,
        password: values.password
      })
      .then((res)=>{
        console.log('res',res)
        if(res.errCode===0){
          message.success(res.message)
          setTimeout(()=>{
            navigate('/login')
          },1500)
        }else{
          message.error(res.message)
        }
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  
  return (
    <div className="login">
      <div className="loginBox">
      <img src={logo}></img>
      <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined/>} size='large' placeholder='请再次确认密码！' />
      </Form.Item>

      <Form.Item>
        <Link to='/login'>已有账号？立即登录！</Link>
      </Form.Item>
      <Form.Item>
        <Button size='large' type="primary" htmlType="submit" block>
          注册
        </Button>
      </Form.Item>
    </Form>
      </div>
    </div>
  )
}
