import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components';
import MainImg from '../../assets/MainImg.png'
import MainImgWaffle from '../../assets/MainImgWaffle.png'
import MainPackageImg from '../../assets/MainPackageImg.png'
import MainCardImg from '../../assets/MainCardImg.png'
import MainExchangeImg from '../../assets/MainExchangeImg.png'
import MainAccountImg from '../../assets/MainAccountImg.png'
import MainChecklistImg from '../../assets/MainChecklistImg.png'
import { useNavigate } from 'react-router-dom';

const MainPage = () => {

  // 이미지 회전하는 속도에 맞춰 글자 변환
  const [text, setText] = useState('최저가 항공권');
  const texts = ['최저가 항공권', '맞춤 카드', '모임 통장', '경비 절약'];
  const navigate = useNavigate()

  useEffect(() => {
    let index = 1;

    const interval = setInterval(() => {
      setText(texts[index]);
      index = (index + 1) % texts.length;
    }, 5000);


    return () => {
      clearInterval(interval);
    };
  }, []);

  // 버튼 클릭 시 현재 페이지의 제일 위로 스크롤
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  // 일정 수준 스크롤되어야 요소가 나타나도록 하기
  const [showPackage, setShowPackage] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [showExchange, setShowExchange] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowCard(true);
      }
      if (window.scrollY > 600) {
        setShowAccount(true);
      }
      if (window.scrollY > 900) {
        setShowChecklist(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const goToPackage = () => {
  navigate('/package/main')
}

const goToCard = () => {
  navigate('/recocard/main')

}

// const goToExchange = () => {
//   navigate('')
//   setIsToggled(false)
//   setUserToggled(false)
// }

const goToTeamAccount = () => {
  navigate('/teamaccount/main')
}

  return (
      <MainPageWrapper>
        <div className="main-img-container">
          <div className="main-img-default-text">이 모든 것을 와플 하나로</div>
          <img src={MainImg} alt="mainpageImg" className="main-img"/>
          <img src={MainImgWaffle} alt="mainImgWaffle" className="main-img-waffle"/>
          <div className="main-img-text">{text}</div>
        </div>
        <div className="main-body-title">효율적인 여행, 와플과 함께</div>
    
        <div className="main-body-contents">

          <div className="main-body-package-container" style={{opacity: showPackage ? 1 : 0, transition: 'opacity 1s'}}>
            <div className="main-body-package-text">
              <div className="main-body-package-text-title">
                내 취향으로 토핑한 여행 패키지
              </div>
              <br/>
              <div className="main-body-package-text-content">
                항공편, 숙박, 음식, 교통 수단까지
                <div className="main-body-text-spacer"></div>
                당신의 취향을 담은 패키지를 추천받으세요
              </div>
              <button className="main-body-package-button">맞춤 여행 만들기</button>
            </div>
              <img className="main-body-package-img" src={MainPackageImg}/>
          </div>

          <div className="main-body-card-container" style={{opacity: showCard ? 1 : 0, transition: 'opacity 1s'}}>
            <img className="main-body-card-img" src={MainCardImg}/>
            <div className="main-body-card-text">
              <div className="main-body-card-text-title">
                여행을 완성시켜줄 카드 추천
              </div>
              <br/>
              <div className="main-body-card-text-content">
                준비한 비용 내 최대의 경험을 위해
                <div className="main-body-text-spacer"></div>
                당신의 여행에 딱 맞는 카드를 추천받으세요
              </div>
              <button className="main-body-card-button" onClick={goToCard}>카드 추천 받기</button>
            </div>
          </div>
        </div>

          <div className="main-body-account-container" style={{opacity: showAccount ? 1 : 0, transition: 'opacity 1s'}}>
            <div className="main-body-account-text">
              <div className="main-body-account-text-title">
                함께 준비해가는 여행
              </div>
              <br/>
              <div className="main-body-account-text-content">
                목표액, 현재 모금액, 지출액 등
                <div className="main-body-text-spacer"></div>
                단체 여행 비용을 한 번에 관리해보세요
              </div>
              <button className="main-body-account-button" onClick={goToTeamAccount}>모임 통장 보기</button>
            </div>
            <img className="main-body-account-img" src={MainAccountImg}/>
          </div>

          <div className="main-body-checklist-container" style={{opacity: showChecklist ? 1 : 0, transition: 'opacity 1s'}}>
          <img className="main-body-checklist-img" src={MainChecklistImg}/>
            <div className="main-body-checklist-text">
              <div className="main-body-checklist-text-title">
                한 여행은 또 다음 여행으로
              </div>
              <br/>
              <div className="main-body-checklist-text-content">
                출발 전 체크리스트부터 도착 후 정산까지
                <div className="main-body-text-spacer"></div>
                즐거운 여행, 그 이후까지 와플과 함께하세요
              </div>
              <button className="main-body-checklist-button" onClick={handleScrollToTop}>와플 시작해보기</button>
            </div>
          </div>
      </MainPageWrapper>
  )
}

const rotateAnimation = keyframes`
  0%, 20% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  25%, 45% {
    transform: translate(-50%, -50%) rotate(90deg);
  }
  50%, 70% {
    transform: translate(-50%, -50%) rotate(180deg);
  }
  75%, 95% {
    transform: translate(-50%, -50%) rotate(270deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;


const MainPageWrapper = styled.div`
  margin-top: 0.5vh;

  .main-img {
    width: 100%;
    height: 28vh;
    display: block;
  }

  .main-img-container {
    position: relative;
    overflow: hidden;
  }

  .main-img-default-text {
    position: absolute;
    top: 4vh;
    left: 7vw;
    font-size: 3.1vh;
  }

  .main-img-text {
    position: absolute;
    top: 17vh;
    left: 28vw;
    transform: translate(-50%, -50%);
    width: 100%;
    font-size: 3vh;
    text-align: center;
  }

  .main-img-waffle {
    position: absolute;
    top: 28vh;
    left: 97vw;
    -webkit-transform: translate(-50%, -50%);
    width: 90vw;
    -webkit-animation: ${rotateAnimation} 20s linear infinite;
  }

  .main-body-title {
    font-size: 3vh;
    margin: 5vh 0;
  }

  .main-body-package-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10vh;
  }

  .main-body-package-text {
    display: flex;
    flex-direction: column;

  }

  .main-body-package-text-title {
    text-align: left;
    margin-left: 2.5vh;
    font-size: 2vh;
  }

  .main-body-package-text-content {
    font-size: 1.3vh;
    text-align: left;
    margin-left: 8vw;
  }

  .main-body-package-button {
    margin-top: 1.5vh;
    background-color: #9AC5F4;
    border-radius: 5px;
    width: 35vw;
    height: 4vh;
    border: none;
    font-weight: 800;
    margin-left: 25vw;
  }

  .main-body-package-img {
    width: 25%;
    margin-right: 3vh;
  }

  .main-body-text-spacer {
    height: 0.7vh;
  }

  .main-body-card-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30vh;
  }

  .main-body-card-text {
    display: flex;
    flex-direction: column;
    margin-right: 7vw;
  }

  .main-body-card-text-title {
    text-align: left;
    margin-left: 2.5vh;
    font-size: 2vh;
  }

  .main-body-card-text-content {
    font-size: 12px;
    text-align: left;
    margin-left: 4vh;
  }

  .main-body-card-img {
    width: 25.1%;
    margin-left: 3vh;
  }

  .main-body-card-button {
    margin-top: 1.5vh;
    background-color: #99DBF5;
    border-radius: 5px;
    width: 35vw;
    height: 4vh;
    border: none;
    font-weight: 800;
    margin-left: 26vw;
  }

  .main-body-account-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30vh;
  }

  .main-body-account-text {
    display: flex;
    flex-direction: column;

  }

  .main-body-account-text-title {
    text-align: left;
    margin-left: 2.5vh;
    font-size: 2vh;
  }

  .main-body-account-text-content {
    font-size: 1.3vh;
    text-align: left;
    margin-left: 8vw;
  }

  .main-body-account-button {
    margin-top: 1.5vh;
    background-color: #A7ECEE;
    border-radius: 5px;
    width: 35vw;
    height: 4vh;
    border: none;
    font-weight: 800;
    margin-left: 25vw;
  }

  .main-body-account-img {
    width: 25%;
    margin-right: 3vh;
  }

  .main-body-checklist-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30vh;
    margin-bottom: 5vh;
  }

  .main-body-checklist-text {
    display: flex;
    flex-direction: column;
    margin-right: 7vw;
  }

  .main-body-checklist-text-title {
    text-align: left;
    margin-left: 5vw;
    font-size: 2vh;
  }

  .main-body-checklist-text-content {
    font-size: 12px;
    text-align: left;
    margin-left: 4vh;
  }

  .main-body-checklist-img {
    width: 25%;
    margin-left: 3vh;
  }

  .main-body-checklist-button {
    margin-top: 1.5vh;
    background-color: #FFEEBB;
    border-radius: 5px;
    width: 35vw;
    height: 4vh;
    border: none;
    font-weight: 800;
    margin-left: 26vw;
  }
`

export default MainPage