import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router';

const Register = () => {
    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        // need to add confirm password checking
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Please enter the correct confirm password");
            return;
        }

        const registration = {email,name, password};
        const response = await fetch('/register', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(registration)
        });

        if(response.ok){
            navigate("/");
        } else {
            alert("Registration failed");
        }
    }

    return (
        <Grid container 
              spacing={1}
              minHeight="40vh" 
              direction="column" 
              alignItems="center" 
              justifyContent="center">
            <h2>Sign up</h2>
            <form onSubmit={handleRegister}>
                <Grid item>
                    <TextField label='Name' required onChange={e => setName(e.target.value)}/>
                </Grid>
                <Grid item>
                    <TextField label='Email' type='email' required onChange={e=>setEmail(e.target.value)}/>
                </Grid>
                <Grid item>
                    <TextField label='Password' type='password' required onChange={e=>setPassword(e.target.value)}/>
                </Grid>
                <Grid item>
                    <TextField label='Confirm Password' type='password' required onChange={e=>setConfirmPassword(e.target.value)}/>
                </Grid>
                <Grid item>
                    <Button color='secondary' onClick={()=>{navigate("/")}}>Cancel</Button>
                    <Button type='submit' color='primary'>Register</Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default Register;