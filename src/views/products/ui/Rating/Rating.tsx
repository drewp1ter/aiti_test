interface Props {
	rating: number
}

const LOW_RATING_THRESHOLD = 3.5

export function Rating({ rating }: Props) {
	const isLow = rating < LOW_RATING_THRESHOLD
	return (
		<>
			<span className={isLow ? 'text-[#F11010]' : ''}>{rating.toFixed(1)}</span>/5
		</>
	)
}
