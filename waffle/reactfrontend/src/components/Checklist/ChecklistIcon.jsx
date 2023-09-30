import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'


const ChecklistIcon = ({isListVisible, setListVisible, setEditChecklist, id}) =>{
    //code

    useEffect(() => {
        // 컴포넌트가 마운트되면 document에 클릭 이벤트 리스너를 추가합니다.
        document.addEventListener('click', handleDocumentClick);
        return () => {
            // 컴포넌트가 언마운트될 때 클릭 이벤트 리스너를 제거합니다.
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);
    const listRef = useRef(null);
  
    const handleDocumentClick = (e) => {
        setListVisible(false);
    };

    const navigate = useNavigate()
    const ClearChecklist = () => {
        axios.put(`/checklist/clear-checklist/${id}`, {
            headers: {
                'Authorization' : "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5NTk4MjgyMiwiZW1haWwiOiJnbWx3bmNobEBuYXZlci5jb20iLCJyb2xlIjoiVVNFUiJ9.DhvgNZd-0htDBRE6s7zYqphSJQCJBWNaBoBv1dJEB_Ic_VRMbzzs5US-Akd5zH9m72WPQnGsOsI_thCApljgGw"
            },
        })
            .then((response) => {
                console.log(response);
                navigate(`/mypage/checklist`)
            })
    }

    const DeleteChecklist = () =>{
        axios.delete(`/checklist/delete-checklist-list/${id}`, {
            headers: {
                'Authorization' : "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5NTk4MjgyMiwiZW1haWwiOiJnbWx3bmNobEBuYXZlci5jb20iLCJyb2xlIjoiVVNFUiJ9.DhvgNZd-0htDBRE6s7zYqphSJQCJBWNaBoBv1dJEB_Ic_VRMbzzs5US-Akd5zH9m72WPQnGsOsI_thCApljgGw"
            },
        })
            .then((response) => {
                console.log(response);
                navigate(`/mypage/checklist`)
            })
    }

    // html
    return (
        <ChecklistListWrapper>
            <div
                id="list"
                ref={listRef}
                style={{ display: isListVisible ? 'block' : 'none' }}
            >
                {/* 리스트 내용 */}
                <dl class="list">
                    <li key="0" onClick={() => setEditChecklist(true)}>수정</li>
                    <li key="1" onClick={() => ClearChecklist()}>종료</li>
                    <li key="1" onClick={() => DeleteChecklist()}>삭제</li>
                </dl>
            </div>
        </ChecklistListWrapper>
    );
}

// css
const ChecklistListWrapper = styled.div`
    .list{
        list-style: none;
    }

    li {
        padding: 1vh;
    }
`

export default ChecklistIcon