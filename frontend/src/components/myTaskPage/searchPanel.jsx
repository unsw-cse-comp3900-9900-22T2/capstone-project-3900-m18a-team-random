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
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SearchPanel = ({searchString, members, teamId}) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchSearchData = async () => {
            const tokenAndString = {'token':sessionStorage.getItem('token'),'team_id':teamId,'query_string':searchString}
            console.log(tokenAndString);
            const response = await fetch('/search_task', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(tokenAndString)
            });
            
            if(response.ok){
                response.json().then(data =>{
                    console.log(data);
                    setTasks(data['tasks'])
                })
            }
        }

        fetchSearchData();
    }, []);

    return (
        <TaskTable tasks={tasks} members={members}/>
    )
}

export default SearchPanel;
