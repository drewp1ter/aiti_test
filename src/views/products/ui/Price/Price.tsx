import styles from './Price.module.scss'

interface Props {
	price: number
}

export function Price({ price }: Props) {
	const priceParts = price.toFixed(2).split('.')
	const integerPart = priceParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
	const decimalPart = priceParts[1]

	return (
		<div className={styles.price}>
			{integerPart},<span>{decimalPart}</span>
		</div>
	)
}
