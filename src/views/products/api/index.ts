import { axiosInstance } from '@/shared/lib'
import { type DTO, type API } from '../types'

export async function fetchProducts({
	sortBy,
	order,
	page = 1,
	limit = 5,
}: API.Request.Products): Promise<DTO.Response.Products> {
	const skip = (page - 1) * limit
	const res = await axiosInstance.get<DTO.Response.Products>('/products', {
		params: {
			sortBy,
			order,
			skip,
			limit,
		},
	})

	return res.data
}

export async function searchProducts({
	query,
	page = 1,
	limit = 5,
}: API.Request.Search): Promise<DTO.Response.Products> {
	const skip = (page - 1) * limit
	const res = await axiosInstance.get<DTO.Response.Products>('/products/search', {
		params: {
			q: query,
			skip,
			limit,
		},
	})
	return res.data
}
