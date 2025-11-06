'use client';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { ReactNode, useEffect } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    if (!cookies.token) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
}
