import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import MainGraphBackpack from '../../assets/MainGraphBackpack.png'
import MainGraphPlane from '../../assets/MainGraphPlane.png'
import 'animate.css';
import TeamAccountDetailIndividualList from './TeamAccountDetailIndividualList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom'

const TeamAccountDetail = () => {

  const navigate = useNavigate()

  const handleGoBack = () => {

    window.scrollTo(0, 0)

    navigate(-1);
  }

  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 })

  const [showDetail, setShowDetail] = useState({
    target: false,
    raised: false,
    spent: false
  })

  const handleMouseDown = (event) => {
    let x, y;

    if (event.type.startsWith('mouse')) {
      x = event.clientX;
      y = event.clientY;
    } else if (event.type.startsWith('touch')) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    }

    const tooltipWidth = 150;  
    const tooltipHeight = 50;  


    if (x + tooltipWidth > window.innerWidth) {
      x = window.innerWidth - tooltipWidth;
    }

    y = y - tooltipHeight;

    setTouchPosition({ x, y });

    const type = event.target.getAttribute('data-type');
    const newState = { target: false, raised: false, spent: false };

    if (type) {
        newState[type] = true;
    }

    setShowDetail(newState);
};

  const handleMouseUpOrLeave = () => {
    setShowDetail({ target: false, raised: false, spent: false });
  }

  const spentValue = 500
  const raisedValue = 1900
  const targetValue = 3000

  const spentRatio = spentValue / targetValue * 100
  const raisedRatio = raisedValue / targetValue * 100

  // 메뉴
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const hideMenu = e => {
        if (isMenuOpen && !e.target.closest('.hamburger-dot') && !e.target.closest('.menu')) {
            setIsMenuOpen(false);
        }
    };
    window.addEventListener('click', hideMenu);

    return () => {
        window.removeEventListener('click', hideMenu);
    };
  }, [isMenuOpen]);




  return (
    <TeamAccountDetailWrapper spentRatio={spentRatio} raisedRatio={raisedRatio}>
      <div className="teamaccount-detail-title">
      <div className="login-header"><FontAwesomeIcon icon={faArrowLeft} color="black" onClick={handleGoBack}/></div>
        <div className="teamaccount-detail-title-text">텅장</div>
        <FontAwesomeIcon icon={faEllipsisVertical} color="black" className="hamburger-dot" onClick={toggleMenu}/>
        {isMenuOpen && (
          <div className="menu">
           <div className="menu-item">통장 정보 수정</div>
           <div className="menu-item">개인 목표 수정</div>
           <div className="menu-item-delete">모임 통장 삭제</div>
          </div>
)}
      </div>

      <div className="teamaccount-detail-maingraph-container">
        <div className="teamaccount-detail-maingraph-category">
          <div className="teamaccount-detail-maingraph-category-spent">지출액</div>
          <div className="teamaccount-detail-maingraph-category-raised">모금액</div>
          <div className="teamaccount-detail-maingraph-category-target">목표액</div>
        </div>

        <div className="teamaccout-detail-maingraph">
          <div 
            data-type="target"
            className="teamaccount-detail-maingraph-target"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUpOrLeave}
          >
            {showDetail.target && <div className="teamaccount-detail-maingraph-detail" style={{top: `${touchPosition.y}px`, left: `${touchPosition.x}px`}}>목표 금액<br />3,000원</div>}

            <div
              data-type="raised"
              className="teamaccount-detail-maingraph-raised"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUpOrLeave}
            >{showDetail.raised && <div className="teamaccount-detail-maingraph-detail" style={{top: `${touchPosition.y}px`, left: `${touchPosition.x}px`}}>모은 금액<br />1,900원</div>}
             {raisedValue < targetValue/2 ?
              <img src={MainGraphBackpack} alt="MainGraphBackpack" className="raised-end" data-type="raised" /> :
              <img src={MainGraphPlane} alt="MainGraphPlane" className="custom-swing  raised-end" data-type="raised" />}
            </div>

          <div
              data-type="spent"
              className="teamaccount-detail-maingraph-spent"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUpOrLeave}
            >{showDetail.spent && <div className="teamaccount-detail-maingraph-detail" style={{top: `${touchPosition.y}px`, left: `${touchPosition.x}px`}}>지출 금액<br />500원</div>}</div>
          </div>
        </div>
        <div className="team-account-detail-individual-head-container">
          <div className="team-account-detail-individual-head"></div>
        </div>
        <div className="team-account-detail-individual-title">개인별 목표 금액</div>
        <TeamAccountDetailIndividualList />
      </div>
    </TeamAccountDetailWrapper>
  )
}

const swingAnimation = keyframes`
  20% {
    transform: rotate3d(0, 0, 1, 10deg);
  }
  40% {
    transform: rotate3d(0, 0, 1, -8deg);
  }
  60% {
    transform: rotate3d(0, 0, 1, 4deg);
  }
  80% {
    transform: rotate3d(0, 0, 1, -4deg);
  }
  100% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
`;

const TeamAccountDetailWrapper = styled.div`
.teamaccount-detail-title {
    font-size: 3vh;
    margin-top: 4vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.hamburger-dot {
    position: absolute;
    right: 1.5vh;
}

 .teamaccount-detail-maingraph-category {
  display: flex;
  font-size: 1.7vh;
  margin-top: 4vh;
 }

 .teamaccount-detail-maingraph-category-spent {
  margin-left: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15vw;
  height: 2.8vh;
  border-radius: 50px;
  background-color: #B0BDCB;
 }

 .teamaccount-detail-maingraph-category-raised {
  margin-left: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15vw;
  height: 2.8vh;
  border-radius: 50px;
  background-color: #9AC5F4;
 }

 .teamaccount-detail-maingraph-category-target {
  margin-left: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15vw;
  height: 2.8vh;
  border-radius: 50px;
  background-color: #FFEEBB;
 }

 .teamaccout-detail-maingraph {
  margin-top: 1.5vh;
  display: flex;
  justify-content: center;
 }

 .teamaccount-detail-maingraph-target {
  width: 85vw;
  height: 7vh;
  background-color: #FFEEBB;
  border-radius: 15px;
  position: relative;
  z-index: 1;
 }

 .teamaccount-detail-maingraph-spent {
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.spentRatio}%;
  height: 7vh;
  background-color: #B0BDCB;
  border-radius: 15px;
  z-index: 3;
 }

 .teamaccount-detail-maingraph-raised {
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.raisedRatio}%;
  height: 7vh;
  background-color: #9AC5F4;
  border-radius: 15px;
  z-index: 2;
 }

 .teamaccount-detail-maingraph-detail {
  position: fixed;
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 30000;
  transform: translateX(0%) translateY(-100%); 
  white-space: nowrap;
  max-width: calc(100vw - 20px); 
  overflow: hidden;
  text-overflow: ellipsis;
  transform: translateX(0%) translateY(-50%);
}

.raised-end {
  position: absolute;
  right: 0;
  top: 25%;
  width: auto;
  height: 60%;
  transform-origin: center;
}

.custom-swing {
    animation: ${swingAnimation} 2s infinite alternate;
    animation-delay: 2s;
  }

.team-account-detail-individual-head-container {
  display: flex;
  justify-content: center;
  margin-top: 2vh;
  overflow: hidden;
  height: 2vh;
}

.team-account-detail-individual-head {
  border: 3px solid #9AC5F4;
  height: 5vh;
  border-radius: 15px;
  width: 85vw;
}

.team-account-detail-individual-title {
  font-size: 2.5vh;
}

.menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 40000;
  font-size: 2vh;
}

.menu-item {
  padding: 10px 15px;
}

.menu-item-delete {
    padding: 10px 15px;
    color: #e71111;
  }

.login-header {
  position: absolute;
  left: 0.1vw;
  margin: 1.2vh 2vh;
}
`

export default TeamAccountDetail