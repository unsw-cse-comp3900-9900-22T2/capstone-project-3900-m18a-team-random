import Grid from '@mui/material/Grid';
import React, {useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ProfilePanel = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    const getDescription = () => {
        if(description === null)
            return "No description here"
        else
            return description;
    }

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = {'token':sessionStorage.getItem('token')}
            console.log(token);
            const response = await fetch('/get_profile', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(token)
            });
            
            if(response.ok){
                response.json().then(data =>{
                    console.log(data);
                    setName(data['username']);
                    setEmail(data['email']);
                    setDescription(data['description']);
                })
            }
        }

        fetchProfileData();
    }, []);

    const handleUpdateDescription = async (e) => {
        e.preventDefault();       
        const bundle = {'token': sessionStorage.getItem('token'), 'description': description}
        console.log(bundle);
        const response = await fetch('/profile_add_description', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(bundle)
        });

        if(response.ok){
        } else {
            
        }
    }

    return (
        <form onSubmit={handleUpdateDescription}>
            <Grid container spacing={2} direction='column' alignItems='center'>
                <Grid item xs={12}>
                    {name}
                </Grid>
                <Grid item xs={12}>
                    {email}
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                    label='Description' 
                    value={getDescription()}
                    required 
                    multiline 
                    minRows={3} 
                    onChange={e=>setDescription(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button type='submit' variant='contained'>Confirm</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default ProfilePanel;