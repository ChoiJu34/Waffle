import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'

const FindEmail = () => {
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

  // 이메일 찾기 결과로 이동
  const findEmailResult = () => {
    axios.post('/user/find-email', formData)
      .then(response => {
        if (response.data.message === "SUCCESS") {
          navigate('/user/found-email', { state: { emailResult: response.data.email }})}
        else {
          alert('해당 정보로 가입된 사용자가 없습니다')
        }
      })
      .catch(error => {
        console.error('서버탓이야')
        alert('이메일 찾기 실패')
      })
  }



  return (
    <FindEmailWrapper>
      <div className="find-email-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="find-email-title">이메일 찾기</div>
      <div className="find-email-title-underline"></div>

      <div className={`find-email-name ${isNameFocused ? 'focus' : ''} ${isNameComplete ? 'complete' : ''}`} id="name-container">
        <label id="name-label">이름</label>
        <input type="text" id="name-input" ref={inputNameRef} onFocus={handleNameFocus} onBlur={handleNameBlur} onChange={handleName} value={formData.name}/>
      </div>
      <div className={`find-email-tel ${isTelFocused ? 'focus' : ''} ${isTelComplete ? 'complete' : ''}`}>
        <label id="find-email-tel-label">연락처</label>
        <input type="text" id="signup-input" ref={inputTelRef} onFocus={handleTelFocus} onBlur={handleTelBlur} onChange={handleTel} value={formData.tel}/>
      </div>

      <div className="find-email-button-container">
        <button className="find-email-button" onClick={findEmailResult}>이메일 찾기</button>
      </div>

      <div className="find-email-underline"></div>
      <div className="find-email-extra">
        <div className="find-email-find-email"><StyledLink to="/user/login">로그인</StyledLink></div>
        <div className="find-email-change-password"><StyledLink to="/user/find-password">비밀번호 찾기</StyledLink></div>
        <div className="find-email-signup"><StyledLink to="/user/sign-up">회원가입</StyledLink></div>
      </div>
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
        border-width: 0.5vw;
        color:#76A8DE;
    }

    .find-email-name > label{
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

    .find-email-name.focus > label{
      top: 44vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
        color: #76A8DE;
    }

    .find-email-name.complete > label{
      top: 44vw;
        left: 14vw;
        font-size: 3vw;
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
	    height: 10vw;
	    line-height: 1.33;
	    font-size: 5vw;
	    font-family: inherit;
	    vertical-align: baseline;
	    -webkit-appearance: none;
	    overflow: visible;
	    margin:0;
	}

    .find-email-tel > input:focus{
      outline:0;
        border-color:#76A8DE;
        border-width: 0.5vw;
        color:#76A8DE;
    }

    .find-email-tel > label{
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

    .find-email-tel.focus > label{
      top: 62vw;
        left: 14vw;
        font-size: 12px;
        line-height: 1.33;
        color: #76A8DE;
    }

    .find-email-tel.complete > label{
      top: 62vw;
        left: 14vw;
        font-size: 12px;
        line-height: 1.33;
    }

    .find-email-button {
      width: 34vw;
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
    margin: 1vw 14vw;
    font-size: 3.2vw;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:hover, &:active, &:visited {
    color: inherit;
  }
`;

export default FindEmail