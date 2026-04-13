'use client'

import axios from 'axios'
import { useEffect, PropsWithChildren } from 'react'

export function SessionGuard({ children }: PropsWithChildren) {
	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
		if (!accessToken) {
			axios.get('/api/logout').then(() => {
				window.location.href = '/login'
			})
		}
	}, [])

	return <>{children}</>
}
