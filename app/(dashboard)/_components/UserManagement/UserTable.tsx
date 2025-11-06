'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { UserModal } from './UserModal';
import { useGetAllUsersQuery } from '@/rtk/features/all-apis/user-management/userManagement';

type SortOrder = 'asc' | 'desc' | null;

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

  // Debug: Log the API response
  console.log('API Response:', data);

  // Adjust this depending on your API response shape
  const usersData = data?.data?.users || data?.data || data?.users || [];
  const totalPages =
    data?.data?.meta?.totalPages ||
    data?.data?.pagination?.totalPages ||
    data?.meta?.totalPages ||
    data?.pagination?.totalPages ||
    data?.totalPages ||
    Math.ceil(
      (data?.data?.meta?.total ||
        data?.data?.total ||
        data?.meta?.total ||
        data?.total ||
        0) / perPage
    ) ||
    1;

  console.log('Users Data:', usersData);
  console.log('Total Pages:', totalPages);
  console.log('Current Page:', currentPage);

  // Optional: sort client-side
  const sortedUsers = [...usersData].sort((a, b) => {
    if (!sortOrder) return 0;
    return sortOrder === 'asc'
      ? new Date(a.joinedDate || a.created_at).getTime() -
          new Date(b.joinedDate || b.created_at).getTime()
      : new Date(b.joinedDate || b.created_at).getTime() -
          new Date(a.joinedDate || a.created_at).getTime();
  });

  const handleSort = () =>
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));

  const handleView = (userId: string) => {
    setSelectedUser(userId);
    setOpen(true);
  };

  return (
    <div className="w-full p-4 font-[inter]">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <Card className="shadow-sm rounded-xl">
        <CardContent className="p-0 overflow-x-auto">
          <h2 className="pl-5 py-2 font-bold">All Users</h2>

          {isLoading && (
            <div className="text-center py-8 text-gray-500">
              Loading users...
            </div>
          )}

          {isError && (
            <div className="text-center py-8 text-red-500">
              Failed to load users. Please try again.
            </div>
          )}

          {!isLoading && !isError && usersData.length > 0 && (
            <>
              <table className="w-full text-left text-sm min-w-[800px]">
                <thead className="bg-gray-100 text-gray-700 border-b">
                  <tr
                    onClick={handleSort}
                    className="bg-gray-200/50 cursor-pointer select-none"
                  >
                    <th className="py-3 px-4">
                      Username <SortIndicator order={sortOrder} />
                    </th>
                    <th className="py-3 px-4">Photo</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Joined Date</th>
                    <th className="py-3 px-4">Last Active</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user: any, i: number) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{user.userName}</td>
                      <td className="py-3 px-4">
                        <Image
                          src={user.Photos}
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
                          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md"
                          onClick={() => handleView(user.id)}
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination - Always show if data exists */}
              <div className="flex justify-center items-center gap-4 py-4 border-t">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-xs md:text-sm  rounded-md border ${
                    currentPage === 1
                      ? 'opacity-50 cursor-not-allowed bg-gray-100'
                      : 'hover:bg-gray-100 cursor-pointer'
                  }`}
                >
                  Previous
                </button>

                <span className="text-xs md:text-sm  text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage(prev => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 text-xs md:text-sm py-2 rounded-md border ${
                    currentPage === totalPages
                      ? 'opacity-50 cursor-not-allowed bg-gray-100'
                      : 'hover:bg-gray-100 cursor-pointer'
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
  if (order === 'asc') return <span className="ml-2">▲</span>;
  if (order === 'desc') return <span className="ml-2">▼</span>;
  return null;
};
