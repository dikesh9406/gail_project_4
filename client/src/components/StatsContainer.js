import { useEffect, useState } from 'react';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import axios from 'axios';
import StatItem from './StatItem'; // Import the StatItem component

const StatsContainer = () => {
  const [stats, setStats] = useState({
    notWorking: 0,
    working: 0,
    faulty: 0
  });

  useEffect(() => {
    fetchMotorData();
  }, []);

  const fetchMotorData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/motor');
      const motorData = response.data;
      const notWorkingCount = motorData.filter((motor) => motor.motorStatus === 'Not Working').length;
      const workingCount = motorData.filter((motor) => motor.motorStatus === 'Working').length;
      const faultyCount = motorData.filter((motor) => motor.motorStatus === 'Faulty').length;

      setStats({
        notWorking: notWorkingCount,
        working: workingCount,
        faulty: faultyCount
      });
    } catch (error) {
      console.error('Error fetching motor data:', error);
    }
  };

  const defaultStats = [
    {
      title: 'Not Working Motors',
      count: stats.notWorking,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Working Motors',
      count: stats.working,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Faulty Motors',
      count: stats.faulty,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => (
        <StatItem key={index} {...item} />
      ))}
    </Wrapper>
  );
};

export default StatsContainer;
