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
        <div className="update-userinfo-title-inner">회원정보 변경</div>
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
          <label id="signup-label">새 비밀번호</label>
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
   min-width: 100vw;
   position: fixed;
 
   .update-userinfo-header {
     display: flex;
     margin: 8vw 6vw;
   }
 
   .update-userinfo-title {
    font-size: 10vw;
    margin-top: 3vw;
    margin-left: 8vw;
    text-align: left;
    color: #000004;
   }

   .update-userinfo-title-inner {
    font-size: 10vw;
    margin-top: 11vw;
    margin-left: 8vw;
    text-align: left;
    color: #000004;
   }
 
   .update-userinfo-title-underline {
    height: 0.7vw;
    width: 80vw;
    margin: 4vw auto;
    background-color: #000004;
   }
 
   .update-userinfo-password {
    padding: 4vw 15vw;
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
	    height: 10vw;
	    line-height: 1.33;
	    font-size: 5vw;
	    font-family: inherit;
	    vertical-align: baseline;
	    -webkit-appearance: none;
	    overflow: visible;
	    margin:0;
            /* type:password가 사용자 지정 폰트를 지원하지 않아 출력되지 않았으므로 여기서만 새로 지정 */
      /* 단순히 돋움으로만 설정해두면 점 간격이 고르지 않아, 추가 작업 필요 */
      font-family: "돋움";
      font: small-caption;
      font-size: 7vw;
  }

  .update-userinfo-password > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .update-userinfo-password > label{
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

  .update-userinfo-password.focus > label{
    top: 44vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
        color: #76A8DE;
      color: #76A8DE;
  }

  .update-userinfo-password.complete > label{
    top: 44vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
        color: #76A8DE;
  }

  .update-userinfo-button {
    width: 24vw;
      height: 11vw;
      border-radius: 15px;
      border: none;
      background-color: #9AC5F4;
      color: white;
      font-weight: 800;
      font-size: 5vw;
      margin-top: 5vw;
    }

  input::placeholder {
    color: #90909087;
    font-size: 4vw;
  }

  .update-userinfo-name {
    padding: 4vw 15vw;
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
	    height: 10vw;
	    line-height: 1.33;
	    font-size: 5vw;
	    font-family: inherit;
	    vertical-align: baseline;
	    -webkit-appearance: none;
	    overflow: visible;
	    margin:0;
  }

  .update-userinfo-name > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .update-userinfo-name > label{
      top: 38vw;
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

  .update-userinfo-name.focus > label{
    top: 31vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
  }

  .update-userinfo-name.complete > label{
    top: 31vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
  }

  .update-userinfo-tel {
    padding: 4vw 15vw;
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
    top: 54vw;
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

  .update-userinfo-tel.focus > label{
    top: 48vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
      color: #76A8DE;
  }

  .update-userinfo-tel.complete > label{
    top: 48vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
  }

  .update-userinfo-password-for-update {
    padding: 4vw 15vw;
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
    font-size: 7vw;
  }

  .update-userinfo-password-for-update > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .update-userinfo-password-for-update > label{
    top: 71vw;
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

  .update-userinfo-password-for-update.focus > label{
    top: 66vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
      color: #76A8DE;
  }

  .update-userinfo-password-for-update.complete > label{
    top: 66vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
  }
`

const SignupButton = styled.button`
      width: 30vw;
      height: 11vw;
      border-radius: 15px;
      border: none;
      background-color: #9AC5F4;
      color: white;
      font-weight: 800;
      font-size: 5vw;
      margin-top: 5vw;

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export default UpdateUserInfo