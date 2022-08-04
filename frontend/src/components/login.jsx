import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginInfo = {email, password};
        const response = await fetch('/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(loginInfo)
        });

        if(response.ok){
            response.json().then(data =>{
                sessionStorage.setItem("token", data['token']);
                sessionStorage.setItem("email", email);
                navigate("home");
            })
        } else {
            alert("Please enter a valid email or password");
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <Grid container 
                spacing={2}
                minHeight="40vh" 
                direction="column" 
                alignItems="center" 
                justifyContent="center">
                <h1>TEAMS</h1>
                <h2>Sign in</h2>
                <Grid item>
                    <TextField label='Email' type='email' required onChange={e=>{setEmail(e.target.value)}}/>
                </Grid>
                <Grid item>
                    <TextField label='Password' type='password' required onChange={e=>{setPassword(e.target.value)}}/>
                </Grid>
                <Grid item>
                    <Button color='secondary' onClick={()=>{navigate("/register")}}>Register</Button>
                    <Button type='submit' color='primary'>Sign in</Button>
                </Grid>
                <Grid item>
                    <Button color='secondary' onClick={()=>{navigate("/reset_password_request")}}>Forgot Password?</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default Login;