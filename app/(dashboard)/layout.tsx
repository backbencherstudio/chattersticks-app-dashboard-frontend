import { MainLayout } from '@/components/Shared/MainLayout';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}