import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'

const TeamAccountAddNew = () => {
  
  // 뒤로가기
  const navigate = useNavigate()

  const handleGoBack = () => {

    window.scrollTo(0, 0)

    navigate(-1);

  }

  // 이메일 입력 칸 애니메이션
  const [isCodeFocused, setIsCodeFocused] = useState(false);
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const inputCodeRef = useRef(null);

  const handleCodeFocus = () => {
    setIsCodeFocused(true);
  };

  const handleCodeBlur = (event) => {
    setIsCodeFocused(false);
    if (event.target.value === "") {
      setIsCodeComplete(false);
    } else {
      setIsCodeComplete(true);
    }
  };

  // 코드
  const [formData, setFormData] = useState({
    inviteCode: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
        const newData = { ...prevData, [name]: value };
        return newData;
    });
  }

  return (
    <LoginWrapper>
      <div className="teamaccount-add-code-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="teamaccount-add-code-title">초대코드를 받으셨나요?</div>
      <div className="teamaccount-add-code-title-underline"></div>

      <form>
        <div className={`login-email ${isCodeFocused ? 'focus' : ''} ${isCodeComplete ? 'complete' : ''}`} id="code-container">
          <label id="email-label">초대 코드</label>
          <input type="text" id="email-input" ref={inputCodeRef} onFocus={handleCodeFocus} onBlur={handleCodeBlur} value={formData.email} onChange={(e) => {handleChange(e)}} name="code"/>
        </div>
        <div className="add-button-container">
          <button className="add-button" type="submit">추가</button>
        </div>
      </form>

      <div className="teamaccount-add-code-underline"></div>
      <div className="teamaccount-add-code-extra">
        <div className="teamaccount-add-new"><StyledLink to="/teamaccount/add/new">새 통장 정보 등록하기</StyledLink></div>
      </div>

    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  min-height: 100vh;

  .teamaccount-add-code-header {
    display: flex;
    margin: 3vh 2vh;
  }

  .teamaccount-add-code-title {
    font-size: 3vh;
    margin-top: 3vh;
    margin-left: 3vh;
    text-align: left;
    color: #000004;
  }

  .teamaccount-add-code-title-underline {
    height: 0.3vh;
    width: 80%;
    margin: 1.5vh auto;
    background-color: #000004;
  }

  .login-email {
    padding: 2vh 7vh;
  }

  .login-email > input{
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

    .login-email > input:focus{
        outline:0;
        border-color:#76A8DE;
        border-width: 2px;
        color:#76A8DE;
    }

    .login-email > label{
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

    .login-email.focus > label{
        top: 17vh;
        left: 8vh;
        font-size: 12px;
        line-height: 1.33;
        color: #76A8DE;
    }

    .login-email.complete > label{
        top: 17vh;
        left: 8vh;
        font-size: 12px;
        line-height: 1.33;
    }

    .add-button {
      width: 10vh;
      height: 5vh;
      border-radius: 15px;
      border: none;
      background-color: #9AC5F4;
      color: white;
      font-weight: 800;
      font-size: 2.3vh;
      margin-top: 2vh;
    }

    .teamaccount-add-code-underline {
    height: 0.1vh;
    width: 80%;
    margin: 1.5vh auto;
    margin-top: 3vh;
    background-color: #000004;
  }

  .teamaccount-add-code-extra {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1vh 6vh;
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

export default TeamAccountAddNew