import Grid from '@mui/material/Grid';
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const NewEpicForm = ({teamName, close}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCreateEpic = async (e) => {
        e.preventDefault();       
        const epicCreation = {'token':sessionStorage.getItem('token'), 'epic': title, 'team_name':teamName};
        console.log(epicCreation);
        const response = await fetch('/create-epic', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(epicCreation)
        });

        if(response.ok){
            response.json().then(data =>{
                console.log(data);
                close();
            })
        } else {
            
        }
    }

    return (
        <form onSubmit={handleCreateEpic}>
            <Grid container spacing={2} direction='column' alignItems='center'>
                <Grid item xs={12}>
                    <TextField label='Title' required onChange={e=>{setTitle(e.target.value)}}/>
                </Grid>
                <Grid item>
                    <Button variant='contained' type='submit'>Create</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default NewEpicForm;