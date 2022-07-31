import Grid from '@mui/material/Grid';
import React, {useState,useEffect} from 'react';
import AssignedTaskTable from './myTaskPage/assignedTaskTable';

const MemberProfilePanel = ({memberEmail}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(memberEmail);
    const [description, setDescription] = useState("");
    const [assignedTasks, setAssignedTasks] = useState([]);

    const getDescription = () => {
        if(description === null)
            return "No description here"
        else
            return description;
    }

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = {'email':email}
            console.log(token);
            const response = await fetch('/profile_get_by_email', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(token)
            });
            
            if(response.ok){
                response.json().then(data =>{
                    console.log(data);
                    setName(data['username']);
                    setEmail(data['email']);
                    setDescription(data['description']);
                })
            }
        }

        const fetchAssignedTask = async () => {
            const token = {'token':sessionStorage.getItem('token'),'email':email}
            const response = await fetch('/get-assigned-task', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(token)
            });
            
            if(response.ok){
                response.json().then(data =>{
                    console.log(data);
                    setAssignedTasks(data['assigned_task_list']);
                })
            }
        }

        fetchProfileData();
        fetchAssignedTask();
    }, []);

    return (
        <Grid container spacing={2} direction='column' alignItems='center'>
            <Grid item xs={12}>
                {name}
            </Grid>
            <Grid item xs={12}>
                {email}
            </Grid>
            <Grid item xs={12}>
                {getDescription()}
            </Grid>
            <Grid item xs={12}>
                <AssignedTaskTable tasks={assignedTasks}/>
            </Grid>
        </Grid>
    )
}

export default MemberProfilePanel;
