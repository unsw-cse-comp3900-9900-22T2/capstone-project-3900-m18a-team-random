import Grid from '@mui/material/Grid';
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddTaskForm = ({email}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCreateTask = async (e) => {
        e.preventDefault();
        
        
        const response = await fetch('/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify()
        });

        if(response.ok){
        } else {
            
        }
    }

    return (
        <form>
            <Grid container spacing={2} direction='column' alignItems='center'>
                    <Grid item xs={12}>
                        <TextField label='Title' required onChange={e=>{setTitle(e.target.value)}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Description' required multiline minRows={3} onChange={e=>setDescription(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <TextField required type='date'/>
                    </Grid> 
                    <Grid item>
                        <Button variant='contained'>Create Task</Button>
                    </Grid>
            </Grid>
        </form>
    )
}

export default AddTaskForm;
