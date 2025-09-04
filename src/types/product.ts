export interface Product {
  id: string
  name: string
  section: string
  price: number
  description: string
  image: string
  used: boolean
  brand: string
}

export interface Brand {
  id: string
  name: string
  image: string
}

export interface CreateProductRequest {
  name: string
  section: string
  price: number
  description: string
  image: string
  used: boolean
  brand: string
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: string
}

