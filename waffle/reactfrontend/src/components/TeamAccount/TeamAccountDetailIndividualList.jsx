import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import TeamAccountDetailIndividualItem from './TeamAccountDetailIndividualItem'
import SurprisinglyNoOne from '../../assets/NoOne.png'
import axios from 'axios'

const TeamAccountDetailIndividualList = () => {

  const token = localStorage.getItem('access_token')

  const headers = {
    "Authorization": "Bearer " + token
  }

  const [teamAccountIndividual, setTeamAccountIndividual] = useState()


  useEffect (() => {

    const id = window.location.pathname.match(/\d+$/)?.[0];

    if (!id) {
      console.error('ID를 찾을 수 없습니다.');
      return;
    }

    axios.get(`/team-account/member-list/${id}`, {headers})
    .then(response => {
      console.log(response.data.list)
      setTeamAccountIndividual(response.data.list)
    })
    .catch(error => {
      console.error('대실패')
      alert('리스트 못가져옴')
    })
  }, [])

  console.log(teamAccountIndividual)

   return (
  <TeamAccountDetailIndividualListWrapper>
      {teamAccountIndividual?.length === 0 ?
        (<div className="no-one-container">
          <img src={SurprisinglyNoOne} alt="SurprisinglyNoOne" className="no-one"/>
        </div>) : (
        <>
        {teamAccountIndividual?.map((data, index) => (
          <TeamAccountDetailIndividualItem key={data.id} data={data} index={index} />
        ))}
        <TeamAccountDetailIndividualItem />
        </>
        )}
  </TeamAccountDetailIndividualListWrapper>
  )
}

const TeamAccountDetailIndividualListWrapper = styled.div`
    .no-one-container {
      margin-top: 12vh;
    }

    .no-one {
      height: 30vh;
      width: auto;
    }
`

export default TeamAccountDetailIndividualList