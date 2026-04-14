import { Product } from '@/entities/product/types'

export type SortBy = 'title' | 'category' | 'rating' | 'price' | 'sku' | 'brand' | ''
export type Order = 'asc' | 'desc'

export namespace API {
  export namespace Request {
    export interface Products {
      sortBy?: SortBy
      order?: Order
      page?: number
      limit?: number
      signal?: AbortSignal
    }

    export interface Search {
      query: string
      page?: number
      limit?: number
      signal?: AbortSignal
    }
  }
}

export namespace DTO {
  export namespace Response {
    export type Products = {
      limit: number
      products: Product[]
      skip: number
      total: number
    }
  }
}