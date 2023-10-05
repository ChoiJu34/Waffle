import React from 'react'
import styled from 'styled-components'
import TeamAccountUpdateIndividualItem from './TeamAccountUpdateIndividualItem'

const TeamAccountUpdateIndividualList = ({ sentData, updateGoal }) => {
  return (
    <TeamAccountUpdateIndividualListWrapper>
      {sentData?.map((data, index) => (
        <TeamAccountUpdateIndividualItem key={data.name} data={data} index={index} updateGoal={updateGoal}/>
      ))}
    </TeamAccountUpdateIndividualListWrapper>
  )
}

const TeamAccountUpdateIndividualListWrapper = styled.div`
  width: 90vw;
  align-items: center;
  margin-left: 2vw;
`

export default TeamAccountUpdateIndividualList