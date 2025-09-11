'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { USER_ME_URL } from '@/shared/urls';
import { saveUser } from '@/services/UserService';

export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const run = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');
      if (error) {
        router.replace('/login');
        return;
      }
      if (!token) {
        router.replace('/login');
        return;
      }
      try {
        const resp = await fetch(USER_ME_URL, {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        });
        const data = await resp.json();
        if (resp.ok && data?.user) {
          saveUser(data.user);
          router.replace('/dashboard');
        } else {
          router.replace('/login');
        }
      } catch (_e) {
        router.replace('/login');
      }
    };
    run();
  }, [router, searchParams]);

  return null;
}



