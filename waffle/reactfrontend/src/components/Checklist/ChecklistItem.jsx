import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';

const ChecklistItem = ({checklistListId, id, price, currency, content, check}) =>{
    //code
    const [isCheck, setIsCheck] = useState(check)
    const checkHandled = () => {
        setIsCheck(!isCheck);
    }
    // html
    return (
        <ChecklistListWrapper>
            <div class="line">
                <label class="checklistItem">
                    <input id={id} type="checkbox" checked={isCheck} onChange={() => checkHandled()}/>
                    {content}
                </label>
                <label class="checklistPrice">
                    {price} {currency}
                </label>
            </div>
        </ChecklistListWrapper>
    );
}

// css
const ChecklistListWrapper = styled.div`
    .line{
        display: flex;
        justify-content: space-between;
    }
    .checklistItem{
        display: flex;
        padding: 1vh;
        font-size: 2.5vh;
    }
    .checklistPrice{
        display: flex;
        padding: 1vh;
        font-size: 2.5vh;
    }
`

export default ChecklistItem