import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import React,{ useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import TaskTable from './taskTable';
import PopupButton from '../popupButton';
import AddTaskForm from './addTaskForm';
import PopupFab from '../popupFab';
import { useParams,useLocation } from 'react-router-dom';
import Epic from './epic';
import NewEpicForm from './newEpicForm';

const MyTask = ({teamId, teamName}) => {
    const [epics, setEpics] = useState({epics:[]});
    const [members, setMembers] = useState([]);    

    const onNewEpic = (epic) => {
        let epicArray = epics['epics'];
        epicArray = [...epicArray, epic];
        setEpics({epics:epicArray});
        console.log(epics);
    }

    const handleSearch = async () => {
        const tokenAndTeam = {'token':sessionStorage.getItem('token'), 'team_id':teamId}
        console.log(tokenAndTeam);
        const response = await fetch('/get_task', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(tokenAndTeam)
        });
        
        if(response.ok){
            response.json().then(data =>{
                console.log(data);
                setEpics(data);
            })
        }
    }

    useEffect(() => {
        const fetchTaskData = async () => {
            const tokenAndTeam = {'token':sessionStorage.getItem('token'), 'team_id':teamId}
            console.log(tokenAndTeam);
            const response = await fetch('/get_task', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(tokenAndTeam)
            });
            
            if(response.ok){
                response.json().then(data =>{
                    console.log(data);
                    setEpics(data);
                })
            }
        }

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
        fetchTaskData();
    }, []);

    return (
        <Box sx={{flexGrow: 1}} mt={4}>
            <Grid container spacing={2} direction='column'>
                <Grid item xs={12} spacing={3} container>
                    <Grid item>
                        <Typography variant='h3'>
                            {teamName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField placeholder='Search by Task Name'/>
                    </Grid>
                    <Grid item>
                        <Button variant='contained'>Search</Button>
                    </Grid>
                </Grid>
                <Grid item>
                    {epics['epics'].map((epic) => (
                        <Epic 
                        key={epic['epic_id']} 
                        epicId={epic['epic_id']} 
                        title={epic['epic_name']}
                        tasks={epic['tasks']}
                        members={members}
                        />
                    ))}
                </Grid>
            </Grid>
            <PopupFab 
            style={{
                position:"absolute",
                bottom:30,
                right:20,
            }}
            title='New Epic'
            color='primary'
            >
                <NewEpicForm teamName={teamName} onNewEpic={onNewEpic}/>
            </PopupFab>
        </Box>
    )
}

export default MyTask;