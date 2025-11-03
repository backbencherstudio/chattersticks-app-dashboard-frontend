import DashboardCards from '@/components/Dashboard/Maindashboard/DashboardCard';
import LiveActivityFeed from '@/components/Dashboard/Maindashboard/LIveActivityFeed';
import TopComicsCard from '@/components/Dashboard/Maindashboard/TopComicsCard';

import React from 'react';

const DashboardPage = () => {
  return (
    <div>
      <div className="space-y-6">
        <DashboardCards />
      </div>
      <div className=" mt-6">
        <TopComicsCard />
      </div>
      <div className=" mt-6">
        <LiveActivityFeed/>
      </div>
    </div>
  );
};

export default DashboardPage;
