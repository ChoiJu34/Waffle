import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import TeamAccountUpdateIndividualList from './TeamAccountUpdateIndividualList'

const TeamAccountUpdateIndividual = () => {

  const location = useLocation()
  const navigate = useNavigate()

  // 뒤로가기

  const handleGoBack = () => {

    window.scrollTo(0, 0)
    
    navigate(-1)
  }

  const accountId = window.location.pathname.match(/\d+$/)?.[0]

  const token = localStorage.getItem('access_token')

  const headers = {
    "Authorization": "Bearer " + token
  }

  const [rawData, setRawData] = useState()

  useEffect(() => {

    axios.get(`/team-account/member-list/${accountId}`, { headers: headers })
      .then(response => {
        setRawData(response.data.list)
      })
      .catch(error => {
        console.error('목록 가져오기 실패');
      });
  }, [])

  const sentData = rawData?.map(item => ({
    id: item.id,
    name: item.name,
    goal: item.goal
  }));

  const [updateData, setUpdateData] = useState({
    accountId: accountId,
    group: []
  });

  useEffect(() => {
    const transformedData = rawData?.map(item => ({
      id: item.id,
      goal: item.goal
    }));
  
    setUpdateData(prevData => ({ ...prevData, group: transformedData }));
  }, [rawData]);

  const updateGoal = (id, newGoal) => {
    setUpdateData(prevData => {
      const updatedGroup = prevData.group.map(item => 
        item.id === id ? { ...item, goal: newGoal } : item
      );
  
      return { ...prevData, group: updatedGroup };
    });
  };

  console.log(updateData)

  const updateSubmit = (e) => {
    e.preventDefault()

    axios.put(`/team-account/update-goals`, updateData, { headers: headers })
    .then(response => {
      alert('개인 목표가 수정되었습니다')
      navigate(-1)
    })
    .catch(error => {
      console.error('개인 목표 수정 실패');
    });
  }

  return (
    <TeamAccountUpdateIndividualWrapper>
      <div className="teamaccount-update-individual-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="teamaccount-update-individual-title">개인 목표 금액 수정</div>
      <div className="teamaccount-update-individual-title-underline"></div>

      <TeamAccountUpdateIndividualList sentData={sentData} updateGoal={updateGoal}/>

      <button className="update-button" onClick={updateSubmit}>수정하기</button>
    </TeamAccountUpdateIndividualWrapper>
  )
}

const TeamAccountUpdateIndividualWrapper = styled.div`

  .teamaccount-update-individual-header {
    display: flex;
    margin: 8vw 6vw;
  }

  .teamaccount-update-individual-title {
    font-size: 8vw;
    margin-top: 3vw;
    margin-left: 8vw;
    text-align: left;
    color: #000004;
  }

  .teamaccount-update-individual-title-underline {
    height: 0.7vw;
    width: 80vw;
    margin: 4vw auto;
    background-color: #000004;
  }

  .update-button {
    width: 28vw;
      height: 11vw;
      border-radius: 15px;
      border: none;
      background-color: #9AC5F4;
      color: white;
      font-weight: 800;
      font-size: 5vw;
      margin-top: 5vw;
  }
`

export default TeamAccountUpdateIndividual