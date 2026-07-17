import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Gift, ShieldCheck, Loader2 } from 'lucide-react';
import { CartItem, Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartProps {
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function Cart({
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Calculates subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Free shipping threshold
  const freeShippingThreshold = 35;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.99;

  // Auto discount: 10% off for orders over $45
  const discountThreshold = 45;
  const discount = subtotal >= discountThreshold ? subtotal * 0.1 : 0;

  const total = subtotal - discount + shippingFee;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate transaction
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      onClearCart();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity cursor-pointer" 
      />

      {/* Cart Container Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-50 h-full border-l border-gray-100">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#fbf8ff]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0040df]" />
            <h3 className="font-display font-bold text-lg text-slate-800">
              Your Shopping Cart
            </h3>
            <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2.5 py-0.5 rounded-full">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
            aria-label="Close cart"
            id="close-cart-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Items list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence mode="wait">
            {checkoutComplete ? (
              /* Success Checkout Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
                key="checkout-success"
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-xs">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-xl text-slate-900">
                  Order Confirmed!
                </h4>
                <p className="font-sans text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
                  Thank you for prioritizing your wellness with <strong>Cloudy</strong>. Your order is being prepared and will ship swiftly from our Long Beach, California hub.
                </p>
                <button
                  onClick={() => {
                    setCheckoutComplete(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full primary-gradient-bg text-white text-xs font-bold hover:opacity-95 active:scale-95 transition-all shadow-md shadow-[#0040df]/20 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </motion.div>
            ) : cartItems.length === 0 ? (
              /* Empty Cart Screen */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 space-y-4"
                key="empty-cart"
              >
                <div className="w-16 h-16 bg-purple-50 text-purple-400 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="font-display font-bold text-gray-700">Your Cart is Empty</h4>
                <p className="text-xs text-gray-400 font-sans max-w-xs mx-auto leading-relaxed">
                  You do not have any premium botanical products in your cart yet. Settle into a smarter wellness ritual and support your rhythm today!
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-[#0040df] text-[#0040df] hover:bg-[#0040df]/3 text-xs font-bold transition-all cursor-pointer"
                >
                  Discover the Shop
                </button>
              </motion.div>
            ) : (
              /* Items List */
              <motion.div key="cart-list" className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-xs items-center"
                  >
                    {/* Item Image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F8F9FF] shrink-0 border border-gray-100">
                      <img
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        src={item.product.image}
                      />
                    </div>

                    {/* Details and quantity */}
                    <div className="flex-1 min-w-0 text-left">
                      <h5 className="font-display font-bold text-sm text-slate-800 truncate">
                        {item.product.name}
                      </h5>
                      <p className="text-[10px] text-gray-400 truncate uppercase tracking-wider">
                        {item.product.tagline}
                      </p>
                      
                      {/* Price tag */}
                      <span className="font-semibold text-slate-900 text-xs mt-1 block">
                        ${item.product.price} USD
                      </span>

                      {/* Quantity Editor */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="inline-flex items-center rounded-full bg-slate-50 border border-gray-100 p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 rounded-full text-gray-500 hover:text-gray-900 transition-colors hover:bg-white cursor-pointer"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 rounded-full text-gray-500 hover:text-gray-900 transition-colors hover:bg-white cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-red-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove item"
                          id={`remove-item-${item.product.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pricing Subtotals & Checkout when cart has items */}
        {!checkoutComplete && cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-[#fbf8ff] space-y-4">
            
            {/* Promo Alert box */}
            {subtotal < discountThreshold && (
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-[11px] text-[#0040df] flex items-center gap-2 font-sans">
                <Gift className="w-4 h-4 shrink-0 text-purple-500" />
                <span>Add <strong>${(discountThreshold - subtotal).toFixed(2)}</strong> more to claim your 10% discount!</span>
              </div>
            )}

            {/* Price lines */}
            <div className="space-y-2 text-sm text-gray-600 font-sans">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-purple-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5" />
                    10% Order Discount:
                  </span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Fast Shipping:</span>
                <span className="font-semibold text-slate-900">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE SHIPPING</span>
                  ) : (
                    `$${shippingFee}`
                  )}
                </span>
              </div>

              <div className="h-px bg-gray-200 my-2" />

              <div className="flex justify-between text-base font-bold text-slate-900">
                <span>Total:</span>
                <span className="text-lg text-[#0040df]">${total.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 px-6 rounded-full primary-gradient-bg text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-lg shadow-[#0040df]/20 cursor-pointer disabled:opacity-50"
              id="checkout-btn"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Securing Transaction...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Complete Instant Checkout</span>
                </>
              )}
            </button>

            <span className="text-[10px] text-gray-400 block text-center font-sans">
              Secure 256-bit SSL checkout powered by Stripe
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
