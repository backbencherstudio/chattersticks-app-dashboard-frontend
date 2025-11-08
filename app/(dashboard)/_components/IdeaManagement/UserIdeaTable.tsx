'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { UsersIdeaModal } from './UsersIdeaModal';
import ReactMarkdown from 'react-markdown';
import { useGetAllIdeasQuery } from '@/rtk/features/all-apis/idea-management/ideaManagement';

interface User {
  username: string;
  id: string;
  photo: string;
  useremail: string;
  description: string;
  approval_status?: string;
  userId?: number;
}

export default function UsersIdeaTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  const { data: usersResponse, isLoading, isError } = useGetAllIdeasQuery('');

  // ✅ Safely handle data shape
  const users: User[] = Array.isArray(usersResponse)
    ? usersResponse
    : usersResponse?.data ?? [];
  console.log(usersResponse)

  function handleView(user: User) {
    setSelectedUser(user);
    setOpen(true);
  }

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error fetching users.</p>;
  if (!Array.isArray(users)) return <p>No users found.</p>;

  return (
    <div className="w-full p-4 font-[inter]">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <Card className="shadow-sm rounded-xl">
        <CardContent className="p-0 overflow-x-auto">
          <h2 className="pl-5 py-2 font-bold">All Users</h2>
          <table className="w-full text-left text-sm min-w-[800px]">
            <thead className="bg-gray-100 text-gray-700 border-b">
              <tr className="bg-gray-200/50 cursor-pointer select-none">
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Photos</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">User Ideas</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User, i: number) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">
                    <Image
                      src={user.photo || '/default-profile.png'}
                      alt="profile"
                      width={38}
                      height={38}
                      className="rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{user.useremail}</td>
                  <td className="py-3 px-4">
                    <div className="max-w-md">
                      <ReactMarkdown>
                        {user.description?.length > 60
                          ? user.description.substring(0, 60) + '...'
                          : user.description}
                      </ReactMarkdown>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md cursor-pointer"
                      onClick={() => handleView(user)}
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <UsersIdeaModal
        open={open}
        onClose={() => setOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}
