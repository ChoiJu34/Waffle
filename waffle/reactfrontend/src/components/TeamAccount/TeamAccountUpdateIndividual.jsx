import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import TeamAccountUpdateIndividualList from './TeamAccountUpdateIndividualList'

const TeamAccountUpdateIndividual = () => {
  
  const location = useLocation()
  const sentData = location.state ? location.state : []

  // 뒤로가기
  const navigate = useNavigate();

  const handleGoBack = () => {

    window.scrollTo(0, 0)
    
    navigate(-1);
  }

  return (
    <TeamAccountUpdateIndividualWrapper>
      <div className="teamaccount-update-individual-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="teamaccount-update-individual-title">개인 목표 금액 수정</div>
      <div className="teamaccount-update-individual-title-underline"></div>

      <TeamAccountUpdateIndividualList sentData={sentData}/>
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