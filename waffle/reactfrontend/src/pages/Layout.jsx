import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { styled } from 'styled-components'

import Header from '../components/Commons/Header/Header.jsx'
import Footer from '../components/Commons/Footer/Footer.jsx'
import { useSelector } from 'react-redux'

const Layout = () => {

  const location = useLocation();
  const isUserRoute = /^\/user\//.test(location.pathname);

  return (
    <SLayout>
      {!isUserRoute && <Header/>}
      <SContent isUserRoute={isUserRoute}>
        <Outlet/>
      </SContent>
      {!isUserRoute && <Footer/>}
    </SLayout>
  )
}

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const SContent = styled.div`
  flex: 1;
  margin-top: ${(props) => (props.isUserRoute ? '0' : '6vh')};
`

export default Layout