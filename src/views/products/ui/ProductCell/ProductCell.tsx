'use client'

import { Checkbox } from '@/shared/ui'
import Image from 'next/image'
import { cn } from '@/shared/lib'
import styles from './ProductCell.module.scss'

interface Props {
	title: string
	category: string
	className?: string
	image: string
}

export function ProductCell({ title, category, className, image }: Props) {
	return (
		<div className={cn(styles.productCell, className)}>
			<Checkbox />
			<Image
        className={styles.image}
				width={48}
				height={48}
				alt=''
				src={image}
			/>
			<div className="flex flex-col justify-center gap-1">
				<div className="text-base font-semibold text-[#222]">{title}</div>
				<div className="text-sm text-[#B2B3B9]">{category}</div>
			</div>
		</div>
	)
}
