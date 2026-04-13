import cn from 'clsx'
import { PropsWithChildren } from 'react'
import styles from './Label.module.scss'

interface Props extends PropsWithChildren {
	className?: string
	title?: string
	variant?: 'primary' | 'secondary'
}

function LabelTop({ className, children, title, variant = 'primary' }: Props) {
	return (
		<label className={cn(styles.wrapper, className)} data-variant={variant}>
			{title}
			{children}
		</label>
	)
}

function LabelRight({ className, children, title, variant = 'primary' }: Props) {
	return (
		<label className={cn(styles.wrapper, styles.right, className)} data-variant={variant}>
			{children}
			{title}
		</label>
	)
}

export const Label = {
	Top: LabelTop,
	Right: LabelRight,
}
