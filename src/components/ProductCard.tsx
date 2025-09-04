'use client'

import { Product, Brand } from '@/types/product'
import { Edit, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
interface ProductCardProps {
  product: Product
  brands: Brand[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export default function ProductCard({ product, brands,onEdit, onDelete }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-48 bg-gray-200 relative">
        <img
          src={brands.find(brand => brand.name === product.brand)?.image || product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Sem+Imagem'
          }}
        />
        
        {/* Botões de ação nos cantos */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          <motion.button
            onClick={() => onEdit(product)}
            className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-full shadow-md transition-colors duration-200"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            title="Editar produto"
          >
            <Edit size={16} />
          </motion.button>
          
          <motion.button
            onClick={() => onDelete(product.id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full shadow-md transition-colors duration-200"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            title="Excluir produto"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex flex-col gap-1">
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
              {product.section}
            </span>
            {product.used && (
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                Usado
              </span>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-center items-center mb-3">
          <span className="text-2xl font-bold text-orange-600">
            {formatPrice(product.price)}
          </span>
        </div>
        
      </div>
    </motion.div>
  )
}

