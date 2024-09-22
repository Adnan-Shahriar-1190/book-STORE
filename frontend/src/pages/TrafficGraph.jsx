import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const TrafficGraph = () => {
  const [visitData, setVisitData] = useState([]);
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:1000/api/v1/visits', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVisitData(response.data);
      } catch (error) {
        console.error('Error fetching visit data:', error);
        setError('Failed to fetch visit data'); // Set error state
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: visitData.map((visit) => visit._id), // Dates
    datasets: [
      {
        label: 'Number of Visits',
        data: visitData.map((visit) => visit.count), // Number of visits
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  return (
    <div>
      <h2>Daily User Visits</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default TrafficGraph;
