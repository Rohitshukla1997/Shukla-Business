export interface TVComponentItem {
  id: string;
  name: string;
  category:
    | "panel"
    | "optics"
    | "structure"
    | "circuitry"
    | "audio"
    | "enclosure";
  subtitle: string;
  description: string;
  specs: string[];
  role: string;
  keyMetric: string;
}

export const TV_COMPONENTS_DATA: TVComponentItem[] = [
  {
    id: "lcd-panel",
    name: "Ultra-Thin LCD Display Panel",
    category: "panel",
    subtitle: "Front Polarizer & Liquid Crystal Cell Layer",
    description:
      "Multi-layered IPS/VA liquid crystal matrix responsible for sub-pixel light modulation, color rendering, and native resolution output.",
    specs: [
      "4K UHD (3840 x 2160)",
      "10-Bit Color Depth",
      "Anti-Glare Polarizer",
    ],
    role: "Front-most active optical display surface",
    keyMetric: "1.07 Billion Colors",
  },
  {
    id: "diffuser-reflector",
    name: "Optical Diffuser & Prism Film Stack",
    category: "optics",
    subtitle: "Light Guide Plate (LGP) & Uniformity Sheets",
    description:
      "Micro-etched optical grade acrylic plate with dual brightness enhancement films (BEF) converting point LED light into perfectly uniform edge-to-edge luminescence.",
    specs: [
      "98.2% Light Transmission",
      "Dual BEF Prism Layers",
      "0.3mm Quantum Collimator",
    ],
    role: "Uniform back-illumination dispersion",
    keyMetric: "99% Luminance Uniformity",
  },
  {
    id: "led-backlight",
    name: "LED Backlight Array Matrix",
    category: "optics",
    subtitle: "Direct-Lit High CRI Constant-Current Strips",
    description:
      "Series-parallel semiconductor diode arrays with optical dome lenses providing calibrated 6500K daylight white backlight.",
    specs: [
      "Direct Array LED Strips",
      "Optical Diffusion Lenses",
      "Aluminium Heat-Dissipating Base",
    ],
    role: "Primary light engine for the display stack",
    keyMetric: "500+ Nits Peak Brightness",
  },
  {
    id: "metal-chassis",
    name: "Structural Galvanized Chassis",
    category: "structure",
    subtitle: "Rigid Aluminium-Steel Backbone & Heat Sink",
    description:
      "Engineered stamped metallic backplane providing structural torsional rigidity, EMI grounding shielding, and heatsinking for circuit boards.",
    specs: [
      "Galvanized Cold-Rolled Steel",
      "Pre-Tapped Standoff Bosses",
      "Passive Radiative Thermal Core",
    ],
    role: "Core mechanical frame and ground plane",
    keyMetric: "0.8mm Stamped Steel",
  },
  {
    id: "power-supply-board",
    name: "SMPS Power Supply Board",
    category: "circuitry",
    subtitle: "High-Efficiency Switched-Mode Power Unit (PSU)",
    description:
      "Step-down converter featuring primary surge suppression, bridge rectifiers, flyback transformers, and dual secondary rail regulation (12V logic, 24V audio, high-voltage LED drive).",
    specs: [
      "100V–240V AC Universal Input",
      "MOSFET Switching Topology",
      "Over-Voltage & Over-Current Protection",
    ],
    role: "Converts AC mains to isolated low-voltage DC rails",
    keyMetric: "92% Power Conversion Efficiency",
  },
  {
    id: "mainboard",
    name: "Core Processor & SoC Motherboard",
    category: "circuitry",
    subtitle: "Digital Video Processing & Multi-Port Hub",
    description:
      "Multi-layer PCB housing the central image processor, scaling engine, RAM, flash storage, HDMI 2.1 PHYs, tuner demodulator, and audio DSP.",
    specs: [
      "Quad-Core Image Engine",
      "HDMI ARC / eARC PHY",
      "Optical & Analog I/O Hub",
    ],
    role: "Decodes signals, runs OS firmware & video rendering",
    keyMetric: "Multi-Gigabit Signal Processing",
  },
  {
    id: "tcon-board",
    name: "T-Con (Timing Controller) Board",
    category: "circuitry",
    subtitle: "LVDS to Mini-LVDS / USI-T Gate Signal Generator",
    description:
      "High-speed timing controller translating row and column RGB differential signals into precise gate-driver and source-driver pulses for the LCD glass.",
    specs: [
      "Dual High-Density Flat Flex (FFC) Interfaces",
      "Integrated Gamma Buffer IC",
      "Level Shifter Array",
    ],
    role: "Synchronizes pixel refresh clock and gate lines",
    keyMetric: "Sub-Millisecond Timing Precision",
  },
  {
    id: "speakers",
    name: "Dual Stereo Acoustic Transducers",
    category: "audio",
    subtitle: "Acoustically Tuned Down-Firing Speaker Modules",
    description:
      "Independent sealed acoustic enclosures with neodymium magnet drivers delivering stereo sound with passive bass radiator chambers.",
    specs: [
      "2 x 10W RMS Output",
      "Neodymium High-Flux Magnets",
      "Anti-Vibration Silicone Dampers",
    ],
    role: "Full-range high-fidelity audio reproduction",
    keyMetric: "80Hz – 20kHz Frequency Response",
  },
  {
    id: "rear-cover",
    name: "Flame-Retardant Rear Enclosure",
    category: "enclosure",
    subtitle: "Ventilated Polycarbonate Protective Shell",
    description:
      "Impact-resistant injection-molded rear cover engineered with convection cooling louvers, VESA mounting inserts, and rear cable management channels.",
    specs: [
      "UL94 V-0 Flame-Retardant Polycarbonate",
      "VESA 200x200 Standard Inserts",
      "Convection Thermal Channels",
    ],
    role: "External protection and thermal ventilation",
    keyMetric: "Complete Environmental Enclosure",
  },
];
