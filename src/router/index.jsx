import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'

import App from '../App'
import Edit from '../components/Edit'
import List from '../components/List'
import Login from '../components/Login'
import Means from '../components/Means'
import Register from '../components/Register'



export default function index() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route path='/list' element={<List/>}></Route>
                <Route path='/edit' element={<Edit/>}></Route>
                <Route path='/means' element={<Means/>}></Route>
            </Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
        </Routes>
    </Router>
  )
}
