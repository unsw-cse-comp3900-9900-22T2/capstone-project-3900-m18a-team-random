import React, {useState} from 'react';
import PopupButton from '../popupButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TaskDetailPanel from './taskDetailPanel';
import DropdownField from '../dropdownField';
import TextField from '@mui/material/TextField';
import { DeselectRounded } from '@mui/icons-material';

const AssignedTaskItem = ({taskId, taskTitle, assigneeName, status, priority, deadline}) => {

    return (
        <TableRow
            key={taskId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {taskTitle}
            </TableCell>
            <TableCell>
                {taskId}
            </TableCell>     
            <TableCell>
                {assigneeName}
            </TableCell>
            <TableCell>
                {status}
            </TableCell>
            <TableCell>
                {priority}
            </TableCell>
            <TableCell>
                {deadline}
            </TableCell>
        </TableRow>
    )
}

export default AssignedTaskItem;