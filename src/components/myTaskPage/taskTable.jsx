import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TaskItem from './taskItem';


function orgnizeData(taskId, taskTitle, assignee, status, priority, deadline) {
    return {taskId, taskTitle, assignee, status, priority, deadline};
}

const rows = [
    orgnizeData(1, 'user authentication', 'Barry', 'Working on it', 'Medium', '07/01/2022'),
    orgnizeData(2, 'user validation', 'Justin', 'Not started yet', 'High', '07/01/2022')
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
                        <TaskItem
                            taskId={row.taskId}
                            taskTitle={row.taskTitle}
                            assignee={row.assignee}
                            status={row.status}
                            priority={row.priority}
                            deadline={row.deadline}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TaskTable;