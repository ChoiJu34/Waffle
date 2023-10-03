import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const UpdateUserInfo = () => {

  const [userData, setUserData] = useState({
    newName: null,
    newTel: null,
    newPassword: null
  })

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
 
  useEffect (() => {
    onChangeName()
    handleNameBlur()
    onChangeTel()
    handleTelBlur()
  }, [])

  useEffect (() => {
    onChangeName()
  }, [userData.newName])

  useEffect (() => {
    onChangeTel()
  }, [userData.newTel])

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

  // 현재 로그인 중인 사용자의 정보 불러오기

  useEffect (() => {
    axios.get('/user', {headers: headers})
    .then(response => {
      setUserData({
        newName: response.data.result.name,
        newTel: response.data.result.tel,
      })
    })
    .catch(error => {
      console.log('못불러옴')
    })
  }, [])

  // 이름 칸
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isNameComplete, setIsNameComplete] = useState(false);
  const inputNameRef = useRef(null);

  const handleNameFocus = () => {
    setIsNameFocused(true);
  };

  const handleNameBlur = useCallback(() => {

    const nameValue = userData.newName
    setIsNameFocused(false);
    if (nameValue === "") {
      setIsNameComplete(false);
    } else {
      setIsNameComplete(true);
    }
  }, [userData.newName]);

  const showNamePlaceholder = isNameFocused && !inputNameRef.current?.value

  const [isName, setIsName] = useState(null)

  const onChangeName = () => {
    const koreanNameRegex = /^[가-힣]+$/;
    const nameCurrent = userData.newName

    if (nameCurrent === "") {
        setIsName(null);
    } else if (!koreanNameRegex.test(nameCurrent) || nameCurrent.length < 2 || nameCurrent.length > 5) {
        setIsName(false);
    } else {
        setIsName(true);
    }
  };

  // 연락처 칸
  const [isTelFocused, setIsTelFocused] = useState(false);
  const [isTelComplete, setIsTelComplete] = useState(false);
  const inputTelRef = useRef(null);

  const handleTelFocus = () => {
    setIsTelFocused(true);
  };

  const handleTelBlur = useCallback(() => {

    const telValue = userData.newTel
    setIsTelFocused(false);
    if (telValue === "") {
      setIsTelComplete(false);
    } else {
      setIsTelComplete(true);
    }
  }, [userData.newTel]);

  const showTelPlaceholder = isTelFocused && !inputTelRef.current?.value

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

  const [isTel, setIsTel] = useState(null)

  const onChangeTel = useCallback(() => {
    const telRegex = /^01[016789]-\d{3,4}-\d{4}$/
    const telCurrent = userData.newTel
  
    if (telCurrent === "") {
      setIsTel(null);
    } else if (!telRegex.test(telCurrent)) {
      setIsTel(false);
    } else {
      setIsTel(true);
    }
  }, [userData.newTel])
  
  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
        const newData = { ...prevData, [name]: value };
        return newData;
    });
  }

  const functionSetTel = (e) => {
    handleTel(e);
    onChangeTel(e);
    handleChangeInfo(e);
  }

  // 비밀번호 입력 칸
  // 기본적인 코드는 이미 위에 있음

  const [isPassword, setIsPassword] = useState(null)

  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value

    if (passwordCurrent === "") {
      setIsPassword(null);
    } else if (!passwordRegex.test(passwordCurrent)) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  }, []);

  // 정보 수정
  const handleSubmit = (e) => {
    e.preventDefault()

    axios.put('/user/update-user', userData, {headers: headers})
      .then(response => {
        if (response.data.message === "SUCCESS") {
        alert('회원 정보가 변경되었습니다')
        navigate('/mypage/checklist')
        } else {
          alert('정보 변경에 실패했습니다')
        }
      })
      .catch(error => {
        console.error('서버탓이야')
        alert('서버탓임')
      })
  }

  console.log(userData)

  return (
    <UpdateUserInfoWrapper>
    {isCorrectPassword ? (
      <>
        <div className="update-userinfo-title">회원정보 변경</div>
        <div className="update-userinfo-title-underline"></div>

        <form>

        <div className={`update-userinfo-name ${isNameFocused ? 'focus' : ''} ${isNameComplete ? 'complete' : ''}`}>
          <label id="signup-label">이름</label>
          <input type="text" id="signup-input" ref={inputNameRef} onFocus={handleNameFocus} onBlur={handleNameBlur} onChange={(e) => {onChangeName(e); handleChangeInfo(e)}} placeholder={showNamePlaceholder ? "ex) 이재용" : ""} value={userData.newName} name="newName"/>
        </div>

        <div className={`update-userinfo-tel ${isTelFocused ? 'focus' : ''} ${isTelComplete ? 'complete' : ''}`}>
          <label id="signup-label">연락처</label>
          <input type="text" id="signup-input" ref={inputTelRef} onFocus={handleTelFocus} onBlur={handleTelBlur} onChange={functionSetTel} placeholder={showTelPlaceholder ? "ex) 01012345678" : ""} value={userData.newTel} name="newTel"/>
        </div>

        <div className={`update-userinfo-password-for-update ${isPasswordFocused ? 'focus' : ''} ${isPasswordComplete ? 'complete' : ''}`}>
          <label id="signup-label">비밀번호</label>
          <input type="password" id="signup-input" ref={inputPasswordRef} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} onChange={(e) => {onChangePassword(e); handleChangeInfo(e)}} placeholder={showPasswordPlaceholder ? "영문, 숫자, 특수문자를 포함한 8자리 이상" : ""} value={userData.newPassword} name="newPassword"/>
        </div>

        <div className="update-userinfo-button-container">
          <SignupButton type="submit" className="signup-button" disabled={!(isName && isPassword && isTel)} onClick={handleSubmit}>변경하기</SignupButton>
        </div>
      </form>
      </>
    ) : (
      <>
      <div className="update-userinfo-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
        <div className="update-userinfo-title">비밀번호 확인</div>
        <div className="update-userinfo-title-underline"></div>
  
        <div className={`update-userinfo-password ${isPasswordFocused ? 'focus' : ''} ${isPasswordComplete ? 'complete' : ''}`}>
          <label id="signup-label">비밀번호</label>
          <input type="password" id="signup-input" ref={inputPasswordRef} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} onChange={(e) => {handleChange(e)}} placeholder={showPasswordPlaceholder ? "영문, 숫자, 특수문자를 포함한 8자리 이상" : ""} name="password"/>
        </div>

        <div className="update-userinfo-button-container">
          <button className="update-userinfo-button" onClick={verifyCorrectPassword}>확인</button>
        </div>
        </>
      )}
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
 
   .update-userinfo-password {
    padding: 3vh 7vh;
    display: flex;
  }

  .update-userinfo-password > input{
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

  .update-userinfo-password > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .update-userinfo-password > label{
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

  .update-userinfo-password.focus > label{
      top: 25vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .update-userinfo-password.complete > label{
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

  .update-userinfo-name {
    padding: 2vh 7vh;
    display: flex;
  }

  .update-userinfo-name > input{
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

  .update-userinfo-name > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .update-userinfo-name > label{
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

  .update-userinfo-name.focus > label{
      top: 17vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .update-userinfo-name.complete > label{
      top: 17vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
  }

  .update-userinfo-tel {
    padding: 2vh 7vh;
    display: flex;
  }

  .update-userinfo-tel > input{
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

  .update-userinfo-tel > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .update-userinfo-tel > label{
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

  .update-userinfo-tel.focus > label{
      top: 25vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .update-userinfo-tel.complete > label{
      top: 25vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
  }

  .update-userinfo-password-for-update {
    padding: 3vh 7vh;
    display: flex;
  }

  .update-userinfo-password-for-update > input{
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

  .update-userinfo-password-for-update > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .update-userinfo-password-for-update > label{
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

  .update-userinfo-password-for-update.focus > label{
      top: 33vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .update-userinfo-password-for-update.complete > label{
      top: 33vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
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

export default UpdateUserInfo