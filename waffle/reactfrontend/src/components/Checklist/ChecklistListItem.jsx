import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'

const ChecklistListItem = ({key, name, country, start, end, color}) =>{
    //code

    // html
    return (
        <ChecklistListWrapper>
                <article class="card" key={key} style={{ backgroundColor: color }}>
                    <h3>{name}</h3>
                    <p>{country}</p>
                    <p>{start} ~ {end}</p>
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
        color: #202020;
    }
    h3{
        margin: 5px;
    }
    p{
        margin: 5px;
    }
`

export default ChecklistListItem