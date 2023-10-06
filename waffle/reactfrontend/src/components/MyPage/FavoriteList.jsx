import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import FavoriteItem from './FavoriteItem'
import axios from 'axios'
import bookmarkEmpty from '../../assets/bookmarkEmpty.png'

const FavoriteList = () => {

  const navigate = useNavigate()

  const token = localStorage.getItem('access_token')

  const headers = {
    "Authorization": "Bearer " + token
  }

  const [yourFavorite, setYourFavorite] = useState()

  useEffect (() => {
    axios.get('/package/get-favorite-list', {headers})
    .then(response => {
      setYourFavorite(response.data.list)
      console.log(response.data)
    })
    .catch(error => {
      console.error('대실패')
      alert('리스트 못가져옴')
    })
    
  }, [])

  const handleDelete = (id) => {
    const newItems = yourFavorite.filter(item => item.id !== id);
    setYourFavorite(newItems);
  }

  const goToPackage = () => {
    navigate('/package/main')
  }

  return (
    <FavoriteListWrapper>
      {yourFavorite?.length === 0 ? 
      (<>
      <img src={bookmarkEmpty} alt="empty" className="bookmark-empty-img"></img>
      <div className="bookmark-empty-text">아직 관심있는 패키지가 없어요</div>
      <button onClick={goToPackage} className="bookmark-empty-button">패키지 추천받기</button>
      </>) : 
      (<>
        {yourFavorite?.map((data, index) => (
        <FavoriteItem key={index} data={data} handleDelete={handleDelete}/>
      ))}</>)}
    </FavoriteListWrapper>
  )
}

const FavoriteListWrapper = styled.div`
  margin-top: 5vh;

  .bookmark-empty-img {
    height: 28vh;
    margin-top: 15vh;
  }

  .bookmark-empty-text {
    font-size: 2.7vh;
    margin-top: 3vh;
  }

  .bookmark-empty-button {
    width: 40vw;
    height: 4.5vh;
    background-color: #C1EBFC;
    border: none;
    font-weight: 800;
    font-size: 2vh;
    border-radius: 10px;
    margin-top: 2vh;
  }
`

export default FavoriteList