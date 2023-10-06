import styled from "styled-components";
import MyCardItem from "./MyCardItem";

const MyCardList = ({ cardList, setModalOpen, setDeleteCardId }) => {
  return (
    <MyCardListWrapper>
      {cardList?.map((data, index) => (
        <MyCardItem
          key={index}
          data={data}
          setModalOpen={setModalOpen}
          setDeleteCardId={setDeleteCardId}
        />
      ))}
    </MyCardListWrapper>
  );
};

export default MyCardList;

const MyCardListWrapper = styled.div``;
