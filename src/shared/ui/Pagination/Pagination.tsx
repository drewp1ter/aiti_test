import * as React from 'react'
import { Icon } from '../Icon'
import { cn } from '@/shared/lib/'
import styles from './Pagination.module.scss'

function PaginationRoot({ className, ...props }: React.ComponentProps<'nav'>) {
	return <nav role="navigation" aria-label="pagination" className={cn('flex justify-center', className)} {...props} />
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
	return <ul className={cn('flex items-center gap-2', className)} {...props} />
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
	return <li {...props} />
}

type PaginationLinkProps = {
	isActive?: boolean
} & React.ComponentProps<'button'>

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
	return <button className={cn(styles.button, className)} data-active={isActive} {...props} />
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div className={cn(styles.arrow, 'me-2.5', className)} {...props}>
			<Icon.CaretLeft />
		</div>
	)
}

function PaginationNext({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div className={cn(styles.arrow, 'ms-2.5', className)} {...props}>
			<Icon.CaretRight />
		</div>
	)
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn("flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4", className)}
			{...props}
		>
			<span className="sr-only">More pages</span>
		</span>
	)
}

export const Pagination = Object.assign(PaginationRoot, {
	Content: PaginationContent,
	Item: PaginationItem,
	Link: PaginationLink,
	Previous: PaginationPrevious,
	Next: PaginationNext,
	Ellipsis: PaginationEllipsis,
})
