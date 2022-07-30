import React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TaskItem from './taskItem';

const TaskTable = ({epicId, tasks, members, onDeleteTask}) => {
    console.log(tasks);
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth:500}}>
            <TableHead>
            <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Deadline</TableCell>
            </TableRow>
            </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TaskItem 
                            epicId={epicId}
                            key={task['task_id']}
                            taskId={task['task_id']}
                            taskTitle={task['title']}
                            assigneeName={task['assignee_name']}
                            status={task['status']}
                            priority={task['priority']}
                            deadline={task['due_date']}
                            description={task['description']}
                            members={members}
                            onDeleteTask={onDeleteTask}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TaskTable;