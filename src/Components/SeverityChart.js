import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Data } from '../utils/Data'; 

const aggregateBySeverity = (data) => {
  return data.reduce((acc, item) => {
    const severity = item.severity;
    if (acc[severity]) {
      acc[severity] += 1;
    } else {
      acc[severity] = 1;
    }
    return acc;
  }, {});
};

const SeverityChart = () => {
  const severityCounts = useMemo(() => aggregateBySeverity(Data), [Data]);

  const labels = Object.keys(severityCounts).map(severity => `Severity ${severity}`);
  const data = Object.values(severityCounts);

  const severityData = useMemo(() => ({
    labels: labels,
    datasets: [{
      label: 'Alert Count',
      data: data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ],
    }],
  }), [labels, data]);

  const severityOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Alert Severity Distribution',
        color: 'white',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Severity Level',
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Alert Count',
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
      },
    },
  }), []);

  return (
    <Bar data={severityData} options={severityOptions} />
  );
};

export default SeverityChart;

