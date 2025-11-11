'use client';
import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { USER_ME_URL } from '@/shared/urls';
import { saveToken, saveUser } from '@/services/UserService';
import { getLoginLocationMessage } from '@/hooks/location';
import { toast } from 'sonner';

export default function CallbackClient() {
	const params = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const token = params.get('token');
		const error = params.get('error');

		if (error) {
			console.log(encodeURIComponent(error));
			toast.error("An error occured while signing-in. ");
			router.push(`/login`);
			return;
		}

        if (token) {
			const run = async () => {
				try {
                    const resp = await fetch(USER_ME_URL, {
						headers: { Authorization: `Bearer ${token}` },
						cache: 'no-store',
					});
					const data = await resp.json();

                    if (resp.ok && data?.user) {
                        saveToken(token);
                        saveUser(data.user);
						try {
							const displayName = data.user?.displayName || data.user?.username || data.user?.email || '';
							const message = await getLoginLocationMessage(displayName);
							toast.success(message);
						} catch {}
						router.replace('/dashboard');
					} else {
						router.replace('/login?error=invalid_token');
					}
				} catch (_e) {
					router.replace('/login?error=network_error');
				}
			};
			run();
			return;
		}

		router.replace('/login?error=missing_params');
	}, [params, router]);

	return <div>Processing OAuth callback...</div>;
}
