import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const UpdateUserInfo = () => {

  const token = localStorage.getItem('access_token')

  const headers = {
    "Authorization": "Bearer " + token
  }

  // 현재 비밀번호를 제대로 입력했는지 확인

  const [currentPassword, setCurrentPassword] = useState({
      password: '',
  })

  const [isCorrectPassword, setIsCorrectPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPassword((prevData) => {
        const newData = { ...prevData, [name]: value };
        return newData;
    });
  }

  const verifyCorrectPassword = (e) => {
    e.preventDefault()

    axios.put('/user/verify-password', currentPassword, {headers: headers})
      .then(response => {
        console.log(response)
        if (response.data.message === "SUCCESS") {
        setIsCorrectPassword(true)
        } else {
          alert('비밀번호가 틀렸습니다')
        }
      })
      .catch(error => {
        console.error('서버탓이야')
        alert('서버탓입니다')
      })
  }

   // 뒤로가기
   const navigate = useNavigate()
   const location = useLocation()
 
   const handleGoBack = () => {
 
     window.scrollTo(0, 0)
 
       navigate(-1);
  }
 
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

  console.log(isCorrectPassword)

  return (
    <UpdateUserInfoWrapper>
    {isCorrectPassword ? (<>잘됨</>) : 
    (<>
    <div className="update-userinfo-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="update-userinfo-title">비밀번호 확인</div>
      <div className="update-userinfo-title-underline"></div>
 
      <div className={`signup-password ${isPasswordFocused ? 'focus' : ''} ${isPasswordComplete ? 'complete' : ''}`}>
        <label id="signup-label">비밀번호</label>
        <input type="password" id="signup-input" ref={inputPasswordRef} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} onChange={(e) => {handleChange(e)}} placeholder={showPasswordPlaceholder ? "영문, 숫자, 특수문자를 포함한 8자리 이상" : ""} name="password"/>
      </div>

      <div className="update-userinfo-button-container">
        <button className="update-userinfo-button" onClick={verifyCorrectPassword}>확인</button>
      </div>
      </>)}
    </UpdateUserInfoWrapper>
  )
}

const UpdateUserInfoWrapper = styled.div`
   min-height: 100vh;
 
   .update-userinfo-header {
     display: flex;
     margin: 3vh 2vh;
   }
 
   .update-userinfo-title {
     font-size: 4vh;
     margin-top: 3vh;
     margin-left: 3vh;
     text-align: left;
     color: #000004;
   }
 
   .update-userinfo-title-underline {
     height: 0.3vh;
     width: 80%;
     margin: 1.5vh auto;
     background-color: #000004;
   }
 
   .signup-password {
    padding: 3vh 7vh;
    display: flex;
  }

  .signup-password > input{
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

  .update-userinfo-button {
      width: 11vh;
      height: 5vh;
      border-radius: 15px;
      border: none;
      background-color: #9AC5F4;
      color: white;
      font-weight: 800;
      font-size: 2.3vh;
      margin-top: 2vh;
    }

  input::placeholder {
    color: #90909087;
    font-size: 1.3vh;
  }

`

export default UpdateUserInfo