import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the datalabels plugin

// Register necessary components for Pie chart, including the datalabels plugin
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const TrafficChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get('https://book-store-server-seven.vercel.app/api/v1/get-all-books');
        const books = response.data.data;

        // Count number of books per author
        const authorCount = {};
        books.forEach((book) => {
          authorCount[book.author] = (authorCount[book.author] || 0) + 1;
        });

        // Prepare labels and data for Pie chart
        const labels = Object.keys(authorCount); // Authors
        const data = Object.values(authorCount); // Number of books

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Number of Books by Author',
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(199, 199, 199, 0.8)',
                'rgba(127, 255, 0, 0.8)',
                'rgba(255, 140, 0, 0.8)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(199, 199, 199, 1)',
                'rgba(127, 255, 0, 1)',
                'rgba(255, 140, 0, 1)',
              ],
              borderWidth: 2,
              hoverOffset: 4,  // Make hover effect more prominent
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, []);

  // Chart options to customize the display, including datalabels
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right', // Move the legend to the right side
        labels: {
          font: {
            size: 12, // Make the font size larger
          },
          color: '#333', // Font color
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return `Books: ${value}`;
          },
        },
      },
      title: {
        display: true,
        text: 'Books Distribution by Author (in %)',
        font: {
          size: 19,
        },
        padding: {
          bottom: 10,
        },
      },
      datalabels: {
        color: 'black', // Text color inside the pie slices
        font: {
          weight: 'semibold',
          size: 12,
        },
        formatter: (value) => `${value}`, // Show the number of books
      },
    },
  };

  return (
    <div className="bg-white p-0 rounded-lg shadow-md max-w-lg mx-auto"> {/* Reduced padding */}
      <h2 className="text-2xl font-semibold text-center mb-2">Books Distribution by Author</h2>
      {chartData.labels.length > 0 ? (
        <div className="w-[350px] h-[350px] mx-auto my-auto"> {/* Larger chart size */}
          <Pie data={chartData} options={options} />
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading data...</p>
      )}
    </div>
  );
};

export default TrafficChart;
