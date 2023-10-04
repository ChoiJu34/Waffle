import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

const TeamAccountOut = () => {

  const location = useLocation()
  const me = location.state.me
  const name = location.state.name

  const token = localStorage.getItem('access_token')

  const headers = {
    "Authorization": "Bearer " + token
  }

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const outSubmit = () => {
  
    axios.delete(`/team-account/delete-member/${me}`, { headers: headers })
      .then(response => {
        alert('모임통장에서 탈퇴되었습니다')
        navigate('/teamaccount/main')
      })
      .catch(error => {
        console.error('넌 못 나간다');
      })
    }

  return (
    <TeamAccountOutWrapper>
      <div className='text-container'>
        <div className='text'>{name}에서</div>
        <div className='text-spacer'></div>
        <div className='text'>탈퇴하시겠습니까?</div>
      </div>

      <div className='button-container'>
        <div className='button-back' onClick={goBack}>이전으로</div>
        <div className='button-out' onClick={outSubmit}>탈퇴하기</div>
      </div>
    </TeamAccountOutWrapper>
  )
}

const TeamAccountOutWrapper = styled.div`

  .text-container {
    margin-top: 13vh;
  }

  .text {
    font-size: 3vh;
  }

  .text-spacer {
    height: 1.5vh;
  }

  .button-container {
    display: flex;
    margin: 7vh 17vw;
    justify-content: space-between;
  }

  .button-back {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 27vw;
    height: 5vh;
    border-radius: 15px;
    border: none;
    background-color: #a6a6a6;
    color: white;
    font-weight: 800;
    font-size: 2.3vh;
    margin-top: 2vh;
  }

  .button-out {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 27vw;
    height: 5vh;
    border-radius: 15px;
    border: none;
    background-color: #9AC5F4;
    color: white;
    font-weight: 800;
    font-size: 2.3vh;
    margin-top: 2vh;
  }
`

export default TeamAccountOut