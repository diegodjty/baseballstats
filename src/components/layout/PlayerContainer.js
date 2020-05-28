import styled from '@emotion/styled'

const PlayerContainer = styled.div`
    .bar{
        background-color: #c4c4c4;
        color: black;
        padding: 5px 5px;
    }

    .player-info{
        display: flex;
        align-items: center
    }
    .icon{
        margin-left: .5rem;
    }
    .info{
        line-height:.5;
        margin-left: 3rem;
        &:last-of-type{
            text-transform: uppercase;
        }
    }
`;

export default PlayerContainer