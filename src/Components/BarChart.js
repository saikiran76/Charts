import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Data } from '../utils/Data'; 

const aggregateBySignature = (data) => {
  return data.reduce((acc, item) => {
    const signature = item.alert ? item.alert.signature : 'Unknown';
    if (acc[signature]) {
      acc[signature] += 1;
    } else {
      acc[signature] = 1;
    }
    return acc;
  }, {});
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Count:
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const truncateLabel = (label) => {
  return label.length > 15 ? `${label.slice(0, 12)}...` : label;
};

const BarChartComponent = () => {
  const aggregatedData = useMemo(() => {
    const aggregated = aggregateBySignature(Data);
    const sortedData = Object.keys(aggregated)
      .map((signature) => ({
        name: truncateLabel(signature),
        count: aggregated[signature],
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); 
    return sortedData;
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={aggregatedData}
        layout="vertical" 
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        barSize={20}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" width={150} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="count" fill="#2563eb" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

