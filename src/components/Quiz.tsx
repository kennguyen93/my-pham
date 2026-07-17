import React, { useState } from 'react';
import { QUIZ_QUESTIONS, PRODUCTS } from '../data';
import { Product } from '../types';
import { Sparkles, RefreshCw, ShoppingCart, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizProps {
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function Quiz({ onClose, onAddToCart }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({
    sleep: 0,
    calm: 0,
    focus: 0,
    accessories: 0,
  });
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  const handleOptionSelect = (points: { [key: string]: number }) => {
    // Add points to score
    const newScores = { ...scores };
    Object.keys(points).forEach((key) => {
      newScores[key] = (newScores[key] || 0) + points[key];
    });
    setScores(newScores);

    // Go to next question or complete
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateRecommendation(newScores);
    }
  };

  const calculateRecommendation = (finalScores: { [key: string]: number }) => {
    // Find category with highest score
    let highestCategory = 'sleep';
    let maxScore = -1;

    Object.keys(finalScores).forEach((category) => {
      if (finalScores[category] > maxScore) {
        maxScore = finalScores[category];
        highestCategory = category;
      }
    });

    // Match with corresponding product in our list
    let recommendation = PRODUCTS.find((p) => p.category === highestCategory);
    // Fallback if not found
    if (!recommendation) {
      recommendation = PRODUCTS[0];
    }

    setRecommendedProduct(recommendation);
    setQuizCompleted(true);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScores({
      sleep: 0,
      calm: 0,
      focus: 0,
      accessories: 0,
    });
    setQuizCompleted(false);
    setRecommendedProduct(null);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progressPercent = (currentQuestionIndex / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
        id="quiz-container"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#fbf8ff] to-[#f3f2ff]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#0040df]" />
            <h3 className="font-display font-bold text-lg text-slate-800">
              Personalized Ritual Finder
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            aria-label="Close Quiz"
            id="close-quiz-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {!quizCompleted ? (
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-[#0040df]">
                    <span>QUESTION {currentQuestionIndex + 1} OF {QUIZ_QUESTIONS.length}</span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full primary-gradient-bg transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-widest block">CHOOSE YOUR PATH</span>
                  <h4 className="font-display font-bold text-xl md:text-2xl text-slate-900 leading-tight">
                    {currentQuestion.question}
                  </h4>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 gap-4 pt-4">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option.points)}
                      className="w-full text-left p-5 rounded-2xl border-2 border-gray-100 hover:border-[#0040df] hover:bg-[#0040df]/2 transition-all duration-300 cursor-pointer group flex justify-between items-center"
                    >
                      <div className="space-y-1">
                        <span className="font-semibold text-[#0F172A] block text-base group-hover:text-[#0040df] transition-colors">
                          {option.text}
                        </span>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-[#0040df] group-hover:bg-[#0040df] transition-all flex items-center justify-center shrink-0 ml-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Quiz Result Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6 py-4 text-left"
              >
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-md">
                  <Check className="w-10 h-10" />
                </div>

                <div className="space-y-2 text-center">
                  <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block">
                    PERFECT HARMONY - 96% MATCH
                  </span>
                  <h4 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900">
                    Your Tailored Daily Ritual
                  </h4>
                  <p className="font-sans text-gray-500 text-[15px] max-w-md mx-auto">
                    Based on your personal wellness targets and routines, we highly recommend integrating the following premium botanical solution into your day:
                  </p>
                </div>

                {/* Recommended Product Box */}
                {recommendedProduct && (
                  <div className="glass-card p-6 rounded-3xl border border-gray-100 flex flex-col md:flex-row gap-6 items-center text-left max-w-xl mx-auto shadow-sm">
                    <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-[#F8F9FF] shrink-0 border border-gray-100">
                      <img
                        alt={recommendedProduct.name}
                        className="w-full h-full object-cover"
                        src={recommendedProduct.image}
                      />
                    </div>

                    <div className="space-y-3 flex-1">
                      <div>
                        <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block">
                          SERIES: {recommendedProduct.category.toUpperCase()}
                        </span>
                        <h5 className="font-display font-bold text-xl text-slate-900 leading-tight">
                          {recommendedProduct.name}
                        </h5>
                        <p className="text-xs text-gray-400 font-sans italic">{recommendedProduct.tagline}</p>
                      </div>

                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                        {recommendedProduct.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="font-bold text-slate-800 text-lg">
                          ${recommendedProduct.price} USD
                        </span>

                        <button
                          onClick={() => {
                            onAddToCart(recommendedProduct);
                            onClose();
                          }}
                          className="primary-gradient-bg text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 hover:opacity-95 active:scale-95 transition-all shadow-md shadow-[#0040df]/15 cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reset or Close buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-6 border-t border-gray-100 max-w-xs mx-auto">
                  <button
                    onClick={restartQuiz}
                    className="w-full py-3 px-5 rounded-full border border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50 text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retake Quiz</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-3 px-5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold transition-all cursor-pointer"
                  >
                    Close Results
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
