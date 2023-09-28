import React, { createContext, useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import ChecklistListItem from './ChecklistListItem'
import axios from 'axios'
import AddChecklistListModal from './AddChecklistListModal';

const ChecklistList = () =>{
    //code
    //변수
    const [checklistListData, setChecklistListData] = useState();
    const [modal, setModal] = useState(false);
    const [restart, setRestart] = useState("");
    const outside = useRef();

    //렌더링 완료 후
    useEffect(() => {
        axios.get('/checklist/get-checklist-list', {
            headers: {
                'Authorization' : "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5NTk4MjgyMiwiZW1haWwiOiJnbWx3bmNobEBuYXZlci5jb20iLCJyb2xlIjoiVVNFUiJ9.DhvgNZd-0htDBRE6s7zYqphSJQCJBWNaBoBv1dJEB_Ic_VRMbzzs5US-Akd5zH9m72WPQnGsOsI_thCApljgGw"
            },
        })
            .then((response) => {
                const data = response.data.list;
                setChecklistListData(data);
                console.log(data);
                console.log(response);
            })
    }, [restart]);

    // html
    return (
        <ChecklistListWrapper>
            <div class="cardList">
                {checklistListData?.map((list) => (
                    <ChecklistListItem id={list.id} name={list.name} country={list.country} start={list.start} end={list.end} color={list.color} />
                ))}
                <article class="addCard">
                    <button class="addCardBtn" onClick={() => setModal(true)}>+</button>
                </article>
            </div>
            {
                modal === true ?
                <AddChecklistListModal setRestart={setRestart} setModal={setModal} ref={outside} onClick={(e) => {if(e.target == outside.current) setModal(false)}}/>
                :
                null
            }
        </ChecklistListWrapper>
    );
}

// css
const ChecklistListWrapper = styled.div`
    .cardList {
        margin-top: 10vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .addCard {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 15px;
        width: 75vw;
        height: 24vh;
        margin-bottom: 4vh;
    }
    .addCardBtn {
        border-radius: 15px;
        width: 100%;
        height: 100%;
        border-style: dashed;
        border-color: gray;
        border-width: 4px;
        background-color: white;
        font-size: 5vh;
        color: gray;
    }
`

export default ChecklistList