import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const ResetPassword = () => {
    let navigate = useNavigate();

    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    
    const handleResetPassword = async (e) => {
        e.preventDefault()
        const codeAndPassword = {'password_reset_code': code, 'new_password': password}
        const response = await fetch('/passwordreset/reset', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(codeAndPassword)
        });
        
        if(response.ok){
            navigate("/")
        } else {
            alert("Invalid reset code.")
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
                    <TextField label='Reset Code' type='code' required onChange={e=>{setCode(e.target.value)}}/>
                </Grid>
                <Grid item>
                    <TextField label='New Password' type='password' required onChange={e=>{setPassword(e.target.value)}}/>
                </Grid>
                <Grid item>
                    <Button color='secondary' onClick={handleResetPassword}>Reset Password</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default ResetPassword;