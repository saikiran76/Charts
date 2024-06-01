import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Data } from "../utils/Data";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CatChart = () => {
  const datacollection = Data.map((item) => ({
    category: item.event_type,
    value: item.dest_port,
  }));

  const categories = datacollection.map((cat) => cat.category);
  const data = datacollection.map((val) => val.value);

  const updatedData = {
    labels: categories,
    datasets: [{
      label: "# categories",
      data: data,
      backgroundColor: 'rgba(75,192,192,0.6)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Category vs Value',
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Categories',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
  };

  return (
    <div className="cat-chart">
      <h1>Cat Chart</h1>
      <Bar data={updatedData} options={options} />
    </div>
  );
};

export default CatChart;

            
    