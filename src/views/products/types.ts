import { Product } from '@/entities/product/types'

export namespace API {
  export namespace Request {
    export interface Products {
      sortBy?: 'title' | 'category' | 'rating' | 'price' | 'sku' | 'brand'
      order?: 'asc' | 'desc'
      page?: number
      limit?: number
    }

    export interface Search {
      query: string
      page?: number
      limit?: number
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