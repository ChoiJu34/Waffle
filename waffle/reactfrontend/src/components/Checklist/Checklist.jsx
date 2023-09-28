import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ChecklistList = () =>{
    //code
    let { id } = useParams();
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`/checklist/get-checklist/${id}`, {
            headers: {
                'Authorization' : "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5NTk4MjgyMiwiZW1haWwiOiJnbWx3bmNobEBuYXZlci5jb20iLCJyb2xlIjoiVVNFUiJ9.DhvgNZd-0htDBRE6s7zYqphSJQCJBWNaBoBv1dJEB_Ic_VRMbzzs5US-Akd5zH9m72WPQnGsOsI_thCApljgGw"
            },
        })
            .then((response) => {
                const data = response.data.list;
                setList(data);
                console.log(data);
            })
    }, []);

    // html
    return (
        <ChecklistListWrapper>
            <div class="title">
                <h2>{id}</h2>
            </div>
        </ChecklistListWrapper>
    );
}

// css
const ChecklistListWrapper = styled.div`
    .title{
        margin-top: 4vh;
        display: flex;
        justify-content: center;
    }
`

export default ChecklistList