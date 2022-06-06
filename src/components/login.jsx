import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
    let navigate = useNavigate();

    return (
        <Grid container 
              spacing={1}
              minHeight="40vh" 
              direction="column" 
              alignItems="center" 
              justifyContent="center">
            <h2>Sign in</h2>
            <Grid item>
                <TextField label='Email' type='email' required/>
            </Grid>
            <Grid item>
                <TextField label='Password' type='password' required/>
            </Grid>
            <Grid item>
                <Button color='secondary' onClick={()=>{navigate("/register")}}>Register</Button>
                <Button type='submit' color='primary'>Sign in</Button>
            </Grid>
        </Grid>
    )
}

export default Login;