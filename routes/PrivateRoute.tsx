"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  return children;
}
