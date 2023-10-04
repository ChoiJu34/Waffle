import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Select from "react-select";
import axios from 'axios'
import HotelCalender from '../RecommendPackage/Component/HotelCalender'

const AddChecklistListModal = ({setRestart, setModal}) =>{
    //code
    const token = localStorage.getItem('access_token')
    // 제목 입력 칸 애니메이션
    const [name, setName] = useState("");
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isNameComplete, setIsNameComplete] = useState(false);
    const inputNameRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
    })

    const handleNameFocus = () => {
        setIsNameFocused(true);
    };

    const handleNameBlur = (event) => {
        setIsNameFocused(false);
        if (event.target.value === "") {
        setIsNameComplete(false);
        } else {
        setIsNameComplete(true);
        }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => {
          const newData = { ...prevData, [name]: value };
          return newData;
      });
    }

    //드롭박스
    const options = [
        { value: null, label: '나라 선택' },
        { value: '1', label: '미국' },
        { value: '2', label: '일본' },
        { value: '3', label: '유럽' },
        { value: '4', label: '홍콩' },
        { value: '5', label: '싱가포르' },
        { value: '6', label: '중국' },
        { value: '7', label: '태국' },
        { value: '8', label: '영국' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: "55vw",
            height: "5vh",
            borderRadius: "2px",
            color: state.isSelected?"#76A8DE":"#909090",
            borderColor: state.isFocused?"#76A8DE":"#333"
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#76A8DE" : "#fff",
            color: state.isSelected ? "#fff" : "#333",
            height: "3rem",
            width: "10rem",
            zIndex: "10001",
            position: "relative", // 위치를 상대적으로 설정
            zIndex: "99999", // 모달보다 위에 표시
            overflow: "auto", // 스크롤바 추가 (필요시)
            maxHeight: "8vh", // 옵션 창의 최대 높이 (필요시 조절)
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: "none"
        })
    };
    //캘린더
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const handleHotelDateSelection = (e) => {
        setStart(e.start); // 선택된 startDate를 저장
        setEnd(e.end); // 선택된 endDate를 저장
    };
    //색 선택
    // const isSelect = [false, false, false, false, false, false];
    const [isSelect, setIsSelect] = useState([true, false, false, false, false, false]);
    const [color, setColor] = useState("#E76060");
    const colorList = ["#E76060", "#EEC55B", "#8EE696", "#78CFB0", "#6E67BC", "#C798CE"];
    const settingColor = (idx) => {
        const newArr = Array(colorList.length).fill(false);
        newArr[idx]=true;
        setIsSelect(newArr);
        setColor(colorList[idx]);
    }
    //확인 버튼
    const addChecklistList = ()=>{
        const startDate = ''.concat(start.getFullYear(), '-', start.getMonth()+1, '-',  start.getDate())
        const endDate = ''.concat(end.getFullYear(), '-', end.getMonth()+1, '-', end.getDate())
        axios.post('/checklist/add-checklist-list', {
            "country": selectedOption.label,
            "name": name,
            "start": startDate,
            "end": endDate,
            "color": color
        },{
            headers: {
                "Authorization": "Bearer " + token
            },
        })
            .then((response) => {
                console.log(response);
                setModal(false);
                setRestart(response);
            })
    }

    // html
    return (
        <ChecklistListWrapper>
            <ModalBg>
                <Modal>
                    <div class="closeModal">
                        <button class="closeModalBtn" onClick={() => setModal(false)}>X</button>
                    </div>
                    <div className={`checklist-name ${isNameFocused ? 'focus' : ''} ${isNameComplete ? 'complete' : ''}`} id="name-container">
                        <label id="email-label">제목</label>
                        <input type="text" id="name-input" ref={inputNameRef} onFocus={handleNameFocus} onBlur={handleNameBlur} value={formData.name} onChange={(e) => {setName(e.target.value); handleChange(e)}} name="name" autocomplete="off"/>
                    </div>
                    <div class="selectBox">
                        <Select onChange={handleOptionChange} classNamePrefix="react-select" defaultValue={options[0]} isClearable={false} isSearchable={false} options={options} styles={customStyles}/>
                    </div>
                    <HotelCalender onChange={handleHotelDateSelection} value={start}/>
                    <div class="selectColor" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", justifyContent:"center"}}>
                        {colorList?.map((elm, index) => {
                            return (
                                <button
                                    key={index}
                                    class="selectColorBtn"
                                    style={isSelect[index] ? { borderColor: "#76A8DE", backgroundColor: elm, justifySelf:"center" } : { borderColor: elm, backgroundColor: elm , justifySelf:"center"}}
                                    onClick={() => settingColor(index)}
                                />
                            )
                        })}
                    </div>
                    <div>
                        <button class="addChecklistListBtn" onClick={() => addChecklistList()}>확인</button>
                    </div>
                </Modal>
            </ModalBg>
        </ChecklistListWrapper>
    );
}

// css
const ChecklistListWrapper = styled.div`
    .closeModal{
        display: flex;
        justify-content: right;
        padding: 2vh;
    }
    .closeModalBtn {
        background-color: white;
        border: none;
        font-size: 2vh;
    }

    .checklist-name {
        display: flex;
        justify-content: center;
        margin-bottom: 2vh;
    }
    .checklist-name > input{
        display: block;
        width: 54vw;
        color: #909090;
        border:0;
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
        margin:0;
    }
    .checklist-name > input:focus{
        outline:0;
        border-color:#76A8DE;
        border-width: 2px;
        color:#76A8DE;
    }
    .checklist-name > label{
        top: -3vh;
        position: absolute;
        left: 15vw;
        max-width: 100%;
        height: 2.7em;
        line-height: 1.33;
        color: #909090;
        font-size: 18px;
        cursor: text;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all .2s;
        pointer-events: none;
        -webkit-font-smoothing: antialiased;
        transform: translate3d(4vh, 33vh, 0) scale(1);
        transform-origin: left top;
    }
    .checklist-name.focus > label{
        top: -50px;
        left: 15vw;
        font-size: 12px;
        line-height: 1.33;
        color: #76A8DE;
    }
    .checklist-name.complete > label{
        top: -50px;
        left: 15vw;
        font-size: 12px;
        line-height: 1.33;
    }

    .selectBox{
        display: flex;
        justify-content: center;
        margin-bottom: 2vh;
        z-index: 3000;
    }
    .selectColor{
        display: flex-inline;
        justify-content: center;
        padding: 3vh;
    }
    .selectColorBtn{
        margin: 1vw 2vw 1vw 2vw;
        width: 7vh;
        height: 7vh;
        border-radius: 100%;
        border: 4px solid;
    }
    .addChecklistListBtn{
        width: 34vw;
        height: 5vh;
        border: none;
        border-radius: 15px;
        background-color: #9AC5F4;
        color: white;
        font-size: 2.3vh;
        margin-bottom: 3vh;
        &:active{
            background-color: #56a2f4;
        }
    }
`

const ModalBg = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #00000070;
`;

const Modal = styled.div`
    width: 80vw;
    border-radius: 20px;
    background-color: white;
`;

export default AddChecklistListModal