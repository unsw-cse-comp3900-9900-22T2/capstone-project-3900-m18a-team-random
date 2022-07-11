import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskTable from './taskTable';
import PopupFab from '../popupFab';
import AddTaskForm from './addTaskForm';

const Epic = ({title})=>{
    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TaskTable/>
                <PopupFab 
                style={{
                    marginTop:10
                }}
                size='small'
                color='secondary'
                title='New Task'
                >
                    <AddTaskForm/>
                </PopupFab>
            </AccordionDetails>
      </Accordion>
    );
}

export default Epic;
