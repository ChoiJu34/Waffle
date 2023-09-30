import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ChecklistItem from './ChecklistItem'
import { HiDotsVertical } from 'react-icons/hi';
import ChecklistIcon from './ChecklistIcon';

const ChecklistList = () =>{
    //code
    let { id } = useParams();
    const [checklistData, setChecklistData] = useState();
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [color, setColor] = useState("");

    const [editChecklist, setEditChecklist] = useState(false);
    const [editChecklistData, setEditChecklistData] = useState()

    useEffect(() => {
        axios.get(`/checklist/get-checklist/${id}`, {
            headers: {
                'Authorization' : "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5NTk4MjgyMiwiZW1haWwiOiJnbWx3bmNobEBuYXZlci5jb20iLCJyb2xlIjoiVVNFUiJ9.DhvgNZd-0htDBRE6s7zYqphSJQCJBWNaBoBv1dJEB_Ic_VRMbzzs5US-Akd5zH9m72WPQnGsOsI_thCApljgGw"
            },
        })
            .then((response) => {
                const data1 = response.data.list;
                const data2 = response.data.country;
                const data3 = response.data.name;
                const data4 = response.data.start;
                const data5 = response.data.end;
                const data6 = response.data.color;
                setChecklistData(data1);
                setEditChecklistData(data1);
                setCountry(data2);
                setName(data3);
                setStart(data4);
                setEnd(data5);
                setEnd(data6);
                console.log(response.data);
            })
    }, []);

    const [isListVisible, setListVisible] = useState(false);

    const toggleList = (e) => {
        setListVisible(!isListVisible);
        e.stopPropagation();
    };

    const editClear = () => {
        axios.put('/checklist/modify-checklist', {
            "id": id,
            "start": start,
            "end": end,
            "name": name,
            "list": checklistData
        },{
            headers: {
                'Authorization' : "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5NTk4MjgyMiwiZW1haWwiOiJnbWx3bmNobEBuYXZlci5jb20iLCJyb2xlIjoiVVNFUiJ9.DhvgNZd-0htDBRE6s7zYqphSJQCJBWNaBoBv1dJEB_Ic_VRMbzzs5US-Akd5zH9m72WPQnGsOsI_thCApljgGw"
            },
        })
            .then((response) => {
                console.log(response);
                setEditChecklist(false);
            })
    }

    const editCancle = () => {
        setEditChecklistData(checklistData)
        setEditChecklist(false);
    }

    // html
    return (
        <ChecklistListWrapper>
            <div class="head">
                {
                    editChecklist === false ?
                    <div class="title">
                        <label style={{width:"30px"}}/>{name}
                        <HiDotsVertical size="25" onClick={toggleList}/>
                    </div>
                    :
                    <div class="title">
                        <input type='text' class="editTitle" defaultValue={name}/>
                    </div>
                }
                {
                    isListVisible === true ?
                    <div class="iconList">
                        <ChecklistIcon isListVisible={isListVisible} setListVisible={setListVisible} setEditChecklist={setEditChecklist}/>
                    </div>
                    :
                    null
                }
                {
                    editChecklist === false ?
                    <div class="date">{start} ~ {end}</div>
                    :
                    <div class="editDate">
                        <input type='text' class="editTitle" defaultValue="시작날짜" style={{width:"30vw"}}/>
                        <input type='text' class="editTitle" defaultValue="끝날짜" style={{width:"30vw"}}/>
                    </div>
                }
            </div>
            <div class="body">
                <div class="bodyColumn">
                    <div class="columnAll">전체</div>
                    <div class="columnPrice">비용</div>
                </div>
                {editChecklistData?.map((list) => (
                    <ChecklistItem checklistListId={id} id={list.id} price={list.price} currency={list.currency} content={list.content} check={true} editChecklist={editChecklist} editChecklistData={editChecklistData} setEditChecklistData={setEditChecklistData}/>
                ))}
            </div>
            {
                editChecklist === false ?
                null
                :
                <div style={{display:'flex', justifyContent: "space-around", position:"absolute", bottom:"4vh", left:"11vw"}}>
                    <button class="editBtn" onClick={() => editClear()}>저장</button>
                    <button class="editBtn" onClick={() => editCancle()}>취소</button>
                </div>
            }
        </ChecklistListWrapper>
    );
}

// css
const ChecklistListWrapper = styled.div`
    .head{
        padding: 2vh;
        padding-bottom: 1vh;
    }
    .title{
        margin-top: 3vh;
        display: flex;
        justify-content: space-between;
        font-size: 4vh;
    }
    .editTitle{
        display: block;
        width: 67%;
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
    .editTitle:focus{
        outline:0;
        border-color:#76A8DE;
        border-width: 2px;
        color:#76A8DE;
    }
    .iconList{
        position: absolute;
        z-index: 100;
        right: 3vh;
        background-color: white;
        padding: 0vh 2vh 0vh 2vh;
        border: 1px solid black;
        border-radius: 15px;
    }
    .date{
        display: flex;
        justify-content: right;
    }
    .editDate{
        margin-top: 1vh;
        display: flex;
        justify-content: space-between;
    }
    .body{
        padding: 2vh;
    }
    .bodyColumn{
        padding-top: 0;
        display: flex;
        justify-content: space-around;
    }
    .columnAll{
        padding: 1vh;
        width:70%;
        border-top: 2px solid #76A8DE;
        border-right: 2px solid #76A8DE;
    }
    .columnPrice{
        padding: 1.5vh;
        width:30%;
        border-top: 2px solid #76A8DE;
        border-right: 2px solid #76A8DE;
    }
    .threeDotIcon{
        display: flex;
        justify-content: right;
    }
    .editBtn{
        width: 35vw;
        height: 5vh;
        border: none;
        border-radius: 15px;
        background-color: #9AC5F4;
        color: white;
        font-size: 2.3vh;
        margin-bottom: 3vh;
        margin-right: 2vw;
        margin-left: 2vw;
        &:active{
            background-color: #56a2f4;
        }
    }
`

export default ChecklistList