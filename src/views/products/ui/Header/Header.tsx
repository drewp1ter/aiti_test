'use client'

import { useCallback, useState } from 'react'
import { Input, Icon } from '@/shared/ui'
import cn from 'clsx'
import { debounce } from 'throttle-debounce'
import styles from './Header.module.scss'

interface Props {
	className?: string
	onSearch?: (query: string) => void
  initialSearchQuery?: string
}

export function Header({ className, initialSearchQuery = '', onSearch }: Props) {
	const [query, setQuery] = useState(initialSearchQuery)

	const handleDebouncedChange = useCallback(
		// eslint-disable-next-line react-hooks/use-memo
		debounce(1000, (value: string) => {
			onSearch?.(value)
		}),
		[onSearch]
	)

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setQuery(e.target.value)
		handleDebouncedChange(e.target.value)
	}

	return (
		<div className={cn(styles.header, className)}>
			<h1 className={styles.title}>Товары</h1>
			<Input
				value={query}
				onChange={handleChange}
				className="w-5xl"
				variant="secondary"
				variantSize="48"
				placeholder="Найти"
			>
				<Input.Prefix>
					<Icon.Search />
				</Input.Prefix>
			</Input>
		</div>
	)
}
