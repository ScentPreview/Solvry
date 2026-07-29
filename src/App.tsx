import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import FaultyTerminal from './components/FaultyTerminal';
import SolvryLogo from './components/SolvryLogo';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date('December 30, 2026 00:00:00');

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white flex flex-col justify-between overflow-hidden selection:bg-slate-300 selection:text-black">
      {/* Background Interactive FaultyTerminal WebGL Shader with Light Grey Tint (#E2E8F0) */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-auto">
        <FaultyTerminal
          scale={1.4}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.4}
          pause={false}
          scanlineIntensity={0.25}
          glitchAmount={0.7}
          flickerAmount={0.4}
          noiseAmp={0.25}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint="#E2E8F0"
          mouseReact={true}
          mouseStrength={0.4}
          pageLoadAnimation={true}
          brightness={0.9}
        />
      </div>

      {/* Radial Glow Overlay - Slate Light Grey Ambient Accent */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[radial-gradient(circle,rgba(226,232,240,0.10)_0%,rgba(0,0,0,0)_70%)] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </div>

      {/* 1. Header Section with Solvry 3D Isometric Logo in Light Grey */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-12 py-10 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <SolvryLogo size={42} color="#E2E8F0" showText={true} />
        </motion.div>
      </header>

      {/* 2. Main Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8 text-center max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Hero Sub-Headline */}
          <div className="text-xs sm:text-sm md:text-base font-normal tracking-[0.6em] uppercase text-slate-400 mb-6 sm:mb-8 font-sans">
            SOLVRY is coming Soon
          </div>

          {/* Large Hero Date in Slate Light Grey (#E2E8F0 / #F1F5F9) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 sm:mb-14 relative"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight bg-gradient-to-b from-[#FFFFFF] via-[#F1F5F9] to-[#94A3B8] bg-clip-text text-transparent drop-shadow-[0_10px_25px_rgba(226,232,240,0.15)]">
              December 30th
            </h1>
          </motion.div>

          {/* Minimalist Live Countdown Timer with FaultyTerminal Glitch Hover Effect */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl border-t border-slate-800/80 pt-8 sm:pt-10"
          >
            <div className="flex justify-center items-center gap-6 sm:gap-12">
              {/* Days */}
              <div className="flex flex-col items-center group">
                <span 
                  data-value={formatNumber(timeLeft.days)}
                  className="glitch-hover-target text-2xl sm:text-4xl md:text-5xl font-light font-mono text-white tracking-wider hover:text-[#E2E8F0]"
                >
                  {formatNumber(timeLeft.days)}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 mt-2 font-sans font-medium group-hover:text-slate-200 transition-colors">
                  Days
                </span>
              </div>

              {/* Separator */}
              <span className="text-slate-600 font-light text-xl sm:text-3xl font-mono -mt-5 select-none">:</span>

              {/* Hours */}
              <div className="flex flex-col items-center group">
                <span 
                  data-value={formatNumber(timeLeft.hours)}
                  className="glitch-hover-target text-2xl sm:text-4xl md:text-5xl font-light font-mono text-white tracking-wider hover:text-[#E2E8F0]"
                >
                  {formatNumber(timeLeft.hours)}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 mt-2 font-sans font-medium group-hover:text-slate-200 transition-colors">
                  Hours
                </span>
              </div>

              {/* Separator */}
              <span className="text-slate-600 font-light text-xl sm:text-3xl font-mono -mt-5 select-none">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center group">
                <span 
                  data-value={formatNumber(timeLeft.minutes)}
                  className="glitch-hover-target text-2xl sm:text-4xl md:text-5xl font-light font-mono text-white tracking-wider hover:text-[#E2E8F0]"
                >
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 mt-2 font-sans font-medium group-hover:text-slate-200 transition-colors">
                  Minutes
                </span>
              </div>

              {/* Separator */}
              <span className="text-slate-600 font-light text-xl sm:text-3xl font-mono -mt-5 select-none">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center group">
                <span 
                  data-value={formatNumber(timeLeft.seconds)}
                  className="glitch-hover-target text-2xl sm:text-4xl md:text-5xl font-light font-mono text-[#E2E8F0] tracking-wider drop-shadow-[0_0_12px_rgba(226,232,240,0.3)] hover:text-white"
                >
                  {formatNumber(timeLeft.seconds)}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-300/80 mt-2 font-sans font-medium group-hover:text-white transition-colors">
                  Seconds
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* 3. Minimal Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-12 py-8 text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-[11px] sm:text-xs uppercase tracking-[0.1em] text-slate-500 font-medium"
        >
          © 2026 Solvry Inc. High-Impact Efficiency.
        </motion.p>
      </footer>
    </div>
  );
}
