"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, UploadIcon, Users } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ActivityItem {
  id: string;
  type: "USER_REGISTRATION" | "COMIC_CREATED" | "UNKNOWN";
  description: string;
  created_at: string;
}

interface LiveActivityFeedProps {
  activity?: ActivityItem[];
}

const typeStyles: Record<ActivityItem["type"], string> = {
  USER_REGISTRATION: "bg-indigo-50 text-indigo-800",
  COMIC_CREATED: "bg-green-50 text-green-800",
  UNKNOWN: "bg-yellow-50 text-yellow-800",
};

const typeIcons: Record<ActivityItem["type"], React.ReactNode> = {
  USER_REGISTRATION: <Users className="w-4 h-4 text-indigo-800" />,
  COMIC_CREATED: <BookOpen className="w-4 h-4 text-green-800" />,
  UNKNOWN: <UploadIcon className="w-4 h-4 text-yellow-800" />,
};

export default function LiveActivityFeed({
  activity = [],
}: LiveActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    if (!activity) return;

    setActivities(prev => {
      const prevString = JSON.stringify(prev);
      const newString = JSON.stringify(activity);
      if (prevString === newString) return prev; // no change → skip update

      const sorted = [...activity].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      return sorted;
    });
  }, [activity]);


  return (
    <div className="bg-blue-50/40 border border-blue-100 shadow-sm md:p-4 p-2 rounded-xl md:space-y-4 space-y-3">
      <h2 className="text-lg font-semibold py-2">Live Activity Feed</h2>

      {activities.length > 0 ? (
        activities.map((item) => {
          const icon = typeIcons[item.type] || typeIcons.UNKNOWN;
          const style = typeStyles[item.type] || typeStyles.UNKNOWN;

          const time = new Date(item.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <Card
              key={item.id}
              className={`${style} border-none shadow-none transition hover:shadow-sm`}
            >
              <CardContent className="flex flex-col md:flex-row md:items-center md:gap-2  px-4 py-1">
                <span className="capitalize font-semibold flex items-center gap-2">
                  {icon}
                  {item.type === "USER_REGISTRATION"
                    ? "User Registered:"
                    : item.type === "COMIC_CREATED"
                    ? "Comic Created:"
                    : "Activity:"}
                </span>

                <span className="text-xs md:text-sm flex-1 text-gray-800 md:ml-2">
                  {item.description}
                </span>

                <span className="ml-auto text-xs md:text-sm opacity-70 mt-1 md:mt-0">
                  {time}
                </span>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p className="text-center text-gray-500 text-sm py-4">
          No recent activity found.
        </p>
      )}
    </div>
  );
}
