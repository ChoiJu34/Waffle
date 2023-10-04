import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import MyCardList from "./MyCardList";
import CardRegister from "./CardRegister";
import CardDelete from "./CardDelete";

const MyCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [CardList, setCardList] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  const headers = {
    Authorization: "Bearer " + token,
  };

  useEffect(() => {
    axios
      .get("/user-card/list", { headers })
      .then((response) => {
        setCardList(response.data.result);
      })
      .catch((error) => {
        console.error("리스트 가져오기 실패");
      });
  }, []);

  return (
    <div>
      {modalOpen ? (
        <ModalBackGround>
          <CardDelete></CardDelete>
        </ModalBackGround>
      ) : (
        <MyCardItem>
          <MyCardList></MyCardList>
          <button
            className="registerCardBtn"
            onClick={() => navigate("/mycard/card-register")}
          >
            +
          </button>
        </MyCardItem>
      )}
    </div>
  );
};

export default MyCard;

const ModalBackGround = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const MyCardItem = styled.div`
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .registerCardBtn {
    border-radius: 15px;
    width: 70%;
    height: 100%;
    border-style: dashed;
    border-color: gray;
    border-width: 4px;
    background-color: white;
    font-size: 4vh;
    padding: 60px;
    color: gray;
  }
`;
