import React, { useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import SignupCompleteWaffle from '../../assets/SignupCompleteWaffle.png'

const FindPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    tel: ''
  })

  // 뒤로가기
  const navigate = useNavigate()

  const handleGoBack = () => {

    window.scrollTo(0, 0)

    navigate('/user/login', { state: { from: 'fromComplete'}});
  }

  const location = useLocation()
  const isVerified = location.state?.isVerified || false;

  // 이메일 입력 칸
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailComplete, setIsEmailComplete] = useState(false);
  const inputEmailRef = useRef(null);

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = useCallback(() => {
    const emailValue = formData.email

    setIsEmailFocused(false);
    if (emailValue === "") {
      setIsEmailComplete(false);
    } else {
      setIsEmailComplete(true);
    }
  }, [formData.email]);

  const showEmailPlaceholder = isEmailFocused && !formData.email

  // 이름 입력 칸 애니메이션
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

  const handleName = (e) => {
    setFormData(prevState => ({
      ...prevState,
      name: e.target.value
    }))
  }
 
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

  // 연락처 자동 하이픈 추가
  const handleTel = (e) => {

    setFormData(prevState => ({
      ...prevState,
      tel: e.target.value
    }))

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

    // 이메일 유효성 검사

    const [isEmail, setIsEmail] = useState(false)

    const onChangeEmail = useCallback(() => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      const emailCurrent = formData.email
  
      if (!emailRegex.test(emailCurrent)) {
        setIsEmail(false)
      } else {
        setIsEmail(true)
      }
    }, [formData.email])

  // 인증 메일 보내고 토큰 입력 페이지로 이동
  const findEmailResult = (e) => {

    e.preventDefault()

    setLoading(true)

    axios.post('/user/find-password', formData)
      .then(response => {
        if (response.data.message === "SUCCESS") {
          alert('입력하신 메일로 인증코드가 전송되었습니다')
          navigate('/user/password-token', { state: { emailResult: response.data.email }})}
        else {
          alert('해당 정보로 가입된 사용자가 없습니다')
        }
      })
      .catch(error => {
        console.error('서버탓이야')
        alert('비밀번호 변경 실패')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
        const newData = { ...prevData, [name]: value };
        return newData;
    });
  }

  const functionSetEmail = (e) => {
    handleChange(e);
    onChangeEmail(e);
  }

  const [loading, setLoading] = useState(false)

  return (
    <FindEmailWrapper>
      <div className="find-email-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="find-email-title">비밀번호 찾기</div>
      <div className="find-email-title-underline"></div>

      <div className={`signup-email ${isEmailFocused ? 'focus' : ''} ${isEmailComplete ? 'complete' : ''}`}>
          <label id="signup-label">이메일</label>
          <input type="text" id="signup-input" ref={inputEmailRef} onFocus={handleEmailFocus} onBlur={handleEmailBlur} onChange={functionSetEmail}  inputmode="email" value={formData.email} name="email"/>
      </div>

      <div className={`find-email-name ${isNameFocused ? 'focus' : ''} ${isNameComplete ? 'complete' : ''}`} id="name-container">
        <label id="name-label">이름</label>
        <input type="text" id="name-input" ref={inputNameRef} onFocus={handleNameFocus} onBlur={handleNameBlur} onChange={handleName} value={formData.name}/>
      </div>
      <div className={`find-email-tel ${isTelFocused ? 'focus' : ''} ${isTelComplete ? 'complete' : ''}`}>
        <label id="find-email-tel-label">연락처</label>
        <input type="text" id="signup-input" ref={inputTelRef} onFocus={handleTelFocus} onBlur={handleTelBlur} onChange={handleTel} value={formData.tel}/>
      </div>

      <div className="find-email-button-container">
        <button className="find-email-button" onClick={findEmailResult}>이메일 인증</button>
      </div>

      <div className="find-email-underline"></div>
      <div className="find-email-extra">
        <div className="find-email-find-email"><StyledLink to="/user/login">로그인</StyledLink></div>
        <div className="find-email-change-password"><StyledLink to="/user/find-email">이메일 찾기</StyledLink></div>
        <div className="find-email-signup"><StyledLink to="/user/sign-up">회원가입</StyledLink></div>
      </div>

      {loading && (
      <LoadingOverlay>
        <LoadingImage className="animate__animated animate__bounce animate__slow animate__infinite" src={SignupCompleteWaffle} alt="LoadingWaffle" />
      </LoadingOverlay>
      )}

    </FindEmailWrapper>
  )
}

const FindEmailWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;

.find-email-header {
  display: flex;
    margin: 8vw 6vw;
}

.find-email-title {
  font-size: 10vw;
    margin-top: 3vw;
    margin-left: 8vw;
    text-align: left;
    color: #000004;
}

.find-email-title-underline {
  height: 0.7vw;
    width: 80vw;
    margin: 4vw auto;
    background-color: #000004;
}

.find-email-name {
  padding: 4vw 15vw;
  }

  .find-email-name > input{
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

    .find-email-name > input:focus{
        outline:0;
        border-color:#76A8DE;
        border-width: 2px;
        color:#76A8DE;
    }

    .find-email-name > label{
      top: 67vw;
        position: absolute;
        left: 16vw;
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

    .find-email-name.focus > label{
      top: 62vw;
        left: 14vw;
        font-size: 12px;
        line-height: 1.33;
        color: #76A8DE;
    }

    .find-email-name.complete > label{
      top: 62vw;
        left: 14vw;
        font-size: 12px;
        line-height: 1.33;
    }

    .find-email-tel {
      padding: 4vw 15vw;
  }

  .find-email-tel > input{
	    display: block;
	    width: 100%;
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
	    margin:0;
	}

    .find-email-tel > input:focus{
        outline:0;
        border-color:#76A8DE;
        border-width: 2px;
        color:#76A8DE;
    }

    .find-email-tel > label{
      top: 85vw;
        position: absolute;
        left: 16vw;
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

    .find-email-tel.focus > label{
      top: 80vw;
        left: 14vw;
        font-size: 12px;
        line-height: 1.33;
        color: #76A8DE;
    }

    .find-email-tel.complete > label{
      top: 80vw;
        left: 14vw;
        font-size: 12px;
        line-height: 1.33;
    }

    .find-email-button {
      width: 35vw;
      height: 11vw;
      border-radius: 15px;
      border: none;
      background-color: #9AC5F4;
      color: white;
      font-weight: 800;
      font-size: 5vw;
      margin-top: 5vw;
    }

    .find-email-underline {
    height: 0.1vw;
    width: 80%;
    margin: 5vw auto;
    margin-top: 7vw;
    background-color: #000004;
  }

  .find-email-extra {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1vw 17vw;
    font-size: 3.2vw;
  }

  .signup-email {
    padding: 4vw 15vw;
    display: flex;
  }

  .signup-email > input{
    display: block;
	  width: 100%;
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
    top: 49vw;
        position: absolute;
        left: 16vw;
        max-width: 100%;
        height: 2.7em;
        line-height: 1.33;
        color: #909090;
        font-size: 4.5vw;
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
    top: 44vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
        color: #76A8DE;
  }

  .signup-email.complete > label{
    top: 44vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:hover, &:active, &:visited {
    color: inherit;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingImage = styled.img`
  width: 20vh;
  height: 20vh;
`;

export default FindPassword