import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import GroupDefaultImage from  './GroupDefaultImage.png';
import { useNavigate } from 'react-router';

const GroupCard = ({teamId, name})=>{
    const team_id = teamId;
    const team_name = name;
    let navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={()=>{navigate("../Team Random")}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={GroupDefaultImage}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        There's no description
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default GroupCard;
