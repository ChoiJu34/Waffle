import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

const TeamAccountUpdateIndividual = () => {
  
  const location = useLocation()
  const sentData = location.state ? location.state : []

  console.log(sentData)


  return (
    <TeamAccountUpdateIndividualWrapper>
      
    </TeamAccountUpdateIndividualWrapper>
  )
}

const TeamAccountUpdateIndividualWrapper = styled.div`
  
`

export default TeamAccountUpdateIndividual