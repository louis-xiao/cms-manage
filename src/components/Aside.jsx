import { Menu } from 'antd';
import { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useEffect } from 'react';

export default function Aside() {

  const navigate = useNavigate()
  const location = useLocation()
  const [defaultKey,setDefaultKey] = useState('')
  const handleClick=(e)=>{
    navigate('/'+e.key)
    setDefaultKey(e.key)
  }

  useEffect(()=>{
    let path = location.pathname;
    let key = path.split('/')[1];
    setDefaultKey(key)
  },[])

  return (

    <Menu
      style={{ width: 256 }}
      selectedKeys={defaultKey}
      // defaultOpenKeys={['sub1']}
      mode="inline"
      theme='dark'
      onClick={handleClick}
    >
      <Menu.Item key="listTable"><AppstoreOutlined />  查看文章列表Table</Menu.Item>
      <Menu.Item key="listList"><AppstoreOutlined />  查看文章列表List</Menu.Item>
      <Menu.Item key="edit"><MailOutlined />  文章编辑</Menu.Item>
      <Menu.Item key="means"><SettingOutlined />  修改资料</Menu.Item>
    </Menu>


  )
}
