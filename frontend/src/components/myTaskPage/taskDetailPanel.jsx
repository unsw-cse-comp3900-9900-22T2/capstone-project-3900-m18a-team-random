import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Comment from './comment';
import { Box } from '@mui/system';

const TaskDetailPanel = () => {
    return (
        <Grid container spacing={2} direction='column'>
            <Grid item xs={12}>
                <Paper>
                    Implement User Authentication
                </Paper>
            </Grid>
            <Grid item>
                <Box display='flex' justifyContent='flex-end'>
                    <Button variant='contained'>Edit</Button>
                </Box>
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
            <Grid item>
                <Box display='flex' justifyContent='flex-end'>
                    <Button variant='contained'>Send</Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default TaskDetailPanel;
