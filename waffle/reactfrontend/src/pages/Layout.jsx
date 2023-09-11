import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'

import Header from '../components/Commons/Header/Header.jsx'
import Footer from '../components/Commons/Footer/Footer.jsx'
import { useSelector } from 'react-redux'

const Layout = () => {

  return (
    <SLayout>
      <Header/>
      <Outlet/>
      <Footer/>
    </SLayout>
  )
}

const SLayout = styled.div`
`

export default Layout