import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'

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

  // 이름 칸
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isNameComplete, setIsNameComplete] = useState(false);
  const inputNameRef = useRef(null);

  const handleNameFocus = () => {
    setIsNameFocused(true);
  };

  const handleNameBlur = (event) => {
    setIsNameFocused(false);
    if (event.target.value === "") {
      setIsNameComplete(false);
    } else {
      setIsNameComplete(true);
    }
  };

  const showNamePlaceholder = isNameFocused && !inputNameRef.current?.value

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

  // 생년월일 자동 하이픈 추가
  const handleBirthdate = () => {
    const value = inputBirthdateRef.current.value.replace(/\D+/g, "");
    const numberLength = 8;

    let result;
    result = "";  

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 4:
          result += "-";
          break;
        case 6:
          result += "-";
          break;

        default:
          break;
      }

      result += value[i];
    }

    inputBirthdateRef.current.value = result;

  };

  // 연락처 칸
  const [isTelFocused, setIsTelFocused] = useState(false);
  const [isTelComplete, setIsTelComplete] = useState(false);
  const inputTelRef = useRef(null);

  const handleTelFocus = () => {
    setIsTelFocused(true);
  };

  const handleTelBlur = (event) => {
    setIsTelFocused(false);
    if (event.target.value === "") {
      setIsTelComplete(false);
    } else {
      setIsTelComplete(true);
    }
  };

  const showTelPlaceholder = isTelFocused && !inputTelRef.current?.value

  // 연락처 자동 하이픈 추가
  const handleTel = () => {
    const value = inputTelRef.current.value.replace(/\D+/g, "");
    const numberLength = 11;

    let result;
    result = "";  

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;
        case 7:
          result += "-";
          break;

        default:
          break;
      }

      result += value[i];
    }

    inputTelRef.current.value = result;

  };

  //비밀번호, 비밀번호 확인
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')

  // 유효성 검사
  const [isName, setIsName] = useState(null)
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(null)
  const [isPasswordVerify, setIsPasswordVerify] = useState(null)
  const [isBirthdate, setIsBirthdate] = useState(null)
  const [isTel, setIsTel] = useState(null)

  // const onSubmit = useCallback(
  //   async (e) => {
  //     e.preventDefault()
  //     try {
  //       await axios
  //         .post(REGISTER_USERS_URL, {
  //           username: name,
  //           password: password,
  //           email: email,
  //         })
  //         .then((res) => {
  //           console.log('response:', res)
  //           if (res.status === 200) {
  //             navigate('/sign_up/profile_start')
  //           }
  //         })
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   },
  //   [email, name, password, navigate]
  // )

  // 이름
  const onChangeName = useCallback((e) => {
    const koreanNameRegex = /^[가-힣]+$/;

    if (e.target.value === "") {
        setIsName(null);
    } else if (!koreanNameRegex.test(e.target.value) || e.target.value.length < 2 || e.target.value.length > 5) {
        setIsName(false);
    } else {
        setIsName(true);
    }
  }, []);

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const emailCurrent = e.target.value

    if (!emailRegex.test(emailCurrent)) {
      setIsEmail(false)
    } else {
      setIsEmail(true)
    }
  }, [])

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (passwordCurrent === "") {
      setIsPassword(null);
    } else if (!passwordRegex.test(passwordCurrent)) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordVerify = useCallback(
    (e) => {
      const passwordVerifyCurrent = e.target.value
      setPasswordVerify(passwordVerifyCurrent)

      if (passwordVerifyCurrent === "") {
        setIsPasswordVerify(null);
      } else if (password === passwordVerifyCurrent) {
        setIsPasswordVerify(true);
      } else {
        setIsPasswordVerify(false);
      }
    },
    [password]
  )

  const onChangeBirthdate = useCallback((e) => {
    const birthdateRegex = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
    const birthdateCurrent = e.target.value;

    if (birthdateCurrent === "") {
      setIsBirthdate(null);
      return;
    } else if (!birthdateRegex.test(birthdateCurrent)) {
      setIsBirthdate(false);
      return;
    }

    const [year, month, day] = birthdateCurrent.split("-").map((str) => parseInt(str, 10))
  
    // 윤년 체크
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  
    // 각 월의 최대 일수를 저장
    const monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
    if (isLeapYear) {
      monthDays[2] = 29
    }
  
    // 해당 월의 일수보다 작거나 같은지 확인
    if (day <= monthDays[month]) {
      setIsBirthdate(true);
    } else {
      setIsBirthdate(false);
    }
}, []);

  // 연락처
  const onChangeTel = useCallback((e) => {
  const telRegex = /^01[016789]-\d{3,4}-\d{4}$/
  const telCurrent = e.target.value

  if (telCurrent === "") {
    setIsTel(null);
  } else if (!telRegex.test(telCurrent)) {
    setIsTel(false);
  } else {
    setIsTel(true);
  }
}, [])

  // Birthdate와 Tel onChange에 함수 두 개 넣기 위한 함수 세트 지정
  const functionSetBirthdate = (e) => {
    handleBirthdate(e);
    onChangeBirthdate(e);
  }

  const functionSetTel = (e) => {
    handleTel(e);
    onChangeTel(e);
  }

  return (
    <SignupWrapper>
      <div className="signup-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="signup-title">회원가입</div>
      <div className="signup-title-underline"></div>

      <div className={`signup-email ${isEmailFocused ? 'focus' : ''} ${isEmailComplete ? 'complete' : ''}`}>
        <label id="signup-label">이메일</label>
        <input type="text" id="signup-input" ref={inputEmailRef} onFocus={handleEmailFocus} onBlur={handleEmailBlur} onChange={onChangeEmail} placeholder={showEmailPlaceholder ? "ex) nutella@waffle.com" : ""} inputmode="email" />
        <button className="signup-emailverify">인증</button>
      </div>

      <div className={`signup-password ${isPasswordFocused ? 'focus' : ''} ${isPasswordComplete ? 'complete' : ''}`}>
        <label id="signup-label">비밀번호</label>
        <input type="password" id="signup-input" ref={inputPasswordRef} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} onChange={onChangePassword} placeholder={showPasswordPlaceholder ? "영문, 숫자, 특수문자를 포함한 8자리 이상" : ""} />
        {isPassword === null ? null : (isPassword ? <FontAwesomeIcon className="signup-correct" icon={faCheck} color="#9AC5F4" /> : <FontAwesomeIcon className="signup-wrong" icon={faTimes} color="red" />)}
      </div>

      <div className={`signup-password-verify ${isPasswordVerifyFocused ? 'focus' : ''} ${isPasswordVerifyComplete ? 'complete' : ''}`}>
        <label id="signup-label">비밀번호 확인</label>
        <input type="password" id="signup-input" ref={inputPasswordVerifyRef} onFocus={handlePasswordVerifyFocus} onBlur={handlePasswordVerifyBlur} onChange={onChangePasswordVerify} placeholder={showPasswordVerifyPlaceholder ? "" : ""} />
        {isPasswordVerify === null ? null : (isPasswordVerify ? <FontAwesomeIcon className="signup-correct" icon={faCheck} color="#9AC5F4" /> : <FontAwesomeIcon className="signup-wrong" icon={faTimes} color="red" />)}
      </div>

      <div className={`signup-name ${isNameFocused ? 'focus' : ''} ${isNameComplete ? 'complete' : ''}`}>
        <label id="signup-label">이름</label>
        <input type="text" id="signup-input" ref={inputNameRef} onFocus={handleNameFocus} onBlur={handleNameBlur} onChange={onChangeName} placeholder={showNamePlaceholder ? "ex) 이재용" : ""} />
        {isName === null ? null : (isName ? <FontAwesomeIcon className="signup-correct" icon={faCheck} color="#9AC5F4" /> : <FontAwesomeIcon className="signup-wrong" icon={faTimes} color="red" />)}
      </div>

      <div className={`signup-birthdate ${isBirthdateFocused ? 'focus' : ''} ${isBirthdateComplete ? 'complete' : ''}`}>
        <label id="signup-label">생년월일</label>
        <input type="text" id="signup-input" ref={inputBirthdateRef} onFocus={handleBirthdateFocus} onBlur={handleBirthdateBlur} onChange={functionSetBirthdate} placeholder={showBirthdatePlaceholder ? "ex) 19900101" : ""} inputmode="numeric" />
        {isBirthdate === null ? null : (isBirthdate ? <FontAwesomeIcon className="signup-correct" icon={faCheck} color="#9AC5F4" /> : <FontAwesomeIcon className="signup-wrong" icon={faTimes} color="red" />)}
      </div>

      <div className={`signup-tel ${isTelFocused ? 'focus' : ''} ${isTelComplete ? 'complete' : ''}`}>
        <label id="signup-label">연락처</label>
        <input type="text" id="signup-input" ref={inputTelRef} onFocus={handleTelFocus} onBlur={handleTelBlur} onChange={functionSetTel} placeholder={showTelPlaceholder ? "ex) 01012345678" : ""} />
        {isTel === null ? null : (isTel ? <FontAwesomeIcon className="signup-correct" icon={faCheck} color="#9AC5F4" /> : <FontAwesomeIcon className="signup-wrong" icon={faTimes} color="red" />)}
      </div>

      <div className="signup-button-container">
        <SignupButton className="signup-button" disabled={!(isEmail && isName && isBirthdate && isPassword && isPasswordVerify && isTel)}>가입하기</SignupButton>
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
    font-family: "돋움";
    font: small-caption;
    font-size: 3vh;
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
      top: 25vh;
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
    font-family: "돋움";
    font: small-caption;
    font-size: 3vh;
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

  .signup-name {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-name > input{
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

  .signup-name > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-name > label{
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

  .signup-name.focus > label{
      top: 41vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .signup-name.complete > label{
      top: 41vh;
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
      top: 51vh;
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
      top: 49vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .signup-birthdate.complete > label{
      top: 49vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
  }

  .signup-tel {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-tel > input{
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

  .signup-tel > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-tel > label{
      top: 59vh;
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

  .signup-tel.focus > label{
      top: 57vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .signup-tel.complete > label{
      top: 57vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
  }

  .signup-wrong {
    margin-left: 2vh;
    width: 3vh;
    height: 3vh;
  }

  .signup-correct {
    margin-left: 2vh;
    width: 3vh;
    height: 3vh;
  }
`

const SignupButton = styled.button`
  width: 12.5vh;
  height: 5vh;
  border-radius: 15px;
  border: none;
  background-color: #9AC5F4;
  color: white;
  font-weight: 800;
  font-size: 2.3vh;
  margin-top: 2vh;

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export default Signup