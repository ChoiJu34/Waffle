import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import MainGraphBackpack from '../../assets/MainGraphBackpack.png'
import MainGraphPlane from '../../assets/MainGraphPlane.png'
import 'animate.css';
import TeamAccountDetailIndividualList from './TeamAccountDetailIndividualList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from 'react-router-dom'
import IndividualDataContext from '../Commons/IndividualDataContext';
import TeamAccountUpdateIndividual from './TeamAccountUpdateIndividual';
import axios from 'axios'

const TeamAccountDetail = () => {

  const location = useLocation()

  const navigate = useNavigate()

  const handleGoBack = () => {

    window.scrollTo(0, 0)

    navigate(-1);
  }

  const token = localStorage.getItem('access_token')

  const headers = {
    "Authorization": "Bearer " + token
  }

  const [teamAccountData, setTeamAccountData] = useState()
  const [isMaster, setIsMaster] = useState(false)

  useEffect(() => {
    const id = window.location.pathname.match(/\d+$/)?.[0];

    if (!id) {
      console.error('ID를 찾을 수 없습니다.');
      return;
    }

    axios.get(`/team-account/detail/${id}/`, { headers: headers })
      .then(response => {
        if (response.data.master) {
          setIsMaster(true)
        }
        setTeamAccountData(response.data)
      })
      .catch(error => {
        console.error('로그인 실패');
        alert('로그인에 실패했습니다');
      });
  }, []);

  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 })

  const [showDetail, setShowDetail] = useState({
    target: false,
    raised: false,
    spent: false
  })

  const handleMouseDown = (event) => {
    let x, y;

    if (event.type.startsWith('mouse')) {
      x = event.clientX;
      y = event.clientY;
    } else if (event.type.startsWith('touch')) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    }

    const tooltipWidth = 150;  
    const tooltipHeight = 50;  


    if (x + tooltipWidth > window.innerWidth) {
      x = window.innerWidth - tooltipWidth;
    }

    y = y - tooltipHeight;

    setTouchPosition({ x, y });

    const type = event.target.getAttribute('data-type');
    const newState = { target: false, raised: false, spent: false };

    if (type) {
        newState[type] = true;
    }

    setShowDetail(newState);
};

  const handleMouseUpOrLeave = () => {
    setShowDetail({ target: false, raised: false, spent: false });
  }

  const spentRatio = teamAccountData?.totalSub / teamAccountData?.goal * 100
  const raisedRatio = teamAccountData?.totalAdd / teamAccountData?.goal * 100

  // 메뉴
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const hideMenu = e => {
        if (isMenuOpen && !e.target.closest('.hamburger-dot') && !e.target.closest('.menu')) {
            setIsMenuOpen(false);
        }
    };
    window.addEventListener('click', hideMenu);

    return () => {
        window.removeEventListener('click', hideMenu);
    };
  }, [isMenuOpen]);

  // 수정 화면으로 보낼 데이터
  const dataToUpdate = {
    accountName: teamAccountData?.name,
    target: teamAccountData?.goal,
    endDate: teamAccountData?.endDay
  }

  const id = window.location.pathname.match(/\d+$/)?.[0]

  const goToUpdate = () => {
    navigate(`/teamaccount/update/${id}`, { state: dataToUpdate })
  }

  const [dDay, setDDay] = useState(null);

  useEffect(() => {
    if (teamAccountData?.endDay) {
      const targetDate = new Date(teamAccountData?.endDay);
      const currentDate = new Date();

      const differenceInTime = targetDate - currentDate;
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

      setDDay(differenceInDays);
    }
  }, [teamAccountData?.endDay]);

  // 스윙 이미지
  const [swingAnimation, setSwingAnimation] = useState("animate__fadeInTopLeft");

  useEffect(() => {
      const initialTimeout = setTimeout(() => {
          setSwingAnimation("animate__swing animate__slow");
          const interval = setInterval(() => {
              setSwingAnimation(""); 
              setTimeout(() => {
                  setSwingAnimation("animate__swing animate__slow");
              }, 50); 
          }, 4 * 1000 + 1000);
  
          return () => clearInterval(interval);
      }, 1000); 
  
      return () => clearTimeout(initialTimeout);
  }, []);

    // 가방 이미지
    const [backAnimation, setBackAnimation] = useState("animate__fadeInDown");

    useEffect(() => {
        const initialTimeout = setTimeout(() => {
            setBackAnimation("animate__wobble");
            const interval = setInterval(() => {
                setBackAnimation(""); 
                setTimeout(() => {
                    setBackAnimation("animate__wobble");
                }, 50); 
            }, 4 * 1000 + 1000);
    
            return () => clearInterval(interval);
        }, 1000); 
    
        return () => clearTimeout(initialTimeout);
    }, []);

    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    const [inviteCode, setInviteCode] = useState('')

    useEffect(() => {
      const accountId = teamAccountData?.id
  
      axios.get(`/team-account/create-code/${accountId}`, { headers: headers })
        .then(response => {
          setInviteCode(response.data.code)
        })
        .catch(error => {
          console.error('초대 코드 못 가져옴');
        });
    }, [teamAccountData]);

   const goToOut = () => {
    navigate(`/teamaccount/out`, { state: teamAccountData })
   }

   const goToDelete = () => {
    navigate(`/teamaccount/delete`, { state: teamAccountData })
   }

   const goToUpdateIndividual = () => {
    const accountId = teamAccountData?.id

    navigate(`/teamaccount/update/individual/${accountId}`)
   }

  return (
    <TeamAccountDetailWrapper spentRatio={spentRatio} raisedRatio={raisedRatio}> 
      <div className="teamaccount-detail-title">
      <div className="login-header"><FontAwesomeIcon icon={faArrowLeft} color="black" onClick={handleGoBack}/></div>
        <div className="teamaccount-detail-title-text">{teamAccountData?.name}</div>
        <FontAwesomeIcon icon={faEllipsisVertical} color="black" className="hamburger-dot" onClick={toggleMenu}/>
        {isMenuOpen && (
          <div className="menu">
          {isMaster ?
           (<>
           <div className="menu-item" onClick={goToUpdate}>통장 정보 수정</div>
           <div className="menu-item" onClick={goToUpdateIndividual}>개인 목표 수정</div>
           <div className="menu-item-delete" onClick={goToDelete}>모임 통장 삭제</div>
           </>) :
           (<>
           <div className="menu-item-delete" onClick={goToOut}>모임 통장 탈퇴</div>
           </>)}
          </div>
        )}
        </div>
      
      {isMaster && 
      (<div className='teamaccount-detail-code-container'>
        <div className='teamaccount-detail-code'>{inviteCode}</div>
      </div>)}

      <div className="teamaccount-detail-maingraph-container">
        <div className="teamaccount-detail-maingraph-category">
          <div className="teamaccount-detail-maingraph-category-spent">지출액</div>
          <div className="teamaccount-detail-maingraph-category-raised">모금액</div>
          <div className="teamaccount-detail-maingraph-category-target">목표액</div>
          <div className="teamaccount-detail-maingraph-dday">
            {dDay !== null && (
              <p>
                {dDay > 0 ? `D-${dDay}` : "모금 종료"}
              </p>
            )}
          </div>
        </div>

        <div className="teamaccout-detail-maingraph">
          <div 
            data-type="target"
            className="teamaccount-detail-maingraph-target"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUpOrLeave}
          >
            {showDetail.target && <div className="teamaccount-detail-maingraph-detail" style={{top: `${touchPosition.y}px`, left: `${touchPosition.x}px`}}>목표 금액<br />{numberWithCommas(teamAccountData?.goal)}원</div>}

            <div
              data-type="raised"
              className="teamaccount-detail-maingraph-raised"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUpOrLeave}
            >{showDetail.raised && <div className="teamaccount-detail-maingraph-detail" style={{top: `${touchPosition.y}px`, left: `${touchPosition.x}px`}}>모은 금액<br />{numberWithCommas(teamAccountData?.totalAdd)}원</div>}
             {teamAccountData?.totalAdd < teamAccountData?.goal/2 ?
              <img src={MainGraphBackpack} alt="MainGraphBackpack" className={`animate__animated ${backAnimation} raised-end-back`} data-type="raised" /> :
              <img src={MainGraphPlane} alt="MainGraphPlane" className={`animate__animated ${swingAnimation} raised-end`}  data-type="raised" />}
            </div>

          <div
              data-type="spent"
              className="teamaccount-detail-maingraph-spent"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUpOrLeave}
            >{showDetail.spent && <div className="teamaccount-detail-maingraph-detail" style={{top: `${touchPosition.y}px`, left: `${touchPosition.x}px`}}>지출 금액<br />{numberWithCommas(teamAccountData?.totalSub)}원</div>}</div>
          </div>
        </div>
        <div className="team-account-detail-individual-head-container">
          <div className="team-account-detail-individual-head"></div>
        </div>
        <div className="team-account-detail-individual-title">개인별 목표 금액</div>
        <TeamAccountDetailIndividualList />
      </div>
    </TeamAccountDetailWrapper>
  )}

const swingAnimation = keyframes`
  20% {
    transform: rotate3d(0, 0, 1, 10deg);
  }
  40% {
    transform: rotate3d(0, 0, 1, -8deg);
  }
  60% {
    transform: rotate3d(0, 0, 1, 4deg);
  }
  80% {
    transform: rotate3d(0, 0, 1, -4deg);
  }
  100% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
`;

const wipeAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

const LandingAnimation = keyframes`
  0% {
    transform: rotate(0deg) translateX(50px) rotate(0deg);
  }

  100% {
    transform: rotate(360deg) translateX(50px) rotate(-360deg);
  }
`

const TeamAccountDetailWrapper = styled.div`
.teamaccount-detail-title {
    font-size: 3vh;
    margin-top: 4vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.hamburger-dot {
    position: absolute;
    right: 1.5vh;
}

 .teamaccount-detail-maingraph-category {
  display: flex;
  font-size: 1.7vh;
  margin-top: 4vh;
 }

 .teamaccount-detail-maingraph-category-spent {
  margin-left: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15vw;
  height: 2.8vh;
  border-radius: 50px;
  background-color: #B0BDCB;
 }

 .teamaccount-detail-maingraph-category-raised {
  margin-left: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15vw;
  height: 2.8vh;
  border-radius: 50px;
  background-color: #9AC5F4;
 }

 .teamaccount-detail-maingraph-category-target {
  margin-left: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15vw;
  height: 2.8vh;
  border-radius: 50px;
  background-color: #FFEEBB;
 }

 .teamaccout-detail-maingraph {
  margin-top: 1.5vh;
  display: flex;
  justify-content: center;
 }

 .teamaccount-detail-maingraph-target {
  width: 85vw;
  height: 7vh;
  background-color: #FFEEBB;
  border-radius: 15px;
  position: relative;
  z-index: 1;
 }

 .teamaccount-detail-maingraph-spent {
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.spentRatio}%;
  height: 7vh;
  background-color: #B0BDCB;
  border-radius: 15px;
  z-index: 3;
 }

 .teamaccount-detail-maingraph-raised {
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.raisedRatio}%;
  height: 7vh;
  background-color: #9AC5F4;
  border-radius: 15px;
  z-index: 2;
 }

 .teamaccount-detail-maingraph-detail {
  position: fixed;
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 30000;
  transform: translateX(0%) translateY(-100%); 
  white-space: nowrap;
  max-width: calc(100vw - 20px); 
  overflow: hidden;
  text-overflow: ellipsis;
  transform: translateX(0%) translateY(-50%);
}

.raised-end {
  position: absolute;
  right: 0;
  top: 25%;
  width: auto;
  height: 60%;
  transform-origin: center;
  z-index: 4;
}

.raised-end-back {
  position: absolute;
  right: 0;
  top: 25%;
  width: auto;
  height: 53%;
  transform-origin: center;
  z-index: 4;
}

/* .custom-swing {
    animation: ${LandingAnimation} 2s forwards;
  } */

.teamaccount-detail-maingraph-dday {
  position: absolute;
  right: 1vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15vw;
  height: 2.8vh;
  border-radius: 50px;
}

.team-account-detail-individual-head-container {
  display: flex;
  justify-content: center;
  margin-top: 2vh;
  overflow: hidden;
  height: 2vh;
}

.team-account-detail-individual-head {
  border: 3px solid #9AC5F4;
  height: 5vh;
  border-radius: 15px;
  width: 85vw;
}

.team-account-detail-individual-title {
  font-size: 2.5vh;
}

.menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 40000;
  font-size: 2vh;
}

.menu-item {
  padding: 10px 15px;
}

.menu-item-delete {
    padding: 10px 15px;
    color: #e71111;
  }

.login-header {
  position: absolute;
  left: 0.1vw;
  margin: 1.2vh 2vh;
}

.teamaccount-detail-code-container {
  height: 2vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: end;
}

.teamaccount-detail-code {
  margin-top: 4vh;
  margin-right: 10vw;
  height: 3vh;
  width: 20vw;
  background-color: #99DBF5;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
`

export default TeamAccountDetail