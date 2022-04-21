import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { PageHeader, Button, Modal, Form, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import moment from 'moment';
// import MyEditor from '../components/MyEditor';
import { useForm } from 'antd/lib/form/Form';
import { ArticleAddApi, ArticleSearchApi, ArticleUpdateApi } from '../request/api';

export default function Edit() {

  const params = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  // const [content, setContent] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm()
  const showModal = () => {
    setIsModalVisible(true);
  };

  const dealData =(errCode,msg) =>{
    setIsModalVisible(false)
    if(errCode===0){
      message.success(msg)
      setTimeout(()=>{
        navigate('/listList')
      },1000)
    }else{
      message.error(msg)
    }
  }

  const handleOk = () => {
    // setIsModalVisible(false);
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        let { title, subTitle } = values;
        if (params.id) {
          ArticleUpdateApi({
            title,
            subTitle,
            content:html,
            id: params.id
          }).then(res => {
            dealData(res.errCode, res.message)
          })
        } else {
          ArticleAddApi({ title, subTitle, content:html })
            .then(res => {
              dealData(res.data, res.message)
            })
        }

        // ArticleAddApi({
        //   title: title,
        //   subTitle: subTitle,
        //   content: html
        // }).then(res => {
        //   if (res.errCode === 0) {
        //     message.success(res.message)
        //     setTimeout(() => {
        //       navigate('/listList')
        //     }, 1000)
        //   } else {
        //     message.error(res.message)
        //   }
        // })
        // console.log(title, subTitle, html)

      })
      .catch(() => {
        return;
      });

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let [editor, setEditor] = useState(null) // 存储 editor 实例
  const [html, setHtml] = useState('') // 编辑器内容

  const toolbarConfig = {}
  const editorConfig = {
    placeholder: '请输入内容...',
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    if(params.id){
      ArticleSearchApi({id:params.id}).then((res)=>{
        if(res.errCode===0){
          setHtml(res.data.content)
          setTitle(res.data.title)
          setSubTitle(res.data.subTitle)
        }
      })
    }

    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="文章编辑"
        subTitle={'当前日期 : ' + moment(new Date()).format('YYYY-MM-DD')}
        extra={
          <Button key="1" type="primary" onClick={showModal}>
            提交修改
          </Button>
        }
      >
      </PageHeader>
      <div style={{ padding: '10px', background: '#fff' }}>
        <div>
          <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode="default"
              style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
              defaultConfig={editorConfig}
              value={html}
              onCreated={setEditor}
              onChange={editor => setHtml(editor.getHtml())}
              mode="default"
              style={{ height: '500px', 'overflowY': 'hidden' }}
            />
          </div>
          <div style={{ marginTop: '15px' }}>
            {html}
          </div>
          <div />
        </div>
        <Modal title="文章编辑" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText='提交' cancelText='取消'>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            autoComplete="off"
            initialValues={{title,subTitle}}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: 'Please input title!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="副标题"
              name="subTitle"
              rules={[{ message: 'Please input subtitle!' }]}
            >
              <Input />
            </Form.Item>

          </Form>
        </Modal>
      </div>
    </div>
  )
}

