import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import BottomSheet from '../Commons/BottomSheet';

const RecoCardMain = () => {
  const [creaditData, setCreaditData] = useState();
  const [company, setCompany] = useState();
  const [budget, setBudget] = useState();
  const [checkCard, setCheckcard] = useState(0);
  const [creditCard, setCreditCard] = useState(0);
  const [nation, setNation] = useState();
  const [bottomSheetTitle, setBottomSheetTitle] = useState('국가선택');
  const [isModalOpen, setIsModalOpen] = useState(false);

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


  const clickCredit = async() => {
    setCreditCard(2);
  }

  const unClickCredit = async() => {
    setCreditCard(0);
  }
  const clickCheck= async() => {
    setCheckcard(1);
    console.log(nation)
  }

  const unClickCheck = async() => {
    setCheckcard(0);
    console.log(nation)
  }
 
  useEffect(() => {
   console.log(nation)
  }, []);
  // const likeBtn = async() => {
  //   const param = {
  //     fpId: {
  //       "id": Number(postid)     
  //   },
  // } 
  // try {
  //   console.log(param)
  //     const likeres = await axios.post('http://i9d108.p.ssafy.io:9999/api/free/post/is/good', param);
  //     setlike(true);
  //     console.log(like)
  //     console.log('성공')
    
  // } catch (error) {
  //   console.error('에러:', error);
  // }
  // };
  return (
    <Container>
      <Maintext>여행카드추천</Maintext>
      <Creditbox>
        <Cardtext>카드 종류</Cardtext>
        <Checkcardline>
        {(checkCard === 0 ? (
            <Checkcardbox onClick={clickCheck}>체크카드</Checkcardbox>
          ) : (
            <Checkcardbox2 onClick={unClickCheck}>체크카드</Checkcardbox2>
          ))}
        {(creditCard === 0 ? (
            <Checkcardbox onClick={clickCredit}>신용카드</Checkcardbox>
          ) : (
            <Checkcardbox2 onClick={unClickCredit}>신용카드</Checkcardbox2>
          ))}
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
            <From>국가</From><Nations onClick={setIsModalOpen}>+</Nations>
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
      {isModalOpen && (
        <BottomSheet title={bottomSheetTitle} closeModal={() => setIsModalOpen(false)}>
          {bottomSheetTitle === '위시리스트' ? (
            <StyledExistingWishList>
              <StyledButtonWrapper>
                <button onClick={() => setBottomSheetTitle('위시리스트 이름 정하기')}>
                  {/* <img src={icPlus} /> */}
                </button>
                <div>새로운 위시리스트 만들기</div>
              </StyledButtonWrapper>
              {/* <MiniWishListInfo list={wishListInfo} /> */}
            </StyledExistingWishList>
          ) : (
            <StyledNewWishList>
              <Countrybox>
              <Countryimg onClick={() => setNation("USA")} src="/countrys/US.png" alt="US"/>
              <div>미국</div>
              </Countrybox>
              <Countrybox>
              <Countryimg onClick={() => setNation("Europe")} src="/countrys/UR.png" alt="US"/>
              <div>유럽</div>
              </Countrybox>
              <Countrybox>
              <Countryimg onClick={() => setNation("England")} src="/countrys/UK.png" alt="US"/>
              <div>영국</div>
              </Countrybox>
              <Countrybox>
              <Countryimg onClick={() => setNation("Japan")} src="/countrys/JP.png" alt="US"/>
              <div>일본</div>
              </Countrybox>
              <Countrybox>
              <Countryimg onClick={() => setNation("China")} src="/countrys/CH.png" alt="US"/>
              <div>중국</div>
              </Countrybox>
              <Countrybox>
              <Countryimg onClick={() => setNation("Hongkong")} src="/countrys/HO.png" alt="US"/>
              <div>홍콩</div>
              </Countrybox>
              <Countrybox>
              <Countryimg onClick={() => setNation("Singapore")} src="/countrys/SI.png" alt="US"/>
              <div>싱가포르</div>
              </Countrybox>
              <Countrybox>
              <Countryimg onClick={() => setNation("Thailand")} src="/countrys/TH.png" alt="US"/>
              <div>태국</div>
              </Countrybox>
              
              <button>확인</button>
            </StyledNewWishList>
          )}
        </BottomSheet>
      )}
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
  height: 100%;
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
  cursor: pointer;
`

const Checkcardbox2 = styled.div`
  width: 140px;
  height: 30px;
  border: 1px solid #9AC5F4;
  border-radius: 7px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #9AC5F4;
  cursor: pointer;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const Nations = styled.div`
  width: 80px;
  border-radius: 7px;
  border: 1px dashed;
  margin-left: 120px;
  cursor: pointer;
`
const StyledExistingWishList = styled.div`
  padding: 2.4rem 2.2rem 2rem 2.2rem;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.7rem;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  & > button {
    width: 5.8rem;
    height: 5.8rem;
    border: 0.1rem solid gray;
    border-radius: 0.8rem;
    background-color: white;
  }

  & > button > img {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const StyledNewWishList = styled.div`
  padding: 3.3rem 2.2rem 3.6rem 2.2rem;
  



  & > div {
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: gray;
  }

  & > button {
    width: 30%;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 1.9rem;
    padding: 1.6rem 0 1.5rem 0;
    border-radius: 0.6rem;
    color: white;
  }
  & > button:disabled {
    background-color: gray;
  }
`;

const Countryimg = styled.img`
  width: 100px;
  height: 50px;
`
const Countrybox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #898989;
  cursor: pointer;
`