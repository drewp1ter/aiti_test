'use client'

import { ComponentProps } from 'react'
import cn from 'clsx'
import styles from './Checkbox.module.scss'

export function Checkbox ({ className, onClick, ...props }: ComponentProps<'input'>) {
	return (
		<>
			<input type="checkbox" className={styles.checkboxInput} onChange={() => {}} {...props} />
			<div className={cn(styles.checkboxCustom, className)} onClick={onClick}></div>
		</>
	)
}
