import { List, Button, Skeleton } from 'antd';
import { useState, useEffect } from 'react';
import { ArticleListApi } from '../request/api';
import moment from 'moment';
import { Pagination } from 'antd';

export default function ListList() {

    // const [data, setDate] = useState([])
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const getArticleListApi = (num) => {
        ArticleListApi({
            num,
            count:pageSize
        }).then(res => {
            if (res.errCode === 0) {
                let { arr,total,num,count } = res.data
                setList(arr)
                setTotal(total)
                setCurrent(num)
                setPageSize(count)
            }
        })
    }

    useEffect(() => {
        getArticleListApi(current)
    }, [])


    const onChange = (pages) => {
        getArticleListApi(pages);
      }

    return (
        <div className="list_table" style={{padding:'20px'}}>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button type='primary' key={1} onClick={()=>{console.log(item.id)}}>编辑</Button>,
                            <Button type='danger' key={2} onClick={()=>{console.log(item.id)}}>删除</Button>]}
                    >
                        <Skeleton loading={false} >
                            <List.Item.Meta
                                title={<a href="!#">{item.title}</a>}
                                description={item.subTitle}
                            />
                            <div><div>{moment(item.date).format("YYYY-MM-DD hh:mm:ss")}</div></div>
                        </Skeleton>
                    </List.Item>
                )}
            />

            <Pagination
             style={{float:'right',marginTop:'20px'}}
             onChange={onChange}
             defaultCurrent={1}
             total={total}
             current={current}
             pageSize={pageSize}
            />
        </div>
    )
}
