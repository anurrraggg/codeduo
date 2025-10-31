'use client'
import React, { useEffect, useState } from 'react'

export default function InstallPrompt() {
	const [deferredPrompt, setDeferredPrompt] = useState(null)
	const [isInstallable, setIsInstallable] = useState(false)

	useEffect(() => {
		const handleBeforeInstallPrompt = (e) => {
			e.preventDefault()
			setDeferredPrompt(e)
			setIsInstallable(true)
		}

		const handleAppInstalled = () => {
			setDeferredPrompt(null)
			setIsInstallable(false)
		}

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
		window.addEventListener('appinstalled', handleAppInstalled)

		// Hide if already running standalone
		if (window.matchMedia('(display-mode: standalone)').matches) {
			setIsInstallable(false)
		}

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
			window.removeEventListener('appinstalled', handleAppInstalled)
		}
	}, [])

	const onInstallClick = async () => {
		if (!deferredPrompt) return
		deferredPrompt.prompt()
		const { outcome } = await deferredPrompt.userChoice
		if (outcome === 'accepted') {
			setIsInstallable(false)
		}
		setDeferredPrompt(null)
	}

	if (!isInstallable) return null

	return (
		<button
			onClick={onInstallClick}
			style={{
				background: 'var(--white, #fff)',
				color: 'var(--purple-600)',
				padding: '0.5rem 1rem',
				borderRadius: '0.5rem',
				cursor: 'pointer',
				boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
			}}
		>
			Install App
		</button>
	)
}
