import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Highcharts from 'highcharts';
import axios from 'axios';
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Legend,
  LineSeries,
} from 'react-jsx-highcharts';


const Charts = () => {
  const [currentData, setCurrentData] = useState([]);
  const [frequencyData, setFrequencyData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await Axios.get('http://qts.iitkgp.ac.in/last/gail/current/2000');
  //       const data = response.data;

  //       const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

  //       setCurrentData((prevData) => [...prevData.slice(-229), [Date.now() + 19800000, data[0].current]]);
  //       setFrequencyData((prevData) => [...prevData.slice(-229), [Date.now() + 19800000, data[0].freq]]);
  //     } catch (error) {
  //       console.error('Error fetching current data:', error);
  //     }
  //   };

  //   const interval = setInterval(fetchData, 2000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/motor/proxy');
        const data = response.data;// Store all the fetched data
        // const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

            setCurrentData((prevData) => [...prevData.slice(-59), [Date.now() + 19800000, data[0].current]]);
        setFrequencyData((prevData) => [...prevData.slice(-59), [Date.now() + 19800000, data[0].freq]]);
      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(fetchData, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
    <Typography>Real Time Graph:</Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Current</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <HighchartsChart>
            <Chart />

            <Title>Current</Title>

            <Legend>
              <Legend.Title>Legend</Legend.Title>
            </Legend>

            <XAxis type="datetime">
              <XAxis.Title>Time</XAxis.Title>
            </XAxis>

            <YAxis>
              <YAxis.Title>Current</YAxis.Title>
              <LineSeries name="Current" data={currentData} />
            </YAxis>
          </HighchartsChart>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Frequency</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <HighchartsChart>
            <Chart />

            <Title>Frequency</Title>

            <Legend>
              <Legend.Title>Legend</Legend.Title>
            </Legend>

            <XAxis type="datetime">
              <XAxis.Title>Time</XAxis.Title>
            </XAxis>

            <YAxis>
              <YAxis.Title>Frequency</YAxis.Title>
              <LineSeries name="Frequency" data={frequencyData} />
            </YAxis>
          </HighchartsChart>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default withHighcharts(Charts, Highcharts);
