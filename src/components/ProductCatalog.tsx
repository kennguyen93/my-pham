import React, { useState } from 'react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart as CartIcon, Star as StarIcon, Eye as EyeIcon } from 'lucide-react';

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
}

type FilterCategory = 'all' | 'sleep' | 'calm' | 'accessories';

export default function ProductCatalog({
  onAddToCart,
  onOpenProductDetail,
}: ProductCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeFilter === 'all') return true;
    return product.category === activeFilter;
  });

  const categoriesList: { value: FilterCategory; label: string }[] = [
    { value: 'all', label: 'All Products' },
    { value: 'sleep', label: 'Sleep Series' },
    { value: 'calm', label: 'Calm Series' },
    { value: 'accessories', label: 'Accessories' },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#fbf8ff] to-white" id="product-catalog-section">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-[#0040df] uppercase tracking-widest bg-[#0040df]/8 px-3.5 py-1.5 rounded-full inline-block">
            THE CLOUDY BOTANICAL SHOP
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-950">
            Elevate Your Self-Care Rituals
          </h2>
          <p className="font-sans text-gray-500 text-sm md:text-base leading-relaxed">
            Expertly crafted plant-powered solutions designed to restore natural sleep cycles, reduce tension, and bring mindful clarity back to your days.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categoriesList.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer transition-all border ${
                activeFilter === cat.value
                  ? 'bg-[#0040df] text-white border-[#0040df] shadow-md shadow-[#0040df]/15'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#0040df] hover:text-[#0040df]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl border border-gray-100 p-4 hover:border-purple-200 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between text-left relative"
              >
                {/* Discount Badge if originalPrice exists */}
                {product.originalPrice && (
                  <div className="absolute top-6 left-6 z-10 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                    SALE
                  </div>
                )}

                {/* Product Image Frame */}
                <div 
                  onClick={() => onOpenProductDetail(product)}
                  className="aspect-square w-full rounded-2xl overflow-hidden bg-[#F8F9FF] border border-gray-50 flex items-center justify-center relative cursor-pointer"
                >
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={product.image}
                  />
                  {/* Hover visual prompt */}
                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/95 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                      <EyeIcon className="w-3.5 h-3.5" /> Quick View
                    </span>
                  </div>
                </div>

                {/* Card Info Details */}
                <div className="space-y-2 mt-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-[#7b24dc] uppercase tracking-wider block">
                      {product.category.toUpperCase()}
                    </span>
                    <h4 
                      onClick={() => onOpenProductDetail(product)}
                      className="font-display font-bold text-[#0F172A] text-base group-hover:text-[#0040df] transition-colors leading-snug cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-400 font-sans italic line-clamp-1">{product.tagline}</p>
                  </div>

                  {/* Ratings */}
                  <div className="flex items-center gap-1 text-yellow-400">
                    <StarIcon className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-slate-800 text-xs">{product.rating.toFixed(1)}</span>
                    <span className="text-gray-400 text-[10px] font-sans">({product.reviewsCount})</span>
                  </div>

                  {/* Price and Add button bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-[#0040df] text-base">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through font-sans">${product.originalPrice}</span>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-2 rounded-full primary-gradient-bg text-white hover:opacity-95 active:scale-90 transition-all shadow-md shadow-[#0040df]/15 cursor-pointer"
                      title="Add to Cart"
                      id={`add-to-cart-quick-${product.id}`}
                    >
                      <CartIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
