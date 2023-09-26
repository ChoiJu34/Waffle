import React from 'react'
import styled from 'styled-components'
import TeamAccountUpdateIndividualItem from './TeamAccountUpdateIndividualItem'

const TeamAccountUpdateIndividualList = ({ sentData }) => {
  return (
    <TeamAccountUpdateIndividualListWrapper>
      <TeamAccountUpdateIndividualItem sentData={sentData}/>
    </TeamAccountUpdateIndividualListWrapper>
  )
}

const TeamAccountUpdateIndividualListWrapper = styled.div`
  
`

export default TeamAccountUpdateIndividualList