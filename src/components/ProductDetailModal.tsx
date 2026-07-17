import React, { useState } from 'react';
import { X, Star, ShoppingCart, Check, ListChecks, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-gray-100 flex flex-col md:flex-row max-h-[90vh]"
        id="product-detail-modal"
      >
        {/* Close Button on absolute position for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-500 hover:text-gray-800 shadow-sm md:hidden cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Image Display */}
        <div className="md:w-1/2 bg-[#F8F9FF] p-8 flex items-center justify-center relative min-h-[300px] md:min-h-full">
          <div className="absolute top-4 left-4">
            <span className="bg-purple-100 text-purple-700 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-purple-200">
              {product.category}
            </span>
          </div>

          <div className="aspect-square w-full max-w-[320px] rounded-2xl overflow-hidden shadow-md border border-white">
            <img
              alt={product.name}
              className="w-full h-full object-cover"
              src={product.image}
            />
          </div>
        </div>

        {/* Right Side: Product Details Column */}
        <div className="md:w-1/2 p-8 overflow-y-auto flex flex-col justify-between text-left">
          {/* Top header & Close button for desktop */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#0040df] uppercase tracking-widest">
                Premium Botanical Solution
              </span>
              <h3 className="font-display font-extrabold text-2xl text-slate-900 leading-tight">
                {product.name}
              </h3>
              <p className="text-xs text-gray-400 font-sans italic">{product.tagline}</p>
            </div>

            <button
              onClick={onClose}
              className="hidden md:block p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
              aria-label="Close modal"
              id="desktop-close-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Rating and price */}
          <div className="flex items-center gap-4 mt-4 py-2 border-y border-gray-100">
            <div className="flex items-center gap-1.5 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-slate-800 text-sm">{product.rating.toFixed(1)}</span>
              <span className="text-gray-400 text-xs font-sans">({product.reviewsCount} verified reviews)</span>
            </div>

            <div className="w-px h-4 bg-gray-200" />

            <div className="flex items-baseline gap-2">
              <span className="font-bold text-xl text-[#0040df]">${product.price} USD</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through font-sans">${product.originalPrice}</span>
              )}
            </div>
          </div>

          {/* Core Content scroll area */}
          <div className="my-5 space-y-5 flex-1">
            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                Therapeutic Profile
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Ingredients */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <ListChecks className="w-3.5 h-3.5 text-[#0040df]" />
                Clean Active Ingredients
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {product.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="bg-[#f3f2ff] text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits checks */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Clinical & Wellness Benefits
              </h4>
              <div className="grid grid-cols-1 gap-2 pt-1">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-2 items-start text-xs text-gray-600">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to use */}
            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Recommended Ritual Usage
              </h5>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                {product.usage}
              </p>
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="flex gap-4 pt-4 border-t border-gray-100">
            {/* Quantity select */}
            <div className="inline-flex items-center rounded-full bg-slate-50 border border-gray-200 p-1">
              <button
                onClick={handleDecrease}
                className="w-8 h-8 rounded-full text-gray-500 hover:text-gray-900 transition-colors hover:bg-white flex items-center justify-center cursor-pointer font-bold"
              >
                -
              </button>
              <span className="px-3 text-sm font-bold text-gray-800 min-w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="w-8 h-8 rounded-full text-gray-500 hover:text-gray-900 transition-colors hover:bg-white flex items-center justify-center cursor-pointer font-bold"
              >
                +
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                onAddToCart(product, quantity);
                onClose();
              }}
              className="flex-1 py-3 px-6 rounded-full primary-gradient-bg text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-md shadow-[#0040df]/20 cursor-pointer"
              id="add-to-cart-from-modal"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add {quantity} to Cart</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
