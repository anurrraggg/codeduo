'use client';

export async function getLoginLocationMessage(userDisplayName) {
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 800);

		const resp = await fetch('https://ipapi.co/json/', {
			signal: controller.signal,
			cache: 'no-store',
		}).catch(() => null);
		clearTimeout(timeoutId);

		let city = '';
		let country = '';
		if (resp && resp.ok) {
			const data = await resp.json().catch(() => ({}));
			city = data?.city || '';
			country = data?.country_name || data?.country || '';
		}

		const namePart = userDisplayName ? `, ${userDisplayName}` : '';
		if (city || country) {
			const where = [city, country].filter(Boolean).join(', ');
			return `Welcome back${namePart}! Logged in .`;
		}
		return `Welcome back${namePart}! You’re now signed in.`;
	} catch {
		const namePart = userDisplayName ? `, ${userDisplayName}` : '';
		return `Welcome back${namePart}! You’re now signed in.`;
	}
}


