import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'
import { type Product } from '@/entities/product/types'
import { isCancelled } from '@/shared/lib'
import * as api from '../api'
import { type API } from '../types'

export class ProductsStore {
	abortController: AbortController | null = null
	products: Product[] = []
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

	async searchProducts(params: API.Request.Search) {
		this.state = 'loading'
		if (this.abortController) {
			this.abortController.abort()
		}

		this.abortController = new AbortController()
		params.signal = this.abortController.signal

		try {
			const res = await api.searchProducts(params)
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
}
