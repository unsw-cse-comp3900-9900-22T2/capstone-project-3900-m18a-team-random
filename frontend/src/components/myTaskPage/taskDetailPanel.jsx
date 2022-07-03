import Grid from '@mui/material/Grid';
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';

const TaskDetailPanel = () => {
    return (
        <Grid container spacing={2} direction='column'>
            <Grid item xs={12}>
                <Paper>
                    Implement User Authentication
                </Paper>
            </Grid>
            <Grid item>
                <Button variant='contained'>Edit</Button>
            </Grid>
        </Grid>
    )
}

export default TaskDetailPanel;