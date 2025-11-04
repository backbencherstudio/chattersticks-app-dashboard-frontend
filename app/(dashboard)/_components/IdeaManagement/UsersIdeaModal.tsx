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
import {  Mail, User, X } from 'lucide-react';
import { HiOutlineLightBulb } from "react-icons/hi";
import { Button } from '@/components/ui/button';
interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user: {
    username: string;
    userId: number;
    email: string;
    ideas:string;
    photo: string;
  } | null;
}

export const UsersIdeaModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  user,
}) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <DialogContent
        showCloseButton={false}
        className="bg-white rounded-xl shadow-lg  w-full p-6 font-[inter]"
      >
        <DialogHeader className="flex relative border-b pb-2 mb-4">
          <DialogTitle className="text-md font-bold ">
            User Profile: <span className="font-bold">{user.username}</span>
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

        <div className="space-y-3 text-[10px] md:text-sm text-gray-700">
          <div className="flex justify-between border-b-2 py-1">
            <div className="flex flex-col gap-2">
              <span className="font-medium flex items-center gap-2">
                <User size={18} /> User ID
              </span>
              <span className="font-bold ml-1">{user.userId}</span>
            </div>
            <div className="flex flex-col gap-2 w-fit">
              <span className="font-medium flex items-center gap-2">
                <Mail size={18} />
                Email
              </span>
              <span className="font-bold ml-1">{user.email}</span>
            </div>
          </div>
          <div className="flex flex-1 border-b-2 py-1">
            <div className="flex flex-col gap-2">
              <span className="font-medium flex items-center justify-start gap-2 ">
                <HiOutlineLightBulb size={18} />
                Ideas
              </span>
              <span className=" ">{user.ideas}</span>
            </div>
          </div>
          <Button
            className="bg-green-500 cursor-pointer w-fit text-white mx-auto "
            variant="outline">
            Approve
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
