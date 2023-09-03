import React from 'react'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import { Layout } from 'antd'
import './App.css'
//import 'antd/dist/antd.css'

import ContextProvider from '../../contexts'
import Navbar from '../Navbar'
import PrivateRoute from '../PrivateRoute'
import Home from '../../domains/Home'
import About from '../../domains/About'
import Login from '../../domains/Login'
import Logout from '../../domains/Logout'
import List from '../../domains/Articles/List'
import AddEdit from '../../domains/Articles/AddEdit'

// import DomainHome from '../../domains/Home'
// import DomainAbout from '../../domains/About'
// import DomainLogin from '../../domains/Login'
// import DomainLogout from '../../domains/Logout'

function App() {
  const { Header, Content, Footer} = Layout

  return (
    <ContextProvider>
      <BrowserRouter>
        <Header>
          <Navbar />
        </Header>
        <Content className='content-app'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/articles" element={<PrivateRoute />}>
              <Route path="" element={<List />} />
              <Route path="add-edit" element={<AddEdit />} >
                <Route path=":id" element={<AddEdit />} />
              </Route>
            </Route>
            <Route path="/users/me" element={<PrivateRoute />}>
              <Route path="" element={<About />} />
            </Route>
            <Route path="/logout" element={<PrivateRoute />}>
              <Route path="" element={<Logout />} />
            </Route>
          </Routes>
        </Content>
        <Footer>Footer is here!</Footer>
      </BrowserRouter>
    </ContextProvider>
  ) 
}

export default App
