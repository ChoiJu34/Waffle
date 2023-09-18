import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const FindEmail = () => {

  // 뒤로가기
  const navigate = useNavigate()

  const handleGoBack = () => {
      navigate(-1);
  }

  return (
    <FindEmailWrapper>
      <div className="find-email-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="find-email-title">이메일 찾기</div>
      <div className="find-email-title-underline"></div>
    </FindEmailWrapper>
  )
}

const FindEmailWrapper = styled.div`
  min-height: 100vh;

.find-email-header {
  display: flex;
  margin: 3vh 2vh;
}

.find-email-title {
  font-size: 4vh;
  margin-top: 3vh;
  margin-left: 3vh;
  text-align: left;
  color: #000004;
}

.find-email-title-underline {
  height: 0.3vh;
  width: 80%;
  margin: 1.5vh auto;
  background-color: #000004;
}
`

export default FindEmail