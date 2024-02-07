import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistike = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => { 
    const token = sessionStorage.getItem('token');
 
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    axios.get('http://127.0.0.1:8000/api/statistics', { headers })
      .then(response => {
        setStatistics(response.data);
      })
      .catch(error => {
        console.error('Error fetching statistics:', error);
      });
  }, []);

  const chartData = {
    labels: statistics.map(category => category.category_name),  
    datasets: [
      {
        label: 'Broj fajlova',
        data: statistics.map(category => category.document_count),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
};
 
const options = {
    maintainAspectRatio: false,
    scales: {
        y: {  
            beginAtZero: true,
            ticks: {
                stepSize: 1,  
            },
        },
        x: { 
             
        },
    },
};


  return (
    <div className="container" style={{width:"80vh",marginLeft:"10vh"}}>
      <h2>Statistike</h2>
      <div className="chart-container">
      <Bar
        data={chartData}
        options={options}
        />

       
      </div>
    </div>
  );
};

export default Statistike;
