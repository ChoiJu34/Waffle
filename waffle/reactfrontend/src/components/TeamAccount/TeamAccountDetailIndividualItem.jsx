import React, { useState } from 'react'
import styled from 'styled-components'

const TeamAccountDetailIndividualItem = () => {

    const individualName = '대장'
    const individualTarget = 2000
    const individualRaised = 1200
    const raisedRatio = individualRaised / individualTarget * 100

    const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 })

    const [showDetail, setShowDetail] = useState({
      target: false,
      raised: false,
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
      const newState = { target: false, raised: false };
  
      if (type) {
          newState[type] = true;
      }
  
      setShowDetail(newState);
  };
  
    const handleMouseUpOrLeave = () => {
      setShowDetail({ target: false, raised: false });
    }

    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

    return (
      <TeamAccountDetailIndividualItemWrapper raisedRatio={raisedRatio}>
        <div className="individual-name">{individualName}</div>
        <div className="individual-graph">
          <div 
            data-type="target"
            className="individual-graph-target"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUpOrLeave}
          >
            {showDetail.target && <div className="individual-graph-detail" style={{top: `${touchPosition.y}px`, left: `${touchPosition.x}px`}}>목표 금액<br />{numberWithCommas(individualTarget)}원</div>}

            <div
              data-type="raised"
              className="individual-graph-raised"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUpOrLeave}
            >{showDetail.raised && <div className="individual-graph-detail" style={{top: `${touchPosition.y}px`, left: `${touchPosition.x}px`}}>모은 금액<br />{numberWithCommas(individualRaised)}원</div>}
            </div>
          </div>
        </div>
      </TeamAccountDetailIndividualItemWrapper>
    )
}

const TeamAccountDetailIndividualItemWrapper = styled.div`

margin-top: 3vh;

.individual-name {
  text-align: left;
  margin-left: 7.5vw;
  font-size: 2vh;
}

.individual-graph {
  margin-top: 1.5vh;
  display: flex;
  justify-content: center;
 }

 .individual-graph-target {
  width: 80vw;
  height: 2vh;
  background-color: #e7e7e7;
  border-radius: 15px;
  position: relative;
  z-index: 1;
 }

 .individual-graph-raised {
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.raisedRatio}%;
  height: 2vh;
  background-color: #FAB7B7;
  border-radius: 15px;
  z-index: 2;
 }

 .individual-graph-detail {
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
`

export default TeamAccountDetailIndividualItem