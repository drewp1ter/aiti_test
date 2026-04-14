'use client'

import { useEffect, useCallback } from 'react'
import cn from 'clsx'
import { Table, Button, Icon, Checkbox, Pagination } from '@/shared/ui'
import { observer } from 'mobx-react-lite'
import { Header } from '../Header'
import { useProductsStore } from '../../models'
import { useNumberUrlParam, useStringUrlParam } from '@/shared/lib'
import { SortBy, Order } from '../../types'
import { ProductCell } from '../ProductCell'
import { Price } from '../Price'
import { Rating } from '../Rating'
import styles from './ProductList.module.scss'

export const ProductList = observer(function ProductList() {
	const productsStore = useProductsStore()
	const [page, setPage] = useNumberUrlParam('page', 1)
	const [query, setQuery] = useStringUrlParam<string>('q', '')
	const [sortBy, setSortBy] = useStringUrlParam<SortBy>('sortBy', '')
	const [order, setOrder] = useStringUrlParam<Order>('order', 'asc')

	useEffect(() => {
		if (query) {
			productsStore.searchProducts(query, page)
			return
		}
		productsStore.fetchProducts({ page, sortBy, order })
	}, [page, query, sortBy, order])

	const handleHeadClick = (sortField: SortBy) => () => {
		if (query) return
		if (sortBy === sortField) {
			setOrder(order === 'asc' ? 'desc' : 'asc')
		} else {
			setSortBy(sortField)
			setOrder('asc')
		}
	}

	const handleSearch = useCallback(
		(newQuery: string) => {
			setQuery(newQuery)
			if (sortBy) {
				setSortBy('')
			}

			if (order !== 'asc') {
				setOrder('asc')
			}
		},
		[setQuery, order, sortBy]
	)

	return (
		<section className={styles.productList}>
			<Header className="w-full" initialSearchQuery={query} onSearch={handleSearch} />
			<div className={styles.content}>
				<div className="flex gap-2">
					<h2 className={styles.title}>Все позиции</h2>
					<Button className="ml-auto" variant="ghost" variantSize="42">
						<Icon.ArrowsClockwise />
					</Button>
					<Button variant="secondary" variantSize="42">
						<Button.Prefix>
							<Icon.PlusCircle />
						</Button.Prefix>
						Добавить
					</Button>
				</div>
				<div className="relative mt-10">
					{productsStore.state === 'loading' && (
						<div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70" />
					)}
					<Table>
						<Table.Header>
							<Table.Row>
								<Table.Head className="cursor-pointer">
									<div className="flex items-center gap-5">
										<Checkbox
											checked={productsStore.allSelected}
											onClick={productsStore.allSelected ? productsStore.deselectAll : productsStore.selectAll}
										/>
										<div onClick={handleHeadClick('title')}>Наименование</div>
										{sortBy === 'title' && <Icon.CaretLeft className={order === 'asc' ? 'rotate-90' : 'rotate-270'} />}
									</div>
								</Table.Head>
								<Table.Head className="cursor-pointer" onClick={handleHeadClick('brand')}>
									<div className="flex items-center justify-center gap-1">
										Вендор
										<Icon.CaretLeft
											className={cn({
												'rotate-90': order === 'asc',
												'rotate-270': order === 'desc',
												'opacity-0': sortBy !== 'brand',
											})}
										/>
									</div>
								</Table.Head>
								<Table.Head className="cursor-pointer" onClick={handleHeadClick('sku')}>
									<div className="flex items-center justify-center gap-1">
										Артикул
										<Icon.CaretLeft
											className={cn({
												'rotate-90': order === 'asc',
												'rotate-270': order === 'desc',
												'opacity-0': sortBy !== 'sku',
											})}
										/>
									</div>
								</Table.Head>
								<Table.Head className="cursor-pointer" onClick={handleHeadClick('rating')}>
									<div className="flex items-center justify-center gap-1">
										Оценка
										<Icon.CaretLeft
											className={cn({
												'rotate-90': order === 'asc',
												'rotate-270': order === 'desc',
												'opacity-0': sortBy !== 'rating',
											})}
										/>
									</div>
								</Table.Head>
								<Table.Head className="cursor-pointer" onClick={handleHeadClick('price')}>
									<div className="flex items-center justify-center gap-1">
										Цена, ₽
										<Icon.CaretLeft
											className={cn({
												'rotate-90': order === 'asc',
												'rotate-270': order === 'desc',
												'opacity-0': sortBy !== 'price',
											})}
										/>
									</div>
								</Table.Head>
								<Table.Head />
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{productsStore.products.map((product) => (
								<Table.Row key={product.id} isSelected={productsStore.isProductSelected(product.id)}>
									<Table.Cell onClick={() => productsStore.selectProduct(product.id)}>
										<ProductCell
											title={product.title}
											category={product.category}
											image={product.images[0]}
											checkbox={<Checkbox checked={productsStore.isProductSelected(product.id)} onChange={() => {}} />}
										/>
									</Table.Cell>
									<Table.Cell className={styles.vendorCell}>{product.brand}</Table.Cell>
									<Table.Cell>{product.sku}</Table.Cell>
									<Table.Cell>
										<Rating rating={product.rating} />
									</Table.Cell>
									<Table.Cell>
										<Price price={product.price} />
									</Table.Cell>
									<Table.Cell>
										<div className="flex justify-center gap-8">
											<Button variant="primary" variantSize="27" className="rounded-full">
												<Icon.Plus />
											</Button>
											<Icon.DotsThreeCircle />
										</div>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</div>
				<div className={styles.footer}>
					<div className={styles.pages}>
						Показано{' '}
						<span>
							{(page - 1) * productsStore.pageSize + 1}-{Math.min(page * productsStore.pageSize, productsStore.total)}
						</span>{' '}
						из <span>{productsStore.total}</span>
					</div>
					<Pagination>
						<Pagination.Content>
							<Pagination.Item>
								<Pagination.Previous />
							</Pagination.Item>
							{new Array(Math.ceil(Math.min(productsStore.total, 25) / productsStore.pageSize))
								// пагинация упрощена
								.fill(null)
								.map((_, index) => (
									<Pagination.Item key={index}>
										<Pagination.Link onClick={() => setPage(index + 1)} isActive={page === index + 1}>
											{index + 1}
										</Pagination.Link>
									</Pagination.Item>
								))}
							<Pagination.Item>
								<Pagination.Next />
							</Pagination.Item>
						</Pagination.Content>
					</Pagination>
				</div>
			</div>
		</section>
	)
})
