import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const loginInfo = {email, password};
        const response = await fetch('/user-login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(loginInfo)
        });

        if(response.ok){
            navigate("/main");
        }
    }

    return (
        <Grid container 
              spacing={1}
              minHeight="40vh" 
              direction="column" 
              alignItems="center" 
              justifyContent="center">
            <h2>Sign in</h2>
            <Grid item>
                <TextField label='Email' type='email' required onChange={e=>{setEmail(e.target.value)}}/>
            </Grid>
            <Grid item>
                <TextField label='Password' type='password' required onChange={e=>{setPassword(e.target.value)}}/>
            </Grid>
            <Grid item>
                <Button color='secondary' onClick={()=>{navigate("/register")}}>Register</Button>
                <Button type='submit' color='primary' onClick={handleLogin}>Sign in</Button>
            </Grid>
        </Grid>
    )
}

export default Login;