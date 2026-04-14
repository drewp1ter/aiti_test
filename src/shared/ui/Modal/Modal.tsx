'use client'

import { cn } from '../../lib'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { createContext, PropsWithChildren, useCallback, useContext, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useOnEscKeyPressed } from '../../lib'

interface ModalOptions {
	isOpen: boolean
	onClose?: () => void
	className?: string
}

type ContextType = {
	onClose?: () => void
} | null

const ModalContext = createContext<ContextType>(null)

const useModalContext = () => {
	const context = useContext(ModalContext)

	if (context == null) {
		throw new Error('Modal components must be wrapped in <Modal />')
	}

	return context
}

export function Modal({ children, isOpen, onClose, className }: PropsWithChildren<ModalOptions>) {
	const handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (e.target === e.currentTarget) {
			onClose?.()
		}
	}

	const handleEscKeyPressed = useCallback(
		(e: KeyboardEvent) => {
			if (isOpen) {
				e.stopPropagation()
				onClose?.()
			}
		},
		[isOpen, onClose]
	)

	useOnEscKeyPressed(handleEscKeyPressed)

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		}

		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	return createPortal(
		<>
			<div className="fixed inset-0 z-20 bg-[#000000] opacity-70" onClick={handleOverlayClick} />
			<div
				className={cn(
					'rounded-2xl fixed top-1/2 left-1/2 z-30 flex max-w-[90vw] min-w-80 -translate-x-1/2 -translate-y-1/2 transform flex-col overflow-hidden bg-white shadow-2xl',
					className
				)}
			>
				<ModalContext.Provider value={{ onClose }}>{children}</ModalContext.Provider>
			</div>
		</>,
		document.body
	)
}

Modal.Header = function ModalHeader({ children, className, ...props }: React.HTMLProps<HTMLDivElement>) {
	const { onClose } = useModalContext()

	const handleClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		e.stopPropagation()
		onClose?.()
	}

	return (
		<div className={cn('shrink-0 px-6 pt-8 pb-2', className)} {...props}>
			{children}
			{onClose && (
				<Button className="absolute top-0 right-0 cursor-pointer" variant="ghost" onClick={handleClose}>
					<Icon.Close />
				</Button>
			)}
		</div>
	)
}

Modal.Body = function ModalBody({ children, className, ...props }: React.HTMLProps<HTMLDivElement> ) {
	return (
		<div className={cn('px-6', className)} {...props}>
			{children}
		</div>
	)
}

Modal.Footer = function ModalFooter({ children, className, ...props }: React.HTMLProps<HTMLDivElement> ) {
	return (
		<div className={cn('shrink-0 px-6 pt-2 pb-6', className)} {...props}>
			{children}
		</div>
	)
}
