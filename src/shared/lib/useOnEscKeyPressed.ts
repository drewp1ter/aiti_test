'use client'

import { useEffect } from 'react'

export const useOnEscKeyPressed = (callback: (e: KeyboardEvent) => void) => {
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				callback(event)
			}
		}

		document.addEventListener('keydown', handleEsc)

		return () => {
			document.removeEventListener('keydown', handleEsc)
		}
	}, [callback])
}
