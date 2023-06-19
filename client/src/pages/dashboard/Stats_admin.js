import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainer, Loading, ChartsContainer } from '../../components'
import Faults from './faults';
import React, { useState } from 'react';
import axios from 'axios';
// import Faults from "./faults";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Item = styled.div`
  flex: 0 0 auto;
  width: ${(props) => (props.xs ? `${(props.xs / 12) * 100}%` : "100%")};
  padding: 8px;
`;
// const tableData = [
//   ["motor-fake-id1", "494499494949", "10/21/2022:02:50", "HealthCard 1"],
//   ["motor-fake-id2", "494499494949", "9/21/2022:02:15", "HealthCard 2"],
//   ["motor-fake-id3", "494499494949", "10/21/2022:01:50", "HealthCard 3"],
//   ["motor-fake-id4", "494499494949", "10/21/2022:02:50", "HealthCard 4"],
//   ["motor-fake-id5", "494499494949", "10/21/2022:03:20", "HealthCard 5"],
// ];


const Stats_admin = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext()
  const [tableData, setTableData] = useState([]);
  const [userType, setUserType] = useState('');
  

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const response = await axios.get('/api/v1/motor'); // Replace with your backend route URL
    //  
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };
  

  useEffect(() => {
    showStats()
    // eslint-disable-next-line
  }, [])
  
  useEffect(() => {
    fetch('/api/v1/auth/getCurrentUser')
      .then(response => response.json())
      .then(data => {
        setUserType(data.user.userType);
        
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  if (isLoading) {
    return <Loading center />
  }
  if (userType === 'Admin')
  { return (
    <>
    <h1>Hello Admin</h1>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
      <canvas id="myChart"></canvas>
      <Container>
      <Item xs={12}>
        <Faults data={tableData} />

      </Item>
    </Container>
    </>
  )
  }
  else
  {
    return (
      <>

        <StatsContainer />
        {monthlyApplications.length > 0 && <ChartsContainer />}
        <canvas id="myChart"></canvas>
        <Container>
        <Item xs={12}>
          <Faults data={tableData} />
  
        </Item>
      </Container>
      </>
    )

  }
}

export default Stats_admin
