import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import 'animate.css'
import SignupCompleteWaffle from '../../assets/SignupCompleteWaffle.png'
import dgbLogo from '../../assets/dgblogo.png'
import ibkLogo from '../../assets/ibklogo.png'
import kakaoBankLogo from '../../assets/kakaobanklogo.png'
import kbLogo from '../../assets/kblogo.png'
import nonghyupLogo from '../../assets/nonghyuplogo.png'
import postLogo from '../../assets/postlogo.png'
import shinhanLogo from '../../assets/shinhanlogo.png'
import tossBankLogo from '../../assets/tossbanklogo.png'
import wooriLogo from '../../assets/woorilogo.png'


const TeamAccountAddNew = () => {

// 모달 관리
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};

  const location = useLocation()

  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    endDay: '',
    accountNumber: '',
    company: ''
  })

  // useEffect(() => {
  //   handleInputChange()
  // }, [formData.name, formData.goal, formData.endDay, formData.accountNumber, formData.company])

  // useEffect(() => {
  //   onChangeBirthdate()
  // }, [formData.endDay])

  useEffect(() => {
    handleBankSelect()
    handleTelBlur()
  }, [formData.accountNumber])

  useEffect(() => {
    if (formData.company !== "") {
      setIsTelComplete(true);
    } else {
      setIsTelComplete(false);
    }
  }, [formData.company]);

  // 뒤로가기
  const navigate = useNavigate();

  const handleGoBack = () => {
    
    navigate('/teamaccount/main');
  }

  // 이메일 입력 칸
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailComplete, setIsEmailComplete] = useState(false);
  const inputEmailRef = useRef(null);

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = useCallback(() => {
    const emailValue = formData.name

    setIsEmailFocused(false);
    if (emailValue === "") {
      setIsEmailComplete(false);
    } else {
      setIsEmailComplete(true);
    }
  }, [formData.name]);

  const showEmailPlaceholder = isEmailFocused && !formData.name

  // 비밀번호 입력 칸
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordComplete, setIsPasswordComplete] = useState(false);
  const inputPasswordRef = useRef(null);

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = (event) => {
    setIsPasswordFocused(false);
    if (event.target.value === "") {
      setIsPasswordComplete(false);
    } else {
      setIsPasswordComplete(true);
    }
  };

  const onChangePassword = useCallback((passwordValue) => {
    const passwordRegex = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
    const passwordCurrent = passwordValue

    const [year, month, day] = passwordCurrent.split("-").map((str) => parseInt(str, 10))
  
    }, [formData.goal]);

  const showPasswordPlaceholder = isPasswordFocused && !inputPasswordRef.current?.value

  // 비밀번호 확인 칸
  const [isPasswordVerifyFocused, setIsPasswordVerifyFocused] = useState(false);
  const [isPasswordVerifyComplete, setIsPasswordVerifyComplete] = useState(false);
  const inputPasswordVerifyRef = useRef(null);

  const handlePasswordVerifyFocus = () => {
    setIsPasswordVerifyFocused(true);
  };

  const handlePasswordVerifyBlur = (event) => {
    setIsPasswordVerifyFocused(false);
    if (event.target.value === "") {
      setIsPasswordVerifyComplete(false);
    } else {
      setIsPasswordVerifyComplete(true);
    }
  };

  const showPasswordVerifyPlaceholder = isPasswordVerifyFocused && !inputPasswordVerifyRef.current?.value

  // 이름 칸
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isNameComplete, setIsNameComplete] = useState(false);
  const inputNameRef = useRef(null);

  const handleNameFocus = () => {
    setIsNameFocused(true);
  };

  const handleNameBlur = useCallback(() => {

    const nameValue = formData.accountNumber
    setIsNameFocused(false);
    if (nameValue === "") {
      setIsNameComplete(false);
    } else {
      setIsNameComplete(true);
    }
  }, [formData.accountNumber]);

  const showNamePlaceholder = isNameFocused && !inputNameRef.current?.value

  // 생년월일 칸
  const [isBirthdateFocused, setIsBirthdateFocused] = useState(false);
  const [isBirthdateComplete, setIsBirthdateComplete] = useState(false);
  const inputBirthdateRef = useRef(null);

  const handleBirthdateFocus = () => {
    setIsBirthdateFocused(true);
  };

  const handleBirthdateBlur = useCallback(() => {
    setIsBirthdateFocused(false);

    const birthdateValue = formData.endDay
    if (birthdateValue === "") {
      setIsBirthdateComplete(false);
    } else {
      setIsBirthdateComplete(true);
    }
  }, [formData.endDay]);

  const showBirthdatePlaceholder = isBirthdateFocused && !inputBirthdateRef.current?.value

  // 생년월일 자동 하이픈 추가
  const handleBirthdate = () => {
    const value = inputBirthdateRef.current.value.replace(/\D+/g, "");
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

    inputBirthdateRef.current.value = result;

  };

  // 연락처 칸
  const [isTelFocused, setIsTelFocused] = useState(false);
  const [isTelComplete, setIsTelComplete] = useState(false);
  const inputTelRef = useRef(null);

  const handleTelFocus = () => {
    setIsTelFocused(true);
  };

  const handleTelBlur = useCallback(() => {
    const telValue = formData.company
    setIsTelFocused(false);
    if (telValue === "") {
      setIsTelComplete(false);
    } else {
      setIsTelComplete(true);
    }
  }, [formData]);

  const showTelPlaceholder = isTelFocused && !inputTelRef.current?.value

  // 유효성 검사
  const [isBirthdate, setIsBirthdate] = useState(null)

  const onChangeBirthdate = useCallback((birthdateValue) => {
    const birthdateRegex = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
    const birthdateCurrent = birthdateValue

    if (birthdateCurrent === "") {
      setIsBirthdate(null);
      return;
    } else if (!birthdateRegex.test(birthdateCurrent)) {
      setIsBirthdate(false);
      return;
    } else {
      setIsBirthdate(true);
    }

    const [year, month, day] = birthdateCurrent.split("-").map((str) => parseInt(str, 10))
  
    // 윤년 체크
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  
    // 각 월의 최대 일수를 저장
    const monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
    if (isLeapYear) {
      monthDays[2] = 29
    }
  
    // 해당 월의 일수보다 작거나 같은지 확인
    if (day <= monthDays[month]) {
      setIsBirthdate(true);
    } else {
      setIsBirthdate(false);
    }
    
  // 현재 날짜와 입력된 날짜를 비교
  const currentDate = new Date();
  const inputDate = new Date(year, month - 1, day)

  if (inputDate.getTime() < currentDate.getTime()) {
    setIsBirthdate(false);
    return;
  }
    }, [formData.endDay]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      return newData;
  });
}

  // Birthdate와 Tel onChange에 함수 두 개 넣기 위한 함수 세트 지정
  const functionSetEmail = (e) => {
    handleChange(e);
  }

  const functionSetBirthdate = (e) => {
    handleBirthdate(e);
    onChangeBirthdate(e.target.value);
    handleChange(e);
  }

  const functionSetTel = (e) => {
    handleChange(e);
  }

  // 신규 통장 등록

  const token = localStorage.getItem('access_token')

  const headers = {
    "Authorization": "Bearer " + token
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('/team-account/add-list', formData, {headers: headers})
      .then(response => {
        alert('새 통장이 등록되었습니다')
        navigate('/teamaccount/main')
      })
      .catch(error => {
        console.error('통장 등록 실패')
        alert('통장 등록에 실패했습니다')
      })
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

// 선택한 은행 반영

const [chosenBank, setChosenBank] = useState("");

// value값은 api 반환값에 따라 변경 필요
const BANK_INFO = {
  "KB국민": { display: "KB국민", value: "KB" },
  "NH은행": { display: "NH은행", value: "NH" },
  "카카오뱅크": { display: "카카오뱅크", value: "Kakao" },
  "신한은행": { display: "신한은행", value: "Shinhan" },
  "기업은행": { display: "기업은행", value: "IBK" },
  "토스뱅크": { display: "토스뱅크", value: "Toss" },
  "대구은행": { display: "대구은행", value: "Daegu" },
  "우체국": { display: "우체국", value: "Post" },
  "우리은행": { display: "우리은행", value: "Woori" },
};

const handleBankSelect = (bankInfo) => () => { 
  setChosenBank(bankInfo.display);
  
  setFormData(prevData => ({ ...prevData, company: bankInfo.value }));

  if (bankInfo.value !== "") {
    setIsTelComplete(true);
  } else {
    setIsTelComplete(false);
  }
  closeModal();
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

  return formattedValue.split('').reverse().join('');
}

const [displayValue, setDisplayValue] = useState('');

const handleTargetValue = (e) => {

  const value = e.target.value.replace(/\D+/g, "");
  const formattedValue = formatValueWithComma(value);
  
  setDisplayValue(formattedValue);

  setFormData(prevData => ({
    ...prevData,
    goal: value
  }));
}

console.log(formData)
console.log(isBirthdate)

  return (
    <SignupWrapper>
      <div className="signup-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="signup-title">새 모임 통장을 등록해주세요</div>
      <div className="signup-title-underline"></div>

      <form>
        <div className={`signup-email ${isEmailFocused ? 'focus' : ''} ${isEmailComplete ? 'complete' : ''}`}>
          <label id="signup-label">통장 이름</label>
          <input type="text" id="signup-input" ref={inputEmailRef} onFocus={handleEmailFocus} onBlur={handleEmailBlur} onChange={(e) => {functionSetEmail(e); handleInputChange(e)}} inputmode="email" value={formData.name} name="name"/>
        </div>

        <div className={`signup-password ${isPasswordFocused ? 'focus' : ''} ${isPasswordComplete ? 'complete' : ''}`}>
          <label id="signup-label">목표액</label>
          <input type="text" id="signup-input" ref={inputPasswordRef} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} onChange={(e) => {handleTargetValue(e)}} value={displayValue} name="goal"/>
        </div>

        <div className={`signup-birthdate ${isBirthdateFocused ? 'focus' : ''} ${isBirthdateComplete ? 'complete' : ''}`}>
          <label id="signup-label">종료일</label>
          <input type="text" id="signup-input" ref={inputBirthdateRef} onFocus={handleBirthdateFocus} onBlur={handleBirthdateBlur} onChange={(e) => {functionSetBirthdate(e) ; handleInputChange(e)}} value={formData.endDay} name="endDay"/>
        </div>

        <div className={`signup-name ${isNameFocused ? 'focus' : ''} ${isNameComplete ? 'complete' : ''}`}>
          <label id="signup-label">계좌번호</label>
          <input type="text" id="signup-input" ref={inputNameRef} onFocus={handleNameFocus} onBlur={handleNameBlur} onChange={(e) => {handleChange(e); handleInputChange(e)}} value={formData.accountNumber} name="accountNumber"/>
        </div>
        
        <div className={`signup-password-verify ${isTelFocused ? 'focus' : ''} ${isTelComplete ? 'complete' : ''}`}>
          <label id="signup-label">은행</label>
          <input type="text" id="signup-input" ref={inputTelRef} onFocus={handleTelFocus} onBlur={handleTelBlur} onChange={(e) => {handleChange(e); handleInputChange(e)}} name="company" onClick={openModal} autoComplete='off' value={chosenBank} readonly inputmode="none"/>
        </div>

        <ModalOverlay isOpen={isModalOpen} onClick={closeModal} />
        <ModalWrapper isOpen={isModalOpen}>
          <ModalContent>
            <div className="modal-title">은행 선택</div>
            <BankLogos>
              <BankItem onClick={handleBankSelect(BANK_INFO["KB국민"])}>
                <Image src={kbLogo} alt="kbLogo" />
                <BankLabel>KB국민</BankLabel>
              </BankItem>

              <BankItem onClick={handleBankSelect(BANK_INFO["NH은행"])}>
                <Image src={nonghyupLogo} alt="nonghyupLogo" />
                <BankLabel>NH은행</BankLabel>
              </BankItem>

              <BankItem onClick={handleBankSelect(BANK_INFO["카카오뱅크"])}>
                <Image src={kakaoBankLogo} alt="kakaoBankLogo" />
                <BankLabel>카카오뱅크</BankLabel>
              </BankItem>

              <BankItem onClick={handleBankSelect(BANK_INFO["신한은행"])}>
                <Image src={shinhanLogo} alt="shinhanLogo" />
                <BankLabel>신한은행</BankLabel>
              </BankItem>

              <BankItem onClick={handleBankSelect(BANK_INFO["기업은행"])}>
                <Image src={ibkLogo} alt="ibkLogo" />
                <BankLabel>기업은행</BankLabel>
              </BankItem>

              <BankItem onClick={handleBankSelect(BANK_INFO["토스뱅크"])}>
                <Image src={tossBankLogo} alt="tossBankLogo" />
                <BankLabel>토스뱅크</BankLabel>
              </BankItem>

              <BankItem onClick={handleBankSelect(BANK_INFO["대구은행"])}>
                <Image src={dgbLogo} alt="dgbLogo" />
                <BankLabel>대구은행</BankLabel>
              </BankItem>

              <BankItem onClick={handleBankSelect(BANK_INFO["우체국"])}>
                <Image src={postLogo} alt="postLogo" />
                <BankLabel>우체국</BankLabel>
              </BankItem>

              <BankItem onClick={handleBankSelect(BANK_INFO["우리은행"])}>
                <Image src={wooriLogo} alt="wooriLogo" />
                <BankLabel>우리은행</BankLabel>
              </BankItem>

            </BankLogos>
          </ModalContent>
        </ModalWrapper>

        <div className="signup-button-container">
          <SignupButton type="submit" className="signup-button" onClick={handleSubmit} disabled={!(formData.name && formData.goal && formData.endDay && formData.accountNumber && formData.company && isBirthdate)}>등록하기</SignupButton>
        </div>
      </form>
    </SignupWrapper>
  )
}

const SignupWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;

  .signup-header {
    display: flex;
    margin: 8vw 6vw;
  }

  .signup-title {
    font-size: 6vw;
    margin-top: 3vw;
    margin-left: 8vw;
    text-align: left;
    color: #000004;
  }

  .signup-title-underline {
    height: 0.7vw;
    width: 80vw;
    margin: 4vw auto;
    background-color: #000004;
  }

  .signup-email {
    padding: 4vw 15vw;
    display: flex;
  }

  .signup-email > input{
    display: block;
    width: 100%;
    color: #909090;
    border: 0;
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
  }

  .signup-email > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-email > label{
    top: 45vw;
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

  .signup-email.focus > label{
    top: 40vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
      color: #76A8DE;
  }

  .signup-email.complete > label{
    top: 40vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
  }

  input::placeholder {
    color: #90909061;
    font-size: 1.3vh;
  }

  .signup-emailverify {
    width: 5vh;
    margin-left: 1vh;
    border-radius: 13px;
    border: none;
    background-color: #9AC5F4;
    color: white;
    font-weight: 600;
    font-size: 1.5vh;
  }

  .signup-emailverify:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }

  .signup-password {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-password > input{
    display: block;
    width: 100%;
    color: #909090;
    border: 0;
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
  }

  .signup-password > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-password > label{
    top: 63vw;
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

  .signup-password.focus > label{
    top: 58vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
      color: #76A8DE;
  }

  .signup-password.complete > label{
    top: 58vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
  }

  .signup-password-verify {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-password-verify > input{
    display: block;
    width: 100%;
    color: #909090;
    border: 0;
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
  }

  .signup-password-verify > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-password-verify > label{
    top: 119vw;
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

  .signup-password-verify.focus > label{
    top: 114vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
      color: #76A8DE;
  }

  .signup-password-verify.complete > label{
    top: 114vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
  }

  .signup-name {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-name > input{
    display: block;
    width: 100%;
    color: #909090;
    border: 0;
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
  }

  .signup-name > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-name > label{
    top: 100vw;
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

  .signup-name.focus > label{
    top: 95vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
      color: #76A8DE;
  }

  .signup-name.complete > label{
    top: 95vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
  }

  .signup-birthdate {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-birthdate > input{
    display: block;
    width: 100%;
    color: #909090;
    border: 0;
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
  }

  .signup-birthdate > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-birthdate > label{
    top: 81vw;
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

  .signup-birthdate.focus > label{
    top: 76vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
      color: #76A8DE;
  }

  .signup-birthdate.complete > label{
    top: 76vw;
        left: 14vw;
        font-size: 3vw;
        line-height: 1.33;
  }

  .signup-tel {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-tel > input{
    display: block;
    width: 100%;
    color: #909090;
    border: 0;
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
  }

  .signup-tel > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-tel > label{
      top: 59vh;
      position: absolute;
      left: 9vh;
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

  .signup-tel.focus > label{
      top: 57vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .signup-tel.complete > label{
      top: 57vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
  }

  .signup-wrong {
    margin-left: 2vh;
    width: 3vh;
    height: 3vh;
  }

  .signup-correct {
    margin-left: 2vh;
    width: 3vh;
    height: 3vh;
  }
`

const SignupButton = styled.button`
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

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingImage = styled.img`
  width: 20vh;
  height: 20vh;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); 
  z-index: 1000;  
  display: ${props => props.isOpen ? 'block' : 'none'}; 
`;

const ModalWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${props => props.isOpen ? '52%' : '0'};
  background-color: white;
  overflow: hidden;
  transition: height 0.2s ease-in-out;
  z-index: 2000;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

const ModalContent = styled.div`
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;   // 세로 방향으로 내용 배치
  justify-content: center;  // 세로 방향으로 내용 중앙 정렬
  align-items: center;      // 가로 방향으로 내용 중앙 정렬
  overflow-y: auto;

  .modal-title {
    margin-top: 3vh;
    margin-bottom: 5vh;
    align-self: flex-start;  // 제목만 왼쪽 정렬
    width: 100%;             // 전체 너비 차지
    text-align: center;      // 텍스트 중앙 정렬
    font-size: 2.3vh;
  }
`;

const BankLogos = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4vh;
  grid-row-gap: 5vh;
  width: 90%;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-bottom: 2vh;
`;

const BankItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  position: relative;
`

const Image = styled.img`
  max-width: 100%;    // 최대 너비를 그리드 크기로 제한
  max-height: 80%;    // 최대 높이를 그리드 높이의 80%로 제한 (라벨을 고려하여)
  object-fit: cover;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const BankLabel = styled.p`
  font-size: 1.5vh;
  position: absolute; // 절대 위치 지정
  bottom: -3vh;          // 하단에 고정
  left: 50%;          // 왼쪽에서 50% 위치
  transform: translateX(-50%); // X축으로 -50% 이동하여 중앙 정렬
  width: 100%;
`;

export default TeamAccountAddNew