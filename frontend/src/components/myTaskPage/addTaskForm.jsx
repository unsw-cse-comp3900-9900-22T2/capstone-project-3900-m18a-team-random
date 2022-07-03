import Grid from '@mui/material/Grid';
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddTaskForm = () => {
    return (
        <Grid container spacing={2} direction='column'>
            <Grid item xs={12}>
                <TextField label='Title' required/>
            </Grid>
            <Grid item xs={12}>
                <TextField label='Description' multiline minRows={3}/>
            </Grid>
            <Grid item>
                <Button variant='contained'>Create Task</Button>
            </Grid>
        </Grid>
    )
}

export default AddTaskForm;
