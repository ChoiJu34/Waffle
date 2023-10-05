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
    code: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
        const newData = { ...prevData, [name]: value };
        return newData;
    });
  }

  const token = localStorage.getItem('access_token')

  const headers = {
    "Authorization": "Bearer " + token
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    axios.put(`/team-account/add-invite`, formData, { headers: headers })
      .then(response => {
        console.log(response.data.message)
        if (response.data.message === 'SUCCESS') {
          navigate('/teamaccount/main')
        } else if (response.data.message === '만료된 코드입니다.') {
          alert('유효하지 않은 코드입니다.')
        } else  {
          alert('이미 등록되어있는 계좌입니다')
        }
      })
      .catch(error => {
        console.error('초대코드로 등록 실패');
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
          <input type="text" id="email-input" ref={inputCodeRef} onFocus={handleCodeFocus} onBlur={handleCodeBlur} value={formData.code} onChange={(e) => {handleChange(e)}} name="code"/>
        </div>
        <div className="add-button-container">
          <button className="add-button" type="submit" onClick={handleSubmit}>추가</button>
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
  min-width: 100vw;
  position: fixed;

  .teamaccount-add-code-header {
    display: flex;
    margin: 8vw 6vw;
  }

  .teamaccount-add-code-title {
    font-size: 6vw;
    margin-top: 3vw;
    margin-left: 8vw;
    text-align: left;
    color: #000004;
  }

  .teamaccount-add-code-title-underline {
    height: 0.7vw;
    width: 80vw;
    margin: 4vw auto;
    background-color: #000004;
  }

  .login-email {
    padding: 4vw 15vw;
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
	    height: 10vw;
	    line-height: 1.33;
	    font-size: 5vw;
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
      top: 45vw;
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

    .login-email.focus > label{
      top: 40vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
        color: #76A8DE;
    }

    .login-email.complete > label{
      top: 40vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
    }

    .add-button {
      width: 20vw;
      height: 11vw;
      border-radius: 15px;
      border: none;
      background-color: #9AC5F4;
      color: white;
      font-weight: 800;
      font-size: 5vw;
      margin-top: 5vw;
    }

    .teamaccount-add-code-underline {
      height: 0.1vw;
    width: 80%;
    margin: 5vw auto;
    margin-top: 7vw;
    background-color: #000004;
  }

  .teamaccount-add-code-extra {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1vw 14vw;
    font-size: 3.5vw;
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