import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

const TeamAccountUpdateIndividualItem = ({ data, index, onChange }) => {


  const location = useLocation()

  const [formData, setFormData] = useState({
   target: data.target
  })

  useEffect(() => {
    if (data.name && data.name !== "") {
      setIsAccountNameComplete(true);
    }
  
    if (data.target && data.target !== "") {
      setIsTargetComplete(true);
    }
  }, [data])

    // 통장 이름 입력 칸
    const [isAccountNameFocused, setIsAccountNameFocused] = useState(false);
    const [isAccountNameComplete, setIsAccountNameComplete] = useState(false);
    const inputAccountNameRef = useRef(null);
  
    const handleAccountNameFocus = () => {
      setIsAccountNameFocused(true);
    };
  
    const handleAccountNameBlur = useCallback(() => {
      const accountNameValue = formData.accountName
  
      setIsAccountNameFocused(false);
      if (accountNameValue === "") {
        setIsAccountNameComplete(false);
      } else {
        setIsAccountNameComplete(true);
      }
    }, [formData.accountName]);
  
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

    const functionSetAccountName = (e) => {
      handleChange(e);
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatValueWithComma = (value) => {
    let formattedValue = "";  
    let reversedValue = value.split('').reverse().join('');
    
    for (let i = 0; i < reversedValue.length; i++) {
        if (i > 0 && i % 3 === 0) {
            formattedValue += ",";
        }
        formattedValue += reversedValue[i];
    }

    // 다시 문자열 뒤집기
    return formattedValue.split('').reverse().join('');
}

const [displayValue, setDisplayValue] = useState(data.target ? formatValueWithComma(data.target.toString()) : "");
  
  const handleTargetValue = (e) => {
    const value = e.target.value.replace(/\D+/g, "");
    const formattedValue = formatValueWithComma(value);
    setDisplayValue(formattedValue);
    setFormData(prevData => ({
      ...prevData,
      target: value
    }));

    onChange(data.name, value)
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
        const newData = { ...prevData, [name]: value };
        return newData;
    });
  }

  return (
    
    <TeamAccountUpdateIndividualItemWrapper index={index}>
        <div className={`teamaccount-update-target ${isTargetFocused ? 'focus' : ''} ${isTargetComplete ? 'complete' : ''}`}>
          <label id="signup-label">{data.name}</label>
          <input type="text" id="signup-input" ref={inputTargetRef} onFocus={handleTargetFocus} onBlur={handleTargetBlur} onChange={(e) => {handleTargetValue(e)}} value={displayValue} name="target"/>
        </div>
    </TeamAccountUpdateIndividualItemWrapper>
  )
}

const TeamAccountUpdateIndividualItemWrapper = styled.div`
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
	  height: 36px;
	  line-height: 1.33;
    font-size: 2vh;
    font-weight:620;
  }

  .teamaccount-update-target > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .teamaccount-update-target > label{
      top: ${props => 25 + (props.index * 8)}vh;
      position: absolute;
      
      max-width: 100%;
      height: 2.7em;
      line-height: 1.33;
      color: #909090;
      font-size: 2vh;
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
      top: ${props => 23 + (props.index * 8)}vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .teamaccount-update-target.complete > label{
      top: ${props => 23 + (props.index * 8)}vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
  }
`

export default TeamAccountUpdateIndividualItem