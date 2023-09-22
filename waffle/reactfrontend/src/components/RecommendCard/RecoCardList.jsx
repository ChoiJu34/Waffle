import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecoCardList = (props) => {

  
    const location = useLocation()
    const data = location.state?.value.result
    const count = location.state?.value.result.length

  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <Container>
        <Slider {...settings}>
       {data && data.map(({ recommendNumber, cardId, cardCompany, cardName,discountPrice,getPrice}) => (
        <Contentbox id={recommendNumber}>
          <Cardimgbox>

          <img src={`https://j9d109.p.ssafy.io/downloads/${cardId}.png`}  alt="카드사진" />
          </Cardimgbox>
          <div>{cardName}</div>
          <div>{getPrice?.['total']}</div>
        </Contentbox>
        ))}
        </Slider>
      </Container>
    );
  };

export default RecoCardList

const Container = styled.div`
    margin-top: 30px;
    :not(:last-child) {
        margin-bottom: 50px;
    }
`;
const CardList = styled.div`
  width: 330px;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`
const Contentbox = styled.div`
  width: 350px;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  & > img {
    width: 300px;

  }
`

const Title = styled.span`
    font-size: 20px;
    font-weight: 600;
`;
 
const Grid = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-gap: 25px;
`;
 
const Wrapper = styled.div`
    margin: 40px auto; 
    width: 95%;
`;
 
const Cardimgbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  & > img {
    width: 350px;
    padding: 10px;

  }
`