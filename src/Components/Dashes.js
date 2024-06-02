/**
 * Count, Unique values, Frequent Categories display
 * Proposed Visualization: Component cards
 */

import React, { useMemo } from 'react';
import { CiCircleAlert } from "react-icons/ci";
import { MdOutlineSecurity } from "react-icons/md";
import { SiWebauthn } from "react-icons/si";
import { RiSkull2Fill } from "react-icons/ri";
import { reusable_classnames } from '../utils/Helpers';



import { Data } from '../utils/Data'; 

const calculateMetrics = (data) => {
  const totalAlerts = data.length;

  const categoryCounts = data.reduce((acc, item) => {
    const category = item.alert ? item.alert.category : 'Unknown';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentCategory = Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b, 'Unknown');

  const uniqueSourceIPs = new Set(data.map(item => item.src_ip)).size;

  const severityCounts = data.reduce((acc, item) => {
    const severity = item.alert ? item.alert.severity : 0;
    acc[severity] = (acc[severity] || 0) + 1;
    return acc;
  }, {});

  return {
    totalAlerts,
    mostFrequentCategory,
    uniqueSourceIPs,
    severityCounts,
  };
};

const DashboardStat = ({ color, icon, number, description }) => (
  <div className={`dashboard-stat bg-${color}-500 text-white p-4 rounded-lg flex items-center space-x-4`}>
    <div className="visual text-4xl">
      {icon}
    </div>
    <div className="details text-right">
      <div className="number text-2xl font-semibold">
        <span>{number}</span>
      </div>
      <div className="desc text-lg">{description}</div>
    </div>
  </div>
);

const Dashboard = () => {
  const metrics = useMemo(() => calculateMetrics(Data), []);

  return (
    <div className="container mx-auto p-4 mb-[2em]">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-white">Admin Dashboard Stat</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className={`${reusable_classnames}`}>
        <DashboardStat
          color="red"
          icon={<CiCircleAlert />}
          number={metrics.totalAlerts}
          description="Total Alerts"
        />
        </div>

        <div className={`${reusable_classnames}`}>
        <DashboardStat
          color="blue"
          icon={<MdOutlineSecurity />}
          number={metrics.mostFrequentCategory}
          description="Frequent Category"
        />
        </div>

        <div className={`${reusable_classnames}`}>
        <DashboardStat
          color="hoki"
          icon={<SiWebauthn />}
          number={metrics.uniqueSourceIPs}
          description="Unique Source IPs"
        />
        </div>

        <div className={`${reusable_classnames}`}>
        <DashboardStat
          color="purple"
          icon={<RiSkull2Fill />}
          number={metrics.severityCounts[2] || 0} 
          description="Severity 2 Alerts"
        />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
