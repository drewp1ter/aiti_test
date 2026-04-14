import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'
import { type Product } from '@/entities/product/types'
import * as api from '../api'
import { type API } from '../types'

export class ProductsStore {
	products: Product[] = []
	total: number = 0
  state: 'idle' | 'loading' | 'error' = 'idle'

	constructor() {
		makeAutoObservable(this, undefined, { autoBind: true })
	}

	async fetchProducts(params: API.Request.Products) {
		this.state = 'loading'
		try {
			const res = await api.fetchProducts(params)
			runInAction(() => {
				this.products = res.products
				this.total = res.total
				this.state = 'idle'
			})
		} catch (error) {
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
		try {
			const res = await api.searchProducts(params)
			runInAction(() => {
				this.products = res.products
				this.total = res.total
				this.state = 'idle'
			})
		} catch (error) {
			runInAction(() => {
				this.state = 'error'
			})
			if (error instanceof Error) {
				toast.error(`Failed to search products: ${error.message}`)
			}
		}
	}
}
