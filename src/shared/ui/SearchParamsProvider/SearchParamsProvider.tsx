'use client'

import { createContext, PropsWithChildren } from 'react'

export const SearchParamsContext = createContext<string | null>(null)

interface ProviderProps extends PropsWithChildren {
	searchParams: string
}

export function SearchParamsProvider({ children, searchParams }: ProviderProps) {
	return <SearchParamsContext.Provider value={searchParams}>{children}</SearchParamsContext.Provider>
}
