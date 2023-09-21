import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const FindEmail = () => {

  // 로그인, 비밀번호 변경으로 이동하기
  const navigate = useNavigate()
  const location = useLocation()

  const goToLogin = () => {
    navigate('/user/login', { state: { from: 'fromComplete'}})
  }

  const goToFindPassword = () => {
    navigate('/user/findPassword')
  }

  // 이메일 찾기 결과
  const emailResult = location.state.emailResult

  return (
    <FindEmailWrapper>
      <div className="found-email-header"></div>
      <div className="found-email-title">이메일 찾기</div>
      <div className="found-email-title-underline"></div>

      <div className="found-email-result">
        회원님이 가입한 이메일은
        <div className="found-email-result-spacer"></div>
        {emailResult}
        <div className="found-email-result-spacer"></div>
        입니다
      </div>

      <div className="found-email-button-container">
        <button className="found-email-button-login" onClick={goToLogin}>로그인</button>
        <button className="found-email-button-password" onClick={goToFindPassword}>비밀번호 변경</button>
      </div>
    </FindEmailWrapper>
  )
}

const FindEmailWrapper = styled.div`
  min-height: 100vh;

.found-email-header {
  display: flex;
  margin: 4.8vh 2vh;
}

.found-email-title {
  font-size: 4vh;
  margin-top: 3vh;
  margin-left: 3vh;
  text-align: left;
  color: #000004;
}

.found-email-title-underline {
  height: 0.3vh;
  width: 80%;
  margin: 1.5vh auto;
  background-color: #000004;
}

.found-email-result {
  font-size: 2.7vh;
  margin-top: 8vh;
}

.found-email-result-spacer {
  height: 1.5vh;
}

.found-email-button-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 6vh 3.5vh;
}

.found-email-button-login {
  width: 17vh;
  height: 5vh;
  border-radius: 15px;
  border: none;
  background-color: #9AC5F4;
  color: white;
  font-weight: 800;
  font-size: 2.3vh;
  margin-top: 2vh;
}

.found-email-button-password {
  width: 17vh;
  height: 5vh;
  border-radius: 15px;
  border: none;
  background-color: #b4b4b4;
  color: white;
  font-weight: 800;
  font-size: 2.3vh;
  margin-top: 2vh;
}

`

export default FindEmail