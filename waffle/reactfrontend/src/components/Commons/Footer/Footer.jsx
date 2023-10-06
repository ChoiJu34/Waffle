import React from 'react';
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import WaffleLogo from '../../../assets/WaffleLogo.png'
import MypageHeader from '../../MyPage/MypageHeader'

const Footer = () => {

  const location = useLocation()
  const isMypage = /^\/mypage\//.test(location.pathname);
  const isUserUpdate = /\/mypage\/update-userinfo/.test(location.pathname)

  return (
    <FooterWrapper>
      {!isMypage &&
      <div className="underline"></div>}
      <footer>
        {!isMypage && 
        <div className="logo">
            <img src={WaffleLogo} alt="WaffleLogo" className="footer-logo" />
            <span className="footer-text">와플</span>
        </div>}
      </footer>
      {(isMypage || isUserUpdate) &&
      (<div className="mypage-bottom">
        <MypageHeader />
      </div>)}
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .footer-logo {
    width: 2rem;
    height: 2rem;
  }
  
  footer {
    width: 100%;
    height: 50px;
    bottom: 0px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .underline {
    background-color: #000004;
    height: 0.15vh;
    margin-top: 3vh;
    width: 95vw;
  }

  .logo {
    display: flex;
    align-items: center;
  }

  .footer-text {
    margin-bottom: -1px;
    margin-left: 5px;
  }

  .mypage-bottom {
    margin-bottom: 10vh;
    width: 100%;
  }
`;


export default Footer;