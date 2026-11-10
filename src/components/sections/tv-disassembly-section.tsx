"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  Layers,
  Cpu,
  Zap,
  Minimize2,
  ChevronDown,
  Volume2,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TV_COMPONENTS_DATA, TVComponentItem } from "@/config/tv-components.config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TVDisassemblySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Component layer refs
  const frontTvRef = useRef<HTMLDivElement>(null);
  const frontGlassRef = useRef<HTMLDivElement>(null);
  const diffuserStackRef = useRef<HTMLDivElement>(null);
  const ledBacklightRef = useRef<HTMLDivElement>(null);
  const chassisRef = useRef<HTMLDivElement>(null);
  const psuBoardRef = useRef<HTMLDivElement>(null);
  const mainboardRef = useRef<HTMLDivElement>(null);
  const tconBoardRef = useRef<HTMLDivElement>(null);
  const speakerLeftRef = useRef<HTMLDivElement>(null);
  const speakerRightRef = useRef<HTMLDivElement>(null);
  const rearCoverRef = useRef<HTMLDivElement>(null);
  const cablesGroupRef = useRef<HTMLDivElement>(null);

  // State
  const [activeComponent, setActiveComponent] = useState<TVComponentItem | null>(null);
  const [progressState, setProgressState] = useState<number>(0);
  const [activeStageName, setActiveStageName] = useState<string>("Fully Assembled");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const zFactor = isMobile ? 0.42 : 1;
      const xFactor = isMobile ? 0.45 : 1;
      const yFactor = isMobile ? 0.45 : 1;

      // Smooth timeline scrub
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: "top top",
          end: isMobile ? "+=1800" : "+=2600",
          scrub: isMobile ? 0.6 : 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = Math.round(self.progress * 100);
            setProgressState(p);
            if (p < 15) {
              setActiveStageName("Assembled TV");
            } else if (p < 40) {
              setActiveStageName("Front Screen & Polarizer");
            } else if (p < 65) {
              setActiveStageName("Optical Diffuser & Rear Shell");
            } else if (p < 85) {
              setActiveStageName("SMPS Power & SoC Mainboard");
            } else {
              setActiveStageName("Exploded Hardware View");
            }
          },
        },
      });

      gsap.set(stageRef.current, {
        perspective: isMobile ? 1200 : 1800,
        transformStyle: "preserve-3d",
      });

      // STAGE 1: FRONT PANEL SEPARATION (0% - 25%)
      masterTl.addLabel("assembled", 0);

      masterTl.to(
        stageRef.current,
        {
          rotationY: isMobile ? -10 : -16,
          rotationX: isMobile ? 5 : 8,
          rotationZ: -1,
          scale: isMobile ? 0.98 : 0.94,
          ease: "none",
        },
        0
      );

      // Front bezel & glass panel moves outward forward along Z
      masterTl.to(
        frontGlassRef.current,
        {
          z: 320 * zFactor,
          x: -60 * xFactor,
          y: -20 * yFactor,
          opacity: 0.88,
          ease: "none",
        },
        0.05
      );

      // Front TV assembled image fades smoothly to reveal layered interior structure
      masterTl.to(
        frontTvRef.current,
        {
          opacity: 0,
          z: 180 * zFactor,
          ease: "none",
        },
        0.08
      );

      // STAGE 2: OPTICAL STACK & REAR HOUSING (25% - 55%)
      masterTl.addLabel("opticalSeparation", 0.25);

      masterTl.to(
        diffuserStackRef.current,
        {
          z: 160 * zFactor,
          x: -30 * xFactor,
          y: -10 * yFactor,
          opacity: 0.95,
          ease: "none",
        },
        0.2
      );

      masterTl.to(
        ledBacklightRef.current,
        {
          z: 70 * zFactor,
          x: -10 * xFactor,
          opacity: 1,
          ease: "none",
        },
        0.28
      );

      masterTl.to(
        rearCoverRef.current,
        {
          z: -420 * zFactor,
          x: 90 * xFactor,
          y: 40 * yFactor,
          opacity: 0.92,
          ease: "none",
        },
        0.3
      );

      // STAGE 3: CIRCUIT BOARDS DISASSEMBLY (55% - 85%)
      masterTl.addLabel("circuitSeparation", 0.55);

      masterTl.to(
        chassisRef.current,
        {
          z: -80 * zFactor,
          opacity: 1,
          ease: "none",
        },
        0.45
      );

      // SMPS Power Supply Board lifts off left chassis
      masterTl.to(
        psuBoardRef.current,
        {
          z: -180 * zFactor,
          x: -120 * xFactor,
          y: -30 * yFactor,
          rotationY: isMobile ? -6 : -12,
          rotationX: isMobile ? 4 : 8,
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          ease: "none",
        },
        0.5
      );

      // Mainboard / SoC Board lifts off right chassis
      masterTl.to(
        mainboardRef.current,
        {
          z: -210 * zFactor,
          x: 130 * xFactor,
          y: -20 * yFactor,
          rotationY: isMobile ? 8 : 15,
          rotationX: isMobile ? 3 : 6,
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          ease: "none",
        },
        0.55
      );

      // T-Con Board descends downward
      masterTl.to(
        tconBoardRef.current,
        {
          z: -130 * zFactor,
          y: 110 * yFactor,
          rotationX: isMobile ? -10 : -18,
          ease: "none",
        },
        0.6
      );

      // Ribbon cables reveal
      masterTl.to(
        cablesGroupRef.current,
        {
          opacity: 0.9,
          z: -120 * zFactor,
          ease: "none",
        },
        0.58
      );

      // Left & Right Speakers separate
      masterTl.to(
        speakerLeftRef.current,
        {
          z: -160 * zFactor,
          x: -150 * xFactor,
          y: 90 * yFactor,
          rotationZ: isMobile ? -4 : -8,
          ease: "none",
        },
        0.65
      );

      masterTl.to(
        speakerRightRef.current,
        {
          z: -160 * zFactor,
          x: 150 * xFactor,
          y: 90 * yFactor,
          rotationZ: isMobile ? 4 : 8,
          ease: "none",
        },
        0.65
      );

      // STAGE 4: COMPLETE SUSPENDED EXPLODED VIEW (85% - 100%)
      masterTl.addLabel("completeExploded", 0.85);

      masterTl.to(
        stageRef.current,
        {
          rotationY: isMobile ? -14 : -22,
          rotationX: isMobile ? 8 : 12,
          rotationZ: -1.5,
          scale: isMobile ? 0.96 : 0.9,
          ease: "none",
        },
        0.85
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FFFFFF] border-b border-[#E5E5E5] overflow-hidden"
    >
      {/* PINNED INTERACTIVE VIEWPORT (100vh) */}
      <div
        ref={pinSectionRef}
        className="relative h-screen w-full flex flex-col justify-between items-center bg-[#FFFFFF] overflow-hidden select-none"
      >
        {/* Subtle engineering grid backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(#C6A76B 0.75px, transparent 0.75px), radial-gradient(#000000 0.5px, transparent 0.5px)`,
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px",
          }}
        />

        {/* Minimal Floating Top Header */}
        <div className="relative z-30 w-full max-w-6xl mx-auto pt-5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#000000] text-[#C6A76B] text-[10px] font-bold">
              4K
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-[#000000]">
                LED TV Disassembly View
              </span>
              <span className="text-[11px] text-[#666666]">
                {activeStageName}
              </span>
            </div>
          </div>

          {/* Minimal Live Progress Pill */}
          <div className="flex items-center gap-3 bg-[#F4F4F4] border border-[#E5E5E5] px-3.5 py-1.5 rounded-full">
            <span className="text-[11px] font-bold text-[#666666] uppercase tracking-wider">
              Disassembly
            </span>
            <div className="w-20 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#000000] transition-all duration-75"
                style={{ width: `${progressState}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-[#000000]">
              {progressState}%
            </span>
          </div>
        </div>

        {/* 3D ANIMATION STAGE CANVAS */}
        <div className="relative w-full flex-1 flex items-center justify-center overflow-visible px-4">
          <div
            ref={stageRef}
            className="relative w-[300px] xs:w-[330px] sm:w-[520px] md:w-[680px] lg:w-[820px] aspect-[16/9.5] transition-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* LAYER 1: ASSEMBLED FRONT VIEW */}
            <div
              ref={frontTvRef}
              className="absolute inset-0 z-40 rounded-xl overflow-hidden shadow-2xl pointer-events-none"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="relative w-full h-full bg-[#000000] border-4 border-[#171717] rounded-xl overflow-hidden">
                <Image
                  src="/images/tv/ledtv-front.jpg"
                  alt="Fully Assembled LED Television"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* LAYER 2: FRONT BEZEL & POLARIZED LCD PANEL */}
            <div
              ref={frontGlassRef}
              onClick={() => setActiveComponent(TV_COMPONENTS_DATA[0])}
              className="absolute inset-0 z-30 rounded-xl border-2 border-[#C6A76B]/60 bg-[#000000]/15 backdrop-blur-[0.5px] cursor-pointer hover:border-[#C6A76B] transition-colors group shadow-lg"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden opacity-90">
                <Image
                  src="/images/tv/screen-content.webp"
                  alt="LCD Display Glass"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FFFFFF]/10 to-transparent pointer-events-none" />
              </div>
              <div className="absolute top-3 left-3 bg-[#000000]/80 text-[#FFFFFF] text-[10px] font-mono px-2 py-1 rounded border border-[#C6A76B]/40 group-hover:bg-[#000000] flex items-center gap-1.5">
                <Layers className="h-3 w-3 text-[#C6A76B]" />
                <span>LCD Panel</span>
              </div>
            </div>

            {/* LAYER 3: OPTICAL DIFFUSER & PRISM FILM STACK */}
            <div
              ref={diffuserStackRef}
              onClick={() => setActiveComponent(TV_COMPONENTS_DATA[1])}
              className="absolute inset-2 z-25 rounded-lg border border-[#E5E5E5] bg-[#FFFFFF]/80 backdrop-blur-md cursor-pointer hover:border-[#C6A76B] transition-colors shadow-md group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFFFFF] via-[#F4F4F4] to-[#FFFFFF] p-4 text-center">
                <div className="space-y-1">
                  <div className="inline-flex p-2 rounded-lg bg-[#FFFFFF] border border-[#E5E5E5] text-[#C6A76B]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="text-[11px] font-bold text-[#000000] font-heading uppercase tracking-wider">
                    Optical Diffuser & Light Guide (LGP)
                  </div>
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-[#000000] text-[#FFFFFF] text-[10px] font-mono px-2 py-0.5 rounded border border-[#C6A76B]/40">
                Optics
              </div>
            </div>

            {/* LAYER 4: LED BACKLIGHT MATRIX */}
            <div
              ref={ledBacklightRef}
              onClick={() => setActiveComponent(TV_COMPONENTS_DATA[2])}
              className="absolute inset-3 z-20 rounded-lg border border-[#C6A76B]/50 bg-[#FFFFFF] cursor-pointer hover:border-[#C6A76B] transition-colors p-4 shadow-sm"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full grid grid-rows-5 gap-3">
                {[1, 2, 3, 4, 5].map((row) => (
                  <div
                    key={row}
                    className="flex items-center justify-around border-b border-[#E5E5E5] pb-1"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((diode) => (
                      <span
                        key={diode}
                        className="h-2.5 w-2.5 rounded-full bg-[#FFFFFF] border border-[#C6A76B] shadow-[0_0_8px_#C6A76B] flex items-center justify-center"
                      >
                        <span className="h-1 w-1 rounded-full bg-[#C6A76B]" />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <div className="absolute bottom-2 left-2 bg-[#000000] text-[#C6A76B] text-[10px] font-mono px-2 py-0.5 rounded border border-[#C6A76B]/40">
                LED Array
              </div>
            </div>

            {/* LAYER 5: METALLIC CHASSIS */}
            <div
              ref={chassisRef}
              onClick={() => setActiveComponent(TV_COMPONENTS_DATA[3])}
              className="absolute inset-0 z-10 rounded-xl border border-[#CCCCCC] bg-[#E5E5E5] cursor-pointer overflow-hidden shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/images/tv/chassis-base.webp"
                alt="Stamped Aluminium-Steel Chassis"
                fill
                className="object-cover opacity-95 brightness-105"
              />
              <div className="absolute top-3 left-4 bg-[#000000]/80 text-[#FFFFFF] text-[10px] font-mono px-2 py-1 rounded border border-[#C6A76B]/40">
                Galvanized Chassis
              </div>
            </div>

            {/* LAYER 6: SMPS POWER SUPPLY BOARD */}
            <div
              ref={psuBoardRef}
              onClick={() => setActiveComponent(TV_COMPONENTS_DATA[4])}
              className="absolute top-[18%] left-[4%] w-[33%] h-[56%] z-15 rounded-xl border border-[#C6A76B]/60 bg-[#171717] overflow-hidden cursor-pointer hover:border-[#C6A76B] transition-transform shadow-xl group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/images/tv/power-supply-board.webp"
                alt="SMPS Power Supply Circuit Board"
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute bottom-1.5 left-1.5 bg-[#000000]/90 text-[#FFFFFF] text-[9px] font-mono px-1.5 py-0.5 rounded border border-[#C6A76B]/50 flex items-center gap-1">
                <Zap className="h-2.5 w-2.5 text-[#C6A76B]" />
                <span>SMPS Power</span>
              </div>
            </div>

            {/* LAYER 7: MAINBOARD / SOC MOTHERBOARD */}
            <div
              ref={mainboardRef}
              onClick={() => setActiveComponent(TV_COMPONENTS_DATA[5])}
              className="absolute top-[20%] right-[4%] w-[28%] h-[52%] z-15 rounded-xl border border-[#C6A76B]/60 bg-[#171717] overflow-hidden cursor-pointer hover:border-[#C6A76B] transition-transform shadow-xl group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/images/tv/motherboard.webp"
                alt="Motherboard / SoC Video Processor"
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute bottom-1.5 right-1.5 bg-[#000000]/90 text-[#FFFFFF] text-[9px] font-mono px-1.5 py-0.5 rounded border border-[#C6A76B]/50 flex items-center gap-1">
                <Cpu className="h-2.5 w-2.5 text-[#C6A76B]" />
                <span>SoC Mainboard</span>
              </div>
            </div>

            {/* LAYER 8: T-CON TIMING CONTROLLER */}
            <div
              ref={tconBoardRef}
              onClick={() => setActiveComponent(TV_COMPONENTS_DATA[6])}
              className="absolute bottom-[8%] left-[38%] w-[25%] h-[20%] z-16 rounded-lg border border-[#C6A76B]/70 bg-[#000000] overflow-hidden cursor-pointer hover:border-[#C6A76B] shadow-xl group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/images/tv/tcon-board.webp"
                alt="T-Con Timing Controller Board"
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-1 left-1 bg-[#000000]/90 text-[#C6A76B] text-[8px] font-mono px-1 py-0.5 rounded border border-[#C6A76B]/40">
                T-Con IC
              </div>
            </div>

            {/* LAYER 9: RIBBON CABLES & HARNESSES */}
            <div
              ref={cablesGroupRef}
              className="absolute inset-0 z-14 pointer-events-none opacity-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 280 160 Q 400 120 540 180"
                  fill="none"
                  stroke="#C6A76B"
                  strokeWidth="3"
                  strokeDasharray="4 2"
                />
                <path
                  d="M 540 250 Q 480 320 400 340"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                />
                <line
                  x1="340"
                  y1="370"
                  x2="340"
                  y2="420"
                  stroke="#C6A76B"
                  strokeWidth="10"
                  opacity="0.8"
                />
                <line
                  x1="380"
                  y1="370"
                  x2="380"
                  y2="420"
                  stroke="#C6A76B"
                  strokeWidth="10"
                  opacity="0.8"
                />
              </svg>
            </div>

            {/* LAYER 10: STEREO SPEAKERS */}
            <div
              ref={speakerLeftRef}
              onClick={() => setActiveComponent(TV_COMPONENTS_DATA[7])}
              className="absolute bottom-[-14%] sm:bottom-[-10%] left-[6%] sm:left-[8%] w-[24%] sm:w-[18%] h-[14%] sm:h-[12%] z-16 rounded-lg bg-[#171717] border border-[#333333] cursor-pointer hover:border-[#C6A76B] shadow-lg flex items-center justify-center p-1.5 sm:p-2 text-center"
            >
              <div className="flex items-center gap-1 sm:gap-1.5 text-[#FFFFFF] text-[9px] sm:text-[10px] font-mono">
                <Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#C6A76B]" />
                <span>Speakers</span>
              </div>
            </div>

            <div
              ref={speakerRightRef}
              onClick={() => setActiveComponent(TV_COMPONENTS_DATA[7])}
              className="absolute bottom-[-14%] sm:bottom-[-10%] right-[6%] sm:right-[8%] w-[24%] sm:w-[18%] h-[14%] sm:h-[12%] z-16 rounded-lg bg-[#171717] border border-[#333333] cursor-pointer hover:border-[#C6A76B] shadow-lg flex items-center justify-center p-1.5 sm:p-2 text-center"
            >
              <div className="flex items-center gap-1 sm:gap-1.5 text-[#FFFFFF] text-[9px] sm:text-[10px] font-mono">
                <Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#C6A76B]" />
                <span>Speakers</span>
              </div>
            </div>

            {/* LAYER 11: REAR PLASTIC HOUSING */}
            <div
              ref={rearCoverRef}
              onClick={() => setActiveComponent(TV_COMPONENTS_DATA[8])}
              className="absolute inset-0 z-5 rounded-2xl border border-[#333333] bg-[#171717] cursor-pointer hover:border-[#C6A76B] overflow-hidden shadow-2xl p-6 flex flex-col justify-between"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#C6A76B]" />
                  <span className="text-[10px] font-mono font-bold text-[#FFFFFF] uppercase">
                    Rear Shell
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#CCCCCC] border border-[#333333] px-2 py-0.5 rounded">
                  VESA
                </span>
              </div>

              <div className="space-y-1.5 my-auto py-4">
                {[1, 2, 3, 4, 5, 6].map((l) => (
                  <div key={l} className="w-full h-1 bg-[#000000] rounded-full" />
                ))}
              </div>

              <div className="text-[9px] font-mono text-[#CCCCCC] flex justify-between">
                <span>Polycarbonate</span>
                <span>Nagpur Workshop</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Scroll Cue */}
        <div className="relative z-30 w-full max-w-6xl mx-auto pb-5 px-6 flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#666666] bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-1.5 rounded-full shadow-sm">
            <ChevronDown className="h-3.5 w-3.5 text-[#C6A76B] animate-bounce" />
            <span>Scroll down to explode components • Scroll up to reassemble</span>
          </div>
        </div>

        {/* Clean Component Details Modal / Bottom Sheet */}
        {activeComponent && (
          <div className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 max-w-sm sm:w-full mx-auto sm:mx-0 bg-[#FFFFFF] border border-[#C6A76B] rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-start justify-between gap-4 pb-2.5 sm:pb-3 border-b border-[#E5E5E5]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6A76B] block">
                  Hardware Component
                </span>
                <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#000000] mt-0.5">
                  {activeComponent.name}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveComponent(null)}
                className="p-1.5 rounded-lg text-[#666666] hover:text-[#000000] hover:bg-[#F4F4F4] active:scale-95 transition-all touch-manipulation"
                aria-label="Close component details"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-[#666666] py-2.5 sm:py-3 leading-relaxed">
              {activeComponent.description}
            </p>

            <div className="pt-2 border-t border-[#E5E5E5] flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#000000] bg-[#F4F4F4] border border-[#E5E5E5] px-2.5 py-1 rounded-md">
                {activeComponent.keyMetric}
              </span>
              <button
                type="button"
                onClick={() => setActiveComponent(null)}
                className="px-3.5 py-1.5 bg-[#000000] hover:bg-[#171717] active:scale-95 text-[#FFFFFF] text-xs font-semibold rounded-lg transition-all touch-manipulation cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
