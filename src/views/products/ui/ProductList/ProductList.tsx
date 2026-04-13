'use client'

import { Table, Button, Icon, Checkbox, Pagination } from '@/shared/ui'
import { Header } from '../Header'
import { ProductCell } from '../ProductCell'
import styles from './ProductList.module.scss'

export function ProductList() {
	return (
		<section className={styles.productList}>
			<Header className="w-full" />
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
						<Table.Row>
							<Table.Cell>
								<ProductCell title="USB Флэшкарта 16GB" category="Аксессуары" />
							</Table.Cell>
							<Table.Cell className={styles.vendorCell}>Samsung</Table.Cell>
							<Table.Cell>RCH45Q1A</Table.Cell>
							<Table.Cell>4.3/5</Table.Cell>
							<Table.Cell className={styles.price}>48 652,00</Table.Cell>
							<Table.Cell>
								<div className="flex justify-center gap-8">
									<Button variant="primary" variantSize="27" className="rounded-full">
										<Icon.Plus />
									</Button>
									<Icon.DotsThreeCircle />
								</div>
							</Table.Cell>
						</Table.Row>
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
								<Pagination.Link>1</Pagination.Link>
							</Pagination.Item>
							<Pagination.Item>
								<Pagination.Link isActive>
									2
								</Pagination.Link>
							</Pagination.Item>
							<Pagination.Item>
								<Pagination.Link>3</Pagination.Link>
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
}
