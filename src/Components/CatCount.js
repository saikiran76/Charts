import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { Data } from "../utils/Data";

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const CatCount = () => {
  const countEventTypes = (data) => {
    return data.reduce((acc, item) => {
      const eventType = item.event_type;
      if (acc[eventType]) {
        acc[eventType] += 1;
      } else {
        acc[eventType] = 1;
      }
      return acc;
    }, {});
  };

  const eventCounts = countEventTypes(Data);
  const categories = Object.keys(eventCounts);
  const counts = Object.values(eventCounts);
  const newCounts = counts.map((count)=>count)
  console.log(newCounts)

  const bubbleData = {
    labels: categories,
    datasets: [{
      label: 'Event Counts',
      data: newCounts.map((count, index) => ({
        x: index + 1,
        y: 1, 
        r: count * 0.25 
      })),
      backgroundColor: 'rgba(75,192,192,0.6)',
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
        text: 'Bubble Chart of Event Counts',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categories',
        },
      },
      y: {
        display: false, 
      },
    },
  };

  return (
    <div className="cat-count w-[50%]">
      <h2>Counting things</h2>
      <Bubble data={bubbleData} options={options} />
    </div>
  );
};

export default CatCount;
