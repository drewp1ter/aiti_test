'use client'

import { useEffect } from 'react'
import { Table, Button, Icon, Checkbox, Pagination } from '@/shared/ui'
import { observer } from 'mobx-react-lite'
import { Header } from '../Header'
import { useProductsStore } from '../../models'
import { useNumberUrlParam, useStringUrlParam } from '@/shared/lib'
import { ProductCell } from '../ProductCell'
import styles from './ProductList.module.scss'

export const ProductList = observer(function ProductList() {
  const productsStore = useProductsStore()
	const [page, setPage] = useNumberUrlParam('page', 1)
	const [query, setQuery] = useStringUrlParam<string>('q', '')

	useEffect(() => {
		if (query) {
			productsStore.searchProducts({ page, query })
			return
		}
		productsStore.fetchProducts({ page })
	}, [page, query])

	return (
		<section className={styles.productList}>
			<Header className="w-full" initialSearchQuery={query} onSearch={setQuery} />
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
				<Table className="mt-10">
					<Table.Header>
						<Table.Row>
							<Table.Head>
								<div className="flex gap-5">
									<Checkbox />
									Наименование
								</div>
							</Table.Head>
							<Table.Head>Вендор</Table.Head>
							<Table.Head>Артикул</Table.Head>
							<Table.Head>Оценка</Table.Head>
							<Table.Head>Цена, ₽</Table.Head>
							<Table.Head />
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{productsStore.products.map(product => (
							<Table.Row key={product.id}>
								<Table.Cell>
									<ProductCell title={product.title} category={product.category} image={product.images[0]} />
								</Table.Cell>
								<Table.Cell className={styles.vendorCell}>{product.brand}</Table.Cell>
								<Table.Cell>{product.sku}</Table.Cell>
								<Table.Cell>{product.rating.toFixed(2)}</Table.Cell>
								<Table.Cell className={styles.price}>{product.price.toLocaleString('ru-RU')}</Table.Cell>
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
				<div className={styles.footer}>
					<div className={styles.pages}>
						Показано <span>1-20</span> из <span>120</span>
					</div>
					<Pagination>
						<Pagination.Content>
							<Pagination.Item>
								<Pagination.Previous />
							</Pagination.Item>
							<Pagination.Item>
								<Pagination.Link onClick={() => setPage(1)} isActive={page === 1}>1</Pagination.Link>
							</Pagination.Item>
							<Pagination.Item>
								<Pagination.Link onClick={() => setPage(2)} isActive={page === 2}>2</Pagination.Link>
							</Pagination.Item>
							<Pagination.Item>
								<Pagination.Link onClick={() => setPage(3)} isActive={page === 3}>3</Pagination.Link>
							</Pagination.Item>
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
