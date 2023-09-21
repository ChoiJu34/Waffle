import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TeamAccountItem from './TeamAccountItem'

const TeamAccountList = () => {
  return (
    <TeamAccountListWrapper>
      <TeamAccountItem />
      <div className="team-account-add"><FontAwesomeIcon icon={faPlus} color="black" size="2x"/></div>
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
    margin-top: 5vh;
  }
`

export default TeamAccountList