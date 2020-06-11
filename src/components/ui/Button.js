import styled from '@emotion/styled';

const Button = styled.div`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.5rem;
    border: 2px solid white;
    padding: .8rem 2rem; 
    text-align: center;
    background-color: ${props => props.bgColor ? 'white' : 'none'};
    color: ${props => props.bgColor ? 'rgb(255,0,0)' : 'white'};
    -webkit-appearance: none
`

export default Button