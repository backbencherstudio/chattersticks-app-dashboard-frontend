"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Download, Users } from "lucide-react";
import { JSX, useEffect, useState } from "react";

type Stat = {
  id: number;
  icon: "users" | "book" | "download";
  value: number;
  label: string;
  color: string;
};

interface DashboardCardsProps {
  comics?: {
    totalUsers: number;
    totalComics: number;
    totalDownloads: number;
  };
}

const iconMap: Record<Stat["icon"], JSX.Element> = {
  users: <Users className="h-6 w-6 text-amber-500" />,
  book: <BookOpen className="h-6 w-6 text-indigo-500" />,
  download: <Download className="h-6 w-6 text-blue-500" />,
};

export default function DashboardCards({ comics }: DashboardCardsProps) {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    if (comics) {
      const formattedStats: Stat[] = [
        {
          id: 1,
          icon: "users",
          value: comics.totalUsers || 0,
          label: "Total Users",
          color: "bg-amber-50",
        },
        {
          id: 2,
          icon: "book",
          value: comics.totalComics || 0,
          label: "Total Comics",
          color: "bg-indigo-50",
        },
        {
          id: 3,
          icon: "download",
          value: comics.totalDownloads || 0,
          label: "Total Downloads",
          color: "bg-blue-50",
        },
      ];
      setStats(formattedStats);
    } else {
      setStats([]);
    }
  }, [comics]);

  return (
    <div className="flex flex-wrap gap-4 justify-between">
      {stats.length > 0 ? (
        stats.map((stat) => (
          <Card
            key={stat.id}
            className={`${stat.color} flex-1 min-w-[200px] transition-shadow hover:shadow-md`}
          >
            <CardContent className="flex flex-col items-center justify-center text-center py-6">
              <div className="mb-2">{iconMap[stat.icon]}</div>
              <h2 className="text-2xl font-bold">
                {stat.value.toLocaleString()}
              </h2>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500 text-center w-full">
          No dashboard stats available.
        </p>
      )}
    </div>
  );
}
