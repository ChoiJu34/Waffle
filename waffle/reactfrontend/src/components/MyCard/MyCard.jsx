import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import MyCardList from "./MyCardList";
import CardDelete from "./CardDelete";
import NoMyCard from "../../assets/NoMyCard.png";

const MyCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState(0);
  const [cardList, setCardList] = useState([]);
  const [cardListLoading, setCardListLoading] = useState(false);

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
        setCardListLoading(true);
      })
      .catch((error) => {
        console.error("리스트 가져오기 실패");
        setCardListLoading(true);
      });
  }, []);

  return (
    <div>
      {modalOpen ? (
        <ModalBackGround onClick={() => setModalOpen(false)}>
          <CardDelete
            setModalOpen={setModalOpen}
            deleteCardId={deleteCardId}
            setCardList={setCardList}
          ></CardDelete>
        </ModalBackGround>
      ) : (
        <MyCardItem>
          <div>
            {cardListLoading ? (
              <div>
                {cardList?.length !== 0 ? (
                  <MyCardList
                    cardList={cardList}
                    setModalOpen={setModalOpen}
                    setDeleteCardId={setDeleteCardId}
                  ></MyCardList>
                ) : (
                  <div>
                    <img
                      src={NoMyCard}
                      style={{
                        width: "40%",
                        height: "40%",
                      }}
                    ></img>
                    <div
                      style={{
                        fontSize: "20px",
                        marginBottom: "50px",
                      }}
                    >
                      등록된 내 카드가 없어요
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <button
            className="registerCardBtn"
            onClick={() => navigate("/mypage/card-register")}
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
