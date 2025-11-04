'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { UsersIdeaModal } from './UsersIdeaModal';
import ReactMarkdown from 'react-markdown';

interface User {
  username: string;
  photo: string;
  email: string;
  ideas: string;
  userId: number;
}



export default function UsersIdeaTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('/data/usersIdea.json')
      .then(res => res.json())
      .then((data: User[]) => setUsers(data))
      .catch(error => console.error('Error loading users:', error));
  }, []);

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
              <tr className="bg-gray-200/50 cursor-pointer select-none">
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Photos</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">User Ideas</th>
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
                  <td className="py-3 px-4">
                    <div className="max-w-md">
                      <ReactMarkdown>
                        {user.ideas.length > 60
                          ? user.ideas.substring(0, 60) + '...'
                          : user.ideas}
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

      {/* ✅ Reusable Modal Component */}
      <UsersIdeaModal
        open={open}
        onClose={() => setOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}


