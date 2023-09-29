import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';

const ChecklistItem = ({checklistListId, id, price, currency, content, check, editChecklist, editChecklistData, setEditChecklistData}) =>{
    //code
    const [isCheck, setIsCheck] = useState(check)
    const checkHandled = () => {
        setIsCheck(!isCheck);
    }
    const deleteChecklistItem = () => {
        setEditChecklistData(editChecklistData.filter(list => list.id !== id));
    }
    // html
    return (
        <ChecklistListWrapper>
            <div class="line">
                <label class="checklistItem">
                    <input id={id} type="checkbox" checked={isCheck} onChange={() => checkHandled()}/>
                    {content}
                </label>
                {
                    editChecklist === false ?
                    <label class="checklistPrice">
                        {price} {currency}
                    </label>
                    :
                    <label class="checklistPrice">
                        {price} {currency}
                        <button class="checklistDelete" onClick={()=>deleteChecklistItem()}>X</button>
                    </label>
                }
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
    .checklistDelete{
        border: none;
        background-color: white;
        color: red;
        &:active{
            border-radius: 100%;
            background-color: red;
            color: white;
        }
    }
`

export default ChecklistItem