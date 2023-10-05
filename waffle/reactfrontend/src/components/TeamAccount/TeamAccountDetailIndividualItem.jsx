import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import edit from '../../assets/edit.png'
import save from '../../assets/save.png'

const TeamAccountDetailIndividualItem = ({ data, index, rerender }) => {

    const individualName = data?.name
    const individualTarget = data?.goal

    const individualRaised = data?.money
    const raisedRatio = individualTarget !== 0 ? individualRaised / individualTarget * 100 : 0;

    const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 })

    const [showDetail, setShowDetail] = useState({
      target: false,
      raised: false,
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
      const newState = { target: false, raised: false };
  
      if (type) {
          newState[type] = true;
      }
  
      setShowDetail(newState);
  };
  
    const handleMouseUpOrLeave = () => {
      setShowDetail({ target: false, raised: false });
    }

    const numberWithCommas = (x) => {
      return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const token = localStorage.getItem('access_token')

  const headers = {
    "Authorization": "Bearer " + token
  }

  const [isMine, setIsMine] = useState(false)

  const id = window.location.pathname.match(/\d+$/)?.[0];

  useEffect (() => {
    axios.get(`/team-account/get-groupId/${id}`, { headers: headers })
    .then(response => {
      if (response.data.id === data.id) {
        setIsMine(true)
      }
    })
    .catch(error => {
      console.error('넌 못 지운다');
    })
  }, [])

  const [editing, setEditing] = useState(false)

  const [nickname, setNickname] = useState({
    id: data.id,
    nickname: data.name
  })

  const [rerendering, setRerendering] = useState(1)

  const startEdit = () => {
    setEditing(true)
  }

  const endEdit = () => {
    setEditing(false)

    axios.put(`/team-account/update-nickname/`, nickname, { headers: headers })
    .then(response => {
      setRerendering(rerendering * -1)
      rerender()
    })
    .catch(error => {
      alert('닉네임 수정 실패')
      console.error('넌 못 지운다');
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNickname((prevData) => {
        const newData = { ...prevData, [name]: value };
        return newData;
    });
  }

    return (
      <TeamAccountDetailIndividualItemWrapper raisedRatio={raisedRatio}>
        <div className="individual-name-conatiner">
          <div className="individual-name">
            {editing ? 
            (<>
              <input className="edit-nickname" value={nickname.nickname} onChange={handleChange} name="nickname"/>
              <img src={save} alt="save" className="edit" onClick={endEdit}></img>
            </>) : 
            (
              <>
              {individualName}{isMine && <img src={edit} alt="edit" className="edit" onClick={startEdit} />}
              </>
            )
            }
          </div> 
          
        </div>
        <div className="individual-graph">
          <div 
            data-type="target"
            className="individual-graph-target"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUpOrLeave}
          >
            {showDetail.target && <div className="individual-graph-detail" style={{top: `${touchPosition.y}px`, left: `${touchPosition.x}px`}}>목표 금액<br />{numberWithCommas(individualTarget)}원</div>}

            <div
              data-type="raised"
              className="individual-graph-raised"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUpOrLeave}
            >{showDetail.raised && <div className="individual-graph-detail" style={{top: `${touchPosition.y}px`, left: `${touchPosition.x}px`}}>모은 금액<br />{numberWithCommas(individualRaised)}원</div>}
            </div>
          </div>
        </div>
      </TeamAccountDetailIndividualItemWrapper>
    )
}

const TeamAccountDetailIndividualItemWrapper = styled.div`

margin-top: 3vh;

.individual-name {
  text-align: left;
  margin-left: 7.5vw;
  font-size: 4.5vw;
  display: flex;
  width: 80vw;
  justify-content: space-between;
}

.individual-graph {
  margin-top: 3vw;
  display: flex;
  justify-content: center;
 }

 .individual-graph-target {
  width: 80vw;
  height: 4.5vw;
  background-color: #e7e7e7;
  border-radius: 15px;
  position: relative;
  z-index: 1;
 }

 .individual-graph-raised {
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.raisedRatio}%;
  height: 4.5vw;
  background-color: #FAB7B7;
  border-radius: 15px;
  z-index: 2;
 }

 .individual-graph-detail {
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

.individual-name-container {
  display: flex;
}

.edit {
  height: 3.5vw;
}

.edit-nickname {
  display: block;
  width: 75vw;
  color: #909090;
  border: 0;
  background-color: transparent;
  box-sizing: border-box;
  border-radius: 0;
  padding: 0;
  height: 10vw;
  line-height: 1.33;
  font-size: 4.5vw;
  font-family: inherit;
  vertical-align: baseline;
  -webkit-appearance: none;
  overflow: visible;
  outline: none;
  height: 4.5vw;
}
`

export default TeamAccountDetailIndividualItem