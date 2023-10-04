import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TeamAccountItem from './TeamAccountItem'
import NoTeamAccount from '../../assets/NoTeamAccount.png'
import axios from 'axios'

const TeamAccountList = () => {

  const token = localStorage.getItem('access_token')

  const headers = {
    "Authorization": "Bearer " + token
  }

  const navigate = useNavigate()

  const goToAdd = () => {
    navigate('/teamaccount/add/code')
  }

  const [teamAccountData, setTeamAccountData] = useState()

  useEffect(() => {
    axios.get('/team-account/list', { headers: headers })
    .then(response => {
      setTeamAccountData(response.data.list)
    })
    .catch(error => {
      console.error('로그인 실패')
      alert('로그인에 실패했습니다')
    })
  }, [])

  console.log(teamAccountData)

  return (
    <TeamAccountListWrapper>
      {teamAccountData?.map((data, index) => (
        <TeamAccountItem key={data.id} data={data} index={index}/>
      ))}
      <div className="team-account-add" onClick={goToAdd}><FontAwesomeIcon icon={faPlus} color="black" size="2x"/></div>
      {teamAccountData?.length === 0 &&
     (<>
      <img className="no-team-account" alt="NoTeamAccount" src={NoTeamAccount} />
      <div className="no-team-account-text">등록된 모임 통장이 없어요</div>
      </>)}
    </TeamAccountListWrapper>
  )
}

const TeamAccountListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 6vh;

  .team-account-add {
    width: 80vw;
    height: 10vh;
    border: dashed 2px #000004;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .no-team-account {
    width: 50%;
    height: 25%;
    margin-top: 6vh;
    margin-bottom: 2vh;
  }

  .no-team-account-text {
    font-size: 3vh;
  }
`

export default TeamAccountList