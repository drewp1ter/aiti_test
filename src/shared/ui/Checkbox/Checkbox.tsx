'use client'

import { ComponentProps } from 'react'
import cn from 'clsx'
import styles from './Checkbox.module.scss'

export function Checkbox ({ className, ...props }: ComponentProps<'input'>) {
	return (
		<>
			<input type="checkbox" className={styles.checkboxInput} {...props} />
			<div className={cn(styles.checkboxCustom, className)}></div>
		</>
	)
}
