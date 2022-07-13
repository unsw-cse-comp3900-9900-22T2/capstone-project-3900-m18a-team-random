import Grid from '@mui/material/Grid';
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CreateGroupPanel = ({email}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCreateGroup = async (e) => {
        e.preventDefault();       
        const groupCreation = {'token':sessionStorage.getItem('token'), 'team_name': title};
        console.log(groupCreation);
        const response = await fetch('/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(groupCreation)
        });

        if(response.ok){
        } else {
            
        }
    }

    return (
        <form onSubmit={handleCreateGroup}>
            <Grid container spacing={2} direction='column' alignItems='center'>
                    <Grid item xs={12}>
                        <TextField label='Group Name' required onChange={e=>{setTitle(e.target.value)}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Description' multiline minRows={3} onChange={e=>setDescription(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <Button type='submit' variant='contained'>Create</Button>
                    </Grid>
            </Grid>
        </form>
    )
}

export default CreateGroupPanel;