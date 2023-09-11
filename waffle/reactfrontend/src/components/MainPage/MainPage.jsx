import React from 'react'
import styled from 'styled-components';
import MainImg from '../../assets/MainImg.png'

const MainPage = () => {
  return (
      <MainPageWrapper>
        <img src={MainImg} className="main-img"/>
      </MainPageWrapper>
  )
}

const MainPageWrapper = styled.div`
  margin-top: 10px;

  .main-img {
    width: 100%;
  }
`
export default MainPage