import React from 'react'
import styled from 'styled-components'
import TeamAccountRibbon from '../../assets/TeamAccountRibbon.png'

const TeamAccountItem = () => {
  return (
    <TeamAccountItemWrapper>
      <div className="team-account-item-container">
        <img className="team-account-ribbon" src={TeamAccountRibbon} alt="TeamAccountRibbon" />
        <div className="team-account-item-title">텅장</div>
        <div className="team-account-item-departure">
          출발까지<span className="team-account-item-content-spacer"></span>D-23
        </div>
        <div className="team-account-item-percentage">
          3,000원 중<span className="team-account-item-content-spacer"></span>87%
        </div>
      </div>
    </TeamAccountItemWrapper>
  )
}

const TeamAccountItemWrapper = styled.div`

  .team-account-item-container {
    width: 80vw;
    height: 10vh;
    background-color: #A7ECEE;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
  }

  .team-account-ribbon {
    position: absolute;
    top: -30%;        
    left: -7%;         
    bottom: auto;      
    right: auto;
    width: 30%;
    height: 100%;      
  }

  .team-account-item-title {
    position: absolute;
    font-size: 3vh;
    top: 34%;
    left: 15%;
  }

  .team-account-item-departure {
    position: absolute;
    font-size: 1.8vh;
    width: 50%;
    text-align: right;
    left: 45%;
    top: 25%;
  }

  .team-account-item-percentage {
    position: absolute;
    font-size: 1.8vh;
    width: 50%;
    text-align: right;
    left: 45%;
    top: 60%;
  }

  .team-account-item-content-spacer {
    display: inline-block;
    width: 4vw;
  }
`

export default TeamAccountItem