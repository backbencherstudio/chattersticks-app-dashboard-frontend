"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return children;
}
