import React from 'react';
import { MapPin, ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreProducts: () => void;
}

export default function Hero({ onExploreProducts }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-tr from-[#fbf8ff] via-[#f3f2ff] to-[#fbf8ff] py-16 md:py-24">
      {/* Decorative ambient radial glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0040df]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7b24dc]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0040df]/8 border border-[#0040df]/15 text-[#0040df] text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Based in Long Beach, California</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-[#0F172A] leading-tight tracking-tight text-left">
            Naturally Smarter <br />
            <span className="text-gradient">Self-Care</span>
          </h1>

          {/* Subtitle description */}
          <p className="font-sans text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl text-left">
            Our mission is to share the power of natural botanicals with the world through safe, effective, and innovative self-care rituals tailored for modern life.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={onExploreProducts}
              className="primary-gradient-bg text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-xl shadow-[#0040df]/25 cursor-pointer"
              id="hero-explore-btn"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Right side product image with glassmorphism layout */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative lg:ml-auto"
        >
          {/* Main Card Frame with border glow */}
          <div className="aspect-[4/5] max-w-[480px] w-full rounded-3xl overflow-hidden glass-card p-4 mx-auto relative shadow-2xl">
            <img
              alt="Cloudy Starter Kit"
              className="w-full h-full object-cover rounded-2xl"
              src="https://lh3.googleusercontent.com/aida/AP1WRLvbjmJu2ngJ1o9Q8KOlM8xvPJcOhD4W0F2VdKu5JXU4dncPpxSchTfswaVAhaM_c2w3eGEH7t5iLB2pxTJ2fe31BrLErPNiaWnFB_MqWsumnvGvQ8ndQ9HUzb_-XyqVZFV1rmw8Z3pWhzMWe4qkKEB2aI7GsJenCa5vorXZGY0h4Ww4eQ6630wVrKnGxXfouRGEbQ_xCYA2d5gezBOwkPjZLaLYT9i5IrOQtF2oC90mcV7LlYxe2Ai17MZ4"
            />
          </div>

          {/* Floated Testimonial Badge */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -bottom-6 -left-4 md:-left-6 glass-card p-5 rounded-2xl max-w-[240px] shadow-lg animate-bounce-slow border-l-4 border-l-[#7b24dc] text-left"
          >
            {/* 5 Stars */}
            <div className="flex gap-1 text-yellow-400 mb-2">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <p className="font-sans text-xs text-[#0F172A] leading-relaxed italic">
              "The Dream Mist completely transformed my bedtime routine. Absolutely magical!"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
