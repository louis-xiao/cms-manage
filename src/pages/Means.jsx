import { Form, Input, Button, message, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Less/Means.less'
import { UserSearchApi,UserUpdateApi } from '../request/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default function Means() {

  const navigate = useNavigate()
  const [loading,setLoading ] = useState('')
  const [imageUrl,setImageUrl] = useState('')

  useEffect(()=>{
    UserSearchApi().then(res=>{
      if(res.errCode ===0){
        message.success(res.message)
      }else{
        message.error(res.message)
      }
    })

  })


  const onFinish =(values)=>{
    // console.log(values)
    let {username,password} = values
    if(values.username == localStorage.getItem('username')){
      UserUpdateApi({username,password}).then(res=>{
        console.log(res)
        if(res.errCode===0){
          message.success(res.message)
        }else{
          message.error(res.message)
        }
      })
    }
  }


  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(false)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
        setLoading(false)
        setImageUrl(imageUrl)
        localStorage.setItem('avatar',info.file.response.data.filePath)
        navigate('/means')
      }
      )
    }
  };


  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <div className='means_box'>
       <Form
      name="basic"
      style={{width: '400px'}}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder='Please input your username!'/>
      </Form.Item>

      <Form.Item
        label="  密  码  "
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder='Please input your username!'/>
      </Form.Item>

      
      <Form.Item >
        <Button type="primary" htmlType="submit" style={{float:'right'}} >
          提交
        </Button>
      </Form.Item>
    </Form>
    <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{'cms-token':localStorage.getItem('cms-token')}}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>

    </div>
  )
}
