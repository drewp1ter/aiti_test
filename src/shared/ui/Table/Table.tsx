// 'use client'

import { cn } from '@/shared/lib'
import styles from './Table.module.scss'

function TableRoot({ className, ...props }: React.ComponentProps<'table'>) {
	return (
		<div className={cn('relative overflow-x-auto', className)}>
			<table className={styles.table} {...props} />
		</div>
	)
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
	return <thead className={cn(styles.header, className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
	return <tbody className={cn(styles.body, className)} {...props} />
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
	return (
		<tr
			className={cn(styles.row, className)}
			{...props}
		/>
	)
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
	return <th className={cn(styles.head, className)} {...props} />
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
	return (
		<td
      className={cn(styles.cell, className)}
			{...props}
		/>
	)
}

export const Table = Object.assign(TableRoot, {
	Header: TableHeader,
	Body: TableBody,
	Row: TableRow,
	Head: TableHead,
	Cell: TableCell,
})
