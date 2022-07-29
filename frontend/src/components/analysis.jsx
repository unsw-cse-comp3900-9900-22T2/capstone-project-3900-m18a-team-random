import React,{useEffect,useState} from 'react';
import { Grid } from '@mui/material';
import AnalysisTable from './analysisTable';

const Analysis = ({teamId}) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchAnalysisData = async () => {
            const tokenAndTeam = {'token':sessionStorage.getItem('token'), 'team_id':teamId}
            console.log(tokenAndTeam);
            const response = await fetch('/analysis_get', {
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
            else{
            }
        }

        fetchAnalysisData();
    }, []);

    return(
        <div>
            <Grid container direction='column' spacing={4}>
                <Grid item xs={12}>
                    <h1>
                        Analysis
                    </h1>
                </Grid>
                <Grid item xs={12}>
                    <h4>
                        The more the score, the more the work!
                    </h4>
                </Grid>
                <Grid item>
                    <AnalysisTable analysis={members}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Analysis;
