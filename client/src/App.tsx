import { FC } from 'react'
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'

import { GlobalStyles } from './component/GlobalStyles/GlobalStyles.styles'
import config from './config'
import Home from './page/Home/Home'
import Login from './page/Login/Login'
import Register from './page/Register/Register'


const App:FC = () => {
  return (
   <Container>
    <GlobalStyles />
    <Routes>
      <Route path={config.routePath.home} element={<Home />}/>
      <Route path={config.routePath.login} element={<Login />}/>
      <Route path={config.routePath.register} element={<Register />}/>
    </Routes>
   </Container>
  );
}

export default App;

const Container = styled.div`
  
`