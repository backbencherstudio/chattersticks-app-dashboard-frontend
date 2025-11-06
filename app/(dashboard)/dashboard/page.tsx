"use client";

import DashboardCards from "@/components/Dashboard/Maindashboard/DashboardCard";
import LiveActivityFeed from "@/components/Dashboard/Maindashboard/LIveActivityFeed";
import TopComicsCard from "@/components/Dashboard/Maindashboard/TopComicsCard";
import { useGetDashboardComicsQuery } from "@/rtk/features/all-apis/comics/comicsApi";

const DashboardPage = () => {
  const { data } = useGetDashboardComicsQuery("");
  console.log(data);
  return (
    <div>
      <div className="space-y-6">
        <DashboardCards comics={data?.stats} />
      </div>
      <div className=" mt-6">
        <TopComicsCard />
      </div>
      <div className=" mt-6">
        <LiveActivityFeed />
      </div>
    </div>
  );
};

export default DashboardPage;
