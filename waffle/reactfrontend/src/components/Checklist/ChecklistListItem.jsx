import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom'

const ChecklistListItem = ({id, name, country, start, end, color}) =>{
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
                <article class="card" key={id} style={{ backgroundColor: color }} onClick={()=>goToChecklist(id)}>
                    <h3>{name}</h3>
                    <p>{start}</p>
                </article>
        </ChecklistListWrapper>
    );
}

// css
const ChecklistListWrapper = styled.div`
    .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 15px;
        width: 75vw;
        height: 24vh;
        margin-bottom: 4vh;
        color: #000000;
    }
    h3{
        margin: 5px;
        margin-bottom: 1vh;
    }
    p{
        margin: 5px;
        margin-bottom: 1vh;
    }
`

export default ChecklistListItem