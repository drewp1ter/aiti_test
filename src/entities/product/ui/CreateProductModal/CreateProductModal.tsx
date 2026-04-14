'use client'

import { Modal, Button, Input, Label } from '@/shared/ui'
import { Product } from '../../types'

export type CreateProduct = Pick<Product, 'id' | 'title' | 'price' | 'brand' | 'sku'>

interface CreateProductModalProps {
	isOpen: boolean
	onClose?: () => void
	onCreate?: (product: CreateProduct) => void
}

export function CreateProductModal({ isOpen, onClose, onCreate }: CreateProductModalProps) {
	const handleCreate = () => {
		onCreate?.({
			id: 1,
			title: 'Новый продукт',
			price: 0,
			brand: 'Неизвестно',
			sku: 'N/A',
		})
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} className="min-w-2xl">
			<Modal.Header>
				<h2 className="text-lg font-semibold">Добавить продукт</h2>
			</Modal.Header>

			<Modal.Body className="flex flex-col gap-2 py-4">
				<Label.Top title="Наименование">
					<Input />
				</Label.Top>
				<Label.Top title="Цена">
					<Input />
				</Label.Top>
				<Label.Top title="Вендор">
					<Input />
				</Label.Top>
				<Label.Top title="Артикул">
					<Input />
				</Label.Top>
			</Modal.Body>

			<Modal.Footer>
				<div className="flex justify-end gap-2">
					<Button variant="ghost" variantSize="42" onClick={onClose}>
						Отмена
					</Button>

					<Button variant="primary" onClick={handleCreate}>
						Создать
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	)
}
