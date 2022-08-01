import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const ResetPasswordRequest = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    
    const handleResetPasswordRequest = async (e) => {
        e.preventDefault()
        const account = {'email': email}
        const response = await fetch('/passwordreset/request', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(account)
        });
        
        if(response.ok){
            navigate("/reset_password")
        } else {
            alert("Invalid email address.")
        }
    }

    return (
        <form>
            <Grid container 
                spacing={2}
                minHeight="40vh" 
                direction="column" 
                alignItems="center" 
                justifyContent="center">
                <h1>TEAMS</h1>
                <h2>Reset Password</h2>
                <Grid item>
                    <TextField label='Email' type='email' required onChange={e=>{setEmail(e.target.value)}}/>
                </Grid>
                <Grid item>
                    <Button color='secondary' onClick={handleResetPasswordRequest}>Send Password Reset Code</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default ResetPasswordRequest;