import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ChecklistItem from './ChecklistItem'

const ChecklistList = () =>{
    //code
    let { id } = useParams();
    const [checklistData, setChecklistData] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    useEffect(() => {
        axios.get(`/checklist/get-checklist/${id}`, {
            headers: {
                'Authorization' : "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5NTk4MjgyMiwiZW1haWwiOiJnbWx3bmNobEBuYXZlci5jb20iLCJyb2xlIjoiVVNFUiJ9.DhvgNZd-0htDBRE6s7zYqphSJQCJBWNaBoBv1dJEB_Ic_VRMbzzs5US-Akd5zH9m72WPQnGsOsI_thCApljgGw"
            },
        })
            .then((response) => {
                const data1 = response.data.list;
                // const data2 = response.data.country;
                // const data3 = response.data.name;
                // const data4 = response.data.start;
                // const data5 = response.data.end;
                setChecklistData(data1);
                // setCountry(data2);
                // setName(data3);
                // setStart(data4);
                // setEnd(data5);
                console.log(response.data);
            })
    }, []);

    // html
    return (
        <ChecklistListWrapper>
            <div class="head">
                <div class="title">제목</div>
                <div class="date">날짜</div>
            </div>
            <div class="body">
                <div class="columnAll">전체</div>
                <div class="columnPrice">비용</div>
                {checklistData?.map((list) => (
                    <ChecklistItem checklistListId={id} id={list.id} price={list.price} currency={list.currency} content={list.content}/>
                ))}
            </div>
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
        justify-content: center;
        font-size: 4vh;
    }
    .date{
        display: flex;
        justify-content: right;
    }
    .body{
        padding:2vh;
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
    }
`

export default ChecklistList