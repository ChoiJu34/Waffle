import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import RecoCardMain from './RecoCardMain'

const RecoCardList = (props) => {
      // 이후 res를 활용하여 데이터를 렌더링하는 로직을 작성합니다.


    const location = useLocation()
    const data = location.state?.value.result
    const count = location.state?.value.length
    console.log(data)
    console.log(count)
    return (
      <Container>
       {data && data.map(({ recommendNumber, cardId, cardCompany, cardName,discountPrice}) => (
        <Contentbox id={recommendNumber}>
        <img src="/cardlogo/card.png" alt="" />
        <div>{cardName}</div>

        </Contentbox>
        ))}
      </Container>
    );
  };

export default RecoCardList

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 400px;
  height: 100%;

`
const CardList = styled.div`
  width: 340px;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`
const Contentbox = styled.div`
     width: 340px;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  & > img {
    width: 300px;
    height: px;

  }
`