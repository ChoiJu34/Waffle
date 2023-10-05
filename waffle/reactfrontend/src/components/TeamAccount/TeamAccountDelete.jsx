import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

const TeamAccountDelete = () => {

  const location = useLocation()
  const id = location.state.id
  const name = location.state.name

  const token = localStorage.getItem('access_token')

  const headers = {
    "Authorization": "Bearer " + token
  }

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const deleteSubmit = () => {
  
    axios.delete(`/team-account/delete/${id}`, { headers: headers })
      .then(response => {
        alert('모임통장이 삭제되었습니다')
        navigate('/teamaccount/main')
      })
      .catch(error => {
        console.error('넌 못 지운다');
      })
    }

  return (
    <TeamAccountDeleteWrapper>
      <div className='text-container'>
        <div className='text'>{name}</div>
        <div className='text-spacer'></div>
        <div className='text'>통장을 삭제하시겠습니까?</div>
      </div>

      <div className='button-container'>
        <div className='button-back' onClick={goBack}>이전으로</div>
        <div className='button-out' onClick={deleteSubmit}>삭제하기</div>
      </div>
    </TeamAccountDeleteWrapper>
  )
}

const TeamAccountDeleteWrapper = styled.div`

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

export default TeamAccountDelete