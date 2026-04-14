'use client'

import { PropsWithChildren, useState, useCallback, cloneElement, isValidElement, useRef } from 'react'
import { CreateProductModal, CreateProduct } from '../CreateProductModal'

export function CreateProductModalHOC({ children }: PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(false)
	const onCreateCallbackRef = useRef<((product: CreateProduct) => void) | null>(null)

	const handleOpen = useCallback((callback: (product: CreateProduct) => void) => {
		onCreateCallbackRef.current = callback
		setIsOpen(true)
	}, [])

	const handleCancel = useCallback(() => {
		setIsOpen(false)
	}, [])

	const handleCreate = useCallback((product: CreateProduct) => {
		setIsOpen(false)
		onCreateCallbackRef.current?.(product)
	}, [])

	const childrenWithProps = isValidElement<Record<string, unknown>>(children)
		? cloneElement(children, {
				...(children.props as Record<string, unknown>),
				openCreateProductModal: handleOpen,
			})
		: children

	// упрощённая версия, можно использовать контекст для открытия модалки из любого места
	return (
		<>
			{childrenWithProps}
			<CreateProductModal isOpen={isOpen} onClose={handleCancel} onCreate={handleCreate} />
		</>
	)
}
