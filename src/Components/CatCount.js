import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';
import { Data } from "../utils/Data";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const chartData = {
    labels: categories,
    datasets: [{
      label: 'Event Counts',
      data: counts,
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ],
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
        text: 'Chart of Event Counts',
      },
    },
  };

  return (
    <div className="cat-count w-[50%] grid grid-cols-2 grid-rows-2 gap-4">
      <div className="col-span-1 row-span-1">
        <Pie data={chartData} options={options} />
      </div>
      <div className="col-span-1 row-span-1">
        Cell
      </div>
      <div className="col-span-1 row-span-1">Cell</div>
      <div className="col-span-1 row-span-1">Cell</div>
    </div>
  );
};

export default CatCount;
