import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import Slider from "react-slick";

const RecoCardList = (props) => {

  
    const location = useLocation()
    const data = location.state?.value.result
    const count = location.state?.value.length
    console.log(data)
    console.log(count)
    const Section: React.FunctionComponent<Props> = ({ slide, title, children }) => {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 9,
        slidesToScroll: 9,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 7
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
      };
      };

    return (
      <Container>
       {data && data.map(({ recommendNumber, cardId, cardCompany, cardName,discountPrice}) => (
        <Contentbox id={recommendNumber}>
        <img src="/cardlogo/card.png" alt="" />
        <div>{cardName}</div>

        </Contentbox>
        ))}
      </Container>
    );
  };

  

export default RecoCardList

const Container = styled.div`
    margin-top: 10px;
    :not(:last-child) {
        margin-bottom: 50px;
    }
`;
const CardList = styled.div`
  width: 340px;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`
const Contentbox = styled.div`
     width: 340px;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  & > img {
    width: 300px;
    height: px;

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
 