import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const FindEmail = () => {

  // 뒤로가기
  const navigate = useNavigate()

  const handleGoBack = () => {

    window.scrollTo(0, 0)
    
    navigate(-1);
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

  // 이메일 찾기 결과로 이동
  const goToFindEmailResult = () => {
    navigate('/user/found-email')
  }

  return (
    <FindEmailWrapper>
      <div className="find-email-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="find-email-title">이메일 찾기</div>
      <div className="find-email-title-underline"></div>

      <div className={`find-email-name ${isNameFocused ? 'focus' : ''} ${isNameComplete ? 'complete' : ''}`} id="name-container">
        <label id="name-label">이름</label>
        <input type="text" id="name-input" ref={inputNameRef} onFocus={handleNameFocus} onBlur={handleNameBlur}/>
      </div>
      <div className={`find-email-tel ${isTelFocused ? 'focus' : ''} ${isTelComplete ? 'complete' : ''}`}>
        <label id="find-email-tel-label">연락처</label>
        <input type="text" id="signup-input" ref={inputTelRef} onFocus={handleTelFocus} onBlur={handleTelBlur} onChange={handleTel}/>
      </div>

      <div className="find-email-button-container">
        <button className="find-email-button" onClick={goToFindEmailResult}>이메일 찾기</button>
      </div>

      <div className="find-email-underline"></div>
      <div className="find-email-extra">
        <div className="find-email-find-email"><StyledLink to="/user/login">로그인</StyledLink></div>
        <div className="find-email-change-password">비밀번호 변경</div>
        <div className="find-email-signup"><StyledLink to="/user/sign-up">회원가입</StyledLink></div>
      </div>
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

.find-email-name {
    padding: 2vh 7vh;
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
	    height: 36px;
	    line-height: 1.33;
	    font-size: 18px;
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

    .find-email-name.focus > label{
        top: 17vh;
        left: 8vh;
        font-size: 12px;
        line-height: 1.33;
        color: #76A8DE;
    }

    .find-email-name.complete > label{
        top: 17vh;
        left: 8vh;
        font-size: 12px;
        line-height: 1.33;
    }

    .find-email-tel {
    padding: 2vh 7vh;
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

    .find-email-tel.focus > label{
        top: 25vh;
        left: 8vh;
        font-size: 12px;
        line-height: 1.33;
        color: #76A8DE;
    }

    .find-email-tel.complete > label{
        top: 25vh;
        left: 8vh;
        font-size: 12px;
        line-height: 1.33;
    }

    .find-email-button {
      width: 15vh;
      height: 5vh;
      border-radius: 15px;
      border: none;
      background-color: #9AC5F4;
      color: white;
      font-weight: 800;
      font-size: 2.3vh;
      margin-top: 2vh;
    }

    .find-email-underline {
    height: 0.1vh;
    width: 80%;
    margin: 1.5vh auto;
    margin-top: 3vh;
    background-color: #000004;
  }

  .find-email-extra {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1vh 8vh;
    font-size: 1.4vh;
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