import { Outlet } from 'react-router-dom'
import './assets/base.less'
import Header from './components/Header';
import Aside from './components/Aside';
import Bread from './components/Bread';
import { Layout } from 'antd';


export default function App() {
  return (
    <div>
      <Layout id="app">
        <Header />
          <div className="container">
            <Aside />
            <div className="container_box">
              <Bread />
              <div className="container_content">
                <Outlet />
              </div>
              
            </div>
          </div>
          <footer>Footer</footer>
      </Layout>
    </div>
  )
}
