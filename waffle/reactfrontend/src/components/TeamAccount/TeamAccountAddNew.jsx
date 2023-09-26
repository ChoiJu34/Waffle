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


const Signup = () => {

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
    email: '',
    name: '',
    password: '',
    birthday: '',
    tel: ''
  })

  // useEffect = (() => {
  //   handleInputChange()
  // }, [formData.email, formData.name, formData.password, formData.tel, formData.birthday])

  // useEffect = (() => {
  //   onChangeBirthdate()
  // }, [formData.birthday])

  // useEffect = (() => {
  //   handleBankSelect()
  //   handleTelBlur()
  // }, [formData.tel])

  // useEffect = (() => {
  //   if (formData.tel !== "") {
  //     setIsTelComplete(true);
  //   } else {
  //     setIsTelComplete(false);
  //   }
  // }, [formData.tel]);

  // 뒤로가기
  const navigate = useNavigate();

  const handleGoBack = () => {

    window.scrollTo(0, 0)
    
    navigate(-1);
  }

  // 이메일 입력 칸
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailComplete, setIsEmailComplete] = useState(false);
  const inputEmailRef = useRef(null);

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = useCallback(() => {
    const emailValue = formData.email

    setIsEmailFocused(false);
    if (emailValue === "") {
      setIsEmailComplete(false);
    } else {
      setIsEmailComplete(true);
    }
  }, [formData.email]);

  const showEmailPlaceholder = isEmailFocused && !formData.email

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
  
    }, [formData.password]);

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

    const nameValue = formData.name
    setIsNameFocused(false);
    if (nameValue === "") {
      setIsNameComplete(false);
    } else {
      setIsNameComplete(true);
    }
  }, [formData.name]);

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

    const birthdateValue = formData.birthday
    if (birthdateValue === "") {
      setIsBirthdateComplete(false);
    } else {
      setIsBirthdateComplete(true);
    }
  }, [formData.birthday]);

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
    const telValue = formData.tel
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
    }, [formData.birthday]);

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

  // 회원가입

  const handleSubmit = (e) => {
    e.preventDefault()

    const forSubmitFormData = {
      ...formData,
      birthday: `${formData.birthday} 00:00`
    }

    axios.post('/user/sign-up', forSubmitFormData)
      .then(response => {
        navigate('/user/sign-up/complete')
      })
      .catch(error => {
        console.error('회원가입 실패')
        alert('회원가입에 실패했습니다')
      })
  }

  // 이메일 인증
  const [loading, setLoading] = useState(false)

  const handleEmailVerification = (e) => {

    e.preventDefault()

    setLoading(true)

    axios.post(`/user/verify-email`, { email: formData.email })
      .then((response) => {
        if (response.data.message === "DUPLICATE") {
          alert('이미 가입된 이메일입니다')
          return
        }
        alert('입력하신 메일로 인증코드가 전송되었습니다')
        navigate('/user/verify-email', {state: { email: formData.email, name: formData.name, birthday: formData.birthday, tel: formData.tel }})
      })
      .catch((error) => {
        console.log('이메일 인증 메일 전송 실패')
      })
      .finally(() => {
        setLoading(false)
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
  
  setFormData(prevData => ({ ...prevData, tel: bankInfo.value }));

  if (bankInfo.value !== "") {
    setIsTelComplete(true);
  } else {
    setIsTelComplete(false);
  }
  closeModal();
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
    password: value
  }));
}
console.log(formData.password)
  return (
    <SignupWrapper>
      <div className="signup-header"><FontAwesomeIcon icon={faArrowLeft} color="black" size="2x" onClick={handleGoBack}/></div>
      <div className="signup-title">새 모임 통장을 등록해주세요</div>
      <div className="signup-title-underline"></div>

      <form>
        <div className={`signup-email ${isEmailFocused ? 'focus' : ''} ${isEmailComplete ? 'complete' : ''}`}>
          <label id="signup-label">통장 이름</label>
          <input type="text" id="signup-input" ref={inputEmailRef} onFocus={handleEmailFocus} onBlur={handleEmailBlur} onChange={(e) => {functionSetEmail(e); handleInputChange(e)}} inputmode="email" value={formData.email} name="email"/>
        </div>

        <div className={`signup-password ${isPasswordFocused ? 'focus' : ''} ${isPasswordComplete ? 'complete' : ''}`}>
          <label id="signup-label">목표액</label>
          <input type="text" id="signup-input" ref={inputPasswordRef} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} onChange={(e) => {handleTargetValue(e)}} value={displayValue} name="password"/>
        </div>

        <div className={`signup-birthdate ${isBirthdateFocused ? 'focus' : ''} ${isBirthdateComplete ? 'complete' : ''}`}>
          <label id="signup-label">종료일</label>
          <input type="text" id="signup-input" ref={inputBirthdateRef} onFocus={handleBirthdateFocus} onBlur={handleBirthdateBlur} onChange={(e) => {functionSetBirthdate(e) ; handleInputChange(e)}} value={formData.birthday} name="birthday"/>
        </div>

        <div className={`signup-name ${isNameFocused ? 'focus' : ''} ${isNameComplete ? 'complete' : ''}`}>
          <label id="signup-label">계좌번호</label>
          <input type="text" id="signup-input" ref={inputNameRef} onFocus={handleNameFocus} onBlur={handleNameBlur} onChange={(e) => {handleChange(e); handleInputChange(e)}} value={formData.name} name="name"/>
        </div>
        
        <div className={`signup-password-verify ${isTelFocused ? 'focus' : ''} ${isTelComplete ? 'complete' : ''}`}>
          <label id="signup-label">은행</label>
          <input type="text" id="signup-input" ref={inputTelRef} onFocus={handleTelFocus} onBlur={handleTelBlur} onChange={(e) => {handleChange(e); handleInputChange(e)}} name="tel" onClick={openModal} autoComplete='off' value={chosenBank}/>
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
          <SignupButton type="submit" className="signup-button" onClick={handleSubmit} disabled={!(formData.name && formData.email && formData.password && formData.tel && formData.birthday && isBirthdate)}>등록하기</SignupButton>
        </div>
      </form>
    </SignupWrapper>
  )
}

const SignupWrapper = styled.div`
  min-height: 100vh;

  .signup-header {
    display: flex;
    margin: 3vh 2vh;
  }

  .signup-title {
    font-size: 2.8vh;
    margin-top: 3vh;
    margin-left: 3vh;
    text-align: left;
    color: #000004;
  }

  .signup-title-underline {
    height: 0.3vh;
    width: 80%;
    margin: 1.5vh auto;
    background-color: #000004;
  }

  .signup-email {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-email > input{
    display: block;
	  width: 80%;
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
    font-weight: 800;
  }

  .signup-email > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-email > label{
      top: 19vh;
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

  .signup-email.focus > label{
      top: 17vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .signup-email.complete > label{
      top: 17vh;
      left: 8vh;
      font-size: 12px;
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
	  width: 80%;
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

  .signup-password > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-password > label{
      top: 27vh;
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

  .signup-password.focus > label{
      top: 25vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .signup-password.complete > label{
      top: 25vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
  }

  .signup-password-verify {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-password-verify > input{
    display: block;
	  width: 80%;
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
    font-weight: 800;
  }

  .signup-password-verify > input:focus{
      outline:0;
      border-color:#76A8DE;
      border-width: 2px;
      color:#76A8DE;
  }

  .signup-password-verify > label{
      top: 51vh;
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

  .signup-password-verify.focus > label{
      top: 49vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .signup-password-verify.complete > label{
      top: 49vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
  }

  .signup-name {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-name > input{
    display: block;
	  width: 80%;
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
      top: 43vh;
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

  .signup-name.focus > label{
      top: 41vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .signup-name.complete > label{
      top: 41vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
  }

  .signup-birthdate {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-birthdate > input{
    display: block;
	  width: 80%;
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
      top: 35vh;
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

  .signup-birthdate.focus > label{
      top: 33vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
      color: #76A8DE;
  }

  .signup-birthdate.complete > label{
      top: 33vh;
      left: 8vh;
      font-size: 12px;
      line-height: 1.33;
  }

  .signup-tel {
    padding: 2vh 7vh;
    display: flex;
  }

  .signup-tel > input{
    display: block;
	  width: 80%;
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
  width: 12.5vh;
  height: 5vh;
  border-radius: 15px;
  border: none;
  background-color: #9AC5F4;
  color: white;
  font-weight: 800;
  font-size: 2.3vh;
  margin-top: 2vh;

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
  border-radius: 20px 20px 0 0;
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

export default Signup