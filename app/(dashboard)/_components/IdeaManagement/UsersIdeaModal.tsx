"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApproveIdeaMutation } from "@/rtk/features/all-apis/idea-management/ideaManagement";
import { Mail, User } from "lucide-react";
import * as React from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { toast } from "sonner";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user: {
    username: string;
    id: string;
    useremail: string;
    description: string;
    photo: string;
    approval_status?: string;
  } | null;
}

export const UsersIdeaModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  user,
}) => {
  const [approveIdea, { isLoading }] = useApproveIdeaMutation();

  if (!user) return null;

  const isApproved =
    user?.approval_status === "APPROVED" ||
    user?.approval_status === "REJECTED";

  const handleApprove = async () => {
    if (user.approval_status === "APPROVED") {
      toast.info("This idea is already approved.");
      return;
    }
    const id = user?.id;
    const payload = {
      status: "APPROVED",
    };
    try {
      await approveIdea({ id, data: payload }).unwrap();
      // setIsApproved(true);
      toast.success(`Idea approved for ${user.username}`);
    } catch (err: unknown) {
      console.error("Approval error:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "object" &&
            err !== null &&
            "data" in err &&
            typeof err.data === "object" &&
            err.data !== null &&
            "message" in err.data
          ? (err.data as { message: string }).message
          : "Failed to approve idea";
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <DialogContent className="bg-white rounded-xl shadow-lg w-full p-6 font-[inter]">
        <DialogHeader className="flex relative border-b pb-2 mb-4">
          <DialogTitle className="text-md font-bold">User Profile</DialogTitle>
          <DialogClose asChild />
        </DialogHeader>

        <div className="space-y-3 text-[11px] md:text-sm text-gray-700">
          {/* User Info */}
          <div className="flex justify-between border-b-2 py-1">
            <div className="flex flex-col gap-2">
              <span className="font-medium flex items-center gap-2">
                <User size={18} /> User Name
              </span>
              <span className="font-bold ml-1">{user?.username || "N/A"}</span>
            </div>
            <div className="flex flex-col gap-2 w-fit">
              <span className="font-medium flex items-center gap-2">
                <Mail size={18} /> Email
              </span>
              <span className="font-bold ml-1">
                {user?.useremail || "!no email found!"}
              </span>
            </div>
          </div>

          {/* Idea Description */}
          <div className="flex flex-1 border-b-2 py-1">
            <div className="flex flex-col gap-2">
              <span className="font-medium flex items-center justify-start gap-2">
                <HiOutlineLightBulb size={18} /> Idea Description
              </span>
              <span>{user?.description || "!no idea found!"}</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 pt-2">
            <span className="font-medium">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                user?.approval_status === "APPROVED"
                  ? "bg-green-100 text-green-700"
                  : user?.approval_status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user?.approval_status === "APPROVED" && "✓ APPROVED"}
              {user?.approval_status === "PENDING" && "PENDING"}
              {user?.approval_status === "REJECTED" && "REJECTED"}
            </span>
          </div>

          {/* Approve Button */}
          {!isApproved && (
            <div className="flex pt-3">
              <Button
                onClick={handleApprove}
                disabled={isApproved || isLoading}
                className={`${
                  isApproved || isLoading
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-green-500 hover:bg-green-400 text-white cursor-pointer"
                }`}
                variant="outline"
              >
                {isLoading
                  ? "Approving..."
                  : isApproved
                  ? "✓ Approved"
                  : "Approve Idea"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
