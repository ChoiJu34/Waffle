import React, { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTimes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "animate.css";
import SignupCompleteWaffle from "../../assets/SignupCompleteWaffle.png";

const Signup = () => {
  useEffect(() => {
    onChangeEmail();
    handleEmailBlur();
    onChangeName();
    handleNameBlur();
    onChangeBirthdate();
    handleBirthdateBlur();
    onChangeTel();
    handleTelBlur();
  }, []);

  const location = useLocation();

  const emailFromPrevious = location.state?.email || "";
  const nameFromPrevious = location.state?.name || "";
  const birthdayFromPrevious = location.state?.birthday || "";
  const telFromPrevious = location.state?.tel || "";
  const isVerified = location.state?.isVerified || false;

  const [formData, setFormData] = useState({
    email: emailFromPrevious,
    name: nameFromPrevious,
    password: "",
    birthday: birthdayFromPrevious,
    tel: telFromPrevious,
  });

  useEffect(() => {
    onChangeName();
  }, [formData.name]);

  useEffect(() => {
    onChangeEmail();
  }, [formData.email]);

  useEffect(() => {
    onChangeTel();
  }, [formData.tel]);

  useEffect(() => {
    onChangeBirthdate();
  }, [formData.birthday]);

  // 뒤로가기
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.scrollTo(0, 0);

    navigate("/user/login", { state: { from: "fromComplete" } });
  };

  // 이메일 입력 칸
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailComplete, setIsEmailComplete] = useState(false);
  const inputEmailRef = useRef(null);

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = useCallback(() => {
    const emailValue = formData.email;

    setIsEmailFocused(false);
    if (emailValue === "") {
      setIsEmailComplete(false);
    } else {
      setIsEmailComplete(true);
    }
  }, [formData.email]);

  const showEmailPlaceholder = isEmailFocused && !formData.email;

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

  const showPasswordPlaceholder =
    isPasswordFocused && !inputPasswordRef.current?.value;

  // 비밀번호 확인 칸
  const [isPasswordVerifyFocused, setIsPasswordVerifyFocused] = useState(false);
  const [isPasswordVerifyComplete, setIsPasswordVerifyComplete] =
    useState(false);
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

  const showPasswordVerifyPlaceholder =
    isPasswordVerifyFocused && !inputPasswordVerifyRef.current?.value;

  // 이름 칸
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isNameComplete, setIsNameComplete] = useState(false);
  const inputNameRef = useRef(null);

  const handleNameFocus = () => {
    setIsNameFocused(true);
  };

  const handleNameBlur = useCallback(() => {
    const nameValue = formData.name;
    setIsNameFocused(false);
    if (nameValue === "") {
      setIsNameComplete(false);
    } else {
      setIsNameComplete(true);
    }
  }, [formData.name]);

  const showNamePlaceholder = isNameFocused && !inputNameRef.current?.value;

  // 생년월일 칸
  const [isBirthdateFocused, setIsBirthdateFocused] = useState(false);
  const [isBirthdateComplete, setIsBirthdateComplete] = useState(false);
  const inputBirthdateRef = useRef(null);

  const handleBirthdateFocus = () => {
    setIsBirthdateFocused(true);
  };

  const handleBirthdateBlur = useCallback(() => {
    setIsBirthdateFocused(false);

    const birthdateValue = formData.birthday;
    if (birthdateValue === "") {
      setIsBirthdateComplete(false);
    } else {
      setIsBirthdateComplete(true);
    }
  }, [formData.birthday]);

  const showBirthdatePlaceholder =
    isBirthdateFocused && !inputBirthdateRef.current?.value;

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
    const telValue = formData.tel;
    setIsTelFocused(false);
    if (telValue === "") {
      setIsTelComplete(false);
    } else {
      setIsTelComplete(true);
    }
  }, [formData.tel]);

  const showTelPlaceholder = isTelFocused && !inputTelRef.current?.value;

  // 연락처 자동 하이픈 추가
  const handleTel = () => {
    const value = inputTelRef.current.value.replace(/\D+/g, "");
    const numberLength = 11;

    let result;
    result = "";

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;
        case 7:
          result += "-";
          break;

        default:
          break;
      }

      result += value[i];
    }

    inputTelRef.current.value = result;
  };

  //비밀번호, 비밀번호 확인
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  // 유효성 검사
  const [isName, setIsName] = useState(null);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(null);
  const [isPasswordVerify, setIsPasswordVerify] = useState(null);
  const [isBirthdate, setIsBirthdate] = useState(null);
  const [isTel, setIsTel] = useState(null);

  // 이름
  const onChangeName = () => {
    const koreanNameRegex = /^[가-힣]+$/;
    const nameCurrent = formData.name;

    if (nameCurrent === "") {
      setIsName(null);
    } else if (
      !koreanNameRegex.test(nameCurrent) ||
      nameCurrent.length < 2 ||
      nameCurrent.length > 5
    ) {
      setIsName(false);
    } else {
      setIsName(true);
    }
  };

  // 이메일
  const onChangeEmail = useCallback(() => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = formData.email;

    if (!emailRegex.test(emailCurrent)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  }, [formData.email]);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (passwordCurrent === "") {
      setIsPassword(null);
    } else if (!passwordRegex.test(passwordCurrent)) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordVerify = useCallback(
    (e) => {
      const passwordVerifyCurrent = e.target.value;
      setPasswordVerify(passwordVerifyCurrent);

      if (passwordVerifyCurrent === "") {
        setIsPasswordVerify(null);
      } else if (password === passwordVerifyCurrent) {
        setIsPasswordVerify(true);
      } else {
        setIsPasswordVerify(false);
      }
    },
    [password]
  );

  const onChangeBirthdate = useCallback(() => {
    const birthdateRegex =
      /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
    const birthdateCurrent = formData.birthday;

    if (birthdateCurrent === "") {
      setIsBirthdate(null);
      return;
    } else if (!birthdateRegex.test(birthdateCurrent)) {
      setIsBirthdate(false);
      return;
    }

    const [year, month, day] = birthdateCurrent
      .split("-")
      .map((str) => parseInt(str, 10));

    // 윤년 체크
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    // 각 월의 최대 일수를 저장
    const monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (isLeapYear) {
      monthDays[2] = 29;
    }

    // 해당 월의 일수보다 작거나 같은지 확인
    if (day <= monthDays[month]) {
      setIsBirthdate(true);
    } else {
      setIsBirthdate(false);
    }
  }, [formData.birthday]);

  // 연락처
  const onChangeTel = useCallback(() => {
    const telRegex = /^01[016789]-\d{3,4}-\d{4}$/;
    const telCurrent = formData.tel;

    if (telCurrent === "") {
      setIsTel(null);
    } else if (!telRegex.test(telCurrent)) {
      setIsTel(false);
    } else {
      setIsTel(true);
    }
  }, [formData.tel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      return newData;
    });
  };

  // Birthdate와 Tel onChange에 함수 두 개 넣기 위한 함수 세트 지정
  const functionSetEmail = (e) => {
    handleChange(e);
    onChangeEmail(e);
  };

  const functionSetBirthdate = (e) => {
    handleBirthdate(e);
    onChangeBirthdate(e);
    handleChange(e);
  };

  const functionSetTel = (e) => {
    handleTel(e);
    onChangeTel(e);
    handleChange(e);
  };

  // 회원가입

  const handleSubmit = (e) => {
    e.preventDefault();

    const forSubmitFormData = {
      ...formData,
      birthday: `${formData.birthday} 00:00`,
    };

    axios
      .post("/user/sign-up", forSubmitFormData)
      .then((response) => {
        navigate("/user/sign-up/complete");
      })
      .catch((error) => {
        console.error("회원가입 실패");
        alert("회원가입에 실패했습니다");
      });
  };

  // 이메일 인증
  const [loading, setLoading] = useState(false);

  const handleEmailVerification = (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post(`/user/verify-email`, { email: formData.email })
      .then((response) => {
        if (response.data.message === "DUPLICATE") {
          alert("이미 가입된 이메일입니다");
          return;
        }
        alert("입력하신 메일로 인증코드가 전송되었습니다");
        navigate("/user/verify-email", {
          state: {
            email: formData.email,
            name: formData.name,
            birthday: formData.birthday,
            tel: formData.tel,
          },
        });
      })
      .catch((error) => {
        console.log("이메일 인증 메일 전송 실패");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SignupWrapper>
      <div className="signup-header">
        <FontAwesomeIcon
          icon={faArrowLeft}
          color="black"
          size="2x"
          onClick={handleGoBack}
        />
      </div>
      <div className="signup-title">회원가입</div>
      <div className="signup-title-underline"></div>

      <form>
        <div
          className={`signup-email ${isEmailFocused ? "focus" : ""} ${
            isEmailComplete ? "complete" : ""
          }`}
        >
          <label id="signup-label">이메일</label>
          <input
            type="text"
            id="signup-input"
            ref={inputEmailRef}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            onChange={functionSetEmail}
            placeholder={showEmailPlaceholder ? "ex) nutella@waffle.com" : ""}
            inputmode="email"
            value={formData.email}
            name="email"
          />
          {isVerified ? (
            <FontAwesomeIcon
              className="signup-correct"
              icon={faCheck}
              color="#9AC5F4"
            />
          ) : (
            <button
              className="signup-emailverify"
              disabled={!isEmail}
              onClick={handleEmailVerification}
            >
              인증
            </button>
          )}
        </div>

        <div
          className={`signup-password ${isPasswordFocused ? "focus" : ""} ${
            isPasswordComplete ? "complete" : ""
          }`}
        >
          <label id="signup-label">비밀번호</label>
          <input
            type="password"
            id="signup-input"
            ref={inputPasswordRef}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            onChange={(e) => {
              onChangePassword(e);
              handleChange(e);
            }}
            placeholder={
              showPasswordPlaceholder
                ? "영문, 숫자, 특수문자 포함 8자리 이상"
                : ""
            }
            value={formData.password}
            name="password"
          />
          {isPassword === null ? null : isPassword ? (
            <FontAwesomeIcon
              className="signup-correct"
              icon={faCheck}
              color="#9AC5F4"
            />
          ) : (
            <FontAwesomeIcon
              className="signup-wrong"
              icon={faTimes}
              color="red"
            />
          )}
        </div>

        <div
          className={`signup-password-verify ${
            isPasswordVerifyFocused ? "focus" : ""
          } ${isPasswordVerifyComplete ? "complete" : ""}`}
        >
          <label id="signup-label">비밀번호 확인</label>
          <input
            type="password"
            id="signup-input"
            ref={inputPasswordVerifyRef}
            onFocus={handlePasswordVerifyFocus}
            onBlur={handlePasswordVerifyBlur}
            onChange={onChangePasswordVerify}
            placeholder={showPasswordVerifyPlaceholder ? "" : ""}
          />
          {isPasswordVerify === null ? null : isPasswordVerify ? (
            <FontAwesomeIcon
              className="signup-correct"
              icon={faCheck}
              color="#9AC5F4"
            />
          ) : (
            <FontAwesomeIcon
              className="signup-wrong"
              icon={faTimes}
              color="red"
            />
          )}
        </div>

        <div
          className={`signup-name ${isNameFocused ? "focus" : ""} ${
            isNameComplete ? "complete" : ""
          }`}
        >
          <label id="signup-label">이름</label>
          <input
            type="text"
            id="signup-input"
            ref={inputNameRef}
            onFocus={handleNameFocus}
            onBlur={handleNameBlur}
            onChange={(e) => {
              onChangeName(e);
              handleChange(e);
            }}
            placeholder={showNamePlaceholder ? "ex) 이재용" : ""}
            value={formData.name}
            name="name"
          />
          {isName === null ? null : isName ? (
            <FontAwesomeIcon
              className="signup-correct"
              icon={faCheck}
              color="#9AC5F4"
            />
          ) : (
            <FontAwesomeIcon
              className="signup-wrong"
              icon={faTimes}
              color="red"
            />
          )}
        </div>

        <div
          className={`signup-birthdate ${isBirthdateFocused ? "focus" : ""} ${
            isBirthdateComplete ? "complete" : ""
          }`}
        >
          <label id="signup-label">생년월일</label>
          <input
            type="text"
            id="signup-input"
            ref={inputBirthdateRef}
            onFocus={handleBirthdateFocus}
            onBlur={handleBirthdateBlur}
            onChange={functionSetBirthdate}
            placeholder={showBirthdatePlaceholder ? "ex) 19900101" : ""}
            inputmode="numeric"
            value={formData.birthday}
            name="birthday"
          />
          {isBirthdate === null ? null : isBirthdate ? (
            <FontAwesomeIcon
              className="signup-correct"
              icon={faCheck}
              color="#9AC5F4"
            />
          ) : (
            <FontAwesomeIcon
              className="signup-wrong"
              icon={faTimes}
              color="red"
            />
          )}
        </div>

        <div
          className={`signup-tel ${isTelFocused ? "focus" : ""} ${
            isTelComplete ? "complete" : ""
          }`}
        >
          <label id="signup-label">연락처</label>
          <input
            type="text"
            id="signup-input"
            ref={inputTelRef}
            onFocus={handleTelFocus}
            onBlur={handleTelBlur}
            onChange={functionSetTel}
            placeholder={showTelPlaceholder ? "ex) 01012345678" : ""}
            value={formData.tel}
            name="tel"
          />
          {isTel === null ? null : isTel ? (
            <FontAwesomeIcon
              className="signup-correct"
              icon={faCheck}
              color="#9AC5F4"
            />
          ) : (
            <FontAwesomeIcon
              className="signup-wrong"
              icon={faTimes}
              color="red"
            />
          )}
        </div>

        <div className="signup-button-container">
          <SignupButton
            type="submit"
            className="signup-button"
            disabled={
              !(
                isVerified &&
                isName &&
                isBirthdate &&
                isPassword &&
                isPasswordVerify &&
                isTel
              )
            }
            onClick={handleSubmit}
          >
            가입하기
          </SignupButton>
        </div>
      </form>

      {loading && (
        <LoadingOverlay>
          <LoadingImage
            className="animate__animated animate__bounce animate__slow animate__infinite"
            src={SignupCompleteWaffle}
            alt="LoadingWaffle"
          />
        </LoadingOverlay>
      )}
    </SignupWrapper>
  );
};

const SignupWrapper = styled.div`
  min-height: 100vh;
  position: fixed;

  .signup-header {
    display: flex;
    margin: 8vw 6vw;
  }

  .signup-title {
    font-size: 10vw;
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

  .signup-email > input {
    display: block;
    width: 80%;
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

  .signup-email > input:focus {
    outline: 0;
    border-color: #76a8de;
    border-width: 2px;
    color: #76a8de;
  }

  .signup-email > label {
    top: 51vw;
    position: absolute;
    left: 17vw;
    max-width: 100%;
    height: 2.7em;
    line-height: 1.33;
    color: #909090;
    font-size: 4.5vw;
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

  .signup-email.focus > label {
    top: 46vw;
    left: 14vw;
    font-size: 3vw;
    line-height: 1.33;
    color: #76a8de;
  }

  .signup-email.complete > label {
    top: 45vw;
    left: 14vw;
    font-size: 3vw;
    line-height: 1.33;
  }

  input::placeholder {
    color: #90909061;
    font-size: 3vw;
  }

  .signup-emailverify {
    width: 12vw;
    margin-left: 2vw;
    border-radius: 13px;
    border: none;
    background-color: #9ac5f4;
    color: white;
    font-weight: 600;
    font-size: 3vw;
  }

  .signup-emailverify:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }

  .signup-password {
    padding: 4vw 15vw;
    display: flex;
  }

  .signup-password > input {
    display: block;
    width: 80%;
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
    font-family: "돋움";
    font: small-caption;
    font-size: 7vw;
  }

  .signup-password > input:focus {
    outline: 0;
    border-color: #76a8de;
    border-width: 2px;
    color: #76a8de;
  }

  .signup-password > label {
    top: 69vw;
    position: absolute;
    left: 17vw;
    max-width: 100%;
    height: 2.7em;
    line-height: 1.33;
    color: #909090;
    font-size: 4.5vw;
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

  .signup-password.focus > label {
    top: 64vw;
    left: 14vw;
    font-size: 3vw;
    line-height: 1.33;
    color: #76a8de;
  }

  .signup-password.complete > label {
    top: 64vw;
    left: 14vw;
    font-size: 3vw;
    line-height: 1.33;
  }

  .signup-password-verify {
    padding: 4vw 15vw;
    display: flex;
  }

  .signup-password-verify > input {
    display: block;
    width: 80%;
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
    font-family: "돋움";
    font: small-caption;
    font-size: 3vh;
  }

  .signup-password-verify > input:focus {
    outline: 0;
    border-color: #76a8de;
    border-width: 2px;
    color: #76a8de;
  }

  .signup-password-verify > label {
    top: 87vw;
    position: absolute;
    left: 17vw;
    max-width: 100%;
    height: 2.7em;
    line-height: 1.33;
    color: #909090;
    font-size: 4.5vw;
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

  .signup-password-verify.focus > label {
    top: 82vw;
    left: 14vw;
    font-size: 3vw;
    line-height: 1.33;
    color: #76a8de;
  }

  .signup-password-verify.complete > label {
    top: 82vw;
    left: 14vw;
    font-size: 3vw;
    line-height: 1.33;
  }

  .signup-name {
    padding: 4vw 15vw;
    display: flex;
  }

  .signup-name > input {
    display: block;
    width: 80%;
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
  }

  .signup-name > input:focus {
    outline: 0;
    border-color: #76a8de;
    border-width: 2px;
    color: #76a8de;
  }

  .signup-name > label {
    top: 104vw;
    position: absolute;
    left: 17vw;
    max-width: 100%;
    height: 2.7em;
    line-height: 1.33;
    color: #909090;
    font-size: 4.5vw;
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

  .signup-name.focus > label {
    top: 99vw;
    left: 14vw;
    font-size: 3vw;
    line-height: 1.33;
    color: #76a8de;
  }

  .signup-name.complete > label {
    top: 99vw;
    left: 14vw;
    font-size: 3vw;
    line-height: 1.33;
  }

  .signup-birthdate {
    padding: 4vw 15vw;
    display: flex;
  }

  .signup-birthdate > input {
    display: block;
    width: 80%;
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

  .signup-birthdate > input:focus {
    outline: 0;
    border-color: #76a8de;
    border-width: 2px;
    color: #76a8de;
  }

  .signup-birthdate > label {
    top: 121vw;
    position: absolute;
    left: 17vw;
    max-width: 100%;
    height: 2.7em;
    line-height: 1.33;
    color: #909090;
    font-size: 4.5vw;
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

  .signup-birthdate.focus > label {
    top: 116vw;
    left: 14vw;
    font-size: 3vw;
    line-height: 1.33;
    color: #76a8de;
  }

  .signup-birthdate.complete > label {
    top: 116vw;
    left: 14vw;
    font-size: 3vw;
    line-height: 1.33;
  }

  .signup-tel {
    padding: 4vw 15vw;
    display: flex;
  }

  .signup-tel > input {
    display: block;
    width: 80%;
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

  .signup-tel > input:focus {
    outline: 0;
    border-color: #76a8de;
    border-width: 2px;
    color: #76a8de;
  }

  .signup-tel > label {
    top: 139vw;
    position: absolute;
    left: 17vw;
    max-width: 100%;
    height: 2.7em;
    line-height: 1.33;
    color: #909090;
    font-size: 4.5vw;
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

  .signup-tel.focus > label {
    top: 134vw;
    left: 14vw;
    font-size: 3vw;
    line-height: 1.33;
    color: #76a8de;
  }

  .signup-tel.complete > label {
    top: 134vw;
    left: 14vw;
    font-size: 3vw;
    line-height: 1.33;
  }

  .signup-wrong {
    margin-left: 4vw;
    width: 7vw;
    height: 7vw;
  }

  .signup-correct {
    margin-left: 4vw;
    width: 7vw;
    height: 7vw;
  }
`;

const SignupButton = styled.button`
      width: 30vw;
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

export default Signup;
