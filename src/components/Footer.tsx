import React from 'react';
import { Globe, Play } from 'lucide-react';

interface FooterProps {
  onOpenQuiz: () => void;
  onOpenBreathing: () => void;
  onSetTab: (tab: string) => void;
}

export default function Footer({ onOpenQuiz, onOpenBreathing, onSetTab }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-100 w-full" id="site-footer">
      
      {/* Primary Links Grid section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
        
        {/* Brand Column (5/12 width on md) */}
        <div className="md:col-span-5 space-y-6">
          <div className="font-display font-extrabold text-2xl text-slate-800 flex items-center gap-2">
            <img
              alt="Cloudy Logo"
              className="h-8 object-contain"
              src="https://lh3.googleusercontent.com/aida/AP1WRLtudLwFfhmzpK4WuStOKetIsyx-zD8-K0YOwIOxFlI5beKH0aEs0Zsw54SjJ_OyJ1vi-vKEOQkrFo7y7HwoL6Qn3MxvVPBBWwE0LpB7Dxv3OwpD9g7iOgPLGK6chm5ukksvAUsM8a1Ge3WHDaGvdA39zHwLOCk_OjLdjeEztKmPutaOR5OF_oRIrzm_tiIXtkg0rLSO_tpEWV0FUFL0-zQ7e6_74s7biinkKwnJABiJOm-LmIXqXlAJB5A"
            />
            <span className="bg-gradient-to-r from-[#0040df] to-[#7b24dc] bg-clip-text text-transparent">
              Cloudy
            </span>
          </div>
          <p className="font-sans text-gray-500 text-sm leading-relaxed">
            Empowering balanced, natural self-care through smart, plant-powered botanical rituals. Proudly born and formulated in sunny Long Beach, California.
          </p>
          
          {/* Socials */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-gray-150 flex items-center justify-center text-gray-400 hover:border-[#0040df] hover:text-[#0040df] transition-all bg-white"
              aria-label="Website"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-gray-150 flex items-center justify-center text-gray-400 hover:border-[#7b24dc] hover:text-[#7b24dc] transition-all bg-white"
              aria-label="Play video"
            >
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </a>
          </div>
        </div>

        {/* Links Column (7/12 width on md) */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          
          {/* Column 1: PRODUCTS */}
          <div className="space-y-4">
            <h5 className="font-display font-extrabold text-xs uppercase tracking-widest text-slate-900">
              Products
            </h5>
            <ul className="space-y-2.5 font-sans text-sm text-gray-500">
              <li>
                <button 
                  onClick={() => onSetTab('products')} 
                  className="hover:text-[#0040df] hover:underline transition-all cursor-pointer"
                >
                  All Products
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenQuiz} 
                  className="hover:text-[#0040df] hover:underline transition-all cursor-pointer"
                >
                  Ritual Quiz
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenBreathing} 
                  className="hover:text-[#0040df] hover:underline transition-all cursor-pointer"
                >
                  Breathing Room
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: COMPANY */}
          <div className="space-y-4">
            <h5 className="font-display font-extrabold text-xs uppercase tracking-widest text-slate-900">
              Company
            </h5>
            <ul className="space-y-2.5 font-sans text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-[#0040df] hover:underline transition-all">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0040df] hover:underline transition-all">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0040df] hover:underline transition-all">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: RESOURCES */}
          <div className="space-y-4">
            <h5 className="font-display font-extrabold text-xs uppercase tracking-widest text-slate-900">
              Resources
            </h5>
            <ul className="space-y-2.5 font-sans text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-[#0040df] hover:underline transition-all">
                  Support & Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0040df] hover:underline transition-all">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer copyright section matching mock exactly */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-sans text-center">
        <span>© 2026 Cloudy Inc. All rights reserved.</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Cookie Policy</a>
        </div>
      </div>

    </footer>
  );
}
