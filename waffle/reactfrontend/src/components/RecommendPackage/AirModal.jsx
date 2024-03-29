// import { icClose } from 'assets';
import styled from 'styled-components';
import { GrFormClose } from "react-icons/gr";

function AirModal({ title, closeModal, children }) {
  return (
    <>
      <StyledModalBackground />
      <StyledBottomSheet>
        <StyledBottomSheetHeader>
          <GrFormClose size={30} onClick={closeModal}>X</GrFormClose>
          <div>{title}</div>
        </StyledBottomSheetHeader>
        <div>{children}</div>
      </StyledBottomSheet>
    </>
  );
}

export default AirModal;

const StyledModalBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #292929;
  opacity: 0.5;
  z-index: 1;
`;

const StyledBottomSheet = styled.div`
  margin-left: 0px;
  margin-bottom: 10px;
  z-index: 2;
  position: fixed;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 60);
  max-height: 90%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  bottom: 0;
  border-radius: 1rem 1rem 0 0;
  background-color: white
`;

const StyledBottomSheetHeader = styled.div`
  height: 4.4rem;
  padding: 1.1rem 2.2rem 0.9rem 2.2rem;
  display: flex;
  align-items: center;
  border-bottom: 0.1rem solid gray;
  position: sticky;
  top: 0;
  background: white;
  z-index: 9999;

  & > img {
    cursor: pointer;
  }

  & > div {
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 1.7rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;