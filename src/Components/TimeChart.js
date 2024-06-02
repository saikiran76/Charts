import React from 'react';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { convertTimestampToDate } from '../utils/Helpers';
import { Line } from 'react-chartjs-2';
import { Data } from "../utils/Data";


ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const dates = Data.map((date)=>date.timestamp.toLocaleString())
const newDates = dates.map((date)=>convertTimestampToDate(date))
const alerts = Data.map((sev)=>sev.alert)
const severityValues = alerts
    .filter(item => item !== null && item !== undefined)
    .map(item => item.severity);
console.log(severityValues)

const timeSeriesData = {
labels: newDates,
datasets: [{
    label: 'Severity over time',
    data: severityValues, 
    backgroundColor: 'rgba(75, 192, 192, 0.6)',
    borderColor: 'rgba(75, 192, 192, 1)',
    fill: false,
}],
};

const timeSeriesOptions = {
responsive: true,
plugins: {
    legend: {
    position: 'top',
    },
    title: {
    display: true,
    text: 'Severity Frequency Over Time',
    },
},
scales: {
    x: {
    title: {
        display: true,
        text: 'Time',
    },
    },
    y: {
    title: {
        display: true,
        text: 'Severity',
    },
    },
},
};
  
const TimeSeriesChart = () => {
return (
    <div>
    <Line data={timeSeriesData} options={timeSeriesOptions} />
    </div>
);
};

export default TimeSeriesChart;
