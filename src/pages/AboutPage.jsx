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
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const techStack = [
    {
      name: "Google Gemini 2.0 AI Vision",
      role: "Recognizes materials and detects items in photos",
      badge: "Core AI Engine",
    },
    {
      name: "Spring Boot Microservice",
      role: "Secure server that validates photos in memory and powers the API",
      badge: "Backend",
    },
    {
      name: "React 19 & Redux Toolkit Query",
      role: "Fast modern web interface with instant updates",
      badge: "Frontend",
    },
    {
      name: "Tailwind CSS v4",
      role: "Clean design system with nature colors and full dark mode",
      badge: "Styling",
    },
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
          Building easy-to-use AI to stop trash from polluting our planet and
          help everyone recycle with confidence.
        </p>
      </div>

      {/* Story & Mission Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Why We Built EcoScan
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Over 91% of all plastic ever made has never been recycled. The main
          problem is not that people don't care—it's that recycling is
          confusing. Hard-to-read symbols, different local rules, and mixed
          materials leave people guessing.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          EcoScan was built to solve this problem. Just snap a photo with your
          phone: our AI looks at what the item is made of, points you to the
          exact colored bin, and shares easy tips to reduce waste.
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
            <h4 className="font-bold text-white text-base">
              Clean Recycling First
            </h4>
            <p className="text-emerald-200/80 leading-relaxed">
              Keeping wrong trash out of the recycling bin ensures good items
              can actually be recycled into new products.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300">
              <Globe2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Carbon Reduction</h4>
            <p className="text-emerald-200/80 leading-relaxed">
              Keeping food scraps out of trash piles stops the buildup of
              harmful greenhouse gases.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Ethical Privacy</h4>
            <p className="text-emerald-200/80 leading-relaxed">
              We check your photo in temporary memory and never save, store, or
              sell your photos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
