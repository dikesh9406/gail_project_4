import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/system';
import { Grid, Paper } from '@mui/material';
import MotorDetails from './detail';
import Charts from '../charts/displayCharts';
import Charts2 from '../charts/displayCharts2';









export default function HealthCard() {
    const {motorId} = useParams();
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <MotorDetails motorId={motorId}/>
                    </Paper>
                </Grid>
                {/* Chart */}
                <Grid item xs={12} >
                <Charts />
                <Charts2/>

                </Grid>
                
            
            </Grid>
        
          

        </Container>
        
    );
}
