import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Product, UpdateProductRequest } from '@/types/product'

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'products.json')

// GET - Buscar produto por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    const data = JSON.parse(fileContents)
    
    const product = data.products.find((p: Product) => p.id === id)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(product)
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar produto
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: UpdateProductRequest = await request.json()
    
    // Validação básica
    if (!body.name || !body.section || !body.price || !body.description || !body.brand) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    const data = JSON.parse(fileContents)
    
    const productIndex = data.products.findIndex((p: Product) => p.id === id)
    
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }
    
    const updatedProduct: Product = {
      ...body,
      id: id
    }
    
    data.products[productIndex] = updatedProduct
    
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
    
    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar produto
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    const data = JSON.parse(fileContents)
    
    const productIndex = data.products.findIndex((p: Product) => p.id === id)
    
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }
    
    const deletedProduct = data.products[productIndex]
    data.products.splice(productIndex, 1)
    
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
    
    return NextResponse.json(deletedProduct)
  } catch (error) {
    console.error('Erro ao deletar produto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

