'use client'

import { useState, useEffect } from 'react'
import { Product, CreateProductRequest, Brand } from '@/types/product'
import ProductCard from './ProductCard'
import ProductForm from './ProductForm'

interface ProductListProps {
  products: Product[]
  onProductUpdate: (id: string | null, productData: CreateProductRequest) => Promise<void>
  onProductDelete: (id: string) => Promise<void>
}

export default function ProductList({ products, onProductUpdate, onProductDelete }: ProductListProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined)
  const [filterSection, setFilterSection] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterUsed, setFilterUsed] = useState('')
  const [brands, setBrands] = useState<Brand[]>([])

  // Carregar marcas na inicialização
  useEffect(() => {
    loadBrands()
  }, [])

  const loadBrands = async () => {
    try {
      const response = await fetch('/api/brands')
      if (response.ok) {
        const data = await response.json()
        setBrands(data)
      }
    } catch (error) {
      console.error('Erro ao carregar marcas:', error)
    }
  }

  // Obter seções únicas dos produtos
  const sections = [...new Set(products.map(product => product.section))]

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesSection = !filterSection || product.section === filterSection
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUsed = filterUsed === '' || 
      (filterUsed === 'used' && product.used) ||
      (filterUsed === 'new' && !product.used)
    
    return matchesSection && matchesSearch && matchesUsed
  })

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = async (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      await onProductDelete(productId)
    }
  }

  const handleFormSubmit = async (productData: CreateProductRequest) => {
    await onProductUpdate(editingProduct?.id || null, productData)
    setShowForm(false)
    setEditingProduct(undefined)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingProduct(undefined)
  }

  return (
    <div className="space-y-6">
      {/* Filtros e Busca */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div className="md:w-48">
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Todas as seções</option>
              {sections.map(section => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:w-40">
            <select
              value={filterUsed}
              onChange={(e) => setFilterUsed(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="new">Novos</option>
              <option value="used">Usados</option>
            </select>
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-200 font-medium whitespace-nowrap"
          >
            + Novo Produto
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>Total de produtos: <strong>{products.length}</strong></span>
          <span>Produtos filtrados: <strong>{filteredProducts.length}</strong></span>
          {filterSection && (
            <span>Seção: <strong>{filterSection}</strong></span>
          )}
          {filterUsed && (
            <span>Status: <strong>{filterUsed === 'used' ? 'Usados' : 'Novos'}</strong></span>
          )}
        </div>
      </div>

      {/* Lista de Produtos */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-500">
            {searchTerm || filterSection 
              ? 'Tente ajustar os filtros de busca'
              : 'Adicione seu primeiro produto clicando em "Novo Produto"'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              brands={brands}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal do Formulário */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isEditing={!!editingProduct}
        />
      )}
    </div>
  )
}

