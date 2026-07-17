import React from 'react';
import { ShoppingCart, Sparkles, Wind, HelpCircle, Heart } from 'lucide-react';

interface NavbarProps {
  onOpenQuiz: () => void;
  onOpenBreathing: () => void;
  onOpenCart: () => void;
  cartItemsCount: number;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Navbar({
  onOpenQuiz,
  onOpenBreathing,
  onOpenCart,
  cartItemsCount,
  currentTab,
  setCurrentTab,
}: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo and Brand */}
        <button
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-2 text-left cursor-pointer focus:outline-hidden group"
          id="nav-logo-btn"
        >
          <img
            alt="Cloudy Logo"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AP1WRLtudLwFfhmzpK4WuStOKetIsyx-zD8-K0YOwIOxFlI5beKH0aEs0Zsw54SjJ_OyJ1vi-vKEOQkrFo7y7HwoL6Qn3MxvVPBBWwE0LpB7Dxv3OwpD9g7iOgPLGK6chm5ukksvAUsM8a1Ge3WHDaGvdA39zHwLOCk_OjLdjeEztKmPutaOR5OF_oRIrzm_tiIXtkg0rLSO_tpEWV0FUFL0-zQ7e6_74s7biinkKwnJABiJOm-LmIXqXlAJB5A"
          />
          <span className="font-display font-bold text-2xl tracking-tight bg-gradient-to-r from-[#0040df] to-[#7b24dc] bg-clip-text text-transparent">
            Cloudy
          </span>
        </button>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => setCurrentTab('home')}
            className={`font-medium transition-colors text-[15px] cursor-pointer ${
              currentTab === 'home'
                ? 'text-[#0040df]'
                : 'text-gray-500 hover:text-[#0040df]'
            }`}
            id="nav-home"
          >
            Home
          </button>
          
          <button
            onClick={() => setCurrentTab('products')}
            className={`font-medium transition-colors text-[15px] cursor-pointer ${
              currentTab === 'products'
                ? 'text-[#0040df]'
                : 'text-gray-500 hover:text-[#0040df]'
            }`}
            id="nav-products"
          >
            Products
          </button>

          <button
            onClick={onOpenQuiz}
            className="font-medium text-gray-500 hover:text-[#0040df] transition-colors text-[15px] flex items-center gap-1 cursor-pointer"
            id="nav-quiz"
          >
            <HelpCircle className="w-4 h-4 text-[#7b24dc]" />
            Ritual Quiz
          </button>

          <button
            onClick={onOpenBreathing}
            className="font-medium text-gray-500 hover:text-[#0040df] transition-colors text-[15px] flex items-center gap-1 cursor-pointer"
            id="nav-breathing"
          >
            <Wind className="w-4 h-4 text-[#0040df]" />
            Breathing Room
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-[#f3f2ff] hover:bg-[#eddcff] transition-colors text-gray-700 cursor-pointer focus:outline-hidden"
            aria-label="Shopping Cart"
            id="nav-cart"
          >
            <ShoppingCart className="w-5 h-5 text-gray-800" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#0040df] to-[#7b24dc] text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Call to Action Button */}
          <button
            onClick={() => setCurrentTab('products')}
            className="bg-[#0040df] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-300 shadow-md shadow-[#0040df]/15 cursor-pointer"
            id="nav-cta"
          >
            Shop Now
          </button>
        </div>
      </div>
    </header>
  );
}
