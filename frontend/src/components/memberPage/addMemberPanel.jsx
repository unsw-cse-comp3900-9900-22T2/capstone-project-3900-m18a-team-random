import Grid from '@mui/material/Grid';
import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const AddMemberPanel = ({teamName, close}) => {
    const [email, setEmail] = useState("");

    const handleInviteMember = async (e) => {
        e.preventDefault();

        const invitation = {
            'token':sessionStorage.getItem('token'), 
            'user_email':email,
            'team_name':teamName
        };
        const response = await fetch('/invitation-create', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(invitation)
        });

        if(response.ok){
            close();
        } else {
        }
    }

    return (
        <form onSubmit={handleInviteMember}>
            <Grid container spacing={2} direction='column'>
                <Grid item xs={12}>
                    <Typography>Please enter the email address of the user you want to add</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='email' type='email' required onChange={e=>setEmail(e.target.value)}/>
                </Grid>
                <Grid item>
                    <Button type='submit' variant='contained'>Send Invitation</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default AddMemberPanel;