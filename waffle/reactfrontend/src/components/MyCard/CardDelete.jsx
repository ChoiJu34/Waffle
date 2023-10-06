import styled from "styled-components";
import axios from "axios";

const CardDelete = ({ setModalOpen, deleteCardId, setCardList }) => {
  const token = localStorage.getItem("access_token");

  const headers = {
    Authorization: "Bearer " + token,
  };

  const cardDelete = async () => {
    await axios.delete(`/user-card/${deleteCardId}`, { headers });
    const response = await axios.get("/user-card/list", { headers });
    setCardList(response.data.result);
    setModalOpen(false);
  };

  return (
    <CardDeleteModal>
      <CardDeleteHeader>등록된 카드를 삭제하겠습니까?</CardDeleteHeader>
      <CardDeleteFooter>
        <CardDeleteCancle onClick={() => setModalOpen(false)}>
          취소
        </CardDeleteCancle>
        <CardDeleteConfirm onClick={() => cardDelete()}>삭제</CardDeleteConfirm>
      </CardDeleteFooter>
    </CardDeleteModal>
  );
};

export default CardDelete;

const CardDeleteModal = styled.div`
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 20%;
  background-color: #fff;
  margin-bottom: 100px;
`;

const CardDeleteHeader = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid;
  font-size: 20px;
`;

const CardDeleteFooter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CardDeleteCancle = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  border-right: 1px solid;
  justify-content: center;
  align-items: center;
`;

const CardDeleteConfirm = styled.div`
  flex: 1;
  display: flex;
  color: #9ac5f4;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
