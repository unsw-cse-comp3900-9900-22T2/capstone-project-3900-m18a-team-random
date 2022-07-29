import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import React,{ useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import TaskTable from './taskTable';
import PopupButton from '../popupButton';
import AddTaskForm from './addTaskForm';
import PopupFab from '../popupFab';
import { useParams,useLocation } from 'react-router-dom';
import Epic from './epic';
import NewEpicForm from './newEpicForm';
import SearchPanel from './searchPanel';


const MyTask = ({teamId, teamName}) => {
    const [epics, setEpics] = useState([]);
    const [members, setMembers] = useState([]);
    const [searchString, setSearchString] = useState(""); 

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
                    setEpics(data['epics']);
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
            <form onSubmit={e=>e.preventDefault()}>
                <Grid container spacing={2} direction='column'>
                    <Grid item xs={12} spacing={3} container>
                        <Grid item>
                            <Typography variant='h3'>
                                {teamName}
                            </Typography>
                        </Grid>
                            <Grid item>
                                <TextField required placeholder='Search by Task Name' onChange={e=>setSearchString(e.target.value)}/>
                            </Grid>
                            <Grid item>
                                <PopupButton type='submit' variant='contained' buttonTitle='Search' title='Search Result'>
                                    <SearchPanel searchString={searchString} members={members} teamId={teamId}/>
                                </PopupButton>
                            </Grid>
                    </Grid>
                    <Grid item>
                        {epics.map((epic) => (
                            <Epic 
                            key={epic['epic_id']} 
                            epicId={epic['epic_id']} 
                            title={epic['epic_name']}
                            tasks={epic['tasks']}
                            members={members}
                            onDeleteEpic={id=>setEpics(epics.filter(epic=>epic['epic_id']!=id))}
                            />
                        ))}
                    </Grid>
                </Grid>
            </form>
            <PopupFab 
            style={{
                position:"absolute",
                bottom:30,
                right:20,
            }}
            title='New Epic'
            color='primary'
            >
                <NewEpicForm teamName={teamName} onNewEpic={epic=>setEpics(currentEpics=>[...currentEpics,epic])}/>
            </PopupFab>
        </Box>
    )
}

export default MyTask;