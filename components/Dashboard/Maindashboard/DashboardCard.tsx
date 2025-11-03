'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, BookOpen, Download } from 'lucide-react';

type Stat = {
  id: number;
  icon: 'users' | 'book' | 'download';
  value: number;
  label: string;
  color: string;
};

const iconMap: Record<Stat['icon'], JSX.Element> = {
  users: <Users className="h-6 w-6 text-amber-500" />,
  book: <BookOpen className="h-6 w-6 text-indigo-500" />,
  download: <Download className="h-6 w-6 text-blue-500" />,
};

const DashboardCards = () => {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    fetch('/data/stats.json')
      .then(res => res.json())
      .then(data => setStats(data.stats))
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-between">
      {stats.map(stat => (
        <Card
          key={stat.id}
          className={`${stat.color} flex-1  transition-shadow hover:shadow-md`}
        >
          <CardContent className="flex flex-col items-center justify-center text-center py-6">
            <div className="mb-2">{iconMap[stat.icon]}</div>
            <h2 className="text-2xl font-bold">
              {stat.value.toLocaleString()}
            </h2>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
