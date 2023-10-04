import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import background from "../../assets/perfect.png";

const ChecklistListItem = ({id, name, country, start, end, color, clear}) =>{
    //code
    //색 투명도 적용
    color += "80";
    //checklist로 페이지 이동
    const navigate = useNavigate()
    const goToChecklist = (id) => {
        navigate(`/mypage/checklist/${id}`)
    }
    // html
    return (
        <ChecklistListWrapper>
            {
                clear === 0 ?
                <article class="card" key={id} style={{ backgroundColor: color }} onClick={()=>goToChecklist(id)}>
                    <h3>{name}</h3>
                    <p>{start}</p>
                </article>
                :
                <div class="oneCard">
                    <article class="clearCard" key={id} style={{ backgroundColor: color }} onClick={()=>goToChecklist(id)}>
                        <h3>{name}</h3>
                        <p>{start}</p>
                    </article>
                    <div class="imgBox">
                        <img class="completeImg" alt="complete" src={background} />
                    </div>
                </div>
            }
        </ChecklistListWrapper>
    );
}

// css
const ChecklistListWrapper = styled.div`
    .oneCard{
        position: relative;
    }
    .card{
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 15px;
        width: 75vw;
        height: 24vh;
        margin-bottom: 4vh;
        color: #000000;
    }
    .clearCard {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 15px;
        width: 75vw;
        height: 24vh;
        margin-bottom: 4vh;
        color: #000000;
        position: absolute;
    }
    h3{
        margin: 5px;
        margin-bottom: 1vh;
    }
    p{
        margin: 5px;
        margin-bottom: 1vh;
    }
    .imgBox{
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        width: 75vw;
        height: 24vh;
        margin-bottom: 4vh;
        background-color: #000000e0;
    }
    .completeImg{
        margin-left: 45vw;
        margin-top: 9vh;
        width: 30vw;
        object-fit: cover;
        -ms-transform: rotate(1deg); // IE 9 이상에서 사용
        -webkit-transform: rotate(1deg); // 사파리, 크롬, 오페라 브라우저 사용
        transform: rotate(1deg);
    }
`

export default ChecklistListItem