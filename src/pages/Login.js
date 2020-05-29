import React,{useState} from 'react';
import Container from './../components/layout/Container';
import styled from '@emotion/styled';
import Button from './../components/ui/Button';
import firebases from './../firebase/firebase';
import {useHistory} from 'react-router-dom'

const Containers = styled(Container)`
    h2{
        font-size: 2.2rem;
        text-align: center;
        margin-top: 5rem; 
    }
`;

const Form = styled.form`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    input,select{
        /* -webkit-appearance: none; */
        padding: 1rem;
        border: 2px solid white;
        background: transparent;
        margin-bottom: 1rem;
        color: white;
        font-weight: bold;
        &::placeholder{
            color: white;
        }
        option{
            color: black;
        }
    }
    a{
        font-size: 1rem;
    }
`;
const Login = () => {
    const history = useHistory()
    const [login,setLogin] = useState({
        email: '',
        password: ''
    });
    const handelChange = (e) =>{
        setLogin({
            ...login,
            [e.target.name]:e.target.value
        })
    }
    const {email,password} = login;
    const Submit = async() => {
        try {
            await firebases.login(email,password)
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Containers>
            <h2>Login</h2>
            <Form >
                <input type="email" onChange={handelChange} name="email" placeholder="Email"/>
                <input type="password"onChange={handelChange} name="password" placeholder="Password"/>
                <Button onClick={Submit} type="submit" bgColor="true">Login</Button>
            </Form>
        </Containers>
    );
};

export default Login;