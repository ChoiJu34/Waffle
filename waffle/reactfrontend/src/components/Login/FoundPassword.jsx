import React, { useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

const FoundPassword = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    token: location.state.token,
    newPassword: '',
  })

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

  //비밀번호, 비밀번호 확인
  const [newPassword, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')

  // 유효성 검사
  const [isPassword, setIsPassword] = useState(null)
  const [isPasswordVerify, setIsPasswordVerify] = useState(null)

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const newPasswordCurrent = e.target.value
    setPassword(newPasswordCurrent)

    if (newPasswordCurrent === "") {
      setIsPassword(null);
    } else if (!passwordRegex.test(newPasswordCurrent)) {
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
      } else if (newPassword === passwordVerifyCurrent) {
        setIsPasswordVerify(true);
      } else {
        setIsPasswordVerify(false);
      }
    },
    [newPassword]
  )

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
        const newData = { ...prevData, [name]: value };
        return newData;
    });
  }

  // 비밀번호 변경 요청
  const changePassword = () => {
    axios.put('/user/update-password', formData)
      .then(response => {
        if (response.data.message === "SUCCESS") {
          alert('비밀번호가 변경되었습니다')
          navigate('/user/login', { state: { from : "fromComplete" }})}
        else {
          console.log('뭔가 잘못됨')
        }
      })
      .catch(error => {
        console.error('서버탓이야')
        alert('비밀번호 변경 실패')
      })
  }



  return (
    <FindEmailWrapper>
      <div className="found-password-header"></div>
      <div className="found-password-title">비밀번호 변경</div>
      <div className="found-password-title-underline"></div>

      <div className={`found-password ${isPasswordFocused ? 'focus' : ''} ${isPasswordComplete ? 'complete' : ''}`}>
          <label id="found-password-label">새 비밀번호</label>
          <input type="password" id="signup-input" ref={inputPasswordRef} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} onChange={(e) => {onChangePassword(e); handleChange(e)}} placeholder={showPasswordPlaceholder ? "영문, 숫자, 특수문자를 포함한 8자리 이상" : ""} value={formData.newPassword} name="newPassword"/>
        </div>

        <div className={`found-password-verify ${isPasswordVerifyFocused ? 'focus' : ''} ${isPasswordVerifyComplete ? 'complete' : ''}`}>
          <label id="signup-label">비밀번호 확인</label>
          <input type="password" id="signup-input" ref={inputPasswordVerifyRef} onFocus={handlePasswordVerifyFocus} onBlur={handlePasswordVerifyBlur} onChange={onChangePasswordVerify} placeholder={showPasswordVerifyPlaceholder ? "" : ""} />
        </div>

      <div className="found-password-button-container">
        <button className="found-password-button" onClick={changePassword} disabled={!(isPassword && isPasswordVerify)}>비밀번호 변경</button>
      </div>

      <div className="found-password-underline"></div>
    </FindEmailWrapper>
  )
}

const FindEmailWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;

.found-password-header {
  display: flex;
    margin: 8vw 6vw;
}

.found-password-title {
  font-size: 10vw;
    margin-top: 3vw;
    margin-left: 8vw;
    text-align: left;
    color: #000004;
}

.found-password-title-underline {
  height: 0.7vw;
    width: 80vw;
    margin: 4vw auto;
    background-color: #000004;
}

.found-password {
  padding: 4vw 15vw;
  }

  .found-password > input{
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

    .found-password > input:focus{
        outline:0;
        border-color:#76A8DE;
        border-width: 2px;
        color:#76A8DE;
    }

    .found-password > label{
      top: 41vw;
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

    .found-password.focus > label{
      top: 36vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
        color: #76A8DE;
    }

    .found-password.complete > label{
      top: 36vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
    }

    .found-password-verify {
      padding: 4vw 15vw;
  }

  .found-password-verify > input{
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

    .found-password-verify > input:focus{
        outline:0;
        border-color:#76A8DE;
        border-width: 2px;
        color:#76A8DE;
    }

    .found-password-verify > label{
      top: 59vw;
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

    .found-password-verify.focus > label{
      top: 54vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
        color: #76A8DE;
    }

    .found-password-verify.complete > label{
      top: 54vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
    }

    .found-password-button {
      width: 40vw;
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
    }

    .found-password-underline {
      height: 0.1vw;
    width: 80%;
    margin: 5vw auto;
    margin-top: 7vw;
    background-color: #000004;
  }

  input::placeholder {
    color: #90909061;
    font-size: 3vw;
  }
`

export default FoundPassword