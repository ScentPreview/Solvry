import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import FaultyTerminal from './components/FaultyTerminal';
import SolvryLogo from './components/SolvryLogo';
import ParticleText from './components/ParticleText';

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
    <div className="relative min-h-screen w-full bg-[#050505] text-white flex flex-col justify-between overflow-x-hidden overflow-y-auto selection:bg-slate-300 selection:text-black">
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[850px] h-[90vw] max-h-[850px] bg-[radial-gradient(circle,rgba(226,232,240,0.12)_0%,rgba(0,0,0,0)_70%)] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-32 sm:h-40 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 sm:h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </div>

      {/* 1. Header Section with Solvry 3D Isometric Logo in Light Grey */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <SolvryLogo size={38} color="#E2E8F0" showText={true} />
        </motion.div>
      </header>

      {/* 2. Main Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-6 sm:py-10 text-center max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center w-full"
        >
          {/* Hero Sub-Headline with Glitch Filter */}
          <div className="mb-4 sm:mb-8 font-sans">
            <span 
              data-value="SOLVRY IS COMING SOON"
              className="glitch-hover-target text-xs sm:text-sm md:text-base font-medium tracking-[0.3em] sm:tracking-[0.6em] uppercase text-slate-400 hover:text-white transition-colors"
            >
              SOLVRY is coming Soon
            </span>
          </div>

          {/* Main Hero Date with High-Contrast Glitch Effect & WebGL Particle Text Layer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 sm:mb-12 relative w-full flex flex-col items-center justify-center"
          >
            {/* Prominent Crisp Gradient H1 Title with Glitch Hover Filter */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-2">
              <span 
                data-value="DECEMBER 30TH"
                className="glitch-hover-target bg-gradient-to-b from-[#FFFFFF] via-[#F1F5F9] to-[#94A3B8] bg-clip-text text-transparent drop-shadow-[0_10px_25px_rgba(226,232,240,0.2)] hover:text-white transition-all cursor-default"
              >
                December 30th
              </span>
            </h1>

            {/* Interactive Particle Text Effect Canvas */}
            <div className="w-full max-w-4xl opacity-90 hover:opacity-100 transition-opacity">
              <ParticleText
                text="December 30th"
                particleColor="#E2E8F0"
                hoverRadius={90}
                particleDensity={2}
              />
            </div>
          </motion.div>

          {/* Minimalist Live Countdown Timer with FaultyTerminal Glitch Hover Effect */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl border-t border-slate-800/80 pt-6 sm:pt-10"
          >
            <div className="flex justify-center items-center gap-3 sm:gap-8 md:gap-12 flex-nowrap">
              {/* Days */}
              <div className="flex flex-col items-center group min-w-[50px] sm:min-w-[70px]">
                <span 
                  data-value={formatNumber(timeLeft.days)}
                  className="glitch-hover-target text-2xl sm:text-4xl md:text-5xl font-light font-mono text-white tracking-wider hover:text-[#E2E8F0]"
                >
                  {formatNumber(timeLeft.days)}
                </span>
                <span 
                  data-value="DAYS"
                  className="glitch-hover-target text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 mt-2 font-sans font-medium group-hover:text-slate-200 transition-colors"
                >
                  Days
                </span>
              </div>

              {/* Separator */}
              <span 
                data-value=":"
                className="glitch-hover-target text-slate-600 font-light text-xl sm:text-3xl font-mono -mt-4 sm:-mt-5 select-none"
              >
                :
              </span>

              {/* Hours */}
              <div className="flex flex-col items-center group min-w-[50px] sm:min-w-[70px]">
                <span 
                  data-value={formatNumber(timeLeft.hours)}
                  className="glitch-hover-target text-2xl sm:text-4xl md:text-5xl font-light font-mono text-white tracking-wider hover:text-[#E2E8F0]"
                >
                  {formatNumber(timeLeft.hours)}
                </span>
                <span 
                  data-value="HOURS"
                  className="glitch-hover-target text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 mt-2 font-sans font-medium group-hover:text-slate-200 transition-colors"
                >
                  Hours
                </span>
              </div>

              {/* Separator */}
              <span 
                data-value=":"
                className="glitch-hover-target text-slate-600 font-light text-xl sm:text-3xl font-mono -mt-4 sm:-mt-5 select-none"
              >
                :
              </span>

              {/* Minutes */}
              <div className="flex flex-col items-center group min-w-[50px] sm:min-w-[70px]">
                <span 
                  data-value={formatNumber(timeLeft.minutes)}
                  className="glitch-hover-target text-2xl sm:text-4xl md:text-5xl font-light font-mono text-white tracking-wider hover:text-[#E2E8F0]"
                >
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span 
                  data-value="MINUTES"
                  className="glitch-hover-target text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 mt-2 font-sans font-medium group-hover:text-slate-200 transition-colors"
                >
                  Minutes
                </span>
              </div>

              {/* Separator */}
              <span 
                data-value=":"
                className="glitch-hover-target text-slate-600 font-light text-xl sm:text-3xl font-mono -mt-4 sm:-mt-5 select-none"
              >
                :
              </span>

              {/* Seconds */}
              <div className="flex flex-col items-center group min-w-[50px] sm:min-w-[70px]">
                <span 
                  data-value={formatNumber(timeLeft.seconds)}
                  className="glitch-hover-target text-2xl sm:text-4xl md:text-5xl font-light font-mono text-[#E2E8F0] tracking-wider drop-shadow-[0_0_12px_rgba(226,232,240,0.3)] hover:text-white"
                >
                  {formatNumber(timeLeft.seconds)}
                </span>
                <span 
                  data-value="SECONDS"
                  className="glitch-hover-target text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-300/80 mt-2 font-sans font-medium group-hover:text-white transition-colors"
                >
                  Seconds
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* 3. Minimal Footer with Glitch Filter */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 text-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span 
            data-value="© 2026 SOLVRY INC. HIGH-IMPACT EFFICIENCY."
            className="glitch-hover-target text-[11px] sm:text-xs uppercase tracking-[0.1em] text-slate-500 font-medium hover:text-slate-300 transition-colors"
          >
            © 2026 Solvry Inc. High-Impact Efficiency.
          </span>
        </motion.div>
      </footer>
    </div>
  );
}
