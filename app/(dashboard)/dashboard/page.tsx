"use client";

import DashboardCards from "@/components/Dashboard/Maindashboard/DashboardCard";
import LiveActivityFeed from "@/components/Dashboard/Maindashboard/LIveActivityFeed";
import TopComicsCard from "@/components/Dashboard/Maindashboard/TopComicsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDashboardComicsQuery } from "@/rtk/features/all-apis/comics/comicsApi";

const DashboardPage = () => {
  const { data, isLoading, isError } = useGetDashboardComicsQuery("");
  if (isLoading)
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  if (isError) return <p>Error loading dashboard data.</p>;

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
