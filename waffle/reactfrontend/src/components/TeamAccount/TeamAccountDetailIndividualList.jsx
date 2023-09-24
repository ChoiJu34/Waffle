import React from 'react'
import styled from 'styled-components'
import TeamAccountDetailIndividualItem from './TeamAccountDetailIndividualItem'
import SurprisinglyNoOne from '../../assets/NoOne.png'

const TeamAccountDetailIndividualList = () => {

  const isNoIndividual = true

    return (
  <TeamAccountDetailIndividualListWrapper>
      {isNoIndividual ?
        (<div className="no-one-container">
          <img src={SurprisinglyNoOne} alt="SurprisinglyNoOne" className="no-one"/>
        </div>) : (
        <>
        <TeamAccountDetailIndividualItem />
        <TeamAccountDetailIndividualItem />
        <TeamAccountDetailIndividualItem />
        <TeamAccountDetailIndividualItem />
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