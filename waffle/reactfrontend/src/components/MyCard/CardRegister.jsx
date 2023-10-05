import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CardRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("access_token");

  const headers = {
    Authorization: "Bearer " + token,
  };

  const numberFromPrevious = location.state?.number || "";
  const dateFromPrevious = location.state?.date || "";
  const nicknameFromPrevious = location.state?.nickname || "";

  const [formData, setFormData] = useState({
    number: numberFromPrevious,
    date: dateFromPrevious,
    nickname: nicknameFromPrevious,
  });

  const cardRegister = async () => {
    const params = {
      cardBin: formData.number.replace("-", "").slice(0, 6),
      cardNumber: formData.number,
      cardNickname: formData.nickname,
      cardValidDate: formData.date,
    };

    await axios.post(`/user-card/add`, params, { headers });

    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      return newData;
    });
  };

  // 카드 번호
  const [isNumberFocused, setIsNumberFocused] = useState(false);
  const [isNumberComplete, setIsNumberComplete] = useState(false);
  const inputNumberRef = useRef(null);

  const handleNumberFocus = () => {
    setIsNumberFocused(true);
  };

  const handleNumberBlur = (event) => {
    setIsNumberFocused(false);
    if (event.target.value === "") {
      setIsNumberComplete(false);
    } else {
      setIsNumberComplete(true);
    }
  };

  const handleCardNumber = () => {
    const value = inputNumberRef.current.value.replace(/\D+/g, "");
    const numberLength = 16;

    let result;
    result = "";

    for (let i=0; i<value.length && i < numberLength; i++) {
      switch (i) {
        case 4:
          result += "-";
          break;
        case 8:
          result += "-";
          break;
        case 12:
          result += "-";
          break;
        default:
          break;
      }
      result += value[i];
    }
    inputNumberRef.current.value = result;
  };

  const handelCardNumberChange = (e) => {
    handleCardNumber(e);
    handleChange(e);
  }

  // 유효 기간
  const [isDateFocused, setIsDateFocused] = useState(false);
  const [isDateComplete, setIsDateComplete] = useState(false);
  const inputDateRef = useRef(null);

  const handleDateFocus = () => {
    setIsDateFocused(true);
  };

  const handleDateBlur = (event) => {
    setIsDateFocused(false);
    if (event.target.value === "") {
      setIsDateComplete(false);
    } else {
      setIsDateComplete(true);
    }
  };

  const handleDate = (e) => {
    const value = inputDateRef.current.value.replace(/\D+/g, "");
    const numberLength = 4;

    let result;
    result = "";

    for (let i=0; i<value.length && i < numberLength; i++) {
      switch (i) {
        case 2:
          result += "/";
          break;
        default:
          break;
      }
      result += value[i];
    }
    inputDateRef.current.value = result;
  }

  const handleDateChange = (e) => {
    handleDate(e);
    handleChange(e);
  }

  // 닉네임
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [isNicknameComplete, setIsNicknameComplete] = useState(false);
  const inputNicknameRef = useRef(null);

  const handleNicknameFocus = () => {
    setIsNicknameFocused(true);
  };

  const handleNicknameBlur = (event) => {
    setIsNicknameFocused(false);
    if (event.target.value === "") {
      setIsNicknameComplete(false);
    } else {
      setIsNicknameComplete(true);
    }
  };

  return (
    <CardRegisterWrapper>
      <RegisterHeader>
        <div onClick={() => navigate(-1)}>취소</div>
        <div onClick={cardRegister} style={{ color: "#9ac5f4" }}>
          등록
        </div>
      </RegisterHeader>
      <Title>사용 중인 카드를 등록해주세요</Title>
      <form>
        <div
          className={`mycard-number ${isNumberFocused ? "focus" : ""} ${
            isNumberComplete ? "complete" : ""
          }`}
        >
          <label htmlFor="mycard-label-number">카드 번호</label>
          <input
            type="text"
            id="mycard-label-number"
            ref={inputNumberRef}
            onFocus={handleNumberFocus}
            onBlur={handleNumberBlur}
            onChange={(e) => {
              handelCardNumberChange(e);
            }}
            value={formData.number}
            name="number"
          />
        </div>

        <div
          className={`mycard-date ${isDateFocused ? "focus" : ""} ${
            isDateComplete ? "complete" : ""
          }`}
        >
          <label htmlFor="mycard-label-date">유효 기간</label>
          <input
            type="text"
            id="mycard-label-date"
            ref={inputDateRef}
            onFocus={handleDateFocus}
            onBlur={handleDateBlur}
            onChange={(e) => {
              handleDateChange(e);
              handleChange(e);
            }}
            value={formData.date}
            name="date"
          />
        </div>

        <div
          className={`mycard-nickname ${isNicknameFocused ? "focus" : ""} ${
            isNicknameComplete ? "complete" : ""
          }`}
        >
          <label htmlFor="mycard-label-nickname">카드 별명 (선택)</label>
          <input
            type="text"
            id="mycard-label-nickname"
            ref={inputNicknameRef}
            onFocus={handleNicknameFocus}
            onBlur={handleNicknameBlur}
            onChange={(e) => {
              handleChange(e);
            }}
            value={formData.nickname}
            name="nickname"
          />
        </div>
      </form>
    </CardRegisterWrapper>
  );
};

export default CardRegister;

const CardRegisterWrapper = styled.div`
  margin-top: 5vh;
  display: flex;
  flex-direction: column;

  .mycard-number {
    padding: 2vh 7vh;
    display: flex;
  }

  .mycard-number > input {
    display: block;
    width: 100%;
    color: #909090;
    border: 0;
    border-bottom: 1px solid #8c8c8c;
    background-color: transparent;
    box-sizing: border-box;
    border-radius: 0;
    padding: 0;
    height: 36px;
    line-height: 1.33;
    font-size: 18px;
    font-family: inherit;
    vertical-align: baseline;
    -webkit-appearance: none;
    overflow: visible;
    font-family: "돋움";
    font: small-caption;
    font-size: 3vh;
  }

  .mycard-number > input:focus {
    outline: 0;
    border-color: #76a8de;
    border-width: 2px;
    color: #76a8de;
  }

  .mycard-number > label {
    top: 29vh;
    position: absolute;
    left: 9vh;
    max-width: 100%;
    height: 2.7em;
    line-height: 1.33;
    color: #909090;
    font-size: 18px;
    cursor: text;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all 0.2s;
    pointer-events: none;
    -webkit-font-smoothing: antialiased;
    transform: translate3d(0, 3px, 0) scale(1);
    transform-origin: left top;
  }

  .mycard-number.focus > label {
    top: 27vh;
    left: 8vh;
    font-size: 12px;
    line-height: 1.33;
    color: #76a8de;
  }

  .mycard-number.complete > label {
    top: 27vh;
    left: 8vh;
    font-size: 12px;
    line-height: 1.33;
  }

  .mycard-date {
    padding: 2vh 7vh;
    display: flex;
  }

  .mycard-date > input {
    display: block;
    width: 100%;
    color: #909090;
    border: 0;
    border-bottom: 1px solid #8c8c8c;
    background-color: transparent;
    box-sizing: border-box;
    border-radius: 0;
    padding: 0;
    height: 36px;
    line-height: 1.33;
    font-size: 18px;
    font-family: inherit;
    vertical-align: baseline;
    -webkit-appearance: none;
    overflow: visible;
    font-family: "돋움";
    font: small-caption;
    font-size: 3vh;
  }

  .mycard-date > input:focus {
    outline: 0;
    border-color: #76a8de;
    border-width: 2px;
    color: #76a8de;
  }

  .mycard-date > label {
    top: 37vh;
    position: absolute;
    left: 9vh;
    max-width: 100%;
    height: 2.7em;
    line-height: 1.33;
    color: #909090;
    font-size: 18px;
    cursor: text;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all 0.2s;
    pointer-events: none;
    -webkit-font-smoothing: antialiased;
    transform: translate3d(0, 3px, 0) scale(1);
    transform-origin: left top;
  }

  .mycard-date.focus > label {
    top: 35vh;
    left: 8vh;
    font-size: 12px;
    line-height: 1.33;
    color: #76a8de;
  }

  .mycard-date.complete > label {
    top: 35vh;
    left: 8vh;
    font-size: 12px;
    line-height: 1.33;
  }

  .mycard-nickname {
    padding: 2vh 7vh;
    display: flex;
  }

  .mycard-nickname > input {
    display: block;
    width: 100%;
    color: #909090;
    border: 0;
    border-bottom: 1px solid #8c8c8c;
    background-color: transparent;
    box-sizing: border-box;
    border-radius: 0;
    padding: 0;
    height: 36px;
    line-height: 1.33;
    font-size: 18px;
    font-family: inherit;
    vertical-align: baseline;
    -webkit-appearance: none;
    overflow: visible;
    font-family: "돋움";
    font: small-caption;
    font-size: 3vh;
  }

  .mycard-nickname > input:focus {
    outline: 0;
    border-color: #76a8de;
    border-width: 2px;
    color: #76a8de;
  }

  .mycard-nickname > label {
    top: 45vh;
    position: absolute;
    left: 9vh;
    max-width: 100%;
    height: 2.7em;
    line-height: 1.33;
    color: #909090;
    font-size: 18px;
    cursor: text;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all 0.2s;
    pointer-events: none;
    -webkit-font-smoothing: antialiased;
    transform: translate3d(0, 3px, 0) scale(1);
    transform-origin: left top;
  }

  .mycard-nickname.focus > label {
    top: 43vh;
    left: 8vh;
    font-size: 12px;
    line-height: 1.33;
    color: #76a8de;
  }

  .mycard-nickname.complete > label {
    top: 43vh;
    left: 8vh;
    font-size: 12px;
    line-height: 1.33;
  }
`;

const RegisterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 40px;
  font-size: 20px;
`;

const Title = styled.div`
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 28px;
`;
