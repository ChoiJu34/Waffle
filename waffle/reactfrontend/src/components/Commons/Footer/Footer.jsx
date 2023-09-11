import React, { useState } from 'react';
import styled from 'styled-components';
import WaffleLogo from '../../../assets/WaffleLogo.png'

const Header = () => {

  return (
    <FooterWrapper>
      <footer>
        <div className="logo">
            <img src={WaffleLogo} alt="WaffleLogo" className="footer-logo" />
            <span className="footer-text">와플</span>
        </div>
      </footer>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  width: 100%;

  .footer-logo {
    width: 2rem;
    height: 2rem;
  }
  
  footer {
    width: 100%;
    height: 50px;
    bottom: 0px;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
  }

  .footer-text {
    margin-bottom: -1px;
    margin-left: 5px;
  }
`;

export default Header;