"use client";

import DashboardCards from "@/components/Dashboard/Maindashboard/DashboardCard";
import LiveActivityFeed from "@/components/Dashboard/Maindashboard/LIveActivityFeed";
import TopComicsCard from "@/components/Dashboard/Maindashboard/TopComicsCard";
import { useGetDashboardComicsQuery } from "@/rtk/features/all-apis/comics/comicsApi";

const DashboardPage = () => {
  const { data } = useGetDashboardComicsQuery("");

  return (
    <div>
      <div className="space-y-6">
        <DashboardCards comics={data?.stats} />
      </div>
      <div className=" mt-6">
        <TopComicsCard comics={data?.topComics} />
      </div>
      <div className=" mt-6">
        <LiveActivityFeed activity={data?.activityFeed} />
      </div>
    </div>
  );
};

export default DashboardPage;
