import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import TeamAccountUpdateIndividualList from './TeamAccountUpdateIndividualList'

const TeamAccountUpdateIndividual = ( { handleIndividualDataChange, individualData, setShowIndividualUpdate }) => {

  const location = useLocation()
  const sentData = individualData

  const [tempData, setTempData] = useState(individualData ? individualData : [])

  const handleItemChange = (name, newTarget) => {
    const updatedData = [...tempData];
    const item = updatedData.find(item => item.name === name);
    if (item) {
      item.target = parseInt(newTarget, 10);
    }
    setTempData(updatedData);
  };

  console.log(tempData)
  const handleSaveChanges = () => {
    handleIndividualDataChange(
      tempData
    );
  };

  // 뒤로가기

  const handleGoBack = () => {

    window.scrollTo(0, 0)
    
    setShowIndividualUpdate(false)
  }

  return (
    <TeamAccountUpdateIndividualWrapper>
      <div className="teamaccount-update-individual-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="teamaccount-update-individual-title">개인 목표 금액 수정</div>
      <div className="teamaccount-update-individual-title-underline"></div>

      <TeamAccountUpdateIndividualList sentData={sentData} onChange={handleItemChange}/>

      <button onClick={handleSaveChanges}>수정하기</button>
    </TeamAccountUpdateIndividualWrapper>
  )
}

const TeamAccountUpdateIndividualWrapper = styled.div`

  .teamaccount-update-individual-header {
    display: flex;
    margin: 3vh 2vh;
  }

  .teamaccount-update-individual-title {
    font-size: 2.8vh;
    margin-top: 3vh;
    margin-left: 3vh;
    text-align: left;
    color: #000004;
  }

  .teamaccount-update-individual-title-underline {
    height: 0.3vh;
    width: 80%;
    margin: 1.5vh auto;
    background-color: #000004;
  }
`

export default TeamAccountUpdateIndividual