"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const token = window.localStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
    }
  }, [isClient, router]);

  if (!isClient) return null;

  return <>{children}</>;
}
