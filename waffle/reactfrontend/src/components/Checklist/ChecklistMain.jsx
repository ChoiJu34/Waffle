import React from 'react';
import styled from 'styled-components';
import ChecklistList from './ChecklistList'

const ChecklistListMain = () =>{
    // html
    return (
        <ChecklistListWrapper>
            <ChecklistList></ChecklistList>
        </ChecklistListWrapper>
    );
}

// css
const ChecklistListWrapper = styled.div`

`

export default ChecklistListMain