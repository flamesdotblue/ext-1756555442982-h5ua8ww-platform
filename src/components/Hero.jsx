import React from 'react';
import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <header className="relative h-[70vh] w-full">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/vK0TK9mHEhvY3bf1/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/90 pointer-events-none" />

      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-200">
            Serene micro-habits
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
            Mindfulness, one minute at a time
          </h1>
          <p className="mt-4 text-slate-700 text-lg">
            Create tiny, sustainable practices. Track your streak and feel the calm grow.
          </p>
        </div>
      </div>
    </header>
  );
}

export default Hero;
