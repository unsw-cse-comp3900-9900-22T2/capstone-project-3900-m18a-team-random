import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PopupButton from '../popupButton';
import TaskDetailPanel from './taskDetailPanel';


function orgnizeData(taskTitle, assignee, status, priority, deadline) {
    return { taskTitle, assignee, status, priority, deadline};
}

const rows = [
    orgnizeData('user authentication', 'Barry', 'Working on it', 'middle', '07/01/2022'),
    orgnizeData('user validation', 'Justin', 'Not started yet', 'high', '07/01/2022')
];


const TaskTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth:500}}>
            <TableHead>
            <TableRow>
                <TableCell>COMP3900-Spring 1</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Deadline</TableCell>
            </TableRow>
            </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.taskTitle}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <PopupButton buttonTitle={row.taskTitle} title={row.taskTitle}>
                                    <TaskDetailPanel/>
                                </PopupButton>
                            </TableCell>
                            <TableCell>{row.assignee}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.priority}</TableCell>
                            <TableCell>{row.deadline}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TaskTable;