import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import TaskTable from './taskTable';
import PopupButton from '../popupButton';
import AddTaskForm from './addTaskForm';
import PopupFab from '../popupFab';
import { useParams } from 'react-router-dom';
import Epic from './epic';
import NewEpicForm from './newEpicForm';

const MyTask = ({email}) => {
    const {teamId} = useParams();

    return (
        <Box sx={{flexGrow: 1}} mt={4}>
            <Grid container spacing={2} direction='column'>
                <Grid item xs={12} spacing={3} container>
                    <Grid item>
                        <Typography variant='h3'>
                            {teamId}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField placeholder='Search by Task Name'/>
                    </Grid>
                </Grid>

                <Grid item>
                    <Epic title='Profile'/>
                </Grid>

            </Grid>
            <PopupFab 
            style={{
                position:"absolute",
                bottom:30,
                right:20,
            }}
            title='New Epic'
            color='primary'
            >
                <NewEpicForm/>
            </PopupFab>
        </Box>
    )
}

export default MyTask;