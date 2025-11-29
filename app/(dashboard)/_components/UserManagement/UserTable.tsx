/* eslint-disable @next/next/no-img-element */
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllUsersQuery } from "@/rtk/features/all-apis/user-management/userManagement";
import { Eye } from "lucide-react";
import React, { useState } from "react";
import { UserModal } from "./UserModal";

type SortOrder = "asc" | "desc" | null;

type User = {
  id: string;
  userName: string | null;
  Photos?: string | null;
  Email: string;
  Joindate?: string;
  lastActive?: string;
  joinedDate?: string;
  created_at?: string;
  device?: string | null;
};

export default function UserTable() {
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  // 🔹 Fetch users from API using page and perPage
  const { data, isLoading, isError } = useGetAllUsersQuery({
    page: currentPage,
    perPage,
  });

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

  // ✅ Extract users & pagination from API
  const usersData: User[] = data?.data || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination?.totalPages || 1;
  const hasNextPage = pagination?.hasNextPage || false;
  const hasPrevPage = pagination?.hasPrevPage || false;

  // ✅ Sort users client-side by Join Date
  const sortedUsers = [...usersData].sort((a, b) => {
    if (!sortOrder) return 0;
    const dateA = new Date(a.Joindate || "").getTime();
    const dateB = new Date(b.Joindate || "").getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const handleSort = () =>
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

  const handleView = (userId: string) => {
    setSelectedUser(userId);
    setOpen(true);
  };

  const handlePrevPage = () => {
    if (hasPrevPage && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  return (
    <div className="w-full p-4 font-[inter]">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <Card className="shadow-sm rounded-xl">
        <CardContent className="p-0 overflow-x-auto">
          <h2 className="pl-5 py-2 font-bold">All Users</h2>

          {!isLoading && !isError && usersData.length > 0 && (
            <>
              <table className="w-full text-left text-sm min-w-[800px]">
                <thead className="bg-gray-100 text-gray-700 border-b">
                  <tr
                    onClick={handleSort}
                    className="bg-gray-200/50 cursor-pointer select-none"
                  >
                    <th className="py-3 px-4">Username</th>
                    <th className="py-3 px-4">Photo</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4 flex items-center">
                      Join Date
                      <SortIndicator order={sortOrder} />
                    </th>
                    <th className="py-3 px-4">Last Active</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user: User, i: number) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{user?.userName || "N/A"}</td>
                      <td className="py-3 px-4">
                        <img
                          src={user?.Photos || "/images/profile.png"}
                          alt="profile"
                          width={38}
                          height={38}
                          className="rounded-full object-cover"
                        />
                      </td>
                      <td className="py-3 px-4">{user.Email}</td>
                      <td className="py-3 px-4">{user.Joindate}</td>
                      <td className="py-3 px-4">{user.lastActive}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md cursor-pointer"
                          onClick={() => handleView(user.id)}
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* ✅ Pagination */}
              <div className="flex justify-center items-center gap-4 py-4 border-t">
                <button
                  onClick={handlePrevPage}
                  disabled={!hasPrevPage}
                  className={`px-4 py-2 text-xs md:text-sm rounded-md border ${
                    !hasPrevPage
                      ? "opacity-50 cursor-not-allowed bg-gray-100"
                      : "hover:bg-gray-100 cursor-pointer"
                  }`}
                >
                  Previous
                </button>

                <span className="text-xs md:text-sm text-gray-600">
                  Page {pagination.page || currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={!hasNextPage}
                  className={`px-4 py-2 text-xs md:text-sm rounded-md border ${
                    !hasNextPage
                      ? "opacity-50 cursor-not-allowed bg-gray-100"
                      : "hover:bg-gray-100 cursor-pointer"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {!isLoading && !isError && usersData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found.
            </div>
          )}
        </CardContent>
      </Card>

      <UserModal
        open={open}
        onClose={() => setOpen(false)}
        userId={selectedUser}
      />
    </div>
  );
}

const SortIndicator: React.FC<{ order: SortOrder }> = ({ order }) => {
  if (order === "asc") return <span className="ml-2">▲</span>;
  if (order === "desc") return <span className="ml-2">▼</span>;
  return null;
};
