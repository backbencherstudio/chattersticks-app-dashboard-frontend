'use client';
import React, { useEffect, useState } from 'react';
import { UploadIcon, BookOpen, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ActivityItem {
  type: 'upload' | 'user' | 'content';
  message: string;
  time: string;
}

const typeStyles: Record<string, string> = {
  upload: 'bg-[#1FB155]/16 text-green-800',
  user: 'bg-[#6366F1]/16 text-indigo-800',
  content: 'bg-[#A47D06]/16 text-yellow-800',
};

const typeIcons: Record<ActivityItem['type'], React.ReactNode> = {
  upload: <UploadIcon className="w-4 h-4 text-green-800" />,
  user: <Users className="w-4 h-4 text-indigo-800" />,
  content: <BookOpen className="w-4 h-4 text-yellow-800" />,
};

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    fetch('/data/live-activity.json')
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  return (
    <div className="bg-blue-50/40 border border-blue-100 shadow-sm md:p-4 p-2 rounded-xl md:space-y-4 space-y-3">
      <h2 className="text-lg font-semibold py-2">Live Activity Feed</h2>
      {activities.map((item, idx) => (
        <Card
          key={idx}
          className={`${typeStyles[item.type]} border-none shadow-none`}
        >
          <CardContent className=" md:flex items-center md:gap-2">
            <span className="capitalize font-semibold text-black flex items-center gap-2">
              {typeIcons[item.type]} {item.type} :
            </span>
            <span dangerouslySetInnerHTML={{ __html: item.message }} className='text-xs md:text-sm'/>
            <span className="ml-auto text-sm opacity-80 block">{item.time}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
