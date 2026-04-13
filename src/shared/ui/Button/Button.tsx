import React, { ComponentProps, PropsWithChildren } from 'react'
import cn from 'clsx'
import { Spinner } from '../Spinner'
import styles from './Button.module.scss'

interface Props extends ComponentProps<'button'> {
	variantSize?: '27' | '30' | '42' | '54'
	variant?: 'primary' | 'secondary' | 'ghost'
	loading?: boolean
}

interface PrefixProps extends PropsWithChildren {
	className?: string
}

interface SuffixProps extends PropsWithChildren {
	className?: string
}

export function ButtonRoot({
	variantSize = '42',
	variant = 'primary',
	loading = false,
	children,
	className,
	...rest
}: Props) {
	const prefixChild = React.Children.toArray(children).find(
		(child) => React.isValidElement(child) && child.type === InputPrefix
	)

	const suffixChild = React.Children.toArray(children).find(
		(child) => React.isValidElement(child) && child.type === InputSuffix
	)

	const childrenWithoutPrefixSuffix = React.Children.toArray(children).filter(
		(child) => !React.isValidElement(child) || (child.type !== InputPrefix && child.type !== InputSuffix)
	)

	return (
		<button className={cn(styles.button, className)} {...rest} data-variant-size={variantSize} data-variant={variant}>
			{loading ? (
				<Spinner />
			) : (
				<>
					{prefixChild}
					{childrenWithoutPrefixSuffix}
					{suffixChild}
				</>
			)}
		</button>
	)
}

function InputPrefix({ children, className }: PrefixProps) {
	return <div className={cn(styles.prefix, className)}>{children}</div>
}

function InputSuffix({ children, className }: SuffixProps) {
	return <div className={cn(styles.suffix, className)}>{children}</div>
}

export const Button = Object.assign(ButtonRoot, {
	Prefix: InputPrefix,
	Suffix: InputSuffix,
})
