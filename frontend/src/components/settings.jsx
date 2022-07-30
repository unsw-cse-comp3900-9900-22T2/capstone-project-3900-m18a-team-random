import React from 'react';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';


const Settings = ({teamId}) => {
    let navigate = useNavigate();
    
    const handleLeaveTeam = async (e) => {
        e.preventDefault();
        const tokenAndTeam = {'token':sessionStorage.getItem('token'), 'team_id':teamId};
        console.log(tokenAndTeam);
        const response = await fetch('/leave_team', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(tokenAndTeam)
        });

        if(response.ok){
            navigate("../../");
        } else {
        }
    }

    return (
        <div>
            <Button onClick={handleLeaveTeam}>Leave</Button>
        </div>
    )
}

export default Settings;
