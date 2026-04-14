'use client'

import { useCallback, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export function useStringUrlParam<T extends string>(paramName: string, defaultValue: T): [T, (newValue: T) => void] {
	const searchParams = useSearchParams()
	const searchParam = searchParams.get(paramName)
	const [param, setParam] = useState(() => {
		return (searchParam ?? defaultValue) as T
	})

	const setParamValue = useCallback(
		(newValue: T) => {
			const params = new URLSearchParams(searchParams.toString())
			if (newValue === '') {
				params.delete(paramName)
			} else {
				params.set(paramName, String(newValue))
			}
			const newUrl = `${window.location.pathname}${params.size > 0 ? '?' + params.toString() : ''}`
			window.history.replaceState({}, '', newUrl) // не используем роутер, чтобы не ререндерить всю страницу
			setParam(newValue)
		},
		[searchParams, paramName]
	)

	return [param, setParamValue]
}
