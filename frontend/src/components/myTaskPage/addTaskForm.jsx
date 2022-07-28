import Grid from '@mui/material/Grid';
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams,useLocation } from 'react-router-dom';

const AddTaskForm = ({close, epicId, onNewTask}) => {
    const {teamName} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleCreateTask = async (e) => {
        e.preventDefault();       
        const taskCreation = {
            'token':sessionStorage.getItem('token'), 
            'title':title,
            'status':'Not Started',
            'priority':'Low',
            'team_name':teamName,
            'epic_id':epicId,
            'description':description,
            'assignee_email':sessionStorage.getItem('email'),
            'due_date':deadline
        };
        console.log(taskCreation);
        const response = await fetch('/add-task', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(taskCreation)
        });

        if(response.ok){
            response.json().then(data =>{
                console.log(data);
                onNewTask(data);
                close();
            })
        } else {
            
        }
    }

    return (
        <form onSubmit={handleCreateTask}>
            <Grid container spacing={2} direction='column' alignItems='center'>
                    <Grid item xs={12}>
                        <TextField label='Title' required onChange={e=>{setTitle(e.target.value)}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Description' required multiline minRows={3} onChange={e=>setDescription(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <TextField required type='date' onChange={e=>setDeadline(e.target.value)}/>
                    </Grid> 
                    <Grid item>
                        <Button type='submit' variant='contained'>Create Task</Button>
                    </Grid>
            </Grid>
        </form>
    )
}

export default AddTaskForm;
