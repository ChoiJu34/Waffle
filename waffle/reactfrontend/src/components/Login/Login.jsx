import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'

const Login = () => {
  
  // 뒤로가기
  const navigate = useNavigate()
  const location = useLocation()

  const handleGoBack = () => {

    window.scrollTo(0, 0)

    if (location.state?.from === 'fromComplete') { 
      navigate('/');
    } else {
      navigate(-1);
    }
  }

  // 이메일 입력 칸 애니메이션
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
 
  // 비밀번호 입력 칸 애니메이션
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

  // 이메일 저장
  const [email, setEmail] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['rememberEmail']);

  useEffect(() => {
    if(cookies.rememberEmail !== undefined) {
      setEmail(cookies.rememberEmail);
      setIsRemember(true);
      setIsEmailComplete(true);
    }
 }, []);

 const handleOnChange = (e) => {
    setIsRemember(e.target.checked);
    if(e.target.checked){
      setCookie('rememberEmail', email, {maxAge: 2000});
    } else {
    removeCookie('rememberEmail');
    }
  }

  // 로그인
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
        const newData = { ...prevData, [name]: value };
        return newData;
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('/user/login', formData)
      .then(response => {
        console.log(response)
        localStorage.setItem('token', response.headers['authorization'])
        localStorage.setItem('refresh-token', response.headers['authorization-refresh'])
        navigate('/')
        window.location.reload()
      })
      .catch(error => {
        console.error('로그인 실패')
        alert('로그인에 실패했습니다')
      })
  }

  return (
    <LoginWrapper>
      <div className="login-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="login-title">로그인</div>
      <div className="login-title-underline"></div>

      <form onSubmit={handleSubmit}>
        <div className={`login-email ${isEmailFocused ? 'focus' : ''} ${isEmailComplete ? 'complete' : ''}`} id="email-container">
          <label id="email-label">이메일</label>
          <input type="text" id="email-input" ref={inputEmailRef} onFocus={handleEmailFocus} onBlur={handleEmailBlur} value={formData.email} onChange={(e) => {setEmail(e.target.value); handleChange(e)}} name="email"/>
        </div>
        <div className={`login-password ${isPasswordFocused ? 'focus' : ''} ${isPasswordComplete ? 'complete' : ''}`} id="password-container">
          <label id="password-label">비밀번호</label>
          <input type="password" id="password-input" ref={inputPasswordRef} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} value={formData.password} name="password" onChange={handleChange}/>
        </div>
        <label className="loginPage_text">
          <input type="checkbox" onChange={handleOnChange} checked={isRemember}/>
          이메일 저장
        </label>
        <div className="login-button-container">
          <button className="login-button" type="submit">로그인</button>
        </div>
      </form>

      <div className="login-underline"></div>
      <div className="login-extra">
        <div className="login-find-email"><StyledLink to="/user/find-email">이메일 찾기</StyledLink></div>
        <div className="login-change-password"><StyledLink to="/user/find-password">비밀번호 변경</StyledLink></div>
        <div className="login-signup"><StyledLink to="/user/sign-up">회원가입</StyledLink></div>
      </div>

    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  min-height: 100vh;

  .login-header {
    display: flex;
    margin: 3vh 2vh;
  }

  .login-title {
    font-size: 4vh;
    margin-top: 3vh;
    margin-left: 3vh;
    text-align: left;
    color: #000004;
  }

  .login-title-underline {
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

    .login-password {
    padding: 2vh 7vh;
  }

  .login-password > input{
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
      /* type:password가 사용자 지정 폰트를 지원하지 않아 출력되지 않았으므로 여기서만 새로 지정 */
      /* 단순히 돋움으로만 설정해두면 점 간격이 고르지 않아, 추가 작업 필요 */
      font-family: "돋움";
      font: small-caption;
      font-size: 3vh;
	}

    .login-password > input:focus{
        outline:0;
        border-color:#76A8DE;
        border-width: 2px;
        color:#76A8DE;
    }

    .login-password > label{
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

    .login-password.focus > label{
        top: 25vh;
        left: 8vh;
        font-size: 12px;
        line-height: 1.33;
        color: #76A8DE;
    }

    .login-password.complete > label{
        top: 25vh;
        left: 8vh;
        font-size: 12px;
        line-height: 1.33;
    }

    .login-button {
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

    .login-underline {
    height: 0.1vh;
    width: 80%;
    margin: 1.5vh auto;
    margin-top: 3vh;
    background-color: #000004;
  }

  .login-extra {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

export default Login