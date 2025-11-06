"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";

type Comic = {
  id: number;
  title: string;
  author: string;
  downloads: number;
};

type SortOrder = "asc" | "desc" | null;

export default function TopComicsCard() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  useEffect(() => {
    fetch("/data/topComics.json")
      .then((res) => res.json())
      .then((data) => setComics(data.comics))
      .catch(console.error);
  }, []);

  // Sorting handler for Comic Name column (sort by downloads)
  function handleSort() {
    let newOrder: SortOrder;
    if (sortOrder === "asc") {
      newOrder = "desc";
    } else {
      newOrder = "asc";
    }
    setSortOrder(newOrder);

    const sorted = [...comics].sort((a, b) => {
      if (newOrder === "asc") {
        return a.downloads - b.downloads;
      } else {
        return b.downloads - a.downloads;
      }
    });
    setComics(sorted);
  }

  return (
    <Card className="bg-blue-50/40 border border-blue-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Top Downloaded Comics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-blue-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow
                className="bg-white cursor-pointer select-none"
                onClick={handleSort}
              >
                <TableHead className="text-sm font-medium text-gray-600 flex items-center">
                  Comic Name
                  <SortIndicator order={sortOrder} />
                </TableHead>
                <TableHead className="text-sm font-medium text-gray-600">
                  Author/Creator
                </TableHead>
                <TableHead className="text-sm font-medium text-gray-600 text-right">
                  Total Download
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comics.map((comic) => (
                <TableRow
                  key={comic.id}
                  className="bg-blue-50/30 hover:bg-blue-100/40"
                >
                  <TableCell className="font-medium">{comic.title}</TableCell>
                  <TableCell className="text-gray-700">
                    by {comic.author}
                  </TableCell>
                  <TableCell className="text-right text-gray-800">
                    {comic.downloads.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// Small component to show sort arrow indicator
const SortIndicator: React.FC<{ order: SortOrder }> = ({ order }) => {
  if (order === "asc") {
    return <span className="ml-2">▲</span>;
  } else if (order === "desc") {
    return <span className="ml-2">▼</span>;
  } else {
    return null;
  }
};
