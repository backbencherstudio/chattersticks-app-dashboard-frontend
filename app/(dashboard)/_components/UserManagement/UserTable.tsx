'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { UserModal } from './UserModal';

interface User {
  username: string;
  photo: string;
  email: string;
  joinedDate: string;
  lastActive: string;
}

type SortOrder = 'asc' | 'desc' | null;

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('/data/users.json')
      .then(res => res.json())
      .then((data: User[]) => {
        const sorted = data.sort(
          (a, b) =>
            new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime()
        );
        setUsers(sorted);
      });
  }, []);


  function handleSort() {
    let newOrder: SortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);

    const sorted = [...users].sort((a, b) =>
      newOrder === 'asc'
        ? new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime()
        : new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime()
    );

    setUsers(sorted);
  }

  // ✅ Open modal with selected user
  function handleView(user: User) {
    setSelectedUser(user);
    setOpen(true);
  }

  return (
    <div className="w-full p-4 font-[inter]">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <Card className="shadow-sm rounded-xl">
        <CardContent className="p-0 overflow-x-auto">
          <h2 className="pl-5 py-2 font-bold">All User</h2>
          <table className="w-full text-left text-sm min-w-[800px]">
            <thead className="bg-gray-100 text-gray-700 border-b">
              <tr
                onClick={handleSort}
                className="bg-gray-200/50 cursor-pointer select-none"
              >
                <th className="py-3 px-4">
                  Username <SortIndicator order={sortOrder} />
                </th>
                <th className="py-3 px-4">Photos</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">
                    <Image
                      src={user.photo}
                      alt="profile"
                      width={38}
                      height={38}
                      className="rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.joinedDate}</td>
                  <td className="py-3 px-4">{user.lastActive}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md"
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

      {/* ✅ Reusable Modal Component */}
      <UserModal
        open={open}
        onClose={() => setOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}

// Sort indicator component
const SortIndicator: React.FC<{ order: SortOrder }> = ({ order }) => {
  if (order === 'asc') return <span className="ml-2">▲</span>;
  if (order === 'desc') return <span className="ml-2">▼</span>;
  return null;
};
