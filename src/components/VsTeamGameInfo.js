import React from 'react';
import styled from '@emotion/styled'

const Form = styled.form`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .date{
        width: 100%;
    }
    .vs-team{
        border: solid white 1px;
        
        input{
            width: 100%;
            margin: 0;
            &::placeholder{
                text-align: center;
            }
        }
        .vs-team-final{
            display: flex;
        }
    }
`

/*

        

    

*/

const VsTeamGameInfo = () => {
    return (
        <Form>
            <input type="date"  name="date" className="date" placeholder="Date"/>
                <div className="vs-team">
                    <div className="vs-team-name">
                        <input type="text"  placeholder="Vs Team" name="vsteam"/>
                    </div>
                    <div className="vs-team-final">
                        <input type="number"  name="runs" placeholder="R"/>
                        <input type="number"  name="hits" placeholder="H"/>
                        <input type="number"  name="errors" placeholder="E"/>
                    </div>
                </div>
        </Form>
    );
};

export default VsTeamGameInfo;