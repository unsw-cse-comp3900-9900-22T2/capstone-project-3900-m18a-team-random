import React, {useState} from 'react';
import PopupButton from '../popupButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TaskDetailPanel from './taskDetailPanel';
import DropdownField from '../dropdownField';
import TextField from '@mui/material/TextField';
import { DeselectRounded } from '@mui/icons-material';
import { Button } from '@mui/material';

const TaskItem = ({epicId, taskId, taskTitle,assigneeName, status, priority, deadline, members, description, onDeleteTask}) => {
    const [dea, setDea] = useState(deadline);
    const [ass, setAss] = useState(assigneeName);
    const [sta, setSta] = useState(status);
    const [pri, setPri] = useState(priority);
    const [des, setDes] = useState(description);

    const getMemberName = (members) =>{
        let memberNames = [];
        members.map((member) => memberNames = [...memberNames, member['member_name']]);
        console.log(memberNames);
        return memberNames;
    }

    const getEmail = (members, name) => {
        let email = "";
        members.map((member) => {
            if(member['member_name'] === name){
                email = member['member_email'];    
            }
        });
        console.log(name);
        console.log(email);
        return email;
    }

    const handleUpdateTask = async (name) => {      
        const taskUpdate = {
            'token':sessionStorage.getItem('token'), 
            'title':taskTitle,
            'new_title':taskTitle,
            'status':sta,
            'priority':pri,
            'email':getEmail(members, name),
            'epic_id':epicId,
            'description':description,
            'due_date':dea
        };
        console.log(taskUpdate);
        const response = await fetch('/update-task', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(taskUpdate)
        });

        if(response.ok){
            response.json().then((data) =>{
                console.log(data);
            })
        } else {
        }
    }

    return (
        <TableRow
            key={taskId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <PopupButton variant='text' buttonTitle={taskTitle} title={taskTitle}>
                    <TaskDetailPanel
                    taskId={taskId}
                    taskTitle={taskTitle}
                    email={getEmail(members, ass)}
                    status={sta}
                    priority={pri}
                    deadline={dea}
                    description={des}
                    onDeleteTask={onDeleteTask}
                    epicId={epicId}
                    onDescriptionUpdated={des=>setDes(des)}
                    />
                </PopupButton>
            </TableCell>
            <TableCell>
                {taskId}
            </TableCell>
            <TableCell>
                <DropdownField
                    value={ass}
                    label="Assignee"
                    onChange={(e)=>{
                        setAss(e.target.value);
                    }}
                    menuItems={getMemberName(members)}
                />
            </TableCell>
            <TableCell>
                <DropdownField
                    value={sta}
                    label="Status"
                    onChange={(e)=>{
                        setSta(e.target.value);
                    }}
                    menuItems={['Not Started','In Progress', 'Blocked', 'Completed']}
                />
            </TableCell>
            <TableCell>
                <DropdownField
                    value={pri}
                    label="Priority"
                    onChange={(e)=>{
                        setPri(e.target.value);
                    }}
                    menuItems={['High','Medium','Low']}
                />
            </TableCell>
            <TableCell>
                <TextField value={dea} type='date' onChange={
                        (e)=>{
                            setDea(e.target.value);
                        }
                    }/>
            </TableCell>
            <TableCell>
                <Button variant='contained' onClick={()=>handleUpdateTask(ass)}>Confirm</Button>
            </TableCell>
        </TableRow>
    )
}

export default TaskItem;
