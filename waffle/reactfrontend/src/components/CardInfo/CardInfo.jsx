import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CardInfo = () => {
  const location = useLocation();
  const cardId = location.state.cardId;

  const [cardInfo, setCardInfo] = useState(null);

  useEffect(() => {
    axios
      .get("/cardinfo/" + cardId)
      .then((response) => {
        // 응답 데이터를 상태에 설정
        setCardInfo(response.data);
      })
      .catch((error) => {
        console.error("에러 발생 : ", error);
      });
  }, []);

  console.log(cardId);
  console.log(cardInfo);

  return <div></div>;
};

export default CardInfo;
