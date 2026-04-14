'use client'

import { createContext, useContext, PropsWithChildren } from 'react'
import { isServer } from '@/shared/lib'
import { ProductsStore } from './ProductsStore'

export const StoreContext = createContext<ProductsStore | null>(null)

export function useProductsStore() {
	const context = useContext(StoreContext)
	if (context === undefined || context === null) {
		throw new Error('useProductsStore must be used within Provider')
	}

	return context
}

let store: ProductsStore

function initializeStore() {
	const _store = store ?? new ProductsStore()

	if (isServer()) return _store
	store ??= _store

	return _store
}


export function ProductsStoreProvider({ children }: PropsWithChildren) {
	const store = initializeStore()

	return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
