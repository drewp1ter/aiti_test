'use client'

import { CreateProductModalHOC } from '../ui/CreateProductModalHOC'
import { WithCreateProductModal } from '../types'

export function withCreateProductModal<P extends object>(WrappedComponent: React.ComponentType<P>) {
	const WithProviderComponent = (props: Omit<P, keyof WithCreateProductModal>) => {
		return (
			<CreateProductModalHOC>
				<WrappedComponent {...(props as P)} />
			</CreateProductModalHOC>
		)
	}

	return WithProviderComponent
}
