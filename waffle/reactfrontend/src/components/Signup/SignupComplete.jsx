import React from 'react'
import styled from 'styled-components'
import 'animate.css'
import { useNavigate } from 'react-router-dom'
import SignupCompleteWaffle from '../../assets/SignupCompleteWaffle.png'


const SignupComplete = () => {

  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/user/login', { state: { from: 'fromComplete'}})
  }

  return (
    <SignupCompleteWrapper>
        <img className="animate__animated animate__rollIn signup-complete-waffle animate__slow" src={SignupCompleteWaffle} alt="SignupCompleteWaffle" />
        <div className="signup-complete-title">새 와플이 준비되었습니다!</div>
        <div className="signup-complete-content">
            다양한 취향을 더해
            <div className="signup-complete-content-spacer"></div>
            나만의 여행을 만들어보세요
        </div>
        <div className="login-button-container">
          <button className="login-button" onClick={goToLogin}>로그인</button>
        </div>
    </SignupCompleteWrapper>
  )
}

const SignupCompleteWrapper = styled.div`
  .signup-complete-waffle {
    margin-top: 15vh;
  }

  .signup-complete-title {
    font-size: 3.5vh;
    margin-top: 8vh;
  }

  .signup-complete-content {
    font-size: 2.5vh;
    margin-top: 5vh;
  }

  .signup-complete-content-spacer {
    height: 1.2vh;
  }

  .login-button {
      width: 11vh;
      height: 5vh;
      border-radius: 15px;
      border: none;
      background-color: #9AC5F4;
      color: white;
      font-weight: 800;
      font-size: 2.3vh;
      margin-top: 6vh; 
  }
`

export default SignupComplete