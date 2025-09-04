export interface Product {
  id: string
  name: string
  section: string
  price: number
  description: string
  image: string
  used: boolean
}

export interface Brand {
  id: string
  name: string
}

export interface CreateProductRequest {
  name: string
  section: string
  price: number
  description: string
  image: string
  used: boolean
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: string
}

