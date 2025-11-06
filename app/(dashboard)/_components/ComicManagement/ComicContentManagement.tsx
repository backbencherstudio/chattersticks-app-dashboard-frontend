/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useGetAllComicsQuery } from "../../../../rtk/features/all-apis/comics/comicsApi";
import AddComicModal from "./ComicModal";

interface Comic {
  id: number;
  title: string;
  author: string;
  episodes: number;
  downloads: number;
  status: string;
}
type SortOrder = "asc" | "desc" | null;

export default function ComicContentManagement() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data } = useGetAllComicsQuery("");

  // ✅ Filter comics by title based on search term
  const filteredComics = comics.filter((comic) =>
    comic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // ✅ Delete comic by id
  const handleDelete = (id: number) => {
    const updatedComics = comics.filter((comic) => comic.id !== id);
    setComics(updatedComics);
  };

  return (
    <div className="p-2 sm:p-4 font-[inter]">
      <h2 className="text-lg font-semibold mb-4">Comic Content Management</h2>
      <Card className="p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <h3 className="font-medium">All Comics</h3>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Input
              placeholder="Search for comics..."
              className="w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              onClick={() => setOpenModal(true)}
              className="bg-green-600 hover:bg-green-600 cursor-pointer whitespace-nowrap"
            >
              Add New Comic
            </Button>
          </div>
        </div>

        {/* ✅ Show search results count */}
        {searchTerm && (
          <p className="text-sm text-gray-600 mb-2">
            Found {filteredComics.length} result
            {filteredComics.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-blue-50">
              <tr onClick={handleSort} className="cursor-pointer">
                <th className="text-left p-2">
                  Title / Author
                  <SortIndicator order={sortOrder} />
                </th>
                <th className="text-left p-2">Episodes</th>
                <th className="text-left p-2">Downloads</th>
                <th className="text-left p-2">Status</th>
                <th className="text-center p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.length > 0 ? (
                data?.data?.map((comic: any) => (
                  <tr
                    key={comic.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-2">
                      <div className="font-medium">{comic.title}</div>
                      <div className="text-xs text-gray-500">
                        by {comic.author}
                      </div>
                    </td>
                    <td className="p-2">{comic._count?.episodes} episodes</td>
                    <td className="p-2">{comic.download_count}</td>
                    <td className="p-2">
                      <span
                        className={`${
                          comic.status === "Published"
                            ? "text-green-600"
                            : comic.status === "Draft"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {comic.status}
                      </span>
                    </td>
                    <td className="p-2 flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-green-600" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => setOpenModal(true)}
                      >
                        <Pencil className="w-4 h-4 text-yellow-600" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => handleDelete(comic.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    {searchTerm
                      ? `No comics found matching "${searchTerm}"`
                      : "Loading comics..."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {filteredComics.length > 0 ? (
            filteredComics.map((comic) => (
              <div
                key={comic.id}
                className="border rounded-lg p-3 bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{comic.title}</div>
                    <div className="text-xs text-gray-500">
                      by {comic.author}
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      comic.status === "Published"
                        ? "text-green-600 bg-green-50"
                        : comic.status === "Draft"
                        ? "text-yellow-600 bg-yellow-50"
                        : "text-red-600 bg-red-50"
                    }`}
                  >
                    {comic.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-600 mb-3">
                  <span>{comic.episodes} episodes</span>
                  <span>{comic.downloads.toLocaleString()} downloads</span>
                </div>
                <div className="flex justify-end gap-2 text-[8px]">
                  <Button size="sm" variant="outline">
                    <Eye className="w-3 h-3 text-green-600 " />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setOpenModal(true)}
                  >
                    <Pencil className="w-3 h-3 text-yellow-600 mr-1" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(comic.id)}
                  >
                    <Trash2 className="w-3 h-3 text-red-600 mr-1" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-8 text-gray-500 border rounded-lg">
              {searchTerm
                ? `No comics found matching "${searchTerm}"`
                : "Loading comics..."}
            </div>
          )}
        </div>
      </Card>

      {/* Add New Comic Modal */}
      {openModal && <AddComicModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}

// Sort indicator component
const SortIndicator: React.FC<{ order: SortOrder }> = ({ order }) => {
  if (order === "asc") return <span className="ml-2">▲</span>;
  if (order === "desc") return <span className="ml-2">▼</span>;
  return null;
};
