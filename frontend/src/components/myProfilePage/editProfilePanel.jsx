import Grid from '@mui/material/Grid';
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditProfilePanel = () => {
    return (
        <Grid container spacing={2} direction='column'>
            <Grid item xs={12}>
                <TextField label='name'/>
            </Grid>
            <Grid item xs={12}>
                <TextField label='email' type='email'/>
            </Grid>
            <Grid item>
                <Button variant='contained'>Confirm</Button>
            </Grid>
        </Grid>
    )
}

export default EditProfilePanel;