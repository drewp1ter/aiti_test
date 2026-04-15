import { useSearchParams as useClientSearchParams } from 'next/navigation'
import { useContext } from 'react'
import { isServer } from './isServer'
import { SearchParamsContext } from '../ui/SearchParamsProvider'

export function useSearchParams(): URLSearchParams {
	const context = useContext(SearchParamsContext)
	const clientSearchParams = useClientSearchParams()
	if (context === null) {
		throw new Error('useSearchParams must be used within SearchParamsProvider')
	}

	if (isServer()) {
    return new URLSearchParams(context)
	}
	
	return clientSearchParams
}