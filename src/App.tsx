import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Aesthetics from './components/Aesthetics';
import Quiz from './components/Quiz';
import Breathing from './components/Breathing';
import Cart from './components/Cart';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import ProductCatalog from './components/ProductCatalog';
import { Product, CartItem } from './types';
import { Bell, Check, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation & Screen tab states
  const [currentTab, setCurrentTab] = useState<string>('home'); // 'home' | 'products'

  // Redirect countdown state
  const [redirectCountdown, setRedirectCountdown] = useState<number>(5);

  // Shopping Cart state with LocalStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cloudy_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal display states
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  // Status message/Notification toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart state with LocalStorage
  useEffect(() => {
    localStorage.setItem('cloudy_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 5-second redirect timer to TryCloudy Ken Nguyen
  useEffect(() => {
    const interval = setInterval(() => {
      setRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = 'https://trycloudy.com/ken-nguyen';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show a quick visual notification toast
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Add a product to the cart
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
    triggerToast(`Added ${quantity} x ${product.name} to cart!`);
  };

  // Update quantity in cart
  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveCartItem = (productId: string) => {
    const matched = cartItems.find((item) => item.product.id === productId);
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    if (matched) {
      triggerToast(`Removed ${matched.product.name} from cart.`);
    }
  };

  // Clear cart on successful transaction
  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fbf8ff] flex flex-col font-sans antialiased text-[#191b24] pt-20 overflow-x-hidden">
      
      {/* Top sticky Navigation Bar */}
      <Navbar
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenBreathing={() => setIsBreathingOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartItemsCount={totalCartCount}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {/* Floating Status Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-xl border border-white/10 text-xs font-semibold font-sans tracking-wide"
            id="toast-notification"
          >
            <Bell className="w-4 h-4 text-[#7b24dc] animate-bounce" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Routing switch */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentTab === 'home' ? (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section */}
              <Hero onExploreProducts={() => setCurrentTab('products')} />

              {/* Bento Brand Journey */}
              <Journey />

              {/* Aesthetics of Wellness carousel */}
              <Aesthetics
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onOpenProductDetail={(p) => setSelectedProductDetail(p)}
              />

              {/* More Than Just Products (NAMI Support Banner) */}
              <section className="py-16 md:py-24 bg-gradient-to-b from-[#fbf8ff] to-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="glass-card p-10 md:p-16 rounded-[48px] border-purple-100 max-w-5xl mx-auto space-y-8 shadow-xs"
                    id="nami-card"
                  >
                    {/* Centered Cloudy Logo */}
                    <div className="flex justify-center items-center gap-2">
                      <img
                        alt="Cloudy Icon Logo"
                        className="h-14 object-contain animate-bounce-slow"
                        src="https://lh3.googleusercontent.com/aida/AP1WRLtudLwFfhmzpK4WuStOKetIsyx-zD8-K0YOwIOxFlI5beKH0aEs0Zsw54SjJ_OyJ1vi-vKEOQkrFo7y7HwoL6Qn3MxvVPBBWwE0LpB7Dxv3OwpD9g7iOgPLGK6chm5ukksvAUsM8a1Ge3WHDaGvdA39zHwLOCk_OjLdjeEztKmPutaOR5OF_oRIrzm_tiIXtkg0rLSO_tpEWV0FUFL0-zQ7e6_74s7biinkKwnJABiJOm-LmIXqXlAJB5A"
                      />
                      <span className="font-display font-extrabold text-3xl bg-gradient-to-r from-[#0040df] to-[#7b24dc] bg-clip-text text-transparent">
                        cloudy
                      </span>
                    </div>

                    <h2 className="font-display font-extrabold text-2xl md:text-3.5xl text-slate-900 tracking-tight">
                      More Than Just Products
                    </h2>

                    <p className="font-sans text-gray-500 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
                      We believe mental wellness is the bedrock of a beautiful, balanced life. By choosing Cloudy's natural rituals, you are not just investing in your own daily self-care—you are actively backing the <strong>National Alliance on Mental Illness (NAMI)</strong>. A meaningful portion of every purchase goes directly toward funding vital advocacy, helpline support, and mental health resources for those in need.
                    </p>

                    {/* Badge Checklist row */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-4">
                      {/* Badge 1 */}
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-8 h-8 text-[#0040df] shrink-0" />
                        <span className="font-sans font-bold text-gray-800 text-[15px]">
                          500,000+ Daily Rituals Improved
                        </span>
                      </div>

                      <div className="hidden md:block w-px h-10 bg-gray-200" />

                      {/* Badge 2 */}
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-8 h-8 text-[#0040df] shrink-0" />
                        <span className="font-sans font-bold text-gray-800 text-[15px]">
                          Scientifically Inspired Formulas
                        </span>
                      </div>

                      <div className="hidden md:block w-px h-10 bg-gray-200" />

                      {/* Badge 3 */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#0040df]/10 flex items-center justify-center text-[#0040df] shrink-0">
                          <Check className="w-5 h-5 font-bold" />
                        </div>
                        <span className="font-sans font-bold text-gray-800 text-[15px]">
                          100% Plant-Powered Ingredients
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="products-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Dedicated Product Explorer Catalog view */}
              <ProductCatalog
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onOpenProductDetail={(p) => setSelectedProductDetail(p)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Site Footer */}
      <Footer
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenBreathing={() => setIsBreathingOpen(true)}
        onSetTab={setCurrentTab}
      />

      {/* Overlay Modals and Drawers Container */}
      <AnimatePresence>
        {/* Interactive Self-care Quiz Modal */}
        {isQuizOpen && (
          <Quiz
            onClose={() => setIsQuizOpen(false)}
            onAddToCart={(p) => handleAddToCart(p, 1)}
          />
        )}

        {/* Breathing Assistant Meditation Modal */}
        {isBreathingOpen && (
          <Breathing onClose={() => setIsBreathingOpen(false)} />
        )}

        {/* Slide-over Shopping Cart Drawer */}
        {isCartOpen && (
          <Cart
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
          />
        )}

        {/* Product Quick View Detail Modal */}
        {selectedProductDetail && (
          <ProductDetailModal
            product={selectedProductDetail}
            onClose={() => setSelectedProductDetail(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
