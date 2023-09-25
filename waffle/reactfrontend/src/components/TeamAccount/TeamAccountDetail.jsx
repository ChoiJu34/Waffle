import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import MainGraphBackpack from '../../assets/MainGraphBackpack.png'
import MainGraphPlane from '../../assets/MainGraphPlane.png'
import 'animate.css';

const TeamAccountDetail = () => {

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

  const raisedValue = 1900
  const targetValue = 3000

  return (
    <TeamAccountDetailWrapper>
      <div className="teamaccount-detail-title">텅장</div>

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
      </div>
    </TeamAccountDetailWrapper>
  )
}

const swingAnimation = keyframes`
  20% {
    transform: rotate3d(0, 0, 1, 5deg);
  }
  40% {
    transform: rotate3d(0, 0, 1, -4deg);
  }
  60% {
    transform: rotate3d(0, 0, 1, 2deg);
  }
  80% {
    transform: rotate3d(0, 0, 1, -2deg);
  }
  100% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
`;

const wipeAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

const TeamAccountDetailWrapper = styled.div`
 .teamaccount-detail-title {
  font-size: 3vh;
  margin-top: 4vh;
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
  width: 26%;
  height: 7vh;
  background-color: #B0BDCB;
  border-radius: 15px;
  z-index: 3;
 }

 .teamaccount-detail-maingraph-raised {
  position: absolute;
  top: 0;
  left: 0;
  width: 75%;
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


`

export default TeamAccountDetail