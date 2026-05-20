"use client";

import React from "react";
import { motion } from "framer-motion";

export function PulsingAtoms() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft overlay gradients */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(26, 92, 42, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Atom 1 - Top Left Large Green Glow Ring */}
      <motion.div
        animate={{ scale: [1, 1.04, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full"
        style={{
          width: "700px",
          height: "700px",
          top: "-250px",
          left: "-150px",
          border: "1px solid rgba(26, 92, 42, 0.12)",
          boxShadow: "inset 0 0 80px rgba(26, 92, 42, 0.03)",
        }}
      />
      
      {/* Atom 2 - Right Center Gold Glow Ring */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute rounded-full"
        style={{
          width: "550px",
          height: "550px",
          top: "15%",
          right: "-100px",
          border: "1px solid rgba(212, 175, 55, 0.08)",
          boxShadow: "inset 0 0 60px rgba(212, 175, 55, 0.02)",
        }}
      />
      
      {/* Atom 3 - Bottom Left Small Gold Glow Ring */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute rounded-full"
        style={{
          width: "400px",
          height: "400px",
          bottom: "10%",
          left: "15%",
          border: "1px solid rgba(212, 175, 55, 0.1)",
        }}
      />
      
      {/* Atom 4 - Center Tiny Green Core */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.2, 0.15] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute rounded-full"
        style={{
          width: "250px",
          height: "250px",
          top: "45%",
          left: "40%",
          border: "1px solid rgba(26, 92, 42, 0.15)",
        }}
      />
    </div>
  );
}
