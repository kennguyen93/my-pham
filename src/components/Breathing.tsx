import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X, Wind, CheckCircle, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface BreathingProps {
  onClose: () => void;
}

type BreathState = 'idle' | 'inhale' | 'hold' | 'exhale';

export default function Breathing({ onClose }: BreathingProps) {
  const [isActive, setIsActive] = useState(false);
  const [breathState, setBreathState] = useState<BreathState>('idle');
  const [secondsRemaining, setSecondsRemaining] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [breathingMethod, setBreathingMethod] = useState<'478' | '444'>('478'); // 4-7-8 sleep vs 4-4-4 box
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Define phases based on selection
  const phases = {
    '478': {
      inhale: 4,
      hold: 7,
      exhale: 8,
      labels: {
        inhale: 'Inhale Deeply',
        hold: 'Hold Breath',
        exhale: 'Exhale Gently',
      }
    },
    '444': {
      inhale: 4,
      hold: 4,
      exhale: 4,
      labels: {
        inhale: 'Inhale',
        hold: 'Hold',
        exhale: 'Exhale',
      }
    }
  };

  const currentPhaseConfig = phases[breathingMethod];

  useEffect(() => {
    if (isActive) {
      // Start session if idle
      if (breathState === 'idle') {
        setBreathState('inhale');
        setSecondsRemaining(currentPhaseConfig.inhale);
      }

      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            // Transition to next state
            transitionState();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, breathState, secondsRemaining, breathingMethod]);

  const transitionState = () => {
    if (breathState === 'inhale') {
      setBreathState('hold');
      setSecondsRemaining(currentPhaseConfig.hold);
    } else if (breathState === 'hold') {
      setBreathState('exhale');
      setSecondsRemaining(currentPhaseConfig.exhale);
    } else if (breathState === 'exhale') {
      setBreathState('inhale');
      setSecondsRemaining(currentPhaseConfig.inhale);
      setCompletedCycles((prev) => prev + 1);
    }
  };

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const resetSession = () => {
    setIsActive(false);
    setBreathState('idle');
    setSecondsRemaining(4);
    setCompletedCycles(0);
  };

  // Helper to determine breathing circle size
  const getCircleScale = () => {
    if (breathState === 'idle') return 1;
    if (breathState === 'inhale') {
      // Scale from 1 to 1.6 based on elapsed time
      const max = currentPhaseConfig.inhale;
      const elapsed = max - secondsRemaining;
      return 1 + (elapsed / max) * 0.65;
    }
    if (breathState === 'hold') return 1.65;
    if (breathState === 'exhale') {
      // Scale down from 1.65 to 1
      const max = currentPhaseConfig.exhale;
      const elapsed = max - secondsRemaining;
      return 1.65 - (elapsed / max) * 0.65;
    }
    return 1;
  };

  // Helper for background color changes
  const getBgColor = () => {
    if (breathState === 'inhale') return 'bg-[#0040df]/15';
    if (breathState === 'hold') return 'bg-[#7b24dc]/15';
    if (breathState === 'exhale') return 'bg-emerald-500/10';
    return 'bg-slate-50/50';
  };

  const getBorderColor = () => {
    if (breathState === 'inhale') return 'border-[#0040df]';
    if (breathState === 'hold') return 'border-[#7b24dc]';
    if (breathState === 'exhale') return 'border-emerald-500';
    return 'border-gray-200';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
        id="breathing-container"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#fbf8ff] to-[#f3f2ff]">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-[#0040df]" />
            <h3 className="font-display font-bold text-lg text-slate-800">
              Breathing Room — Cloudy Meditation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            aria-label="Close meditation"
            id="close-meditation-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Meditation Stage */}
        <div className="p-8 flex flex-col items-center justify-center flex-1 space-y-8 text-center min-h-[380px]">
          {/* Method Selector Tabs */}
          <div className="inline-flex rounded-full bg-gray-100 p-1 border border-gray-200 shadow-inner">
            <button
              onClick={() => {
                setBreathingMethod('478');
                resetSession();
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                breathingMethod === '478'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              4-7-8 Method (Sleep)
            </button>
            <button
              onClick={() => {
                setBreathingMethod('444');
                resetSession();
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                breathingMethod === '444'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              4-4-4 Box Method (Calm)
            </button>
          </div>

          {/* Core Breathing Animated Sphere */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer pulsating backdrop */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 blur-xl opacity-40 ${getBgColor()}`}
              style={{ transform: `scale(${getCircleScale() * 1.1})` }}
            />

            {/* Middle decorative border circle */}
            <div
              className={`absolute w-44 h-44 rounded-full border-2 border-dashed opacity-20 transition-colors duration-500 ${getBorderColor()}`}
            />

            {/* Inner primary breath ball */}
            <div
              className={`w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all duration-1000 shadow-lg border-2 ${getBgColor()} ${getBorderColor()}`}
              style={{ transform: `scale(${getCircleScale()})` }}
            >
              <span className="font-sans font-bold text-gray-800 text-3xl">
                {secondsRemaining}s
              </span>
              <span className="text-[10px] uppercase font-bold text-gray-400 mt-1 tracking-wider">
                {breathState !== 'idle' ? breathState : 'READY'}
              </span>
            </div>
          </div>

          {/* Subtitle instructions */}
          <div className="space-y-1">
            <h4 className="font-display font-bold text-xl text-slate-800 h-8">
              {breathState !== 'idle'
                ? currentPhaseConfig.labels[breathState as 'inhale' | 'hold' | 'exhale']
                : 'Ready for Serenity'}
            </h4>
            <p className="text-xs text-gray-400 font-sans tracking-wide italic h-4">
              {breathState !== 'idle'
                ? 'Follow the rhythm of the sphere'
                : 'Click Play below to begin deep relaxation'}
            </p>
          </div>

          {/* Stats bar */}
          <div className="bg-[#fbf8ff] px-6 py-3 rounded-2xl border border-gray-100 inline-flex items-center gap-6 text-sm text-gray-600">
            <div>
              Completed Cycles: <span className="font-bold text-[#0040df]">{completedCycles}</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Natural Cortisol Reduction</span>
            </div>
          </div>

          {/* Action buttons controls */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={toggleActive}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer transition-all shadow-md active:scale-95 ${
                isActive
                  ? 'bg-slate-700 hover:bg-slate-800 shadow-slate-300'
                  : 'primary-gradient-bg hover:opacity-95 shadow-[#0040df]/20'
              }`}
              id="breathing-toggle-btn"
            >
              {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
            </button>

            <button
              onClick={resetSession}
              className="w-14 h-14 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 flex items-center justify-center cursor-pointer transition-all shadow-sm active:scale-95"
              title="Reset Session"
              id="breathing-reset-btn"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Informative Footer explanation */}
        <div className="p-5 border-t border-gray-100 bg-slate-50 text-left text-xs text-gray-500 flex gap-2 items-start">
          <Info className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-sans">
            <strong>Scientific Benefits:</strong> Rhythmic box or 4-7-8 breathing stimulates your vagus nerve, immediately shifting your nervous system from "fight-or-flight" into a restful "rest-and-digest" state. Try pairing this deep breathing session with <strong>Cloudy Dream Mist</strong> to quickly drift off into deep sleep.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
