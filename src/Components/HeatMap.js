import React, { useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { MatrixElement, MatrixController } from 'chartjs-chart-matrix';
import { Chart } from 'react-chartjs-2';
import { Data } from '../utils/Data'; 

ChartJS.register(MatrixElement, MatrixController, CategoryScale, LinearScale, Title, Tooltip, Legend);

const aggregateBySrcIpDestPort = (data) => {
  const counts = data.reduce((acc, item) => {
    const srcIp = item.src_ip;
    const destPort = item.dest_port;
    const key = `${srcIp}-${destPort}`;
    if (acc[key]) {
      acc[key] += 1;
    } else {
      acc[key] = 1;
    }
    return acc;
  }, {});

  return counts;
};

const HeatmapChart = () => {
  const aggregatedData = useMemo(() => aggregateBySrcIpDestPort(Data), []);

  const matrixData = useMemo(() => {
    return Object.entries(aggregatedData).map(([key, count]) => {
      const [srcIp, destPort] = key.split('-');
      return { x: srcIp, y: destPort, v: count };
    });
  }, [aggregatedData]);

  const srcIps = [...new Set(Data.map(item => item.src_ip))];
  const destPorts = [...new Set(Data.map(item => item.dest_port))];

  const heatmapData = {
    datasets: [{
      label: 'Frequency of Source IP and Destination Port',
      data: matrixData,
      backgroundColor: (context) => {
        const value = context.dataset.data[context.dataIndex].v;
        const alpha = Math.min(1, Math.max(0.2, value / 10));
        return `rgba(255, 99, 132, ${alpha})`;
      },
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      width: (context) => {
        const chart = context.chart;
        const width = chart.chartArea ? chart.chartArea.width / srcIps.length : 0;
        return width;
      },
      height: (context) => {
        const chart = context.chart;
        const height = chart.chartArea ? chart.chartArea.height / destPorts.length : 0;
        return height;
      },
    }],
  };

  const heatmapOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', 
        },
      },
      title: {
        display: true,
        text: 'Heatmap of Source IP and Destination Port Frequencies',
        color: 'white', 
      },
      tooltip: {
        callbacks: {
          title: (context) => `Source IP: ${context[0].raw.x}`,
          label: (context) => `Destination Port: ${context.raw.y}, Count: ${context.raw.v}`,
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: srcIps,
        title: {
          display: true,
          text: 'Source IP',
          color: 'white', 
        },
        ticks: {
          color: 'white', 
          maxRotation: 45, 
          minRotation: 45,
          font: {
            size: 10,
          },
        },
      },
      y: {
        type: 'category',
        labels: destPorts,
        title: {
          display: true,
          text: 'Destination Port',
          color: 'white', 
        },
        ticks: {
          color: 'white', 
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return <div style={{ height: '100%' }}><Chart type="matrix" data={heatmapData} options={heatmapOptions} /></div>;
};

export default HeatmapChart;


















