import { CreateProduct } from "./ui/CreateProductModal"

interface Dimensions {
	width: number
	height: number
	depth: number
}

interface Review {
	rating: number
	comment: string
	date: string
	reviewerName: string
	reviewerEmail: string
}

interface Meta {
	createdAt: string
	updatedAt: string
	barcode: string
	qrCode: string
}

export interface Product {
	id: ProductId
	title: string
	description: string
	category: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	tags: string[]
	brand: string
	sku: string
	weight: number
	dimensions: Dimensions
	warrantyInformation: string
	shippingInformation: string
	availabilityStatus: string
	reviews: Review[]
	returnPolicy: string
	minimumOrderQuantity: number
	meta: Meta
	thumbnail: string
	images: string[]
}

export interface WithCreateProductModal {
	openCreateProductModal: (callback: (product: CreateProduct) => void) => void
}