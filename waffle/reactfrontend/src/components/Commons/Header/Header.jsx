import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import WaffleLogo from '../../../assets/WaffleLogo.png'
import { useAuth } from '../AuthProvider'

const Header = () => {

const isLoggedIn = useAuth()

const [isToggled, setIsToggled] = useState(false);
const [userToggled, setUserToggled] = useState(false);
// const [isLoggedIn, setIsLoggedIn] = useState(false);

// 로그아웃
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refresh-token')
  navigate('/')
  window.location.reload()
}

// 세부메뉴 이동 함수들

const navigate = useNavigate()

const goToMain = () => {
  navigate('/')
  setIsToggled(false)
  setUserToggled(false)
}

// const goToPackage = () => {
//   navigate('')
//   setIsToggled(false)
//   setUserToggled(false)
// }

const goToCard = () => {
  navigate('/recocard/main')
  setIsToggled(false)
  setUserToggled(false)
}

// const goToExchange = () => {
//   navigate('')
//   setIsToggled(false)
//   setUserToggled(false)
// }

const goToTeamAccount = () => {
  navigate('/teamaccount/main')
  setIsToggled(false)
  setUserToggled(false)
}

const goToLogin = () => {
  navigate('/user/login')
  setIsToggled(false)
  setUserToggled(false)
}

const goToSignup = () => {
  navigate('/user/signup')
  setIsToggled(false)
  setUserToggled(false)
}

// const goToMyPage = () => {
//   navigate('')
//   setIsToggled(false)
//   setUserToggled(false)
// }

  return (
    <HeaderWrapper isToggled={isToggled} userToggled={userToggled}>
      <div className="header-buttons-container">
      {/* 세부 메뉴 햄버거 버튼 */}
      <div className="header-toggle" onClick={() => {setIsToggled(!isToggled); userToggled ? setUserToggled(!userToggled) : setUserToggled(false)}}>
        <FontAwesomeIcon icon={!isToggled ? faBars : faTimes} color="black"/>
      </div>
    
      {/* 로고 */}
      <div className="logo">
        <img onClick={goToMain} src={WaffleLogo} alt="WaffleLogo" className="header-logo" />
      </div>

      {/* 회원 관리 세부 메뉴 버튼 */}
      <div className="header-user" onClick={() => {setUserToggled(!userToggled); isToggled ? setIsToggled(!isToggled) : setIsToggled(false)}}>
        <FontAwesomeIcon icon={!userToggled ? faUser : faTimes} color="black"/>
      </div>
      </div>

      {/* 세부 메뉴 리스트 */}
      <ul className="header-menulist">
        <li>패키지</li>
        <li onClick={goToCard}>카드</li>
        <li>환율</li>
        <li onClick={goToTeamAccount}>모임통장</li>
      </ul>

      {/* 회원 관리 세부 메뉴 리스트 */}
      {/* 로그인 여부에 따라 출력되는 세부 메뉴 다르게 처리 */}
      <ul className="header-menulist-user">
        {isLoggedIn? (
        <>
          <li onClick={handleLogout}>로그아웃</li>
          <li>마이페이지</li>
        </>
        ) : (
        <>
          <li onClick={goToLogin}>로그인</li>
          <li onClick={goToSignup}>회원가입</li>
        </>
        )}
      </ul>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: white;
  box-shadow: 0px 7px 5px -2px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;

  .header-logo {
    margin-top: 0.4rem;
    width: 2rem;
    height: 2rem;
  }

  .header-menulist {
    list-style: none;
    display: flex;
  }

  .header-menulist-user {
    list-style: none;
    display: flex;
    padding-inline-end: 40px;
  }

  .header-menulist-user div {
    margin: 0 1rem;
  }

  li {
    padding: 0 1rem;
  }

  .header-toggle {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  .header-user {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;

    .header-menulist-user {
      display: ${(props) => (props.userToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: white;
      color: black;
    }

    .header-menulist {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: white;
      color: black;
    }

    .header-menulist li {
      margin: 1rem 0;
      padding: 0;
      height: 40px;
      line-height: 40px;
      text-align: left;
    }

    .header-menulist-user li {
      margin: 1rem 0;
      padding: 0;
      height: 40px;
      line-height: 40px;
      text-align: right;
    }

    .header-toggle {
      display: block;
    }

    .header-user {
      display: block;
    }
  }

  .header-buttons-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0 1vh;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:hover, &:active, &:visited {
    color: inherit;
  }
`;

export default Header;