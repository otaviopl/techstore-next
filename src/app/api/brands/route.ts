import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Brand } from '@/types/product'

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'products.json')

// GET - Buscar todas as marcas
export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    const data = JSON.parse(fileContents)
    return NextResponse.json(data.brands as Brand[])
  } catch (error) {
    console.error('Erro ao ler marcas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

