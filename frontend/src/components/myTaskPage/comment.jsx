import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Comment = ({name,content})=>{
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar>
                    {name.charAt(0).toUpperCase()}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
            primary={name}
            secondary={
                <React.Fragment>
                    {content}
                </React.Fragment>
            }
            />
        </ListItem>
    )
}

export default Comment;
