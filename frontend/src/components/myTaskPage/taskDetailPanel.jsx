import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import React, {useState,useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Comment from './comment';
import { Box } from '@mui/system';

const TaskDetailPanel = ({onDeleteTask, taskId, taskTitle, assignee, status, priority, deadline, description}) => {
    const [des, setDes] = useState(description);

    const handleDeleteTask = async (e) => {
        
        const response = await fetch('/accept-invitation', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify()
        });

        if(response.ok){
            {onDeleteTask()}
        } else {
        }
    }

    return (
        <Grid container spacing={2} direction='column'>
            <Grid item xs={12}>
                <TextField 
                    label='Description' 
                    value={des}
                    required 
                    multiline 
                    fullWidth
                    minRows={3} 
                    onChange={e=>setDes(e.target.value)}
                />
            </Grid>
            <Grid item>
                <Box display='flex' justifyContent='flex-end'>
                    <Button variant='contained'>Confirm</Button>
                </Box>
            </Grid>
            <Grid item container xs={12}>
                <Grid item>

                </Grid>
            </Grid>
            <Grid item xs={12}>
                <List sx={{ width: '100%', maxWidth: 540, bgcolor: 'background.paper' }}>
                    <Comment
                    name='Barry'
                    content="saying something, saying something, saying something, saying something."
                    />
                    <Divider variant="inset" component="li" />
                    <Comment
                    name='Justin'
                    content="saying something, saying something, saying something, saying something."
                    />
                    <Divider variant="inset" component="li" />
                    <Comment
                    name='Kai'
                    content="saying something, saying something, saying something, saying something."
                    />
                </List>
            </Grid>
            <Grid item xs={12}>
                <TextField label='Comment' fullWidth required multiline minRows={3}/>
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs={6}>
                    <Button variant='contained' color='error'>Delete</Button>   
                </Grid>
                <Grid item xs={6}>
                    <Box display='flex' justifyContent='flex-end'>
                        <Button variant='contained'>Send</Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TaskDetailPanel;
