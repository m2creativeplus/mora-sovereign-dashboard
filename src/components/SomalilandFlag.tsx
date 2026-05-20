"use client";

import React from "react";

interface FlagProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function SomalilandFlag({ className = "", width = 54, height = 36 }: FlagProps) {
  return (
    <div
      className={`relative rounded overflow-hidden shadow-lg shadow-black/40 border border-white/10 flex flex-col ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        minWidth: `${width}px`,
      }}
    >
      {/* Green Stripe */}
      <div className="flex-1 bg-[#006e39] relative flex items-center justify-center">
        {/* Simplified white Shahada shape */}
        <span 
          className="text-white font-extrabold select-none pointer-events-none text-center leading-none" 
          style={{ 
            fontSize: `${height * 0.16}px`, 
            letterSpacing: "0.06em",
            fontFamily: "system-ui, sans-serif"
          }}
        >
          لا إله إلا الله
        </span>
      </div>

      {/* White Stripe with Black Five-Pointed Star */}
      <div className="flex-1 bg-white relative flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="fill-black"
          style={{ width: `${height * 0.25}px`, height: `${height * 0.25}px` }}
        >
          <polygon points="50,0 63,38 100,38 69,59 82,100 50,75 18,100 31,59 0,38 37,38" />
        </svg>
      </div>

      {/* Red Stripe */}
      <div className="flex-1 bg-[#c8102e]" />
    </div>
  );
}
