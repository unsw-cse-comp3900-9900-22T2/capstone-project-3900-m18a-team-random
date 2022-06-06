import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router';

const Register = () => {
    let navigate = useNavigate();

    return (
        <Grid container 
              spacing={1}
              minHeight="40vh" 
              direction="column" 
              alignItems="center" 
              justifyContent="center">
            <h2>Sign up</h2>
            <Grid item>
                <TextField label='Name' required/>
            </Grid>
            <Grid item>
                <TextField label='Email' type='email' required/>
            </Grid>
            <Grid item>
                <TextField label='Password' type='password' required/>
            </Grid>
            <Grid item>
                <TextField label='Confirm Password' type='password' required/>
            </Grid>
            <Grid item>
                <Button color='secondary' onClick={()=>{navigate("/")}}>Cancel</Button>
                <Button type='submit' color='primary'>Register</Button>
            </Grid>
        </Grid>
    )
}

export default Register;