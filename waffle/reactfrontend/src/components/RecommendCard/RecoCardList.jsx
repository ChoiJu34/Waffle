import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecoCardList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.value.result;
  const count = location.state?.value.result.length;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };



  const imgClick = (cardId, originalPrice, discountPrice) => {

    navigate("/cardinfo/" + cardId, {
      state: {
        cardId: cardId,
        originalPrice: originalPrice,
        discountPrice: discountPrice,
        
      },
    });
  };

  return (
    <Container>
      <Slider {...settings}>
        {data &&
          data.map(
            ({
              recommendNumber,
              cardId,
              cardCompany,
              cardName,
              discountPrice,
              getPrice,
              originalPrice,
            }) => (
              <Contentbox id={recommendNumber}>
                {recommendNumber === 1 ? (
                  <Cardboxtitle>최적의 카드</Cardboxtitle>
                ) : recommendNumber === 2 ? (
                  <Cardboxtitle>많은 혜택</Cardboxtitle>
                ) : (
                  <Cardboxtitle>환전</Cardboxtitle>
                  
                )}      
                <Cardimgbox>
                  <img
                    src={`https://j9d109.p.ssafy.io/downloads/${cardId}.png`}
                    alt="카드사진"
                    onClick={() => imgClick(cardId, originalPrice, discountPrice)}
                  />
                </Cardimgbox>
                <Cardnamefont>{cardName}</Cardnamefont>
                <Getbox>
                  <Getsmallbox>
                    <div>면세점 혜택</div>
                    <div>
                      {getPrice?.["dutyFree"].toLocaleString("ko-KR")}원
                    </div>
                  </Getsmallbox>
                  <Getsmallbox>
                    <div>이용금 혜택</div>
                    <div>{getPrice?.["use"].toLocaleString("ko-KR")}원</div>
                  </Getsmallbox>
                  <Getsmallbox>
                    <p>총 혜택</p>
                    <p>{getPrice?.["total"].toLocaleString("ko-KR")}원</p>
                  </Getsmallbox>
                </Getbox>
                <Totalbox>
                  <p className="origintotal">
                    {originalPrice?.["total"].toLocaleString("ko-KR")}원
                  </p>
                  <div>
                    <div className="distotal">
                      {discountPrice?.["total"].toLocaleString("ko-KR")}원
                    </div>
                  </div>
                </Totalbox>
              </Contentbox>
            )
          )}
      </Slider>
    </Container>
  );
};

export default RecoCardList;
const Nonecardbox = styled.div`
    margin-bottom: 9vw;
`

const Favoritebox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 90%;
    font-size: 6vw;
    border-bottom: 1px solid #B3B1B1;
    padding-bottom: 2vw;
`

const Favoritebox2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
    width: 100%;
    .start {
        color: #9AC5F4;
    }
`

const Container = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
`;

const CardList = styled.div`
  width: 330px;
  border: 1px solid #b3b1b1;
  border-radius: 7px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const Contentbox = styled.div`
  /* border: 1px solid #B3B1B1; */
  border-radius: 7px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  /* box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); */
  & > img {
    width: 300px;
  }
`;

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
  height: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  cursor: pointer;
  & > img {
    max-width: 300px;
    max-height: 300px;
  }
`;
const Cardboxtitle = styled.div`
  font-size: 20px;
  margin-top: 1vh;
  margin-left: 3vh;
  margin-bottom: 2vh;
  display: flex;
  justify-content: start;
`;

const Cardnamefont = styled.div`
  font-size: 30px;
  margin: 20px;
`;
const Getbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 20px;
  margin-top: 5vh;
  margin-bottom: 1vh;
`;
const Totalbox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  margin-bottom: 10px;
  & > p {
    font-size: 17px;
    text-decoration: line-through;
    margin-bottom: 3px;
    margin-right: 22px;
    color: #898989;
  }
  & > div {
    font-size: 25px;
    display: flex;
  }
`;
const Getsmallbox = styled.div`
  width: 80%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: space-around;
  & > p {
    font-size: 25px;
  }
`;
