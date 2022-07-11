import Grid from '@mui/material/Grid';
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ProfilePanel = ({email}) => {
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
                    <TextField label='Name' value='Kai' required onChange={e=>{setTitle(e.target.value)}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Email' value='Kai@cc.com' required onChange={e=>setDescription(e.target.value)}/>
                </Grid>
            </Grid>
        </form>
    )
}

export default ProfilePanel;