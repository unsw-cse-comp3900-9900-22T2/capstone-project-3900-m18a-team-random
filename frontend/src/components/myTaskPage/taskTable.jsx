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


const TaskTable = ({tasks}) => {
    console.log(tasks);
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth:500}}>
            <TableHead>
            <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Deadline</TableCell>
            </TableRow>
            </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TaskItem 
                            key={task['title']}
                            taskId={task['title']}
                            taskTitle={task['title']}
                            assignee={task['assignee_email']}
                            status={task['status']}
                            priority={task['priority']}
                            deadline={task['due_date']}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TaskTable;