import React from 'react'
import styled from 'styled-components'
import TemporaryKakaoLogo from '../../assets/kakaobanklogo.png'
import BookmarkPlane from '../../assets/bookmarkPlane.png'
import BookmarkHotel from '../../assets/bookmarkHotel.png'
import BookmarkStar from '../../assets/bookmarkStar.png'
import axios from 'axios'
import { useNavigate } from 'react-router'


const FavoriteItem = ( { data, handleDelete } ) => {

  const totalHotelOriginPrice = data.hotel.reduce((acc, currentItem) => {
    const price = currentItem.originPrice ? parseInt(currentItem.originPrice, 10) : 0;
    return acc + price;
  }, 0);
  
  const totalHotelDiscountPrice = data.hotel.reduce((acc, currentItem) => {
    const price = currentItem.discountPrice ? parseInt(currentItem.discountPrice, 10) : 0;
    return acc + price;
  }, 0);
  
  const totalPlaneOriginPrice = data.plane.reduce((acc, currentItem) => {
    const price = currentItem.originPrice ? parseInt(currentItem.originPrice, 10) : 0;
    return acc + price;
  }, 0);
  
  const totalPlaneDiscountPrice = data.plane.reduce((acc, currentItem) => {
    const price = currentItem.discountPrice ? parseInt(currentItem.discountPrice, 10) : 0;
    return acc + price;
  }, 0);

  const discountRatio = Math.round((totalHotelDiscountPrice + totalPlaneDiscountPrice) / (totalHotelOriginPrice + totalPlaneOriginPrice) * 100)

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const token = localStorage.getItem('access_token')

  const headers = {
    "Authorization": "Bearer " + token
  }

  const deleteBookmark = () => {
    axios.delete(`/package/delete-favorite/${data.id}`, {headers: headers})
    .then(response => {
      handleDelete(data.id)
    })
    .catch(error => {
      console.error('서버탓이야')
      alert('서버탓임')
    })
  }


  const navigate = useNavigate()
  const PostData = async (res) => {
    try {
  
      console.log("res", res);   
      navigate('/mypage/favorite/detail', { state: { value: res} });   
  
    } catch (error) {
      console.error('포스트 에러', error);
    } 
  };


  return (
    <FavoriteItemWrapper onClick={() => PostData(data)}>
    <div className="favorite-item-container">
      <div className="card-name-container">{data.card ? data.card : "모든 카드"}</div>
      <div className="favorite-item-discount-text">
        <div className="discount-container">
          <img src={BookmarkPlane} alt="비행기를타고가던너따라가고싶어울었던" className="favorite-item-discount-img"/>
          <span>-{numberWithCommas(totalPlaneDiscountPrice)}원</span>
        </div>
        <div className="discount-container">
          <img src={BookmarkHotel} alt="철없을적내기억속에비행기타고가요파란" className="favorite-item-discount-img"/>
          <span>-{numberWithCommas(totalHotelDiscountPrice)}원</span>
        </div>
      </div>

      <div className="favorite-item-ratio">
        <img src={BookmarkStar} alt="반짝반짝빛나는스타rrrr" className="favorite-item-star" onClick={deleteBookmark}/>
        <span>{discountRatio}% 할인</span>
      </div>
    </div>
  </FavoriteItemWrapper>
  )
}

const FavoriteItemWrapper = styled.div`
  height: 10vh;
  width: 70vw;
  display: flex;
  justify-content: center;
  margin: 7vh auto;

  .favorite-item-container {
    width: 100%;
    display: flex;
    background-color: #C1EBFC;
    border-radius: 15px;
    position: relative;
  }

  .favorite-item-discount-text {
    height: 60%;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 2vh;
    margin-left: 7vw;
  }

  .discount-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;  
  }

  .favorite-item-discount-img {
    height: 2.5vh;
    margin-right: 10px;  
  }

  .favorite-item-ratio {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    width: 35%; 
    padding-right: 1vw; 
}

.favorite-item-star {
    position: absolute;
    top: 1vh;
    height: 2vh;
}

.card-name-container {
  position: absolute;
  top: -2vh;
  left: 5vw;
  font-size: 1.4vh;
  background-color: #FFEEBB;
  width: 35vw;
  height: 3vh;
  border-radius: 7px;
  padding-top: 1vh;
  line-height: 0.3vh;
  z-index: -300;
}
`

export default FavoriteItem