import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Data } from '../utils/Data'; 

const aggregateByCategory = (data) => {
  const counts = data.reduce((acc, item) => {
    if (item.alert && item.alert.category) {
      const category = item.alert.category;
      if (acc[category]) {
        acc[category] += 1;
      } else {
        acc[category] = 1;
      }
    }
    return acc;
  }, {});

  return counts;
};

const CategoryChart = () => {
  const categoryCounts = useMemo(() => aggregateByCategory(Data), [Data]);

  const chartData = useMemo(() => {
    return Object.keys(categoryCounts).map((category) => ({
      category,
      count: categoryCounts[category],
    }));
  }, [categoryCounts]);

  return (
    <div className="p-4 bg-[#0F172A] rounded-lg shadow-lg">
      <h2 className="text-white text-lg mb-4">Frequency of Alerts by Category</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={{ fill: 'white' }} />
          <YAxis dataKey="category" type="category" tick={{ fill: 'white' }} />
          <Tooltip contentStyle={{ backgroundColor: '#0F172A', border: 'none' }} cursor={{ fill: 'rgba(75, 192, 192, 0.2)' }} />
          <Legend wrapperStyle={{ color: 'white' }} />
          <Bar dataKey="count" fill="rgba(75, 192, 192, 0.6)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
