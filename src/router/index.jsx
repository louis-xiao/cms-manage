import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'

import App from '../App'
import Edit from '../pages/Edit'
import ListList from '../pages/ListList'
import ListTable from '../pages/ListTable'
import Login from '../pages/Login'
import Means from '../pages/Means'
import Register from '../pages/Register'



export default function index() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route path='/listTable' element={<ListTable/>}></Route>
                <Route path='/listList' element={<ListList/>}></Route>
                <Route path='/edit' element={<Edit/>}></Route>
                <Route path='/edit/:id' element={<Edit/>}></Route>
                <Route path='/means' element={<Means/>}></Route>
            </Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
        </Routes>
    </Router>
  )
}
