import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import InputContainer from './InputContainer';
import AirModal from './AirModal';
import Select from "react-select";
import moment from "moment";
import axios from 'axios';
import Calender from './Component/Calender'
import HotelCalender from './Component/HotelCalender'
import Time from './Component/Time';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {setToken} from '../../lib/api';



const PackageMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [airModalTitle, setAirModalTitle] = useState("항공권")
  const [hotelModalTitle, setHotelModalTitle] = useState("호텔")
  const [selectedOption, setSelectedOption] = useState(null);
  const [saveAirBoard, setSaveAirBoard] = useState([])
  const [saveHotelBoard, setSaveHotelBoard] = useState([])
  const [startAir, setStartAir] = useState("")
  const [endtAir, setEndAir] = useState("")
  const [Airid, setAirid] = useState(0)
  const [startDay, setStartDay] = useState("")
  const [endDay, setEndDay] = useState("")
  const [startTime, setStartTime] = useState("00:00")
  const [endTime, setEndTime] = useState("24:00")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [hotelId, setHotelId] = useState(0)
  const [where, setWhere] = useState("")

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,  // 여기를 2로 변경
    slidesToScroll: 1,
    draggable : true
  };


// 로컬 스토리지에서 데이터 가져오기

  const handleOPtionCHange = (option) => {
    setSelectedOption(option);
  };
  

  const options = [
    {value: "null", label: "국가를 검색해주세요" },
    {value: "SEL", label: "서울, 대한민국 SEL" },
    {value: "CJU", label: "제주, 대한민국 CJU" },
    {value: "GMP", label: "김포, 대한민국 GMP" },
    {value: "PUS", label: "부산, 대한민국 PUS" },
    {value: "CJJ", label: "청주, 대한민국 CJJ" },
    {value: "KWJ", label: "광주, 대한민국 KWj" },
    {value: "TAE", label: "대구, 대한민국 TAE" },
    {value: "RSU", label: "여수, 대한민국 RSU" },
    {value: "USN", label: "울산, 대한민국 USN" },
    {value: "HIN", label: "사천, 대한민국 HIN" },
    {value: "KPO", label: "포항, 대한민국 KPO" },
    {value: "WJU", label: "원주, 대한민국 KUV" },
    {value: "MWX", label: "무안, 대한민국 MWX" },
    {value: "KUV", label: "군산, 대한민국 KUV" },
    {value: "ICN", label: "인천, 대한민국 ICN" },
    {value: "KIX", label: "오사카, 일본 KIX" },
    {value: "TYO", label: "도쿄, 일본 TYO" },
    {value: "FUX", label: "후쿠오카, 일본 FUX" },
    {value: "OKA", label: "오키나와, 일본 OKA" },
    {value: "CTS", label: "삿포로, 일본 CTS" },
    {value: "NGO", label: "나고야, 일본 NGO" },
    {value: "BKK", label: "방콕, 태국 BKK" },
    {value: "DAD", label: "다낭, 베트남 DAD" },
    {value: "CXR", label: "나트랑, 베트남 CXR" },
    {value: "CEB", label: "세부, 필리핀 CEB" },
    {value: "TPE", label: "타이베이, 대만 TPE" },
    {value: "SGN", label: "호치민시, 베트남 SGN" },
    {value: "SIN", label: "싱가포르, 싱가포르 SIN" },
    {value: "MNL", label: "마닐라, 필리핀 MNL" },
    {value: "DPS", label: "덴파사르, 인도네시아 DPS" },
    {value: "HKG", label: "홍콩, 홍콩 HKG" },
    {value: "HAN", label: "하노이, 베트남 HAN" },
    {value: "CRK", label: "클라크필드, 필리핀 CRK" },
    {value: "BKI", label: "코타키나발루, 말레이시아 BKI" },
    {value: "HKT", label: "푸켓, 태국 HKT" },
    {value: "PQC", label: "푸꾸옥, 베트남 PQC" },
    {value: "MFM", label: "마카오, 마카오 MFM" },
    {value: "PVG", label: '상해/푸동, 중국 PVG' },
    {value: "BJS", label: '북경, 중국 PVG' },
    {value: "DLC", label: '대련, 중국 DLC' },
    {value: "TAO", label: '청도, 중국 TAO' },
    {value: "WEH", label: '위해, 중국 WEH' },
    {value: "YNJ", label: '연길, 중국 YNJ' },
    {value: "TSN", label: '천진, 중국 TSN' },
    {value: "XMN", label: '하문, 중국 XMN' },
    {value: "KMG", label: '곤명, 중국 KMG' },
    {value: "HGH", label: '항저우, 중국 HGH' },
    {value: "VTE", label: '비엔티엔, 라오스 VTE' },
    {value: "JFK", label: '뉴욕, 미국 JFK' },
    {value: "SAO", label: '싱파울로, 브라질 SAO' },
    {value: "LAX", label: '로스앤젤레스, 미국 LAX'},
    {value: "YVR", label: '밴쿠버, 캐나다 YVR' },
    {value: "SFO", label: '샌프란시스코, 미국 SFO' },
    {value: "SEA", label: '시애틀, 미국 SEA' },
    {value: "YTO", label: '토론토, 미국 YTO' },
    {value: "YTO", label: '토론토, 캐나다 YTO' },
    {value: "HNL", label: '하와이, 미국 HNL' },
    {value: "CUN", label: '칸쿤, 멕시코 CUN' },
    {value: "LIM", label: '리마, 피루 LIM' },
    {value: "LON", label: '런던, 영국 LON' },
    {value: "ROM", label: '로마, 이탈리아 ROM' },
    {value: "PAR", label: '파리, 프랑스 PAR' },
    {value: "IST", label: '이스탄불, 튀르키예 IST' },
    {value: "PRG", label: '프라하, 체코 PRG' },
    {value: "FRA", label: '프랑크푸르트, 독일 FRA' },
    {value: "MOW", label: '모스크바, 러시아 MOW' },
    {value: "AMS", label: '암스테르담, 러시아 AMS' },
    {value: "ZRH", label: '취리히, 스위스 ZRH' },
    {value: "BCN", label: '바르셀로나, 스페인 BCN' },
    {value: "GUM", label: '괌, 미국 GUM' },
    {value: "SYD", label: '시드니, 호주 SYD' },
    {value: "BNE", label: '브리즈번, 오스트레일리아 BNE' },
    {value: "MEL", label: '멜버른, 오스트레일리아 MEL' },
    {value: "AKL", label: '오클랜드, 뉴질랜드 AKL' },
    {value: "SPN", label: '사이판, 미국 SPN' },
    {value: "PER", label: '퍼스, 오스트레일리아 PER' },
    {value: "HC", label: '크라이스트처치, 뉴질랜드 HC' },
    {value: "ROR", label: '코로르, 팔라우 ROR' },
    {value: "DXB", label: '두바이, 아랍에미리트 DXB' },
    {value: "NBO", label: '나이로비, 케냐 NBO' },
    {value: "JNB", label: '요하네스버그, 남아프리카 공화국 JNB' },
    {value: "CAI", label: '카이로, 이집트 CAI' },
    {value: "DOH", label: '도하, 카타르 DOH' },
    {value: "AUH", label: '아부다비, 아랍에미리트 AUH' },
    {value: "THR", label: '테헤란, 아랍에미리트 THR' },
    {value: "THR", label: '테헤란, 이란 THR' },
    {value: "AMM", label: '암만, 요르단 AMM' },
    {value: "CPT", label: '케이프타운, 남아프리카 공화국 CPT' },

  ]


  const handleAirButton = () => {
    const params = {
      id: Airid,
      placeStart: startAir,
      placeEnd: endtAir,
      startStart: moment(startDay).format("YYYY-MM-DD"), // 날짜를 원하는 형식으로 포맷팅
      startEnd: moment(endDay).format("YYYY-MM-DD"), // 날짜를 원하는 형식으로 포맷팅
      startTime: moment(startTime).format("HH:mm"),
      endTime: moment(endTime).format("HH:mm"),
    };
  
    setSaveAirBoard([...saveAirBoard, params]);

    setStartAir("");
    setEndAir("");
    setEndDay("");
    setStartDay("");
    setAirid(Airid+1);
    setIsModalOpen(false);
  };

  const handleHotelButton = () => {

    const params = {
      id: hotelId,
      where: where,
      start: moment(start).format("YYYY-MM-DD"), // 날짜를 원하는 형식으로 포맷팅
      end: moment(end).format("YYYY-MM-DD"), // 날짜를 원하는 형식으로 포맷팅
    };
  

    setSaveHotelBoard([...saveHotelBoard, params]);

    setWhere("");
    setStart("");
    setEnd("");
    setHotelId(hotelId+1);
    setIsModalOpen2(false);
  };


  const PostData = async () => {
    try {
      setToken()
      const params2 = {
        memberCnt: 1,
        planPlane: saveAirBoard,
        planHotel : saveHotelBoard,
      }
      // 서버에 보낼 데이터 구조를 맞추기 위해 board 객체를 변경합니다.
      const response = await axios.post(`http://j9d109.p.ssafy.io:8003/package/recommend`, params2);
      alert('등록되었습니다.');
      console.log(params2)
      console.log(response)

    } catch (error) {
      console.error('포스트에러', error);
    }
  };

  function Consol() {
    console.log(saveAirBoard)
    console.log(saveHotelBoard)
  }

  const handleHotelDateSelection = (e) => {
    setStart(e.start); // 선택된 startDate를 저장
    setEnd(e.end); // 선택된 endDate를 저장
};

  const handleAirDateSelection = (e) => {
    setStartDay(e.start); // 선택된 startDate를 저장
    setEndDay(e.end); // 선택된 endDate를 저장
};
const handleTimeChange = (startTime, endTime) => {
  setStartTime(startTime);
  setEndTime(endTime);
};

useEffect(() => {
  setToken()
}, []);

  return (
    <Container>
        <Airbox>
          <p>항공권검색</p>
          {(saveAirBoard.length > 0 ? (
              <Slider {...settings}>
                {saveAirBoard.map(({ id, placeStart, placeEnd, startStart, startEnd, startTime, endTime }) => (
                  <Contentbox key={id}>
                      <div>{options[options.findIndex(e => e.value === placeStart)].label.split(',')[0]}</div>
                      <div>{options[options.findIndex(e => e.value === placeEnd)].label.split(',')[0]}</div>
                      <Airstartbox>
                        <div>
                          <div>최소 출발시간</div>
                          <div>{startStart}</div>
                          <div>{startTime}</div>
                        </div>
                        <div>
                          <div>최대출발시간</div>
                          <div>{startEnd}</div>      
                          <div>{endTime}</div>
                        </div>
                      </Airstartbox>
                  </Contentbox>
                ))}
            </Slider>) : (<div>항공권을 입력해주세요</div>))}
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>+</Button>
        </Airbox>
        <Hotelbox>
            <p>숙박 검색</p>
            {(saveHotelBoard.length > 0 ? (
            <div>
              {saveHotelBoard && saveHotelBoard.map(({ id,where,start,end}) => (
              <div id={id}>
              <div>{where}</div>
              <div>{start}</div>
              <div>{end}</div>
              </div>
          ))}
          </div>
            ) : (<div>숙박을 입력해주세요</div>))}
            <Button onClick={() => setIsModalOpen2(!isModalOpen2)}>+</Button>
        </Hotelbox>
        <button onClick={PostData}>확인</button>
        <button onClick={console.log(saveAirBoard)}>콘솔</button>
        {isModalOpen && (
            <AirModal title={airModalTitle} closeModal={() => setIsModalOpen(false)} >
              <span>출발</span>
              <Select
                defaultValue={options[0]}
                inClearable={false}
                inSearchable={false}
                menuPortalTarget={document.body}
                options={options}
                styles={customStyles}
                onChange={(e) => setStartAir(e.value)}
              />
              <span>도착</span>
              <Select
                defaultValue={options[0]}
                inClearable={false}
                inSearchable={false}
                menuPortalTarget={document.body}
                options={options}
                styles={customStyles}
                onChange={(e) => setEndAir(e.value)}
              />
              <span>출발날짜선택</span>
              <Calender 
                onChange={handleAirDateSelection}
                value={start}
                end={end}/>
                <Time
                  onChange={handleTimeChange}
                />
                <button onClick={handleAirButton}>확인</button>
            </AirModal>
        )}

        {isModalOpen2 && (
            <AirModal title={hotelModalTitle} closeModal={() => setIsModalOpen2(false)} >
             <span>장소</span>
              <input type="text" onChange={(e) => setWhere(e.target.value)}/>
              <span>최소 출발시간</span>
              <HotelCalender 
                onChange={handleHotelDateSelection}
                value={start}
               />
              <button onClick={handleHotelButton}>확인</button>
            </AirModal>
            
        )}
    </Container>
  )
}

export default PackageMain

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 400px;
`
const Airbox = styled.div`
  width: 340px; // 고정된 컨테이너 너비
  height: 200px; // 고정된 컨테이너 높이
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin-bottom: 30px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const Hotelbox = styled.div`
  width: 340px;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    
`
const Contentbox = styled.div`
  width: 340px;
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

`

const Inputbox = styled.div`
    
`
const customStyles = {
  control: (provided) => ({
    ...provided,
    marginRight: "0,5rem",
    width: "100%",
    height: "3rem",
    borderRadius: "2px"
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#ccc" : "#fff",
    color: state.isSelected? "#fff" : "#333",
    height: "3rem",
    width: "100%"
  }),
  indicatorSepartor: (provided) => ({
    ...provided,
    display: "none"
  }),
  menuPortal: (provided) => ({ ...provided, border: `1px solid red`, zIndex: 8888 }),
}

const Airboard = styled.div`
  width: 100%; // 슬라이드 아이템을 컨테이너 너비에 맞춤
  height: 100%; // 슬라이드 아이템을 컨테이너 높이에 맞춤
  border: 1px solid #B3B1B1;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

const Button = styled.button`
  width: 80px;
  border-radius: 7px;
  border: 1px dashed;
  margin: 10px;
  background-color: white;
  display: flex;
  align-self: center;
  justify-content: center;
`

const minAir = styled.div`
  width: 100%;
  height: 100%;
`
const Airstartbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100px;
`