"use client";

import { useRouter } from "next/navigation";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const token = localStorage.getItem("accessToken");

  if (!token) {
    router.push("/login");
  }

  return <>{children}</>;
}
