import * as React from 'react';
import { Grid } from '@mui/material';
import TaskTable from '../myTaskPage/taskTable';
import HistoryTaskTable from './historyTaskTable';


const HistoryPage = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <h1>
                    Task History
                </h1>
            </Grid>
            <Grid item>
                <HistoryTaskTable/>
            </Grid>
        </Grid>
    )
}

export default HistoryPage;
