import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import CardDelete from "../../assets/carddelete.png";

// 국민카드, 롯데카드, 삼성카드, 토스뱅크 없음

const MyCardItem = ({ data, setModalOpen, setDeleteCardId }) => {
  const [logoLink, setLogoLink] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [backClick, setBackClick] = useState(false);

  useEffect(() => {
    if (data.company === "BNK부산은행") {
      setLogoLink("/cardlogo/BNKlogo.png");
      setBackgroundColor("#E76060");
    } else if (data.company === "IBK기업은행") {
      setLogoLink("/cardlogo/ibklogo.png");
      setBackgroundColor("#AADAEF");
    } else if (data.company === "KB국민카드") {
      //   setLogoLink("/cardlogo/ibklogo.png");
      //   setBackgroundColor("#fff");
    } else if (data.company === "MG새마을금고") {
      setLogoLink("/cardlogo/MGlogo.png");
      setBackgroundColor("#AADAEF");
    } else if (data.company === "NH농협카드") {
      setLogoLink("/cardlogo/nonghyuplogo.png");
      setBackgroundColor("#EEC55B");
    } else if (data.company === "롯데카드") {
      //   setLogoLink("/cardlogo/nonghyuplogo.png");
      //   setBackgroundColor("#fff");
    } else if (data.company === "신한카드") {
      setLogoLink("/cardlogo/shinhanlogo.png");
      setBackgroundColor("#AADAEF");
    } else if (data.company === "우리카드") {
      setLogoLink("/cardlogo/woorilogo.png");
      setBackgroundColor("#AADAEF");
    } else if (data.company === "토스뱅크") {
      //   setLogoImg(tossbank);
      //   setBackgroundColor("#AADAEF");
    } else if (data.company === "하나카드") {
      setLogoLink("/cardlogo/hana.png");
      setBackgroundColor("#8EE696");
    } else if (data.company === "현대카드") {
      setLogoLink("/cardlogo/HDlogo.png");
      setBackgroundColor("#AADAEF");
    }
  }, []);

  const cardClick = () => {
    setBackClick(!backClick);
  };

  const cardDelete = async () => {
    setDeleteCardId(); // 사용자 카드 id 설정 필
    setModalOpen(true);
  };

  console.log(data);

  return (
    <CardItem
      onClick={cardClick}
      style={{
        backgroundColor: backgroundColor,
        transform: backClick ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
    >
      {!backClick ? (
        <CardItemFront>
          <CardItemHeader>
            <img src={logoLink} alt="로고없음"></img>
            <img src={CardDelete} onClick={cardDelete} alt="지우기없음"></img>
          </CardItemHeader>
          <CardItemNameInfo>
            <div style={{ marginBottom: "10px" }}>{data.company}</div>
            <div>{data.name}</div>
          </CardItemNameInfo>
        </CardItemFront>
      ) : (
        <CardItemBack>
          <CardItemHeader>
            <img src={logoLink} alt="로고없음"></img>
            <img src={CardDelete} onClick={cardDelete} alt="지우기없음"></img>
          </CardItemHeader>
          <CardItemContentInfo></CardItemContentInfo>
        </CardItemBack>
      )}
    </CardItem>
  );
};

export default MyCardItem;

const CardItem = styled.div`
  border-radius: 15px;
  width: 275px;
  height: 175px;
  margin-bottom: 20px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  cursor: pointer;
`;

const CardItemFront = styled.div``;

const CardItemBack = styled.div`
  transform: rotateY(180deg);
`;

const CardItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
  margin-right: 15px;

  & > img {
    width: 35px;
    height: 35px;
    margin-top: 15px;
  }
`;

const CardItemNameInfo = styled.div`
  margin-top: 25px;
  font-size: 20px;
`;

const CardItemContentInfo = styled.div``;
