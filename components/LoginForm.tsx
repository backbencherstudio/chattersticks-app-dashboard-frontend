'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const LoginForm = () => {
  return (
    <Card className="w-[350px] shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Welcome 👋
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Email address</label>
            <Input
              type="email"
              placeholder="name@example.com"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              className="mt-1"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-600" />
              Remember me
            </label>
            <Link href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full mt-2 bg-blue-500">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
