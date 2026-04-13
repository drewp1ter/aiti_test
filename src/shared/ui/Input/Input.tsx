import React, { ComponentProps, PropsWithChildren } from 'react'
import cn from 'clsx'
import styles from './Input.module.scss'

interface Props extends ComponentProps<'input'> {
	variantSize?: '48' | '55'
	variant?: 'primary' | 'secondary'
}

interface PrefixProps extends PropsWithChildren {
	className?: string
}

interface SuffixProps extends PropsWithChildren {
	className?: string
}

function InputRoot({ variantSize = '48', variant = 'primary', className, children, ...inputProps }: Props) {
	const prefixChild = React.Children.toArray(children).find(
		(child) => React.isValidElement(child) && child.type === InputPrefix
	)

	const suffixChild = React.Children.toArray(children).find(
		(child) => React.isValidElement(child) && child.type === InputSuffix
	)

	return (
		<div className={cn(styles.wrapper, className)} data-variant-size={variantSize} data-variant={variant}>
			{prefixChild}
			<input name={inputProps.name || 'input'} className={cn(styles.input)} {...inputProps} />
			{suffixChild}
		</div>
	)
}

function InputPrefix({ children, className }: PrefixProps) {
	return <div className={cn(styles.prefix, className)}>{children}</div>
}

function InputSuffix({ children, className }: SuffixProps) {
	return <div className={cn(styles.suffix, className)}>{children}</div>
}

export const Input = Object.assign(InputRoot, {
	Prefix: InputPrefix,
	Suffix: InputSuffix,
})
