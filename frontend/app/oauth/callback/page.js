'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const USER_ME_URL = '/api/me';
const saveUser = (user) => {
  console.log('User saved:', user);
};

export default function CallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const run = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error || !token) {
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