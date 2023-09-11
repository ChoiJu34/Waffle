import React, {useState} from 'react';
import styled from 'styled-components';


const RecoCardList = () => {
  const [creaditdata, setCreaditData] = useState();
  const [company, setCompany] = useState();
  const [budget, setBudget] = useState();

  // const saverecocardboard = async () => {
  //   try {
  
  //     const params = {
  //       fpId: {
  //         "id": Number(postid),       
  //     },
  //       content:commentboard.commentcontent,
  //       anonymous : anonymous,
  //     }
  //     // 서버에 보낼 데이터 구조를 맞추기 위해 board 객체를 변경합니다.
  //     const response = await requestPost(`free/comment/save/${postid}`, params);
  //     console.log(response);
  //     alert('등록되었습니다.');
  //     getBoardList()
  //   } catch (error) {
  //     console.error('댓글 등록 에러:', error);
  //     getBoardList()
  //   }
    
  // };
  return (
    <Container>
      <div>여행카드추천</div>
      <Creditbox>
        <div>카드 종류</div>
        <Checkcardbox>체크카드</Checkcardbox>
        <Checkcardbox>신용카드</Checkcardbox>
      <Companybox>
        <div>카드사 선택</div>
        <div>미선택시 모든 카드사를 검색합니다.</div>
        <div></div>
      </Companybox>
      <Budgetbox>
      </Budgetbox>
      </Creditbox>
    </Container>
  );
};

export default RecoCardList;

const Container = styled.div`
  margin-top: 170px;
  width: 360px;
`
const Creditbox = styled.div`
  width: 340px;
  height: 130px;
  border: 1px solid #B3B1B1;
`

const Checkcardbox = styled.div`
  width: 120px;
  height: 50px;
  border: 1px solid #B3B1B1;
`

const Companybox = styled.div`
  
`
const Budgetbox = styled.div`
  
`