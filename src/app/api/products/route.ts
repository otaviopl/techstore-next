import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Product, CreateProductRequest } from '@/types/product'

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'products.json')

// GET - Buscar todos os produtos
export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    const data = JSON.parse(fileContents)
    return NextResponse.json(data.products)
  } catch (error) {
    console.error('Erro ao ler produtos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar novo produto
export async function POST(request: NextRequest) {
  try {
    const body: CreateProductRequest = await request.json()
    
    // Validação básica
    if (!body.name || !body.section || !body.price || !body.description || !body.image || !body.brand) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    const data = JSON.parse(fileContents)
    
    // Gerar novo ID
    const newId = (Math.max(...data.products.map((p: Product) => parseInt(p.id))) + 1).toString()
    
    const newProduct: Product = {
      id: newId,
      ...body
    }
    
    data.products.push(newProduct)
    
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
    
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

