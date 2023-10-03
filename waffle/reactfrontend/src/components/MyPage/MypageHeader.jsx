import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import mypageChecklist from '../../assets/mypageChecklist.png'
import mypageUser from '../../assets/mypageUser.png'
import mypageBookmark from '../../assets/mypageBookmark.png'

const MypageHeader = () => {

  const location = useLocation()

  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (/\/mypage\/checklist/.test(location.pathname)) {
      setActiveTab('checklist')
      } else if (/\/mypage\/update-userinfo/.test(location.pathname)) {
      setActiveTab('userinfo') 
      } else if (/\/mypage\/favorite/.test(location.pathname)) {
      setActiveTab('bookmark')
      }
  })

  const navigate = useNavigate()

  const goToChecklist = () => {
    navigate('/mypage/checklist')
  }

  const goToUpdateUserinfo = () => {
    navigate('/mypage/update-userinfo')
  }

  const goToBookmark = () => {
    navigate('/mypage/favorite')
  }

  return (
    <MypageHeaderWrapper>
      <div className='mypage-header-container'>
        <div 
          className={`mypage-header-tab ${activeTab === 'checklist' ? 'active' : ''}`} 
          onClick={goToChecklist}
        >
          <img src={mypageChecklist} alt="mypageChecklist" className="mypage-header-img" />
          체크리스트
        </div>
        <div 
          className={`mypage-header-tab ${activeTab === 'userinfo' ? 'active' : ''}`} 
          onClick={goToUpdateUserinfo}
        >
          <img src={mypageUser} alt="mypageChecklist" className="mypage-header-img" />
          개인정보 수정
        </div>
        <div 
          className={`mypage-header-tab ${activeTab === 'bookmark' ? 'active' : ''}`} 
          onClick={goToBookmark}
        >
          <img src={mypageBookmark} alt="mypageChecklist" className="mypage-header-img" />
          북마크
        </div>
      </div>
    </MypageHeaderWrapper>
  )
}

const MypageHeaderWrapper = styled.div`
  margin-top: 1vh;
  margin-bottom: -10vh;
  

  .mypage-header-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .mypage-header-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    height: 10vh;
    width: 100%;
    background-color: #b0afaf;
    cursor: pointer;
    transition: background-color 0.3s;
    padding-bottom: 1vh;

    &.active {
      background-color: #9AC5F4;
      height: 11vh;
      border-top-right-radius: 15px;
      border-top-left-radius: 15px;
    }
  }

  .mypage-header-img {
    height: 5vh;
    width: auto;
    margin: auto 0;
  }
`

export default MypageHeader;