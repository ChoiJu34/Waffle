import React, {useState} from 'react';
import styled from 'styled-components';


const RecoCardMain = () => {
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
      <Maintext>여행카드추천</Maintext>
      <Creditbox>
        <Cardtext>카드 종류</Cardtext>
        <Checkcardline>
          <Checkcardbox>체크카드</Checkcardbox>
          <Checkcardbox>신용카드</Checkcardbox>
        </Checkcardline>
      </Creditbox>
      <Companybox>
        <Companytext>
          <Latext>카드사 선택</Latext>
          <Smalltext>미선택시 모든 카드사를 검색합니다.</Smalltext>
        </Companytext>
        <Company>+</Company>
      </Companybox>
      <Budgetbox>
        <Budgettext>여행비용</Budgettext>
        <Writebox>
          <Frombox>
            <From>국가</From><div></div>
          </Frombox>
          <Shopbox>
            <div>면세점</div><input type="text" />
          </Shopbox>
          <Usebox>
          <div>해외이용</div><input type="text" />
          </Usebox>
        </Writebox>
        <Line/>
        <Totalbox>
          <div>총 금액</div><div>1,700,000원</div>
        </Totalbox>  
        </Budgetbox>
      <div>확인</div>
    </Container>
  );
};

export default RecoCardMain;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 400px;
`
const Maintext = styled.div`
  padding-bottom: 10px;
  font-size: 20px;
`

const Creditbox = styled.div`
  width: 340px;
  height: 100px;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  
`
const Cardtext = styled.div`
  padding-top: 10px;
  padding-left: 15px;
  padding-bottom: 10px;
  display: flex;
`
const Checkcardbox = styled.div`
  width: 140px;
  height: 30px;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

`
const Checkcardline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 3px;
`
const Companybox = styled.div`
  width: 340px;
  height: 80px;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

`
const Companytext = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  
`
const Latext = styled.div`
  margin-top: 10px;
  margin-left: 15px;
`

const Smalltext = styled.div`
  font-size: 13px;
  margin-left: 3px;
  color: #DD3232;
`

const Company = styled.div`
  width: 80px;
  border-radius: 7px;
  border: 1px dashed;
  margin: 10px;
`

const Budgetbox = styled.div`
  width: 340px;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`
const Budgettext = styled.div`
  display: flex;
  margin: 15px;
`
const Writebox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`
const Frombox = styled.div`
  margin: 15px;
`
const From = styled.div`
`
const Shopbox = styled.div`
  width: 280px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 15px;
`
const Usebox = styled.div`
 width: 280px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 15px;
`
const Totalbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
`
const Line = styled.hr`
  width: 280px;
`