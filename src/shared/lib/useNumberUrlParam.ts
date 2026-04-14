'use client'

import { useCallback, useState } from 'react'
import { isServer } from './isServer'

function isParamInvalid(param: number) {
	return param < 1 || !Number.isInteger(param) || isNaN(param)
}

export function useNumberUrlParam(paramName: string, defaultValue: number): [number, (newPage: number) => void] {
	const searchParams = isServer() ? new URLSearchParams() : new URLSearchParams(window.location.search)
	const searchParam = searchParams.get(paramName)
	const [param, setParam] = useState(() => {
		const parsedParam = Number(searchParam)
		return isParamInvalid(parsedParam) ? defaultValue : parsedParam
	})

	const setParamValue = useCallback(
		(newPage: number) => {
			const params = new URLSearchParams(window.location.search)
			params.set(paramName, String(newPage))
			const newUrl = `${window.location.pathname}${params.size > 0 ? '?' + params.toString() : ''}`
			window.history.replaceState({}, '', newUrl) // не используем роутер, чтобы не ререндерить всю страницу
			setParam(newPage)
		},
		[searchParams, paramName]
	)

	return [param, setParamValue]
}
