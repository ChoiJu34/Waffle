import React from 'react'
import styled from 'styled-components'
import TeamAccountList from './TeamAccountList'

const TeamAccount = () => {
  return (
    <TeamAccountWrapper>
      <TeamAccountList />
    </TeamAccountWrapper>
  )
}

const TeamAccountWrapper = styled.div`
 min-height: 100%;
`

export default TeamAccount