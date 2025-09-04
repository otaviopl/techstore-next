'use client'

import { useState, useEffect } from 'react'
import { Product, CreateProductRequest } from '@/types/product'
import ProductList from '@/components/ProductList'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carregar produtos na inicialização
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/products')
      if (!response.ok) {
        throw new Error('Erro ao carregar produtos')
      }
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError('Erro ao carregar produtos. Verifique se o servidor está funcionando.')
      console.error('Erro ao carregar produtos:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleProductUpdate = async (id: string | null, productData: CreateProductRequest) => {
    try {
      if (id) {
        // Atualizar produto existente
        const response = await fetch(`/api/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        })
        
        if (!response.ok) {
          throw new Error('Erro ao atualizar produto')
        }
        
        const updatedProduct = await response.json()
        setProducts(prev => prev.map(product => 
          product.id === id ? updatedProduct : product
        ))
        
        alert('Produto atualizado com sucesso!')
      } else {
        // Criar novo produto
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        })
        
        if (!response.ok) {
          throw new Error('Erro ao criar produto')
        }
        
        const newProduct = await response.json()
        setProducts(prev => [...prev, newProduct])
        
        alert('Produto cadastrado com sucesso!')
      }
    } catch (err) {
      console.error('Erro ao salvar produto:', err)
      alert('Erro ao salvar produto. Tente novamente.')
    }
  }

  const handleProductDelete = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Erro ao excluir produto')
      }
      
      setProducts(prev => prev.filter(product => product.id !== productId))
      alert('Produto excluído com sucesso!')
    } catch (err) {
      console.error('Erro ao excluir produto:', err)
      alert('Erro ao excluir produto. Tente novamente.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Erro de Conexão</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadProducts}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors duration-200"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🛒 TechStore
              </h1>
              <p className="text-gray-600 mt-1">
                Loja de Informática - Gerenciamento de Produtos
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Total de produtos
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {products.length}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList
          products={products}
          onProductUpdate={handleProductUpdate}
          onProductDelete={handleProductDelete}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500">
            <p>© 2024 TechStore - Desenvolvido com Next.js e Tailwind CSS</p>
            <p className="text-sm mt-1">
              Projeto com BFF (Backend for Frontend) usando API Routes
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}