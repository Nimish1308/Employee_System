// src/components/GenderChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [genderData, setGenderData] = useState({ male: 0, female: 0 });

  const setGenderDistribution = (data) => {
    let maleCount = 0;
    let femaleCount = 0;

    data.forEach((item) => {
      if (item.gender.toLowerCase() === 'male') maleCount++;
      if (item.gender.toLowerCase() === 'female') femaleCount++;
    });

    setGenderData({ male: maleCount, female: femaleCount });
  };

  useEffect(() => {
    const getRecord = async () => {
      const res = await axios.get(`https://employee-system-api.vercel.app/find`,{ withCredentials: true } );
      const store = res.data;
      setGenderDistribution(store);
    };

    getRecord();
    const interval = setInterval(getRecord, 2000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [genderData.male, genderData.female],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="container" style={{ margin: '10px', width: '20%' }}>
      <h4>Gender Distribution</h4>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
