import React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AssignedTaskItem from './assignedTaskItem';

const AssignedTaskTable = ({tasks}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth:500}}>
            <TableHead>
            <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Task ID</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Deadline</TableCell>
            </TableRow>
            </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <AssignedTaskItem 
                            key={task['task_id']}
                            taskId={task['task_id']}
                            taskTitle={task['title']}
                            assigneeName={task['assignee_name']}
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

export default AssignedTaskTable;