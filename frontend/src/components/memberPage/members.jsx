import React, {useEffect,useState} from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TeamMemberTable from './teamMemberTable';
import PopupButton from '../popupButton';
import AddMemberPanel from './addMemberPanel';
import PopupFab from '../popupFab';

const Members = ({teamName}) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMemberData = async () => {
            const tokenAndTeam = {'token':sessionStorage.getItem('token'), 'team_name': teamName}
            console.log(tokenAndTeam);
            const response = await fetch('/get-team-member', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(tokenAndTeam)
            });
            
            if(response.ok){
                response.json().then(data =>{
                    console.log(data);
                    setMembers(data);
                })
            }
        }

        fetchMemberData();
    }, []);

    return(
        <div>
            <Grid container direction='column' spacing={4}>
                <Grid item xs={12}>
                    <h1>
                        Members
                    </h1>
                </Grid>
                <Grid item>
                    <TeamMemberTable members={members}/>
                </Grid>
            </Grid>
            <PopupFab 
            style={{
                position:"absolute",
                bottom:30,
                right:20,
            }}
            title='Invite a Taskmaster'
            color='primary'
            >
                <AddMemberPanel teamName={teamName}/>
            </PopupFab>
        </div>
    )
}

export default Members;
