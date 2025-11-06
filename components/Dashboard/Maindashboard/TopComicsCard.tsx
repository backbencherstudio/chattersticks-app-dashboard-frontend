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
  id: string;
  title: string;
  author: string;
  download_count: number;
};

type SortOrder = "asc" | "desc" | null;

interface TopComicsCardProps {
  comics?: Comic[];
}

export default function TopComicsCard({ comics = [] }: TopComicsCardProps) {
  const [sortedComics, setSortedComics] = useState<Comic[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  // Initialize comics list when data changes
  useEffect(() => {
    if (comics?.length > 0) {
      setSortedComics(comics);
    }
  }, [comics]);

  // Sorting handler (by download_count)
  const handleSort = () => {
    const newOrder: SortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    const sorted = [...sortedComics].sort((a, b) =>
      newOrder === "asc"
        ? a.download_count - b.download_count
        : b.download_count - a.download_count
    );

    setSortedComics(sorted);
  };

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
                  Total Downloads
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedComics.length > 0 ? (
                sortedComics.map((comic) => (
                  <TableRow
                    key={comic.id}
                    className="bg-blue-50/30 hover:bg-blue-100/40"
                  >
                    <TableCell className="font-medium">{comic.title}</TableCell>
                    <TableCell className="text-gray-700">
                      by {comic.author}
                    </TableCell>
                    <TableCell className="text-right text-gray-800">
                      {comic.download_count.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-gray-500 py-4"
                  >
                    No comics available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// Small component to show sort arrow indicator
const SortIndicator: React.FC<{ order: SortOrder }> = ({ order }) => {
  if (order === "asc") return <span className="ml-2">▲</span>;
  if (order === "desc") return <span className="ml-2">▼</span>;
  return <span className="ml-2 opacity-40">⇅</span>;
};
