import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useRef } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const VerifyEmail = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromState = location.state?.email || '';
  const nameFromState = location.state?.name || '';
  const birthdayFromState = location.state?.birthday || '';
  const telFromState = location.state?.tel || '';

  const handleGoBack = () => {

    window.scrollTo(0, 0)
    
    navigate('/user/sign-up', { state: { email: emailFromState, name: nameFromState, birthday: birthdayFromState, tel: telFromState } });
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/user/verify-token', { token: token });
      console.log(response.data)
      if (response.data.validation === "true") {
        navigate('/user/sign-up', { state: { email: emailFromState, name: nameFromState, birthday: birthdayFromState, tel: telFromState, isVerified: true } });
      } else {
        alert('인증 토큰이 일치하지 않습니다');
      }
    } catch (error) {
      alert('인증 토큰 확인 실패');
    }
  };

    // 이메일 입력 칸 애니메이션
    const [isTokenFocused, setIsTokenFocused] = useState(false);
    const [isTokenComplete, setIsTokenComplete] = useState(false);
    const inputTokenRef = useRef(null);
  
    const handleTokenFocus = () => {
      setIsTokenFocused(true);
    };
  
    const handleTokenBlur = (event) => {
      setIsTokenFocused(false);
      if (event.target.value === "") {
        setIsTokenComplete(false);
      } else {
        setIsTokenComplete(true);
      }
    };

  return (
    <VerifyEmailWrapper>
      <div className="verify-email-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="verify-email-title">이메일 확인</div>
      <div className="verify-email-title-underline"></div>

      <div className={`verify-email-token-input ${isTokenFocused ? 'focus' : ''} ${isTokenComplete ? 'complete' : ''}`} id="token-container">
        <input type="text" id="token-input" ref={inputTokenRef} onFocus={handleTokenFocus} onBlur={handleTokenBlur} onChange={(e) => {setToken(e.target.value)}}/>
      </div>
      <button className="verify-email-token-submit" onClick={handleSubmit}>인증하기</button>
      </VerifyEmailWrapper>
  );
}

const VerifyEmailWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;

  .verify-email-header {
    display: flex;
    margin: 8vw 6vw;
  }

  .verify-email-title {
    font-size: 10vw;
    margin-top: 3vw;
    margin-left: 8vw;
    text-align: left;
    color: #000004;
  }

  .verify-email-title-underline {
    height: 0.7vw;
    width: 80vw;
    margin: 4vw auto;
    background-color: #000004;
  }

  .verify-email-token-input {
    padding: 4vw 15vw;
    margin-top: 12vw;
    margin-bottom: 12vw;
  }

  .verify-email-token-input > input {
    display: block;
	    width: 100%;
	    color: #909090;
	    border:0;
	    border-bottom: 1px solid #8c8c8c;
	    background-color: transparent;
	    box-sizing: border-box;
	    border-radius: 0;
	    padding: 0;
	    height: 10vw;
	    line-height: 1.33;
	    font-size: 5vw;
	    font-family: inherit;
	    vertical-align: baseline;
	    -webkit-appearance: none;
	    overflow: visible;
	    margin:0;
  }

  .verify-email-token-input > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .verify-email-token-submit {
    width: 27vw;
      height: 11vw;
      border-radius: 15px;
      border: none;
      background-color: #9AC5F4;
      color: white;
      font-weight: 800;
      font-size: 5vw;
      margin-top: 5vw;
    }
`

export default VerifyEmail