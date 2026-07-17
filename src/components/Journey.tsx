import React from 'react';
import { Heart, Leaf, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function Journey() {
  return (
    <section className="py-16 md:py-24 bg-[#F8F9FF] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title Block */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-3xl md:text-4xl text-[#0F172A]"
          >
            The Cloudy Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-gray-500 text-base md:text-lg max-w-2xl mx-auto"
          >
            Small daily self-care acts ripple out to create profound transformations in your physical and mental wellness.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Story Text Block (7/12 width) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 glass-card p-8 md:p-12 rounded-3xl flex flex-col justify-between text-left"
          >
            <div className="space-y-4">
              <h3 className="font-display font-bold text-2xl md:text-3xl text-[#0F172A]">
                Human-First Designs, Guided by True Purpose
              </h3>
              <p className="font-sans text-gray-600 leading-relaxed text-[15px] md:text-base">
                We spend years in research, listening closely to customer feedback and partnering with leading wellness experts to formulate rituals that do not just perform exceptionally—but feel entirely natural as part of your daily routine. Cloudy empowers you to start with simple changes that ripple out into durable, life-improving habits.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
              <div className="w-12 h-12 rounded-full primary-gradient-bg flex items-center justify-center text-white shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-sans font-semibold text-gray-900 text-[15px]">Formulated by Science</h4>
                <p className="text-xs text-gray-500">Designed & recommended by clinical wellness practitioners</p>
              </div>
            </div>
          </motion.div>

          {/* Premium Image Block (5/12 width) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 rounded-3xl overflow-hidden shadow-xl relative min-h-[320px] lg:min-h-full group text-left"
          >
            <img
              alt="Cloudy Dream Mist on Linens"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCVg8rW9Czs5U7FfCvFv6bA3iGYNKwAJpx1rIT5Ytju4RWSBEFSrmG4YjWCS8jWTDpdcjpfouzpLxGcltWuq2vK0T23Jl6797lOOXnCDzkP2ESaeIly2vDcCdBBdES6RBzuqdcuH5mKtAAvYmGFL61C9yJc2WuwU0Rj9bAX1U3O--piVObW-4-smYQBbDrWgffxLxS7hs76_Xt3gjEeX1GJHOpz8DenKyJgjFeS2gwgK0T0nB-lWejCfG6X70wOnj_eiZcBWPwLCZL"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
              <span className="text-xs font-semibold tracking-wider uppercase opacity-90">Cloudy Dream Mist</span>
              <p className="text-sm">A gentle aroma that lulls you into peaceful, deep sleep.</p>
            </div>
          </motion.div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sustainability */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 rounded-3xl text-center flex flex-col items-center group hover:border-[#0040df]/20 transition-all"
          >
            <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Leaf className="w-7 h-7" />
            </div>
            <h4 className="font-display font-bold text-xl text-[#0F172A] mb-3">Sustainability</h4>
            <p className="font-sans text-gray-500 text-sm leading-relaxed">
              Sourcing clean, eco-conscious botanicals. Fully dedicated to plant-powered formulas without synthetic chemical shortcuts.
            </p>
          </motion.div>

          {/* Mental Health */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 rounded-3xl text-center flex flex-col items-center border-[#0040df]/15 bg-[#0040df]/2 hover:border-[#0040df]/30 transition-all"
          >
            <div className="w-14 h-14 bg-[#0040df]/10 text-[#0040df] rounded-2xl flex items-center justify-center mb-6 scale-110">
              <Heart className="w-7 h-7 fill-current" />
            </div>
            <h4 className="font-display font-bold text-xl text-[#0F172A] mb-3">Mental Health Support</h4>
            <p className="font-sans text-gray-500 text-sm leading-relaxed">
              Proud partners of NAMI. Every order makes a direct, meaningful contribution to global mental health advocacy and support services.
            </p>
          </motion.div>

          {/* Pure Quality */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-8 rounded-3xl text-center flex flex-col items-center group hover:border-[#7b24dc]/20 transition-all"
          >
            <div className="w-14 h-14 bg-purple-50 text-[#7b24dc] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h4 className="font-display font-bold text-xl text-[#0F172A] mb-3">Pure Quality</h4>
            <p className="font-sans text-gray-500 text-sm leading-relaxed">
              No compromises. We source ingredients at peak therapeutic purity to deliver clean, active, and highly effective results.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
