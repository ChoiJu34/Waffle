import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import FavoriteItem from './FavoriteItem'
import axios from 'axios'

const FavoriteList = () => {

  const token = localStorage.getItem('access_token')

  const headers = {
    "Authorization": "Bearer " + token
  }

  const [yourFavorite, setYourFavorite] = useState()

  useEffect (() => {
    axios.get('/package/get-favorite-list', {headers})
    .then(response => {
      setYourFavorite(response.data.list)
    })
    .catch(error => {
      console.error('대실패')
      alert('리스트 못가져옴')
    })
    
  }, [])

  return (
    <FavoriteListWrapper>
      {yourFavorite?.map((data, index) => (
        <FavoriteItem key={index} data={data}/>
      ))}
    </FavoriteListWrapper>
  )
}

const FavoriteListWrapper = styled.div`
  margin-top: 5vh;
`

export default FavoriteList