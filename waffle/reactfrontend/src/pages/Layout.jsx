import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'

import Header from '../components/Header/Header'
import { useSelector } from 'react-redux'

const Layout = () => {

  return (
    <SLayout>
      <Header/>
      <Outlet/>
    </SLayout>
  )
}

const SLayout = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
`

export default Layout