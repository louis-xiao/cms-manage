import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { useState,useEffect } from 'react';

export default function Bread() {

    const {pathname} = useLocation()
    const [breadName,setbreadName] = useState('/list')

    useEffect(()=>{
        setbreadName(pathname.split('/')[1])
    },[pathname])

  return (
    <Breadcrumb>
    <Breadcrumb.Item href="/">
      <HomeOutlined />
    </Breadcrumb.Item>
    <Breadcrumb.Item href='/list'>
        {breadName}
    </Breadcrumb.Item>
  </Breadcrumb>
  )
}
