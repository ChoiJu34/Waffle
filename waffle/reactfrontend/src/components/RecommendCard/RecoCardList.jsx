import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import travel from '../../assets/travel.png'
import wallet from '../../assets/wallet.png'
import {PiAirplaneTiltDuotone} from "react-icons/pi"
import {GrMoney} from "react-icons/gr"
import {HiOutlineBuildingStorefront} from "react-icons/hi2"
import {BsCreditCard} from "react-icons/bs"
import {FaEarthAmericas} from "react-icons/fa6"

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
  function goToUrl(url) {
    window.open(url, '_blank');
  }

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
                ) : (<Cardboxtitle>환전</Cardboxtitle>)}


                {cardName === "트래블로그" ? (<Cardimgbox>
                  <img
                    src={travel}
                    alt="카드사진"
                    onClick={() => imgClick(cardId, originalPrice, discountPrice)}
                  />
                </Cardimgbox>
                ) : cardName === "트래블월렛" ? (<Cardimgbox>
                  <img
                    src={wallet}
                    alt="카드사진"
                    onClick={() => imgClick(cardId, originalPrice, discountPrice)}
                  />
                </Cardimgbox>)
                : (<Cardimgbox>
                  <img
                    src={`https://j9d109.p.ssafy.io/downloads/${cardId}.png`}
                    alt="카드사진"
                    onClick={() => imgClick(cardId, originalPrice, discountPrice)}
                  />
                </Cardimgbox>)}



                <Cardnamefont>{cardName}</Cardnamefont>


                {cardName === "트래블로그" ? (<Getbox>
                  <Getsmallbox2>
                    <PiAirplaneTiltDuotone size={30} ></PiAirplaneTiltDuotone>
                    <div>
                      해외 가맹점 이용 수수료 면제서비스
                    </div>
                  </Getsmallbox2>
                  <Getsmallbox2>
                    <GrMoney size={30} ></GrMoney>
                    <div>해외 ATM 인출 수수료 면제서비스</div>
                  </Getsmallbox2>
                  <Getsmallbox2>
                    <HiOutlineBuildingStorefront size={30}></HiOutlineBuildingStorefront>
                    <div>국내 가맹점 하나머니적립</div>
                  </Getsmallbox2>
                </Getbox>
                ) : cardName === "트래블월렛" ? (<Getbox>
                  <Getsmallbox2>
                    <BsCreditCard size={30}></BsCreditCard>
                    <div>
                    카드 한장에 다양한 외화 충전
                    </div>
                  </Getsmallbox2>
                  <Getsmallbox2>
                    <FaEarthAmericas size={30}>이용금 혜택</FaEarthAmericas>
                    <div>전세계 어디서든 수수료 부담 없이</div>
                  </Getsmallbox2>
                  <Getsmallbox2>
                    <GrMoney size={30}></GrMoney>
                    <div>잔돈 걱정 없이 전액 환불 가능</div>
                  </Getsmallbox2>
                </Getbox>)
                : (<Getbox>
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
                </Getbox>)}


                {cardName === "트래블로그" ? (<>
                </>
                ) : cardName === "트래블월렛" ? (<>
                </>)
                : (<Totalbox>
                  <p className="origintotal">
                    {originalPrice?.["total"].toLocaleString("ko-KR")}원
                  </p>
                  <div>
                    <div className="distotal">
                      {discountPrice?.["total"].toLocaleString("ko-KR")}원
                    </div>
                  </div>
                </Totalbox>)}
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
const Getsmallbox2 = styled.div`
  width: 90%;
  margin-bottom: 12vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;
