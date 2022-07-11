import * as React from 'react';
import { Grid } from '@mui/material';
import TaskTable from './myTaskPage/taskTable';


const HistoryPage = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <h1>
                    Task History
                </h1>
            </Grid>
            <Grid item>
                <TaskTable/>
            </Grid>
        </Grid>
    )
}

export default HistoryPage;
