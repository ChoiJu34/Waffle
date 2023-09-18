import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {

  // 뒤로가기
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  // 이메일 입력 칸
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailComplete, setIsEmailComplete] = useState(false);
  const inputEmailRef = useRef(null);

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = (event) => {
    setIsEmailFocused(false);
    if (event.target.value === "") {
      setIsEmailComplete(false);
    } else {
      setIsEmailComplete(true);
    }
  };

  const showEmailPlaceholder = isEmailFocused && !inputEmailRef.current?.value

  // 비밀번호 입력 칸
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordComplete, setIsPasswordComplete] = useState(false);
  const inputPasswordRef = useRef(null);

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = (event) => {
    setIsPasswordFocused(false);
    if (event.target.value === "") {
      setIsPasswordComplete(false);
    } else {
      setIsPasswordComplete(true);
    }
  };

  const showPasswordPlaceholder = isPasswordFocused && !inputPasswordRef.current?.value

  // 비밀번호 확인 칸
  const [isPasswordVerifyFocused, setIsPasswordVerifyFocused] = useState(false);
  const [isPasswordVerifyComplete, setIsPasswordVerifyComplete] = useState(false);
  const inputPasswordVerifyRef = useRef(null);

  const handlePasswordVerifyFocus = () => {
    setIsPasswordVerifyFocused(true);
  };

  const handlePasswordVerifyBlur = (event) => {
    setIsPasswordVerifyFocused(false);
    if (event.target.value === "") {
      setIsPasswordVerifyComplete(false);
    } else {
      setIsPasswordVerifyComplete(true);
    }
  };

  const showPasswordVerifyPlaceholder = isPasswordVerifyFocused && !inputPasswordVerifyRef.current?.value

  // 생년월일 칸
  const [isBirthdateFocused, setIsBirthdateFocused] = useState(false);
  const [isBirthdateComplete, setIsBirthdateComplete] = useState(false);
  const inputBirthdateRef = useRef(null);

  const handleBirthdateFocus = () => {
    setIsBirthdateFocused(true);
  };

  const handleBirthdateBlur = (event) => {
    setIsBirthdateFocused(false);
    if (event.target.value === "") {
      setIsBirthdateComplete(false);
    } else {
      setIsBirthdateComplete(true);
    }
  };

  const showBirthdatePlaceholder = isBirthdateFocused && !inputBirthdateRef.current?.value

  return (
    <SignupWrapper>
      <div className="signup-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="signup-title">회원가입</div>
      <div className="signup-title-underline"></div>

      <div className={`signup-email ${isEmailFocused ? 'focus' : ''} ${isEmailComplete ? 'complete' : ''}`}>
        <label id="signup-label">이메일</label>
        <input type="text" id="signup-input" ref={inputEmailRef} onFocus={handleEmailFocus} onBlur={handleEmailBlur} placeholder={showEmailPlaceholder ? "ex) nutella@waffle.com" : ""} />
        <button className="signup-emailverify">인증</button>
      </div>

      <div className={`signup-password ${isPasswordFocused ? 'focus' : ''} ${isPasswordComplete ? 'complete' : ''}`}>
        <label id="signup-label">비밀번호</label>
        <input type="text" id="signup-input" ref={inputPasswordRef} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} placeholder={showPasswordPlaceholder ? "영문, 숫자, 특수문자를 포함한 8자리 이상" : ""} />
      </div>

      <div className={`signup-password-verify ${isPasswordVerifyFocused ? 'focus' : ''} ${isPasswordVerifyComplete ? 'complete' : ''}`}>
        <label id="signup-label">비밀번호 확인</label>
        <input type="text" id="signup-input" ref={inputPasswordVerifyRef} onFocus={handlePasswordVerifyFocus} onBlur={handlePasswordVerifyBlur} placeholder={showPasswordVerifyPlaceholder ? "" : ""} />
      </div>

      <div className={`signup-birthdate ${isBirthdateFocused ? 'focus' : ''} ${isBirthdateComplete ? 'complete' : ''}`}>
        <label id="signup-label">생년월일</label>
        <input type="text" id="signup-input" ref={inputBirthdateRef} onFocus={handleBirthdateFocus} onBlur={handleBirthdateBlur} placeholder={showBirthdatePlaceholder ? "" : ""} />
      </div>
    </SignupWrapper>
  )
}

const SignupWrapper = styled.div`
  min-height: 100vh;

  .signup-header {
    display: flex;
    margin: 3vh 2vh;
  }

  .signup-title {
    font-size: 4vh;
    margin-top: 3vh;
    margin-left: 3vh;
    text-align: left;
    color: #000004;
  }

  .signup-title-underline {
    height: 0.3vh;
    width: 80%;
    margin: 1.5vh auto;
    background-color: #000004;
  }

  .signup-email {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-email > input{
      display: block;
	  width: 80%;
	  color: #909090;
	  border:0;
	  border-bottom: 1px solid #8c8c8c;
	  background-color: transparent;
	  box-sizing: border-box;
	  border-radius: 0;
	  padding: 0;
	  height: 36px;
	  line-height: 1.33;
	  font-size: 18px;
	  font-family: inherit;
	  vertical-align: baseline;
	  -webkit-appearance: none;
	  overflow: visible;
  }

  .signup-email > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-email > label{
      top: 19vh;
      position: absolute;
      left: 9vh;
      max-width: 100%;
      height: 2.7em;
      line-height: 1.33;
      color: #909090;
      font-size: 18px;
      cursor: text;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: all .2s;
      pointer-events: none;
      -webkit-font-smoothing: antialiased;
      transform: translate3d(0, 3px, 0) scale(1);
      transform-origin: left top;
  }

  .signup-email.focus > label{
      top: 17vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .signup-email.complete > label{
      top: 17vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
  }

  input::placeholder {
    color: #90909061;
    font-size: 1.3vh;
  }

  .signup-emailverify {
    width: 5vh;
    margin-left: 1vh;
    border-radius: 13px;
    border: none;
    background-color: #9AC5F4;
    color: white;
    font-weight: 600;
    font-size: 1.5vh;
  }

  .signup-password {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-password > input{
    display: block;
	  width: 80%;
	  color: #909090;
	  border:0;
	  border-bottom: 1px solid #8c8c8c;
	  background-color: transparent;
	  box-sizing: border-box;
	  border-radius: 0;
	  padding: 0;
	  height: 36px;
	  line-height: 1.33;
	  font-size: 18px;
	  font-family: inherit;
	  vertical-align: baseline;
	  -webkit-appearance: none;
	  overflow: visible;
  }

  .signup-password > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-password > label{
      top: 27vh;
      position: absolute;
      left: 9vh;
      max-width: 100%;
      height: 2.7em;
      line-height: 1.33;
      color: #909090;
      font-size: 18px;
      cursor: text;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: all .2s;
      pointer-events: none;
      -webkit-font-smoothing: antialiased;
      transform: translate3d(0, 3px, 0) scale(1);
      transform-origin: left top;
  }

  .signup-password.focus > label{
      top: 25vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .signup-password.complete > label{
      top: 17vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
  }

  .signup-password-verify {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-password-verify > input{
    display: block;
	  width: 80%;
	  color: #909090;
	  border:0;
	  border-bottom: 1px solid #8c8c8c;
	  background-color: transparent;
	  box-sizing: border-box;
	  border-radius: 0;
	  padding: 0;
	  height: 36px;
	  line-height: 1.33;
	  font-size: 18px;
	  font-family: inherit;
	  vertical-align: baseline;
	  -webkit-appearance: none;
	  overflow: visible;
  }

  .signup-password-verify > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-password-verify > label{
      top: 35vh;
      position: absolute;
      left: 9vh;
      max-width: 100%;
      height: 2.7em;
      line-height: 1.33;
      color: #909090;
      font-size: 18px;
      cursor: text;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: all .2s;
      pointer-events: none;
      -webkit-font-smoothing: antialiased;
      transform: translate3d(0, 3px, 0) scale(1);
      transform-origin: left top;
  }

  .signup-password-verify.focus > label{
      top: 33vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .signup-password-verify.complete > label{
      top: 33vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
  }

  .signup-birthdate {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-birthdate > input{
    display: block;
	  width: 80%;
	  color: #909090;
	  border:0;
	  border-bottom: 1px solid #8c8c8c;
	  background-color: transparent;
	  box-sizing: border-box;
	  border-radius: 0;
	  padding: 0;
	  height: 36px;
	  line-height: 1.33;
	  font-size: 18px;
	  font-family: inherit;
	  vertical-align: baseline;
	  -webkit-appearance: none;
	  overflow: visible;
  }

  .signup-birthdate > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-birthdate > label{
      top: 43vh;
      position: absolute;
      left: 9vh;
      max-width: 100%;
      height: 2.7em;
      line-height: 1.33;
      color: #909090;
      font-size: 18px;
      cursor: text;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: all .2s;
      pointer-events: none;
      -webkit-font-smoothing: antialiased;
      transform: translate3d(0, 3px, 0) scale(1);
      transform-origin: left top;
  }

  .signup-birthdate.focus > label{
      top: 41vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .signup-birthdate.complete > label{
      top: 41vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
  }
`

export default Signup