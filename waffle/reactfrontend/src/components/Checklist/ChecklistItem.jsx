import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';

const ChecklistItem = ({checklistListId, id, price, currency, content}) =>{
    //code
    // html
    return (
        <ChecklistListWrapper>
            <input id={id} type="checkbox">{content}</input>
        </ChecklistListWrapper>
    );
}

// css
const ChecklistListWrapper = styled.div`
`

export default ChecklistItem