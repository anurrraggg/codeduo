'use client';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

const PLACES = [
	'Mumbai, India',
	'San Francisco, United States',
	'London, United Kingdom',
	'Sydney, Australia',
	'Berlin, Germany',
	'Toronto, Canada',
	'Singapore',
	'Bengaluru, India',
	'New York, United States',
	'Tokyo, Japan',
	'Paris, France',
	'Dubai, UAE',
	'Cape Town, South Africa',
	'São Paulo, Brazil',
	'Amsterdam, Netherlands',
];

function randomBetween(minMs, maxMs) {
	return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
}

export default function LiveLoginTicker() {
	const timerRef = useRef(null);

	useEffect(() => {
		const show = () => {
			const place = PLACES[Math.floor(Math.random() * PLACES.length)];
			toast.info(`Someone just logged in from ${place}.`, {
				autoClose: 3500,
			});
			// schedule next one with some randomness
			timerRef.current = setTimeout(show, randomBetween(12000, 22000));
		};
		// first one after a short delay, so it feels organic
		timerRef.current = setTimeout(show, randomBetween(3000, 6000));
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	return null;
}


