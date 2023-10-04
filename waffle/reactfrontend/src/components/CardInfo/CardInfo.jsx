import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const CardInfo = () => {
  const location = useLocation();
  const cardId = location.state.cardId;
  const originalPriceTotal = location.state.originalPrice.total;
  const discountPriceTotal = location.state.discountPrice.total;
  const navigate = useNavigate();

  const [cardInfo, setCardInfo] = useState(null);

  useEffect(() => {
    axios
      .get("/cardinfo/" + cardId)
      .then((response) => {
        setCardInfo(response.data);
      })
      .catch((error) => {
        console.error("에러 발생 : ", error);
      });
  }, [cardId]);

  if (!cardInfo) {
    return null;
  }

  const desiredOrder = [
    "면세점",
    "해외가맹점",
    "해외이용액",
    "공항서비스",
    "기타서비스",
  ];

  const benefitTypes = desiredOrder.filter(
    (type) => cardInfo.result.cardBenefitMap[type]
  );

  const goBack = () => {
    navigate(-1);
  };

  console.log(cardId);
  console.log(originalPriceTotal);
  console.log(discountPriceTotal);
  console.log(cardInfo);

  return (
    <Container>
      <Cardimgbox>
        <a
          href={cardInfo.result.cardEntity.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://j9d109.p.ssafy.io/downloads/${cardId}.png`}
            alt="카드사진"
          />
        </a>
      </Cardimgbox>
      <Cardnamefont>{cardInfo.result.cardEntity.name}</Cardnamefont>
      <CardBenefitList>
        {benefitTypes.map((benefitType) => (
          <Benefit key={benefitType}>
            <BenefitType>
              <Circle></Circle> {benefitType}
            </BenefitType>
            {cardInfo.result.cardBenefitMap[benefitType].map(
              (benefit, index) => (
                <div>
                  {benefit.benefitEntity.type !== 5 ? (
                    <div>
                      {benefit.check ? (
                        <BenefitWarp>
                          <BenefitLimit>
                            {benefit.benefitEntity.what}{" "}
                            {benefit.benefitEntity.benefitIf.toLocaleString()}
                            {"원 이상 사용 시"}
                          </BenefitLimit>
                          <BenefitDetail>
                            {benefit.benefitEntity.at}{" "}
                            {benefit.benefitEntity.benefitCase}{" "}
                            {benefit.benefitEntity.percent !== null ? (
                              <>{benefit.benefitEntity.percent * 100}% 할인</>
                            ) : (
                              <></>
                            )}
                            {benefit.benefitEntity.price !== null ? (
                              <>
                                {benefit.benefitEntity.price.toLocaleString()}원
                                할인
                              </>
                            ) : (
                              <></>
                            )}
                            {benefit.benefitEntity.base !== null ? (
                              <>
                                {benefit.benefitEntity.base}원 당{" "}
                                {benefit.benefitEntity.basePer}원 할인
                              </>
                            ) : (
                              <></>
                            )}{" "}
                            {benefit.benefitEntity.max !== null ? (
                              <>
                                (최대{" "}
                                {benefit.benefitEntity.max.toLocaleString()}원
                                할인)
                              </>
                            ) : (
                              <></>
                            )}
                          </BenefitDetail>
                        </BenefitWarp>
                      ) : (
                        <BenefitWarp>
                          {benefit.benefitEntity.at}{" "}
                          {benefit.benefitEntity.benefitCase}{" "}
                          {benefit.benefitEntity.percent !== null ? (
                            <>{benefit.benefitEntity.percent * 100}% 할인</>
                          ) : (
                            <></>
                          )}
                          {benefit.benefitEntity.price !== null ? (
                            <>
                              {benefit.benefitEntity.price.toLocaleString()}원
                              할인
                            </>
                          ) : (
                            <></>
                          )}
                          {benefit.benefitEntity.base !== null ? (
                            <>
                              {benefit.benefitEntity.base}원 당{" "}
                              {benefit.benefitEntity.basePer}원 할인
                            </>
                          ) : (
                            <></>
                          )}{" "}
                          {benefit.benefitEntity.max !== null ? (
                            <>(최대 {benefit.benefitEntity.max}원 할인)</>
                          ) : (
                            <></>
                          )}
                        </BenefitWarp>
                      )}
                    </div>
                  ) : (
                    <div>
                      {benefit.check ? (
                        <BenefitWarp>
                          <BenefitLimit>
                            {benefit.benefitEntity.what}{" "}
                            {benefit.benefitEntity.benefitIf.toLocaleString()}
                            {"원 이상 사용 시"}
                          </BenefitLimit>
                          <BenefitDetail>
                            {benefit.benefitEntity.at}{" "}
                            {benefit.benefitEntity.benefitCase}{" "}
                            {benefit.benefitEntity.limit !== null ? (
                              <>({benefit.benefitEntity.limit})</>
                            ) : (
                              <></>
                            )}
                          </BenefitDetail>
                        </BenefitWarp>
                      ) : (
                        <BenefitWarp>
                          {benefit.benefitEntity.at}{" "}
                          {benefit.benefitEntity.benefitCase}{" "}
                          {benefit.benefitEntity.limit !== null ? (
                            <>({benefit.benefitEntity.limit})</>
                          ) : (
                            <></>
                          )}
                        </BenefitWarp>
                      )}
                    </div>
                  )}
                </div>
              )
            )}
          </Benefit>
        ))}
      </CardBenefitList>
      <Totalbox>
        <p className="origintotal">
          {originalPriceTotal.toLocaleString("ko-KR")}원
        </p>
        <div>
          <div className="distotal">
            {discountPriceTotal.toLocaleString("ko-KR")}원
          </div>
        </div>
      </Totalbox>
    </Container>
  );
};

export default CardInfo;

const Container = styled.div``;

const Cardimgbox = styled.div`
  height: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  & img {
    width: auto;
    max-height: 230px;
    cursor: pointer;
  }
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Cardnamefont = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`;

const CardBenefitList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Benefit = styled.div`
  margin-top: 10px;
  margin-left: 40px;
  margin-bottom: 10px;
`;

const BenefitType = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const Circle = styled.div`
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: black;
  margin-right: 10px;
`;

const BenefitWarp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 10px;
  maring-bottom: 10px;
  margin-left: 20px;
`;

const BenefitLimit = styled.div``;

const BenefitDetail = styled.div``;

const Totalbox = styled.div`
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
  margin-right: 40px;
`;
