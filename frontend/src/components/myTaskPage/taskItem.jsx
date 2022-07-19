import React, {useState} from 'react';
import PopupButton from '../popupButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TaskDetailPanel from './taskDetailPanel';
import DropdownField from '../dropdownField';

const TaskItem = ({taskId, taskTitle, assignee, status, priority, deadline}) => {
    const [ass, setAss] = useState(assignee);
    const [sta, setSta] = useState(status);
    const [pri, setPri] = useState(priority);

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
                <DropdownField
                    value={sta}
                    label="Status"
                    onChange={e=>{setSta(e.target.value)}}
                    menuItems={['Not yet started','Working on it','Completed']}
                />
            </TableCell>
            <TableCell>
                <DropdownField
                    value={pri}
                    label="Priority"
                    onChange={e=>{setPri(e.target.value)}}
                    menuItems={['High','Medium','Low']}
                />
            </TableCell>
            <TableCell>{deadline}</TableCell>
        </TableRow>
    )
}

export default TaskItem;
