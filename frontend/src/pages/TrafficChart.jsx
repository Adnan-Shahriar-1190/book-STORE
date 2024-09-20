// TrafficChart.js (Frontend)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
} from 'chart.js';

// Register the necessary components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);

const TrafficChart = () => {
  const [trafficData, setTrafficData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/traffic');
        setTrafficData(response.data);

        const labels = response.data.map(item => new Date(item.timestamp).toLocaleString());
        const data = response.data.map(() => 1); // Counts the hits (1 per request)

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Website Traffic',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching traffic data:', error);
      }
    };

    fetchTrafficData();
  }, []);

  return (
    <div>
      <h2>Website Traffic</h2>
      {chartData.labels.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default TrafficChart;
