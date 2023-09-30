import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'

const ChecklistItem = ({key, checklistListId, id, price, currency, content, check, editChecklist, editChecklistData, setEditChecklistData}) =>{
    //code
    const token = localStorage.getItem('access_token')
    const [isCheck, setIsCheck] = useState(check)
    const [editContent, setEditContent] = useState(content)
    const [editPrice, setEditPrice] = useState(price)
    const [editCurrency, setEditCurrency] = useState(currency)
    const checkHandled = () => {
        axios.put(`/checklist/check-checklist-item/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            },
        })
            .then((response) => {
                console.log(response);
                setIsCheck(!isCheck);
            })
    }
    const deleteChecklistItem = () => {
        setEditChecklistData(editChecklistData.filter(list => list.id !== id));
        console.log(editChecklistData);
        console.log(id);
    }

    useEffect(() => {
        const updatedData = editChecklistData.map(list => {
            if (list.id === id) {
                return { ...list, content: editContent };
            }
            return list;
        });
        setEditChecklistData(updatedData);
    }, [editContent]);

    useEffect(() => {
        const updatedData = editChecklistData.map(list => {
            if (list.id === id) {
                return { ...list, price: editPrice };
            }
            return list;
        });
        setEditChecklistData(updatedData);
    }, [editPrice]);

    useEffect(() => {
        const updatedData = editChecklistData.map(list => {
            if (list.id === id) {
                return { ...list, currency: editCurrency };
            }
            return list;
        });
        setEditChecklistData(updatedData);
    }, [editCurrency]);

    // html
    return (
        <ChecklistListWrapper>
            <div class="line">
                {
                    editChecklist === false ?
                    <label class="checklistItem">
                        <input id={id} type="checkbox" checked={isCheck} onChange={() => checkHandled()}/>
                        {content}
                    </label>
                    :
                    <label class="checklistItem">
                        <input id={id} type="checkbox" disabled={true} checked={isCheck} onChange={() => checkHandled()}/>
                        <div class="content">
                            <input type='text' class="editContent" defaultValue={content} value={editContent} onChange={(e) => setEditContent(e.target.value)}/>
                        </div>
                    </label>
                }
                {
                    editChecklist === false ?
                    <label class="checklistPrice">
                        {price} {currency}
                    </label>
                    :
                    <label class="checklistPrice">
                        <div class="price">
                            <input type='text' class="editPrice" defaultValue={price} value={editPrice} onChange={(e) => setEditPrice(e.target.value)}/>
                            <input type='text' class="editCurrency" defaultValue={currency} value={editCurrency} onChange={(e) => setEditCurrency(e.target.value)}/>
                        </div>
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
    .price{
        display: flex;
        justify-content: right;
    }
    .content{
        display: flex;
        justify-content: left;
        font-size: 4vh;
    }
    .editContent{
        display: block;
        color: #909090;
        width: 46vw;
        border:0;
        border-bottom: 1px solid #8c8c8c;
        background-color: transparent;
        box-sizing: border-box;
        border-radius: 0;
        padding: 0;
        height: 36px;
        line-height: 1.33;
        font-size: 18px;
        font-family: inherit;
        vertical-align: baseline;
        -webkit-appearance: none;
        overflow: visible;
        margin:0;
        &:focus{
            outline:0;
            border-color:#76A8DE;
            border-width: 2px;
            color:#76A8DE;
        }
    }
    .price{
        display: flex;
        justify-content: left;
        font-size: 4vh;
    }
    .editPrice{
        display: block;
        color: #909090;
        width: 20vw;
        border:0;
        border-bottom: 1px solid #8c8c8c;
        background-color: transparent;
        box-sizing: border-box;
        border-radius: 0;
        padding: 0;
        height: 36px;
        line-height: 1.33;
        font-size: 18px;
        font-family: inherit;
        vertical-align: baseline;
        -webkit-appearance: none;
        overflow: visible;
        margin:0;
        &:focus{
            outline:0;
            border-color:#76A8DE;
            border-width: 2px;
            color:#76A8DE;
        }
    }
    .editCurrency{
        display: block;
        color: #909090;
        width: 5vw;
        border:0;
        border-bottom: 1px solid #8c8c8c;
        background-color: transparent;
        box-sizing: border-box;
        border-radius: 0;
        padding: 0;
        height: 36px;
        line-height: 1.33;
        font-size: 18px;
        font-family: inherit;
        vertical-align: baseline;
        -webkit-appearance: none;
        overflow: visible;
        margin:0;
        &:focus{
            outline:0;
            border-color:#76A8DE;
            border-width: 2px;
            color:#76A8DE;
        }
    }
`

export default ChecklistItem