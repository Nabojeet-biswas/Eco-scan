import React from "react";
import { Link } from "react-router";
import {
  Recycle,
  Globe2,
  Sparkles,
  TreePine,
  ShieldCheck,
  Cpu,
  Heart,
  ArrowRight
} from "lucide-react";

export default function AboutPage() {
  const techStack = [
    { name: "Google Gemini 2.0 AI Vision", role: "Multi-modal vision inference, material detection & spatial segmentation", badge: "Core AI Engine" },
    { name: "Spring Boot 4.x Microservice", role: "High-performance multipart streaming, validation & REST API", badge: "Backend" },
    { name: "React 19 & Redux Toolkit Query", role: "Declarative state, instant cache invalidation & optimistic UI", badge: "Frontend" },
    { name: "Tailwind CSS v4", role: "Design system with nature-inspired color palette & full dark mode", badge: "Styling" }
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Recycle className="w-3.5 h-3.5" />
          <span>About EcoScan</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Our Mission &amp; Technology
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Building intuitive, accessible artificial intelligence to eliminate landfill contamination and empower circular communities worldwide.
        </p>
      </div>

      {/* Story & Mission Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Why We Built EcoScan
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Over 91% of plastic ever manufactured has never been recycled. A primary obstacle is not the lack of willingness by consumers, but the sheer confusion caused by complex packaging: hidden resin codes, contradictory municipal guidelines, and multi-layer composites.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          EcoScan was engineered to remove that friction completely. With a single smartphone photograph, our Google Gemini AI model analyzes the item’s materials, delivers clear 4-bin color-coded guidance, and teaches users the lifecycle of the packaging they consume.
        </p>
      </div>

      {/* Technology Stack Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900 dark:text-white">
          Technology &amp; Architecture
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {tech.badge}
                </span>
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                {tech.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {tech.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Principles */}
      <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-10 space-y-6">
        <h3 className="text-2xl font-black">Our Environmental Principles</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300">
              <TreePine className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Contamination First</h4>
            <p className="text-emerald-200/80 leading-relaxed">
              Prioritizing bin cleanliness over optimistic wishcycling ensures collected batches can actually be processed.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300">
              <Globe2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Carbon Reduction</h4>
            <p className="text-emerald-200/80 leading-relaxed">
              Keeping organic food waste out of landfills cuts potent methane emissions that accelerate climate warming.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Ethical Privacy</h4>
            <p className="text-emerald-200/80 leading-relaxed">
              We process all imagery ephemerally in RAM and never store or monetize personal user photographs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
