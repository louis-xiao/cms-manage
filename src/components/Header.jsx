
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/imgs/logo.png'
import defaultAvatar from '../assets/imgs/defaultAvatar.jpg'
import { Menu, Dropdown, message } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

export default function Header() {

    const navigate = useNavigate()

    const [avatar,setAvatar] = useState(defaultAvatar)
    const [username,setUsername] = useState('游客')
    //模拟componnentdidMount
    useEffect(()=>{
        let avatar1 = localStorage.getItem('avatar')
        let username1 = localStorage.getItem('username')
        if(avatar1){
            setAvatar('http://47.93.114.103:6688/'+avatar1)
        }
        if(username1){
            setUsername(username1)
        }
    })

    const logout=()=> {
        localStorage.clear()
        message.success('退出成功！正在前往登录页...')
        setTimeout(()=>{
            navigate('/login')
        },1500)
    }

    const menu = (
        <Menu>
            <Menu.Item key={1}>修改资料</Menu.Item>
            <Menu.Divider />
            <Menu.Item key={2} onClick={logout}>退出登录</Menu.Item>
        </Menu>
    );

    return (
        <header>
            <img src={logo} className='logo' />
            <div className='right'>
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <img src={avatar} alt="" className='avatar' />
                        <span>{username}</span> <CaretDownOutlined />
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}
