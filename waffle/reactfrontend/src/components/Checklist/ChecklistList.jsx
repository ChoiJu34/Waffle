import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import ChecklistListItem from './ChecklistListItem'
import axios from 'axios'

const ChecklistList = () =>{
    //code
    //변수
    const [checklistListData, setChecklistListData] = useState();
    //렌더링 완료 후
    useEffect(() => {
        axios.get('/checklist/get-checklist-list', {
            headers: {
                'Authorization' : "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5NTgxNzY1OSwiZW1haWwiOiJnbWx3bmNobEBuYXZlci5jb20iLCJyb2xlIjoiVVNFUiJ9.Xz7bQrMxJ0WZ0cPZg_w96fNxULWAX_8BonUxoNflEIgk73rUpjrhGtb12ICV4kKc4VfLjJVx9qzZwSoD0Av7CA"
            },
        })
            .then((response) => {
                const data = response.data.list;
                setChecklistListData(data);
                console.log(data);
                console.log(response);
            })
    }, []);

    // html
    return (
        <ChecklistListWrapper>
            <div class="cardList">
                {checklistListData?.map((list) => (
                    <ChecklistListItem key={list.id} name={list.name} country={list.country} start={list.start} end={list.end} color={list.color} />
                ))}
                <article class="addCard">
                    <button class="addCardBtn">+</button>
                </article>
            </div>
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