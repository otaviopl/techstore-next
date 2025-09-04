'use client'

import { useState, useEffect } from 'react'
import { Product, CreateProductRequest } from '@/types/product'

interface ProductFormProps {
  product?: Product
  onSubmit: (productData: CreateProductRequest) => void
  onCancel: () => void
  isEditing?: boolean
}

export default function ProductForm({ product, onSubmit, onCancel, isEditing = false }: ProductFormProps) {
  const [formData, setFormData] = useState<CreateProductRequest>({
    name: '',
    section: '',
    price: 0,
    description: '',
    image: '',
    used: false,
  })

  const sections = [
    'computadores',
    'acessorios',
    'impressoras',
    'games',
    'gadgets',
  ]

  useEffect(() => {
    if (isEditing && product) {
      setFormData({
        name: product.name || '',
        section: product.section || '',
        price: product.price || 0,
        description: product.description || '',
        image: product.image || '',
        used: product.used || false,
      })
    }
  }, [product, isEditing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto border-2 border-orange-500">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">
            {isEditing ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Produto
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Digite o nome do produto"
              />
            </div>

            <div>
              <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
                Seção
              </label>
              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Selecione uma seção</option>
                {sections.map(section => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Preço (R$)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Descreva o produto"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                URL da Imagem
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="used"
                name="used"
                checked={formData.used}
                onChange={handleChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="used" className="ml-2 block text-sm text-gray-700">
                Produto usado
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium"
              >
                {isEditing ? 'Atualizar' : 'Cadastrar'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

