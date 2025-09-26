'use client';
import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CallbackClient() {
	const params = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const code = params.get('code');
		const error = params.get('error');

		if (error) {
			// Redirect to login with error info
			router.replace(`/login?error=${encodeURIComponent(error)}`);
			return;
		}

		if (code) {
			// Successfully received code. You may call your backend here to exchange the code.
			// Example: POST to `${process.env.NEXT_PUBLIC_API_URL || import.meta.env.VITE_API_URL}/api/auth/exchange`
			// For now just redirect to dashboard (or a route that finishes the flow).
			router.replace('/dashboard');
			return;
		}

		// Missing params: go back to login with an error
		router.replace('/login?error=missing_params');
	}, [params, router]);

	return <div>Processing OAuth callback...</div>;
}
