'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  
  DialogOverlay,
 
} from '@/components/ui/dialog';
import { Heart, Mail, Smartphone, User, Loader2 } from 'lucide-react';
import { useGetUserByIdQuery } from '@/rtk/features/all-apis/user-management/userManagement';

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  userId: string | null;
}

export const UserModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  userId,
}) => {
  const { data, isLoading, isError } = useGetUserByIdQuery(userId || '', {
    skip: !userId,
  });

  console.log('userData:', data);

  const user = data?.data || [];
  console.log(user._count);
  const formatDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : 'N/A';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <DialogContent className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 font-[inter]">
        <DialogHeader className="flex relative border-b pb-3 mb-4">
          <DialogTitle className="text-md font-bold">
            {isLoading
              ? 'Loading user...'
              : isError
              ? 'Error Loading User'
              : `User Profile: `}
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center items-center py-10 text-gray-500">
            <Loader2 className="animate-spin mr-2" size={20} />
            Loading user details...
          </div>
        )}

        {isError && (
          <div className="text-center text-red-500 font-semibold py-6">
            Failed to load user data.
          </div>
        )}

        {!isLoading && !isError && user && (
          <div className="space-y-3 text-[12px] md:text-sm text-gray-700">
            {/* User ID + Email */}
            <div className="flex justify-between border-b-2 py-2">
              <div className="flex flex-col gap-1">
                <span className="font-medium flex items-center gap-2">
                  <User size={16} /> User ID
                </span>
                <span className="font-bold ml-1">{user?.name}</span>
              </div>

              <div className="flex flex-col gap-1 w-fit">
                <span className="font-medium flex items-center gap-2">
                  <Mail size={16} /> Email
                </span>
                <span className="font-bold ml-1">{user.email || 'N/A'}</span>
              </div>
            </div>

            {/* Favorites + Device */}
            <div className="flex justify-between mr-2 md:mr-5 border-b-2 py-2">
              <div className="flex flex-col gap-1">
                <span className="font-medium flex items-center gap-2">
                  <Heart size={16} /> Favorite Comics
                </span>
                <span className="font-bold ml-1">
                  {user._count?.favorite_comics ?? 0}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-medium flex items-center gap-2">
                  <Smartphone size={16} /> Primary Device
                </span>
                <span className="font-bold">N/A</span>
              </div>
            </div>

            {/* Joined + Last Activity */}
            <div className="flex justify-between py-2">
              <div className="flex flex-col gap-1">
                <span className="font-medium">Joined Date</span>
                <span className="font-bold">{formatDate(user.created_at)}</span>
              </div>

              <div className="flex flex-col gap-1 mr-6">
                <span className="font-medium">Last Activity</span>
                <span className="font-bold">{formatDate(user.updated_at)}</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
