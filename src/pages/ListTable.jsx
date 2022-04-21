/* eslint-disable react/prop-types */
import { Table, Button, Space } from 'antd';
import { useState, useEffect } from 'react';
import moment from 'moment';
// import { Link } from 'react-router-dom';
import './Less/List.less'
import { ArticleListApi } from '../request/api';


function MyTitle(props) {
  return (
    <div>
      <a to='/' className='table_title'
        href={'http://codesohigh.com:8765/article/' + props.id}
        target='_blank'
        rel="noreferrer"
      >{props.title}</a>
      <p style={{ color: '#999' }}>{props.subTitle}</p>
    </div>
  )
}

export default function List() {

  const [arr, setArr] = useState([])

  const [pagination, setPagination] = useState({ current: 1, pageSize: 6, total: 0 })


  const getArticleListApi = (current, pageSize) => {
    ArticleListApi({
      num: current,
      count: pageSize
    }).then(res => {
      if (res.errCode === 0) {
        // message.success(res.message)
        let { num, count, total } = res.data;
        setPagination({
          current: num,
          pageSize: count,
          total
        })

        let newArr = JSON.parse(JSON.stringify(res.data.arr))
        let myarr = []
        newArr.map(item => {
          let obj = {
            key: item.id,
            date: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
            mytitle: <MyTitle id={item.id} title={item.title} subTitle={item.subTitle} />
          }
          myarr.push(obj)
          // newArr.push(obj)
        })
        console.log(myarr)
        setArr(myarr)
      } 
    })
  }

  useEffect(() => {
    getArticleListApi(pagination.current,pagination.pageSize)
  }, [])

  const pageChange = (arg) => {
    getArticleListApi(arg.current, arg.pageSize)
  }

  const columns = [
    {
      dataIndex: 'mytitle',
      key: 'mytitle',
      width: '60%',
      render: text => <div>{text}</div>,
    },
    {
      dataIndex: 'date',
      key: 'date',
      render: (text) => (
        <div>{text}</div>
      )
    },
    {
      key: 'action',
      render: (text) => (
        <Space size="middle">
          <Button type="primary" onClick={() => console.log(text.key)}>编辑</Button>
          <Button type="danger" onClick={() => console.log(text.key)}>删除</Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="list_table">
      <Table
        showHeader={false}
        columns={columns}
        dataSource={arr}
        onChange={pageChange}
        pagination={pagination}
      />
    </div>
  )
}
