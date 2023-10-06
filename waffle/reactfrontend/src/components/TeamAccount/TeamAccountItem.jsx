import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import TeamAccountRibbon from '../../assets/TeamAccountRibbon.png'
import { useNavigate } from 'react-router-dom'

const TeamAccountItem = ({ data, index }) => {

  const navigate = useNavigate()

  const goToDetail = () => {
    navigate(`/teamaccount/detail/${data.id}`)
  }

  const [dDay, setDDay] = useState(null);

  useEffect(() => {
    if (data.endDay) {
      const targetDate = new Date(data.endDay);
      const currentDate = new Date();

      const differenceInTime = targetDate - currentDate;
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

      setDDay(differenceInDays);
    }
  }, [data.endDay]);

  const percent = Math.round(data.percent)

  return (
    <TeamAccountItemWrapper>
      <div className="team-account-item-container" onClick={goToDetail}>
        {data.master && (
        <img className="team-account-ribbon" src={TeamAccountRibbon} alt="TeamAccountRibbon" />)}
        <div className="team-account-item-title">{data.name}</div>
        <div className="team-account-item-departure">
          <span className="team-account-item-content-spacer"></span>D-{dDay}
        </div>
        <div className="team-account-item-percentage">
          <span className="team-account-item-content-spacer"></span>{percent}%
        </div>
      </div>
    </TeamAccountItemWrapper>
  )
}

const TeamAccountItemWrapper = styled.div`

  margin-bottom: 5vh;

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
    top: 33%;
    left: 10%;
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