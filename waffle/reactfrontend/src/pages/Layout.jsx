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
      <Outlet/>
      {!isUserRoute && <Footer/>}
    </SLayout>
  )
}

const SLayout = styled.div`
`

export default Layout