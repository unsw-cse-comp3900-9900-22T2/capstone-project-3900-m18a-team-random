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

const MyTask = () => {
    return (
        <Box sx={{flexGrow: 1}} mt={4}>
            <Grid container spacing={2} direction='column'>
                <Grid item xs={12} spacing={3} container>
                    <Grid item xs={3}>
                        <Paper>
                            <h1>Task Name</h1>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField placeholder='Search by Task Name'/>
                    </Grid>
                    <Grid item xs={4}>
                        <PopupButton buttonTitle='Add Task' title='Add Task'>
                            <AddTaskForm/>
                        </PopupButton>
                    </Grid>
                </Grid>

                <Grid item xs={12} spacing={2} container>
                    <Grid item>
                        <Button>Analysis Board</Button>
                    </Grid>
                    <Grid item>
                        <Button>Historical Record</Button>
                    </Grid>
                    <Grid item>
                        <Button>Filter</Button>
                    </Grid>
                    <Grid item>
                        <Button>help</Button>
                    </Grid>
                </Grid>

                <Grid item>
                    <TaskTable/>
                </Grid>

            </Grid>
        </Box>
    )
}

export default MyTask;