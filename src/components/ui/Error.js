import React from 'react'
import styled from '@emotion/styled'

const ErrorMsg = styled.div`
    border-radius: 10px;
    text-align: center;
    padding: 0.5rem 1rem;
    margin-bottom: 2rem;
    background-color: #FFE600;
    font-weight: bold;
    color: red;
`;

const Error = ({msg}) => {
    return (
        <ErrorMsg>All fields are required</ErrorMsg>
    )
}

export default Error
