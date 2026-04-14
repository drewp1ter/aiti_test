import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'
import { type Product } from '@/entities/product/types'
import { isCancelled } from '@/shared/lib'
import * as api from '../api'
import { type API } from '../types'

export class ProductsStore {
	abortController: AbortController | null = null
	products: Product[] = []
	selectedProductIds: Set<ProductId> = new Set()
	pageSize: number = 5
	total: number = 0
	state: 'idle' | 'loading' | 'error' = 'idle'

	constructor() {
		makeAutoObservable(
			this,
			{
				abortController: false,
			},
			{ autoBind: true }
		)
	}

	async fetchProducts(params: API.Request.Products) {
		this.state = 'loading'
		if (this.abortController) {
			this.abortController.abort()
		}

		this.abortController = new AbortController()
		params.signal = this.abortController.signal
		params.limit = this.pageSize

		try {
			const res = await api.fetchProducts(params)
			this.abortController = null
			runInAction(() => {
				this.products = res.products
				this.total = res.total
				this.state = 'idle'
			})
		} catch (error) {
			this.abortController = null
			if (isCancelled(error)) return
			runInAction(() => {
				this.state = 'error'
			})
			if (error instanceof Error) {
				toast.error(`Failed to fetch products: ${error.message}`)
			}
		}
	}

	async searchProducts(query: string, page: number) {
		this.state = 'loading'
		if (this.abortController) {
			this.abortController.abort()
		}

		this.abortController = new AbortController()

		try {
			const res = await api.searchProducts({
			query,
			page,
			limit: this.pageSize,
			signal: this.abortController.signal,
		})
			this.abortController = null
			runInAction(() => {
				this.products = res.products
				this.total = res.total
				this.state = 'idle'
			})
		} catch (error) {
			this.abortController = null
			if (isCancelled(error)) return
			runInAction(() => {
				this.state = 'error'
			})
			if (error instanceof Error) {
				toast.error(`Failed to search products: ${error.message}`)
			}
		}
	}

	selectProduct(productId: ProductId) {
		console.log('Toggling selection for product ID:', productId)
		if (this.selectedProductIds.has(productId)) {
			this.selectedProductIds.delete(productId)
		} else {
			this.selectedProductIds.add(productId)
		}
	}

	isProductSelected(productId: ProductId): boolean {
		return this.selectedProductIds.has(productId)
	}

	selectAll() {
		this.products.forEach((product) => this.selectedProductIds.add(product.id))
	}

	deselectAll() {
		this.selectedProductIds.clear()
	}

	get allSelected(): boolean {
		return this.products.length > 0 && this.selectedProductIds.size === this.products.length
	}
}
