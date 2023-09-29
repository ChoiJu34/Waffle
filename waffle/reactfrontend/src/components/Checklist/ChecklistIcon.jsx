import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';


const ChecklistIcon = ({isListVisible, setListVisible, setEditChecklist}) =>{
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
                    <li onClick={() => setEditChecklist(true)}>수정</li>
                    <li>종료</li>
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