'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogClose,
} from '@/components/ui/dialog';
import { Heart, Mail, Smartphone, User, X } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useGetUserByIdQuery } from '@/rtk/features/all-apis/user-management/userManagement';

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  userId: string | null; // API returns id as string
}

export const UserModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  userId,
}) => {
  // Fetch user data from API
  const { data, isLoading, isError } = useGetUserByIdQuery(
    userId || '', // pass empty string if null to avoid undefined
    { skip: !userId }
  );

  console.log(data)

  // Unwrap user from API response
  const user = data?.data;

  // Format dates
  const formatDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : 'N/A';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <DialogContent
        showCloseButton={false}
        className="bg-white rounded-xl shadow-lg w-full p-6 font-[inter]"
      >
        <DialogHeader className="flex relative border-b pb-2 mb-4">
          <DialogTitle className="text-md font-bold">
            {isLoading
              ? 'Loading user...'
              : isError
              ? 'Error Loading User'
              : `User Profile: ${user?.name || 'N/A'}`}
          </DialogTitle>
          <DialogClose asChild>
            <button
              onClick={onClose}
              className="hover:text-gray-600 absolute top-[-6] right-[-6] md:top-0 md:right-6"
            >
              <X size={18} />
            </button>
          </DialogClose>
        </DialogHeader>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-10 text-gray-500">
            <Loader2 className="animate-spin mr-2" size={20} />
            Loading user details...
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center text-red-500 font-semibold py-6">
            Failed to load user data.
          </div>
        )}

        {/* User Data */}
        {!isLoading && !isError && user && (
          <div className="space-y-3 text-[11px] md:text-sm text-gray-700">
            <div className="flex justify-between border-b-2 py-1">
              <div className="flex flex-col gap-2">
                <span className="font-medium flex items-center gap-2">
                  <User size={18} /> User ID
                </span>
                <span className="font-bold ml-1">{user.id}</span>
              </div>
              <div className="flex flex-col gap-2 w-fit">
                <span className="font-medium flex items-center gap-2">
                  <Mail size={18} /> Email
                </span>
                <span className="font-bold ml-1">{user.email || 'N/A'}</span>
              </div>
            </div>

            <div className="flex justify-between mr-2 md:mr-5 border-b-2 py-1">
              <div className="flex flex-col gap-2">
                <span className="font-medium flex items-center gap-2">
                  <Heart size={18} /> Favorite Comics
                </span>
                <span className="font-bold ml-1">
                  {user._count?.favorite_comics ?? 0}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-medium flex items-center justify-start gap-2">
                  <Smartphone size={18} /> Primary Device
                </span>
                <span className="font-bold">N/A</span>{' '}
                {/* Not available in API */}
              </div>
            </div>

            <div className="flex justify-between py-1">
              <div className="flex flex-col gap-2">
                <span>Joined Date</span>
                <span className="font-bold">{formatDate(user.created_at)}</span>
              </div>
              <div className="flex flex-col gap-2 mr-10 md:mr-15">
                <span>Last Activity</span>
                <span className="font-bold">{formatDate(user.updated_at)}</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
