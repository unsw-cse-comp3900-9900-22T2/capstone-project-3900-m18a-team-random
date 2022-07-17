import Grid from '@mui/material/Grid';
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const AddMemberPanel = () => {
    return (
        <Grid container spacing={2} direction='column'>
            <Grid item xs={12}>
                <Typography>Please enter the email address of the user you want to add</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField label='email' type='email' required/>
            </Grid>
            <Grid item>
                <Button variant='contained'>Send Invitation</Button>
            </Grid>
        </Grid>
    )
}

export default AddMemberPanel;