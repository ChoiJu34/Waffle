import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'

const TeamAccountUpdate = () => {

  const location = useLocation()

  const id = window.location.pathname.match(/\d+$/)?.[0]

  const [formData, setFormData] = useState({
    id: id,
    name: location.state?.accountName,
    goal: location.state?.target,
    endDay: location.state?.endDate,
  })

  useEffect(() => {
    if (location.state?.target) {
      const value = String(location.state.target)
  
      let formattedValue = "";
      let reversedValue = value.split('').reverse().join('');
  
      for (let i = 0; i < reversedValue.length; i++) {
        if (i > 0 && i % 3 === 0) {
            formattedValue += ",";
        }
        formattedValue += reversedValue[i];
      }
    
      formattedValue = formattedValue.split('').reverse().join('');
      setDisplayValue(formattedValue);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state?.accountName && location.state.accountName !== "") {
      setIsAccountNameComplete(true);
    }
  
    if (location.state?.target && location.state.target !== "") {
      setIsTargetComplete(true);
    }
  
    if (location.state?.endDate && location.state.endDate !== "") {
      setIsEndDateComplete(true);
    }

    if (location.state?.endDate) {
      onChangeEndDate(location.state.endDate);
    }
  }, [location.state]);

  // 뒤로가기
  const navigate = useNavigate();

  const handleGoBack = () => {

    window.scrollTo(0, 0)
    
    navigate('/teamaccount/main');
  }

  // 통장 이름 입력 칸
  const [isAccountNameFocused, setIsAccountNameFocused] = useState(false);
  const [isAccountNameComplete, setIsAccountNameComplete] = useState(false);
  const inputAccountNameRef = useRef(null);

  const handleAccountNameFocus = () => {
    setIsAccountNameFocused(true);
  };

  const handleAccountNameBlur = useCallback(() => {
    const accountNameValue = formData.name

    setIsAccountNameFocused(false);
    if (accountNameValue === "") {
      setIsAccountNameComplete(false);
    } else {
      setIsAccountNameComplete(true);
    }
  }, [formData.name]);

  // 목표 금액 입력 칸
  const [isTargetFocused, setIsTargetFocused] = useState(false);
  const [isTargetComplete, setIsTargetComplete] = useState(false);
  const inputTargetRef = useRef(null);

  const handleTargetFocus = () => {
    setIsTargetFocused(true);
  };

  const handleTargetBlur = (event) => {
    setIsTargetFocused(false);
    if (event.target.value === "") {
      setIsTargetComplete(false);
    } else {
      setIsTargetComplete(true);
    }
  };

  // 생년월일 칸
  const [isEndDateFocused, setIsEndDateFocused] = useState(false);
  const [isEndDateComplete, setIsEndDateComplete] = useState(false);
  const inputEndDateRef = useRef(null);

  const handleEndDateFocus = () => {
    setIsEndDateFocused(true);
  };

  const handleEndDateBlur = useCallback(() => {
    setIsEndDateFocused(false);

    const endDateValue = formData.endDay
    if (endDateValue === "") {
      setIsEndDateComplete(false);
    } else {
      setIsEndDateComplete(true);
    }
  }, [formData.endDay]);

  const showEndDatePlaceholder = isEndDateFocused && !inputEndDateRef.current?.value

  // 생년월일 자동 하이픈 추가
  const handleEndDate = () => {
    const value = inputEndDateRef.current.value.replace(/\D+/g, "");
    const numberLength = 8;

    let result;
    result = "";  

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 4:
          result += "-";
          break;
        case 6:
          result += "-";
          break;

        default:
          break;
      }

      result += value[i];
    }

    inputEndDateRef.current.value = result;

  };

  // 유효성 검사
  const [isEndDate, setIsEndDate] = useState(null)

  const onChangeEndDate = useCallback((endDateValue) => {
    const endDateRegex = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
    const endDateCurrent = endDateValue

    if (endDateCurrent === "") {
      setIsEndDate(null);
      return;
    } else if (!endDateRegex.test(endDateCurrent)) {
      setIsEndDate(false);
      return;
    } else {
      setIsEndDate(true);
    }

    const [year, month, day] = endDateCurrent.split("-").map((str) => parseInt(str, 10))
  
    // 윤년 체크
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  
    // 각 월의 최대 일수를 저장
    const monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
    if (isLeapYear) {
      monthDays[2] = 29
    }
  
    // 해당 월의 일수보다 작거나 같은지 확인
    if (day <= monthDays[month]) {
      setIsEndDate(true);
    } else {
      setIsEndDate(false);
    }
    }, [formData.endDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
        const newData = { ...prevData, [name]: value };
        return newData;
    });
  }

  const functionSetAccountName = (e) => {
    handleChange(e);
  }

  const functionSetEndDate = (e) => {
    handleEndDate(e);
    onChangeEndDate(e.target.value);
    handleChange(e);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

const [displayValue, setDisplayValue] = useState('');

const handleTargetValue = (e) => {

  const value = e.target.value.replace(/\D+/g, "");
  
  let formattedValue = "";  

  let reversedValue = value.split('').reverse().join('');

  for (let i = 0; i < reversedValue.length; i++) {
      if (i > 0 && i % 3 === 0) {
          formattedValue += ",";
      }
      formattedValue += reversedValue[i];
  }
  
  // 다시 문자열 뒤집기
  formattedValue = formattedValue.split('').reverse().join('');

  setDisplayValue(formattedValue);

  setFormData(prevData => ({
    ...prevData,
    goal: value
  }));
}

const token = localStorage.getItem('access_token')

const headers = {
  "Authorization": "Bearer " + token
}

const submitUpdate = (e) => {

  e.preventDefault()

  axios.put(`/team-account/update-detail`, formData, { headers: headers })
  .then(response => {
    navigate(`/teamaccount/detail/${id}`)
  })
  .catch(error => {
    console.error('수정 실패');
    alert('수정 실패');
  });
}

console.log(formData)

  return (
    <TeamAccountUpdateWrapper>
      <div className="teamaccount-update-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="teamaccount-update-title">모임 통장 정보 수정</div>
      <div className="teamaccount-update-title-underline"></div>

      <form>
        <div className={`teamaccount-update-accountname ${isAccountNameFocused ? 'focus' : ''} ${isAccountNameComplete ? 'complete' : ''}`}>
          <label id="signup-label">통장 이름</label>
          <input type="text" id="signup-input" ref={inputAccountNameRef} onFocus={handleAccountNameFocus} onBlur={handleAccountNameBlur} onChange={(e) => {functionSetAccountName(e); handleInputChange(e)}} value={formData.name} name="name"/>
        </div>

        <div className={`teamaccount-update-target ${isTargetFocused ? 'focus' : ''} ${isTargetComplete ? 'complete' : ''}`}>
          <label id="signup-label">목표액</label>
          <input type="text" id="signup-input" ref={inputTargetRef} onFocus={handleTargetFocus} onBlur={handleTargetBlur} onChange={(e) => {handleTargetValue(e)}} value={displayValue} name="goal"/>
        </div>

        <div className={`teamaccount-update-enddate ${isEndDateFocused ? 'focus' : ''} ${isEndDateComplete ? 'complete' : ''}`}>
          <label id="signup-label">종료일</label>
          <input type="text" id="signup-input" ref={inputEndDateRef} onFocus={handleEndDateFocus} onBlur={handleEndDateBlur} onChange={(e) => {functionSetEndDate(e) ; handleInputChange(e)}} value={formData.endDay} name="endDay" placeholder={showEndDatePlaceholder ? "ex) 20231130" : ""}/>
        </div>

        <div className="signup-button-container">
          <TeamAccountUpdateButton type="submit" className="signup-button" disabled={!(formData.name && formData.goal && formData.endDay && isEndDate)} onClick={submitUpdate}>수정하기</TeamAccountUpdateButton>
        </div>
      </form>
    </TeamAccountUpdateWrapper>
  )
}

const TeamAccountUpdateWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;

  .teamaccount-update-header {
    display: flex;
    margin: 8vw 6vw;
  }

  .teamaccount-update-title {
    font-size: 7vw;
    margin-top: 3vw;
    margin-left: 8vw;
    text-align: left;
    color: #000004;
  }

  .teamaccount-update-title-underline {
    height: 0.7vw;
    width: 80vw;
    margin: 4vw auto;
    background-color: #000004;
  }

  .teamaccount-update-accountname {
    padding: 4vw 15vw;
    display: flex;
  }

  .teamaccount-update-accountname > input{
    display: block;
	    width: 100%;
	    color: #909090;
	    border:0;
	    border-bottom: 1px solid #8c8c8c;
	    background-color: transparent;
	    box-sizing: border-box;
	    border-radius: 0;
	    padding: 0;
	    height: 10vw;
	    line-height: 1.33;
	    font-size: 5vw;
	    font-family: inherit;
	    vertical-align: baseline;
	    -webkit-appearance: none;
	    overflow: visible;
	    margin:0;
  }

  .teamaccount-update-accountname > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .teamaccount-update-accountname > label{
    top: 46vw;
        position: absolute;
        left: 16vw;
        max-width: 100%;
        height: 2.7em;
        line-height: 1.33;
        color: #909090;
        font-size: 4.5vw;
        cursor: text;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all .2s;
        pointer-events: none;
        -webkit-font-smoothing: antialiased;
        transform: translate3d(0, 3px, 0) scale(1);
        transform-origin: left top;
  }

  .teamaccount-update-accountname.focus > label{
    top: 41vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
      color: #76A8DE;
  }

  .teamaccount-update-accountname.complete > label{
    top: 41vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
  }

  input::placeholder {
    color: #90909061;
    font-size: 1.3vh;
  }

  .teamaccount-update-target {
    padding: 2vh 7vh;
    display: flex;
  }

  .teamaccount-update-target > input{
    display: block;
	    width: 100%;
	    color: #909090;
	    border:0;
	    border-bottom: 1px solid #8c8c8c;
	    background-color: transparent;
	    box-sizing: border-box;
	    border-radius: 0;
	    padding: 0;
	    height: 10vw;
	    line-height: 1.33;
	    font-size: 5vw;
	    font-family: inherit;
	    vertical-align: baseline;
	    -webkit-appearance: none;
	    overflow: visible;
	    margin:0;
  }

  .teamaccount-update-target > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .teamaccount-update-target > label{
    top: 64vw;
        position: absolute;
        left: 16vw;
        max-width: 100%;
        height: 2.7em;
        line-height: 1.33;
        color: #909090;
        font-size: 4.5vw;
        cursor: text;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all .2s;
        pointer-events: none;
        -webkit-font-smoothing: antialiased;
        transform: translate3d(0, 3px, 0) scale(1);
        transform-origin: left top;
  }

  .teamaccount-update-target.focus > label{
    top: 59vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
      color: #76A8DE;
  }

  .teamaccount-update-target.complete > label{
    top: 59vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
  }

  .teamaccount-update-enddate {
    padding: 2vh 7vh;
    display: flex;
  }

  .teamaccount-update-enddate > input{
    display: block;
	    width: 100%;
	    color: #909090;
	    border:0;
	    border-bottom: 1px solid #8c8c8c;
	    background-color: transparent;
	    box-sizing: border-box;
	    border-radius: 0;
	    padding: 0;
	    height: 10vw;
	    line-height: 1.33;
	    font-size: 5vw;
	    font-family: inherit;
	    vertical-align: baseline;
	    -webkit-appearance: none;
	    overflow: visible;
	    margin:0;
  }

  .teamaccount-update-enddate > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .teamaccount-update-enddate > label{
    top: 82vw;
        position: absolute;
        left: 16vw;
        max-width: 100%;
        height: 2.7em;
        line-height: 1.33;
        color: #909090;
        font-size: 4.5vw;
        cursor: text;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all .2s;
        pointer-events: none;
        -webkit-font-smoothing: antialiased;
        transform: translate3d(0, 3px, 0) scale(1);
        transform-origin: left top;
  }

  .teamaccount-update-enddate.focus > label{
    top: 77vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
      color: #76A8DE;
  }

  .teamaccount-update-enddate.complete > label{
    top: 77vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
  }
`

const TeamAccountUpdateButton = styled.button`
      width: 28vw;
      height: 11vw;
      border-radius: 15px;
      border: none;
      background-color: #9AC5F4;
      color: white;
      font-weight: 800;
      font-size: 5vw;
      margin-top: 5vw;

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export default TeamAccountUpdate