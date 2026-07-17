import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Info } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { motion } from 'motion/react';

interface AestheticsProps {
  onAddToCart: (product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
}

export default function Aesthetics({ onAddToCart, onOpenProductDetail }: AestheticsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Custom visual list that mirrors the mockup gallery
  const galleryItems = [
    {
      id: 'silk-sleep-mask',
      label: 'Signature Accessories',
      sublabel: 'Premium Silk Mask',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfAJfsC9aK_vMvupmYpvmrHhsuaG2WSaLgaOouLdHIyZ26SuwQMK4ZzYSQ15AYtpFe1dMP1-iYczw9XS-zqcrxkKv_5l7dnBIDEmnb5p3efduXQwQQc5f4IUxl5f811jK18JdTbXzZjwXE4kFEL3eJKzpKUxigv_D_2vN8D49qAL4csX6OvYOhv6_ZdY_jM3F-LTyktlbJnHvVq9ebuN_q9nLLC0Fhtdca-4BMFW4r47_ZVI1qixlpsccJxUifsPu9mMVCIsdICUpv',
      product: PRODUCTS.find(p => p.id === 'silk-sleep-mask')!
    },
    {
      id: 'mellows-gummies',
      label: 'Wellness Duo',
      sublabel: 'Gummies & Spray Duo',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlAuSFg1nYVgIK0CgrBMtV28zL9UeET-htWzdNnhqA47QATQFS62W2t8ggVy39EGXA-MRRPzlt3c-PuF9gMDOHiIiDKQLSio6c0K17vng_6-qFaWD19xTDJrJMGloU0H_jMfcmIUZ0LojnDFlIe5gdHz829namb6LhVxy7uzWqkCfKsP6dSXfdY5Mk9TlFvo0NtlXV9gq1xr1B3G40-EgDOlkrKyCpj_kLjIteievMIA8JCr1L0DFkK6s6ZgOYEMUvegwZitDtKzu5',
      product: PRODUCTS.find(p => p.id === 'mellows-gummies')!
    },
    {
      id: 'starter-kit',
      label: 'The Starter Set',
      sublabel: 'All-In-One Diffuser Set',
      img: 'https://lh3.googleusercontent.com/aida/AP1WRLvbjmJu2ngJ1o9Q8KOlM8xvPJcOhD4W0F2VdKu5JXU4dncPpxSchTfswaVAhaM_c2w3eGEH7t5iLB2pxTJ2fe31BrLErPNiaWnFB_MqWsumnvGvQ8ndQ9HUzb_-XyqVZFV1rmw8Z3pWhzMWe4qkKEB2aI7GsJenCa5vorXZGY0h4Ww4eQ6630wVrKnGxXfouRGEbQ_xCYA2d5gezBOwkPjZLaLYT9i5IrOQtF2oC90mcV7LlYxe2Ai17MZ4',
      product: PRODUCTS.find(p => p.id === 'starter-kit')!
    },
    {
      id: 'dream-mist',
      label: 'Dream Mist Only',
      sublabel: 'Soothing Sleep Spray',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCVg8rW9Czs5U7FfCvFv6bA3iGYNKwAJpx1rIT5Ytju4RWSBEFSrmG4YjWCS8jWTDpdcjpfouzpLxGcltWuq2vK0T23Jl6797lOOXnCDzkP2ESaeIly2vDcCdBBdES6RBzuqdcuH5mKtAAvYmGFL61C9yJc2WuwU0Rj9bAX1U3O--piVObW-4-smYQBbDrWgffxLxS7hs76_Xt3gjEeX1GJHOpz8DenKyJgjFeS2gwgK0T0nB-lWejCfG6X70wOnj_eiZcBWPwLCZL',
      product: PRODUCTS.find(p => p.id === 'dream-mist')!
    }
  ];

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % (galleryItems.length - 2));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + (galleryItems.length - 2)) % (galleryItems.length - 2));
  };

  return (
    <section className="py-16 md:py-24 bg-[#fbf8ff]" id="section-aesthetics">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header containing text on left and slide controls on right */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl space-y-3 text-left">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0F172A]">
              The Aesthetics of Wellness
            </h2>
            <p className="font-sans text-gray-500 text-base md:text-lg">
              Our design language mirrors the natural, clean simplicity we hope to bring to your daily self-care rituals.
            </p>
          </div>

          {/* Slider Chevrons */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer"
              aria-label="Previous image"
              id="carousel-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer"
              aria-label="Next image"
              id="carousel-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="relative overflow-hidden">
          <motion.div 
            animate={{ x: `-${carouselIndex * 33.333}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex gap-8 w-[133.33%] lg:w-full"
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="w-full lg:w-1/3 shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative overflow-hidden rounded-3xl aspect-[4/5] shadow-md bg-white cursor-pointer"
                  onClick={() => onOpenProductDetail(item.product)}
                >
                  {/* Product Main Image */}
                  <img
                    alt={item.product?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={item.img}
                  />

                  {/* Gradient Fade overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Bottom details Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end text-white text-left">
                    <span className="text-white font-display font-semibold text-lg tracking-wide uppercase opacity-90 block">
                      {item.label}
                    </span>
                    <p className="text-white/80 text-sm mt-1">{item.sublabel}</p>

                    {/* Quick Specs & Actions when hovered */}
                    <div className="h-0 group-hover:h-20 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden mt-3 space-y-3">
                      <div className="flex justify-between items-center text-xs text-white/90">
                        <span className="bg-white/25 px-2.5 py-1 rounded-full backdrop-blur-md">
                          {item.product?.rating.toFixed(1)} ★ ({item.product?.reviewsCount} reviews)
                        </span>
                        <span className="font-bold text-base text-purple-200">
                          ${item.product?.price} USD
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(item.product);
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-white text-gray-900 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-white/90 active:scale-95 transition-all"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenProductDetail(item.product);
                          }}
                          className="p-2 rounded-xl bg-white/20 text-white text-xs font-bold hover:bg-white/35 active:scale-95 transition-all"
                          title="View Details"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
