import React, {useState} from 'react';
import PopupButton from '../popupButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DropdownField from '../dropdownField';
import TaskDetailPanel from '../myTaskPage/taskDetailPanel';

const HistoryTaskItem = ({taskId, taskTitle, assignee, status, priority, deadline}) => {
    return (
        <TableRow
            key={taskId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <PopupButton variant='text' buttonTitle={taskTitle} title={taskTitle}>
                    <TaskDetailPanel/>
                </PopupButton>
            </TableCell>
            <TableCell>
                {assignee}
            </TableCell>
            <TableCell>
                {status}
            </TableCell>
            <TableCell>
                {priority}
            </TableCell>
            <TableCell>{deadline}</TableCell>
        </TableRow>
    )
}

export default HistoryTaskItem;