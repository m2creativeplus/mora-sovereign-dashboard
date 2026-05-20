"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Compass, Sparkles, RotateCw, ShieldCheck } from "lucide-react";
import { Typography } from "@/components/ui/Typography";

export default function QiblaCompass() {
  const [heading, setHeading] = useState<number>(0); // Device heading (0 = North, clockwise)
  const [isSimulating, setIsSimulating] = useState<boolean>(true); // Default simulator to active on desktop
  const [simulateAngle, setSimulateAngle] = useState<number>(180); // Manual slider fallback angle

  const QIBLA_BEARING = 342.3; // Bearing from Hargeisa to Kaaba (Makkah)

  // Calculate relative angle to point at Makkah
  // relativeAngle = bearing - heading
  const currentHeading = isSimulating ? simulateAngle : heading;
  const needleAngle = (QIBLA_BEARING - currentHeading + 360) % 360;

  // Qibla is aligned if needle is pointing almost straight up (within 3 degrees of 0° / 360°)
  const isAligned = Math.min(Math.abs(needleAngle), Math.abs(needleAngle - 360)) <= 4;

  const sensorDetectedRef = useRef(false);

  useEffect(() => {
    // Check if device orientation is supported
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      const handleOrientation = (e: DeviceOrientationEvent) => {
        let currentHeading = 0;
        let sensorDetected = false;
        
        // iOS Webkit Compass Heading support
        if ("webkitCompassHeading" in e) {
          currentHeading = e.webkitCompassHeading as number;
          sensorDetected = true;
        } 
        // Standard absolute orientation
        else if (e.alpha !== null) {
          // alpha is 0 to 360 counter-clockwise, convert to clockwise heading
          currentHeading = (360 - e.alpha) % 360;
          sensorDetected = true;
        }

        if (sensorDetected) {
          sensorDetectedRef.current = true;
          setIsSimulating(false);
          setHeading(Math.round(currentHeading));
        }
      };

      window.addEventListener("deviceorientation", handleOrientation, true);
      
      // Bounded check for active sensor data
      const timer = setTimeout(() => {
        if (!sensorDetectedRef.current) {
          // Keep simulating if no active sensor updates arrive
          setIsSimulating(true);
        }
      }, 1000);

      return () => {
        window.removeEventListener("deviceorientation", handleOrientation, true);
        clearTimeout(timer);
      };
    }
  }, []);

  // Request iOS permission explicitly
  const requestIOSPermission = async () => {
    const DeviceOrientationEventWithPerm = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };

    if (
      typeof window !== "undefined" &&
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEventWithPerm.requestPermission === "function"
    ) {
      try {
        const permissionState = await DeviceOrientationEventWithPerm.requestPermission();
        if (permissionState === "granted") {
          setIsSimulating(false);
        }
      } catch (error) {
        console.error("Sensor authorization error:", error);
      }
    }
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-500 border-white/5 ${
      isAligned 
        ? "bg-emerald-950/20 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]" 
        : "bg-white/3 border-white/5"
    } p-5`}>
      
      {/* Dynamic Background Aura */}
      <AnimatePresence>
        {isAligned && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.25, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 bg-emerald-500 blur-2xl z-0 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center">
        {/* Widget Header */}
        <div className="w-full flex items-center justify-between mb-4 border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-1.5">
            <Compass className={`w-4 h-4 ${isAligned ? "text-emerald-400 animate-spin-slow" : "text-gold"}`} />
            <h4 className="font-outfit font-bold text-xs text-foreground tracking-wider uppercase">Qibla Direction Finder</h4>
          </div>
          
          <Badge className={
            isAligned 
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse font-bold" 
              : "bg-gold/10 text-gold border border-gold/12 font-semibold"
          }>
            {isAligned ? "QIBLA ALIGNED" : "FIND ALIGNMENT"}
          </Badge>
        </div>

        {/* Dynamic Compass Container */}
        <div className="relative w-44 h-44 flex items-center justify-center rounded-full bg-zinc-950/60 border border-white/8 my-3">
          
          {/* Circular Compass Card Labels */}
          <div className="absolute inset-2 rounded-full border border-white/5 flex items-center justify-center font-mono text-[10px] text-zinc-500 select-none">
            <span className="absolute top-1 font-bold text-zinc-400">N</span>
            <span className="absolute right-1.5 font-bold text-zinc-500">E</span>
            <span className="absolute bottom-1 font-bold text-zinc-500">S</span>
            <span className="absolute left-1.5 font-bold text-zinc-500">W</span>
            
            {/* Degree ticks */}
            <div className="absolute inset-0 rounded-full border border-dashed border-white/3 rotate-45 pointer-events-none" />
            <div className="absolute inset-0 rounded-full border border-dashed border-white/3 -rotate-45 pointer-events-none" />
          </div>

          {/* Compass Face Rotator */}
          <motion.div 
            animate={{ rotate: -currentHeading }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="absolute inset-4 rounded-full pointer-events-none flex items-center justify-center"
          >
            {/* Hargeisa North Reference Tick */}
            <div className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-gold" />
          </motion.div>

          {/* Qibla Target Arc Glow */}
          <motion.div 
            animate={{ rotate: needleAngle }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Gold pointers pointing to Kaaba */}
            <div className="w-1 h-20 bg-gradient-to-t from-transparent to-gold relative bottom-10 flex justify-center">
              {/* Kaaba Arrowtip */}
              <div className="absolute -top-1.5 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-gold" />
            </div>
            
            {/* Glowing active dial */}
            {isAligned && (
              <div className="absolute top-1 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-ping" />
            )}
          </motion.div>

          {/* Kaaba Center Core Graphic */}
          <div className="w-14 h-14 rounded-full bg-zinc-900 border border-gold/30 flex flex-col items-center justify-center shadow-lg shadow-black/80 z-20">
            {/* Small Kaaba Visual Symbolism */}
            <div className="w-5 h-5 bg-black border border-gold/40 relative rounded-sm flex flex-col justify-between items-center shadow shadow-black">
              {/* Gold Kiswah Band */}
              <div className="w-full h-1 bg-gold/80" />
              <div className="text-[6px] font-bold text-white tracking-tighter opacity-80 mb-0.5">🕋</div>
            </div>
          </div>
        </div>

        {/* Dynamic Angle / Calibration display */}
        <div className="text-center mt-2.5">
          <Typography variant="body" className="font-bold text-white text-sm">
            {isAligned ? "Facing Makkah (Mecca)" : `Qibla Offset: ${Math.round(needleAngle)}°`}
          </Typography>
          <Typography variant="caption" className="text-zinc-500 leading-normal block">
            Kaaba Bearing from Hargeisa: <span className="text-gold font-mono">{QIBLA_BEARING}° NNW</span>
          </Typography>
        </div>

        {/* Simulator controls for Desktop fallback */}
        <div className="w-full mt-4 bg-white/2 border border-white/5 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold" /> 
              {isSimulating ? "Desktop Simulator Active" : "Device Orientation Sensor"}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsSimulating(!isSimulating);
                requestIOSPermission();
              }}
              className="h-5 px-2 border-white/10 text-[9px] hover:border-gold/30 bg-transparent text-gold"
            >
              <RotateCw className="w-2.5 h-2.5 mr-1" />
              {isSimulating ? "Use Live Compass" : "Manual Calibrate"}
            </Button>
          </div>

          {isSimulating ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] font-mono text-zinc-400">
                <span>Rotate Device Heading:</span>
                <span className="font-bold text-gold">{simulateAngle}°</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="359" 
                value={simulateAngle}
                onChange={(e) => setSimulateAngle(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
              />
              <p className="text-[9px] text-zinc-500 italic text-center">
                Drag slider to rotate phone and align arrow directly under the gold top indicator!
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 p-1 bg-emerald-500/5 rounded border border-emerald-500/10 text-emerald-400 text-[10px] font-semibold leading-none">
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Compass connected. Heading: <span className="font-mono text-gold">{heading}°</span></span>
            </div>
          )}
        </div>
        
      </div>
    </Card>
  );
}
