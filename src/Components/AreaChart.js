/**
 * Area Chart to observe the severity
 * observed: constant severity over time (in Hours & minutes)
 * library used: recharts
 */

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { convertTimestampToDate } from '../utils/Helpers';
import { Data } from '../utils/Data'; 


const chartData = Data.map((item) => ({
  date: convertTimestampToDate(item.timestamp),
  severity: item.alert ? item.alert.severity : null,
}));

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Severity:
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const AreaChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" fontSize="small" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Area
          type="monotone"
          dataKey="severity"
          stroke="#2563eb"
          fill="#3b82f6"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
