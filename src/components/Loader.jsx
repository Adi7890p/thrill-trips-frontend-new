import React, { useState, useEffect } from 'react';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // simulate smooth progress
    const interval = setInterval(() => {
      setProgress(p => (p < 100 ? p + 1 : p));
    }, 10);

    const finish = () => {
      setProgress(100);
    //   setTimeout(() => setFading(true), 500);    // let user see 100%
      setTimeout(() => onComplete(), 1500);      // match fade‑out duration
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', finish);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-black
                  ${fading ? 'opacity-0 pointer-events-none transition-opacity duration-1000 ease-out' : 'opacity-100'}`}
    >
      {/* decorative blocks copied from Transition design */}
      <div className="absolute inset-0 flex flex-col">
        <div className="flex w-full h-1/2">
          <div className="w-1/5 h-full bg-orange-400" />
          <div className="w-1/5 h-full bg-orange-400" />
          <div className="w-1/5 h-full bg-orange-400 flex justify-center items-end">
            <img
              src="/logo1.png"
              className="w-full border-b-4 border-dashed border-black"
              alt="logo"
            />
          </div>
          <div className="w-1/5 h-full bg-orange-400" />
          <div className="w-1/5 h-full bg-orange-400" />
        </div>
        <div className="flex w-full h-1/2">
          <div className="w-1/5 h-full bg-orange-400" />
          <div className="w-1/5 h-full bg-orange-400" />
          <div className="w-1/5 h-full bg-orange-400" />
          <div className="w-1/5 h/full bg-orange-400" />
          <div className="w-1/5 h/full bg-orange-400" />
        </div>
      </div>

      {/* progress bar and percentage */}
      <div className="relative z-10 flex flex-col items-center justify-end w-full h-full">
        <div className="w-72 h-2 bg-white/20 rounded overflow-hidden mb-5">
          <div
            className="h-full bg-linear-to-r from-amber-300 to-red-600 rounded
                       transition-all duration-100 ease-out
                       shadow-lg shadow-cyan-400/50 border-[0.5px] border-orange-400"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-2xl font-bold font-[gilroy] text-white">{progress}%</div>
      </div>
    </div>
  );
};

export default Loader;