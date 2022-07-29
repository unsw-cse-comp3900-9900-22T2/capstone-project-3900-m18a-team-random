import React,{useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskTable from './taskTable';
import PopupFab from '../popupFab';
import AddTaskForm from './addTaskForm';
import { Fab, Grid, Box } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

const Epic = ({title, epicId, tasks, members, onDeleteEpic})=>{
    const [taskList, setTaskList] = useState(tasks);

    const onDeleteTask = (taskId)=>{
        console.log(taskId);
        setTaskList(taskList.filter(task=>task['task_id'] != taskId));
        console.log(taskList);
    }
    
    const handleDeleteEpic = async (e) => {
        const epicDeletion = {'token':sessionStorage.getItem('token'),'epic':title}
        console.log(epicDeletion);
        const response = await fetch('/delete-epic', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(epicDeletion)
        });

        if(response.ok){
            onDeleteEpic(epicId);
        } else {
        }
    }

    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TaskTable epicId={epicId} tasks={taskList} members={members} onDeleteTask={onDeleteTask}/>
                <Grid container>
                    <Grid item xs={6}>
                        <PopupFab 
                        style={{
                            marginTop:10
                        }}
                        size='small'
                        color='secondary'
                        title='New Task'
                        >
                            <AddTaskForm epicId={epicId} onNewTask={task=>{
                                console.log(task);
                                setTaskList(currentTasks => [...currentTasks, task])
                            }}/>
                        </PopupFab>
                    </Grid>
                    <Grid item xs={6}>
                        <Box display='flex' justifyContent='flex-end'>
                            <Fab 
                            size='small' 
                            style={{
                                marginTop:10
                            }}
                            onClick={handleDeleteEpic}
                            >
                                <RemoveIcon/>
                            </Fab>
                        </Box>
                    </Grid>
                </Grid>
            </AccordionDetails>
      </Accordion>
    );
}

export default Epic;
