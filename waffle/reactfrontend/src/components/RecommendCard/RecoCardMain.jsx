import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import BottomSheet from '../Commons/BottomSheet';
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { append } from 'stylis';
import RecoCardList from './RecoCardList'
import { useNavigate } from 'react-router-dom';


const RecoCardMain = () => {
  const navigate = useNavigate();
  const [creaditData, setCreaditData] = useState();;
  const [dutyFree, setDutyFree] = useState();
  const [annualFee, setannualFee] = useState();
  const [company, setcompany] = useState([]);
  const [use, setuse] = useState();
  const [checkCard, setCheckcard] = useState(0);
  const [creditCard, setCreditCard] = useState(0);
  const [nation, setNation] = useState(0);
  const [bottomSheetTitle, setBottomSheetTitle] = useState('국가선택');
  const [bottomSheetTitle2, setBottomSheetTitle2] = useState('카드사선택');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [HA, setHA] = useState(false)
  const [NH, setNH] = useState(false)
  const [WR, setWR] = useState(false)
  const [BU, setBU] = useState(false)
  const [HD, setHD] = useState(false)
  const [MG, setMG] = useState(false)
  const [SH, setSH] = useState(false)
  const [IBK, setIBK] = useState(false)



  function clickHA () {
    if (HA === false) {
      setHA(true)
    } else {
      setHA(false)
    }
  }

  function clickNH () {
    if (NH === false) {
      setNH(true)
    } else {
      setNH(false)
    }
  }

  
  function clickWR () {
    if (WR === false) {
      setWR(true)
    } else {
      setWR(false)
    }
  }

  function clickHD () {
    if (HD === false) {
      setHD(true)
    } else {
      setHD(false)
    }
  }

  function clickBU () {
    if (BU === false) {
      setBU(true)
    } else {
      setBU(false)
    }
  }

  function clickMG () {
    if (MG === false) {
      setMG(true)
    } else {
      setMG(false)
    }
  }

  function clickSH () {
    if (SH === false) {
      setSH(true)
    } else {
      setSH(false)
    }
  }

  function clickIBK () {
    if (IBK === false) {
      setIBK(true)
    } else {
      setIBK(false)
    }
  }

  const clickCredit = async() => {
    setCreditCard(1);
  }

  const unClickCredit = async() => {
    setCreditCard(0);
  }
  const clickCheck= async() => {
    setCheckcard(2);
  }

  const unClickCheck = async() => {
    setCheckcard(0);
  }

    
 
  useEffect(() => {
;
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

const saverecocardboard = async () => {
    try {
      if (HA) company.push('하나카드');
      if (NH) company.push('NH농협카드');
      if (WR) company.push('우리카드');
      if (HD) company.push('현대카드');
      if (BU) company.push('BNK부산은행');
      if (MG) company.push('MG새마을금고');
      if (SH) company.push('신한카드');
      if (IBK) company.push('IBK기업은행');
      console.log(company)
      const params = {
        card: creditCard+checkCard,
        favoriteCompany: company,
        dutyFree : dutyFree,
        annualFee : annualFee,
        use : use,
        country : nation,
      }
      console.log(creditCard+checkCard)
      // 서버에 보낼 데이터 구조를 맞추기 위해 board 객체를 변경합니다.
      const response = await axios.post(`http://localhost:8080/recommend-card/recommend`, params);
      alert('등록되었습니다.');
      
      navigate('/recocard/list', {state : {value : response.data}})
      
    } catch (error) {
      console.error('포스트에러', error);
    }
    setcompany([])
  };

  function countrySelect(e) {
    setNation(e);
    setIsModalOpen(false);
  }

  console.log(selectedCompanies)

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
        <Company onClick={() => setIsModalOpen2(true)}>+</Company>
          
      </Companybox>
      <AnnualFeebox>
        <div>최대 연회비</div>
        <NumericFormat 
              allowLeadingZeros 
              thousandSeparator=","
              onValueChange={
                (values) => {
                    const { value } = values;
                    console.log(value);
                    setannualFee(value);
                }
            } 
            />
      </AnnualFeebox>
      <Budgetbox>
        <Budgettext>여행비용</Budgettext>
        <Writebox>
          <Frombox>
            <From>국가</From>
            <Selecnation>
          {
            {
              0 : <Nations onClick={setIsModalOpen}>+</Nations>,
              USA : <img src="/countrys/US.png" onClick={setIsModalOpen} alt="USA" />,
              Europe : <img src="/countrys/UR.png" onClick={setIsModalOpen} alt="Europe" />,
              England : <img src="/countrys/UK.png" onClick={setIsModalOpen} alt="England" />,
              Japan : <img src="/countrys/JP.png" onClick={setIsModalOpen} alt="Japan" />,
              China : <img src="/countrys/CH.png" onClick={setIsModalOpen} alt="China" />,
              Hongkong : <img src="/countrys/HO.png" onClick={setIsModalOpen} alt="Hongkong" />,
              Singapore : <img src="/countrys/SI.png" onClick={setIsModalOpen} alt="Singapore" />,
              Thailand : <img src="/countrys/TH.png" onClick={setIsModalOpen} alt="Thailand" />,
            }[nation]
          }
            </Selecnation>
          </Frombox>
          <Shopbox>
            <div>면세점</div>
            <NumericFormat  
            allowLeadingZeros 
            thousandSeparator=","
            onValueChange={
              (values) => {
                  const { formattedValue, value } = values;
                  console.log(value);
                  setDutyFree(value);
              }
          }
            />
          </Shopbox>
          <Usebox>
            <div>해외이용</div>
            <NumericFormat 
              allowLeadingZeros 
              thousandSeparator=","
              onValueChange={
                (values) => {
                    const { formattedValue, value } = values;
                    console.log(value);
                    setuse(value);
                }
            } 
            />
          </Usebox>
        </Writebox>
        </Budgetbox>
      <button onClick={saverecocardboard}>확인</button>
      {isModalOpen && (
        <BottomSheet title={bottomSheetTitle} closeModal={() => setIsModalOpen(false)}>
              <Countrybox>
                <Countryimg onClick={() => countrySelect("USA")} src="/countrys/US.png" alt="US"/>
                <div>미국</div>
              </Countrybox>
              <Countrybox>
                <Countryimg onClick={() => countrySelect("Europe")} src="/countrys/UR.png" alt="US"/>
                <div>유럽</div>
              </Countrybox>
              <Countrybox>
                <Countryimg onClick={() => countrySelect("England")} src="/countrys/UK.png" alt="US"/>
                <div>영국</div>
              </Countrybox>
              <Countrybox>
                <Countryimg onClick={() => countrySelect("Japan")} src="/countrys/JP.png" alt="US"/>
                <div>일본</div>
              </Countrybox>
              <Countrybox>
                <Countryimg onClick={() => countrySelect("China")}  src="/countrys/CH.png" alt="US"/>
                <div>중국</div>
              </Countrybox>
              <Countrybox>
                <Countryimg onClick={() => countrySelect("Hongkong")} src="/countrys/HO.png" alt="US"/>
                <div>홍콩</div>
              </Countrybox>
              <Countrybox>
                <Countryimg onClick={() => countrySelect("Singapore")} src="/countrys/SI.png" alt="US"/>
                <div>싱가포르</div>
              </Countrybox>
              <Countrybox>
                <Countryimg onClick={() => countrySelect("Thailand")} src="/countrys/TH.png" alt="US"/>
                <div>태국</div>
              </Countrybox>
        </BottomSheet>
      )}
      {isModalOpen2 && (
        <BottomSheet title={bottomSheetTitle2} closeModal={() => setIsModalOpen2(false)}>
          <Cardsheetbox>
            <Companyslay>
              {(WR === false ? (
                <Companysbox onClick={clickWR}>
                  <img src="/cardlogo/woorilogo.png" alt="" />
                  <div>우리카드</div>
                </Companysbox>
              ) : ( <Companysbox2 onClick={clickWR}>
                <img src="/cardlogo/woorilogo.png" alt="" />
                <div>우리카드</div>
                </Companysbox2> ))}
              {(SH === false ? (
                <Companysbox onClick={clickSH}><img src="/cardlogo/shinhanlogo.png" alt="" />
                <div>신한카드</div></Companysbox>
              ) : ( <Companysbox2 onClick={clickSH}><img src="/cardlogo/shinhanlogo.png" alt="" />
              <div>신한카드</div></Companysbox2> ))}
              {(HA === false ? (
               <Companysbox onClick={clickHA} ><img src="/cardlogo/hana.png" alt="" />
               <div>하나카드</div></Companysbox>
              ) : ( <Companysbox2 onClick={clickHA}><img src="/cardlogo/hana.png" alt="" />
              <div>하나카드</div></Companysbox2> ))}  
            </Companyslay>
            <Companyslay>
              {(NH === false ? (
                <Companysbox onClick={clickNH} ><img src="/cardlogo/nonghyuplogo.png" alt="" />
                <div>농협카드</div></Companysbox>
                ) : ( <Companysbox2 onClick={clickNH}><img src="/cardlogo/nonghyuplogo.png" alt="" />
                <div>농협카드</div></Companysbox2> ))}
              {(HD === false ? (
                <Companysbox onClick={clickHD}><img src="/cardlogo/HDlogo.png" alt="" />
                <div>현대카드</div></Companysbox>
                ) : ( <Companysbox2 onClick={clickHD}><img src="/cardlogo/HDlogo.png" alt="" />
                <div>현대카드</div></Companysbox2> ))}
              {(MG === false ? (
                <Companysbox onClick={clickMG}><img src="/cardlogo/MGlogo.png" alt="" />
                <div>새마을금고</div></Companysbox>
                ) : ( <Companysbox2 onClick={clickMG}><img src="/cardlogo/MGlogo.png" alt="" />
                <div>새마을금고</div></Companysbox2> ))}
            </Companyslay>
            <Companyslay>
              {(IBK === false ? (
                <Companysbox onClick={clickIBK}><img src="/cardlogo/ibklogo.png" alt="" />
                <div>기업은행</div></Companysbox>
                ) : ( <Companysbox2 onClick={clickIBK}><img src="/cardlogo/ibklogo.png" alt="" />
                <div>기업은행</div></Companysbox2> ))}
              {(BU === false ? (
                <Companysbox onClick={clickBU}><img src="/cardlogo/BNKlogo.png" alt="" />
                <div>부산은행</div></Companysbox>
                ) : ( <Companysbox2 onClick={clickBU}><img src="/cardlogo/BNKlogo.png" alt="" />
                <div>부산은행</div></Companysbox2> ))}       
              <Minbox></Minbox>
            </Companyslay>
          </Cardsheetbox>
          <Companybutton onClick={() => setIsModalOpen2(false)}>확인</Companybutton>
          <RecoCardList></RecoCardList>
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
  justify-content: space-around;
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
const Nations = styled.div`
  width: 80px;
  border-radius: 7px;
  border: 1px dashed;
  margin-left: 120px;
  cursor: pointer;
`


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

const AnnualFeebox = styled.div`
  width: 340px;
  height: 60px;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 30px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

const Selecnation = styled.div`
  & > img {
    width: 100px;
    height: 50px;
    margin-left: 110px;
  }
`
const Cardsheetbox = styled.div`
`
const Companyslay = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;

`

const Companysbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 100px;
  background-color: #A7ECEE;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  & > img {
    width: 50px;
    height: 40px;
    margin-bottom: 5px;
  }
`

const Companysbox2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 100px;
  background-color: #9AC5F4;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  & > img {
    width: 50px;
    height: 40px;
    margin-bottom: 5px;
  }
`

const Minbox = styled.div`
  width: 120px;
  margin: 10px;
`
const Companybutton = styled.button`
  width: 100px;
  background-color: #A7ECEE;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 10px;
`