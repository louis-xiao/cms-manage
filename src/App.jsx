import { Outlet } from 'react-router-dom'
import './assets/base.less'
import Header from './components/Header';

import { Layout } from 'antd';

const { Sider, Content } = Layout;

export default function App() {
  return (
    <div>
      <Layout>
        <Header />
        <Layout>
          <Sider>Sider</Sider>
          <Content><Outlet /></Content>
        </Layout>
        <footer>Footer</footer>
      </Layout>
    </div>
  )
}
