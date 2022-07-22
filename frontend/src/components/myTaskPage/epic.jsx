import React,{useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskTable from './taskTable';
import PopupFab from '../popupFab';
import AddTaskForm from './addTaskForm';

const Epic = ({title, epicId, tasks, members})=>{
    const [taskList, setTaskList] = useState(tasks);

    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TaskTable epicId={epicId} tasks={taskList} members={members}/>
                <PopupFab 
                style={{
                    marginTop:10
                }}
                size='small'
                color='secondary'
                title='New Task'
                >
                    <AddTaskForm epicId={epicId} onNewTask={task=>setTaskList(currentTasks => [...currentTasks, task])}/>
                </PopupFab>
            </AccordionDetails>
      </Accordion>
    );
}

export default Epic;
