import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
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
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
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

const goToPackage = () => {
  navigate('/package/main')
  setIsToggled(false)
  setUserToggled(false)
}

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
  navigate('/user/sign-up')
  setIsToggled(false)
  setUserToggled(false)
}

const goToMyPage = () => {
  navigate('/mypage/checklist')
  setIsToggled(false)
  setUserToggled(false)
}

// 현재 페이지에 따라 헤더 가운데 변경
const location = useLocation();

const [nowPage, setNowPage] = useState()

useEffect(() => {
  if (/^\/package\//.test(location.pathname)) {
    setNowPage('package')
  } else if (/^\/recocard\//.test(location.pathname)) {
    setNowPage('recocard')
  } else if (/^\/exchange\//.test(location.pathname)) {
    setNowPage('exchange')
  } else if (/^\/teamaccount\//.test(location.pathname)) {
    setNowPage('teamaccount')
  } else if (/^\/mypage\//.test(location.pathname)) {
    setNowPage('mypage')
  } else {
    setNowPage('main')
  }
}, [location.pathname])


  return (
    <HeaderWrapper isToggled={isToggled} userToggled={userToggled} nowPage={nowPage}>
      <div className="header-buttons-container">
      {/* 세부 메뉴 햄버거 버튼 */}
      <div className="header-toggle" onClick={() => {setIsToggled(!isToggled); userToggled ? setUserToggled(!userToggled) : setUserToggled(false)}}>
        <FontAwesomeIcon icon={!isToggled ? faBars : faTimes} color="black"/>
      </div>
    
      {/* 현재 페이지에 따라 달라지는 헤더 가운데 */}
      {nowPage === 'main' && (
        <div className="logo">
          <img onClick={goToMain} src={WaffleLogo} alt="WaffleLogo" className="header-logo" />
        </div>
      )}

      {nowPage === 'package' && (
        <div className="header-now-where">
          패키지 추천
        </div>
      )}

      {nowPage === 'recocard' && (
        <div className="header-now-where">
         카드 추천
        </div>
      )}

      {nowPage === 'exchange' && (
        <div className="header-now-where">
          환율
       </div>
      )}

      {nowPage === 'teamaccount' && (
        <div className="header-now-where">
          모임 통장
        </div>
      )}

      {nowPage === 'mypage' && (
        <div className="header-now-where">
          마이페이지
       </div>
      )}

      {/* 회원 관리 세부 메뉴 버튼 */}
      <div className="header-user" onClick={() => {setUserToggled(!userToggled); isToggled ? setIsToggled(!isToggled) : setIsToggled(false)}}>
        <FontAwesomeIcon icon={!userToggled ? faUser : faTimes} color="black"/>
      </div>
      </div>

      {/* 세부 메뉴 리스트 */}
      <ul className="header-menulist">
        {nowPage !== 'main' && (
          <li onClick={goToMain}>홈</li>
        )}
        <li className="sebu-package" onClick={goToPackage}>패키지 추천</li>
        <li className="sebu-recocard" onClick={goToCard}>카드 추천</li>
        <li className="sebu-exchange">환율</li>
        <li className="sebu-teamaccount" onClick={goToTeamAccount}>모임통장</li>
      </ul>
      
      {/* 회원 관리 세부 메뉴 리스트 */}
      {/* 로그인 여부에 따라 출력되는 세부 메뉴 다르게 처리 */}
      <ul className="header-menulist-user">
        {isLoggedIn? (
        <>
          <li onClick={handleLogout}>로그아웃</li>
          <li onClick={goToMyPage}>마이페이지</li>
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

    li {
      &.sebu-package {
        color: ${(props) => (props.nowPage === 'package' ? '#9AC5F4' : 'black')};
      }  

      &.sebu-recocard {
        color: ${(props) => (props.nowPage === 'recocard' ? '#9AC5F4' : 'black')};
      }  

      &.sebu-exchange {
        color: ${(props) => (props.nowPage === 'exchange' ? '#9AC5F4' : 'black')};
      }  

      &.sebu-teamaccount {
        color: ${(props) => (props.nowPage === 'teamaccount' ? '#9AC5F4' : 'black')};
      }  
    }
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

  .header-now-where {
    color: black;
    font-size: 2.3vh;
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