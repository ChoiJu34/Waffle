import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const VerifyEmail = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromState = location.state?.email || '';
  const nameFromState = location.state?.name || '';
  const birthdayFromState = location.state?.birthday || '';
  const telFromState = location.state?.tel || '';

  const handleGoBack = () => {

    window.scrollTo(0, 0)
    
    navigate('/user/sign-up', { state: { email: emailFromState, name: nameFromState, birthday: birthdayFromState, tel: telFromState } });
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/user/verify-token', { token: token });
      console.log(response.data)
      if (response.data.validation === "true") {
        navigate('/user/sign-up', { state: { email: emailFromState, name: nameFromState, birthday: birthdayFromState, tel: telFromState } });
      } else {
        alert('인증 토큰이 일치하지 않습니다');
      }
    } catch (error) {
      alert('인증 토큰 확인 실패');
    }
  };

  return (
    <VerifyEmailWrapper>
      <div className="verify-email-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="verify-email-title">이메일 확인</div>
      <div className="verify-email-title-underline"></div>
          <input 
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your verification token"
          />
          <button onClick={handleSubmit}>Verify</button>
      </VerifyEmailWrapper>
  );
}

const VerifyEmailWrapper = styled.div`
  
`

export default VerifyEmail