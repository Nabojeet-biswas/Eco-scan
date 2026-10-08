import React from "react";
import { Link } from "react-router";
import { DEMO_ITEMS } from "../data/demoData";
import { useGetStatusQuery } from "../app/services/ecoScanApi";
import {
  Camera,
  Sparkles,
  ArrowRight,
  Recycle,
  CheckCircle2,
  Layers,
  BookOpen,
  Award,
  Globe2,
  TreePine,
  ShieldCheck,
  ChevronRight,
  Flame,
  Zap,
  TrendingUp
} from "lucide-react";

export default function HomePage() {
  const { data: statusData, isError } = useGetStatusQuery(undefined, { pollingInterval: 20000 });
  const isAiOnline = !isError && Boolean(statusData?.aiEnabled);

  const sampleDemoCards = DEMO_ITEMS.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 py-4 sm:py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900 border border-emerald-500/20 p-6 sm:p-12 lg:p-16 text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          {/* Status Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>AI-Powered Waste Classification &amp; Circular Guidance</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Scan. Sort. <br />
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
              Save the Planet.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Point your camera at any waste item. Our Google Gemini Vision AI instantly identifies materials, detects multi-item trash, and tells you exactly which bin to use.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              to="/scan"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-base shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
            >
              <Camera className="w-5 h-5" />
              <span>Scan Waste</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/demo"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-base border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Try Demo Gallery</span>
            </Link>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant Gemini Vision
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 4 Color-Coded Bins
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-Item Support
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero Photo Retention
            </span>
          </div>

          {/* Hero Visual Image Showcase */}
          <div className="pt-8 max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30 group">
              <img
                src="/images/hero-scan.jpg"
                alt="EcoScan AI Scanner in action"
                className="w-full h-auto object-cover transform group-hover:scale-102 transition duration-700"
              />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 bg-slate-900/85 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold">Real-time AI Material Detection</span>
                  <span className="hidden sm:inline text-slate-400">• PET Plastic, Recyclability: High (98%)</span>
                </div>
                <Link
                  to="/scan"
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Try It Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section (3 Simple Steps) */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Effortless Recycling
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            How EcoScan Works
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Three simple steps to transform confusion into sustainable action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xl">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-500" />
              <span>Snap or Upload Photo</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Take a quick photo of your trash using your phone camera or upload any JPEG/PNG/WebP image.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-xl">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-500" />
              <span>AI Identifies Materials</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Google Gemini Vision analyzes the spatial cues, polymers, and materials, isolating single or multiple waste items.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-xl">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Recycle className="w-5 h-5 text-amber-500" />
              <span>Dispose in Right Bin</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Receive instant color-coded bin guidance (Green, Brown, Gray, Purple) plus prep steps and circular reuse tips.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Instant Examples
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Try Preset Waste Items
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Click any sample to see how EcoScan identifies items and directs them to the right bin.
            </p>
          </div>

          <Link
            to="/demo"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition"
          >
            <span>View All 9 Demo Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {sampleDemoCards.map((item) => (
            <Link
              key={item.id}
              to={`/demo/${item.id}`}
              className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-2xs hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-sm hover:-translate-y-1 transition-all group flex flex-col items-center text-center justify-between"
            >
              <div className="w-full h-28 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 mb-2.5 shadow-2xs">
                <img
                  src={item.image || `/images/items/${item.id}.jpg`}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.name}</h4>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mt-0.5 block capitalize">
                  {item.bin} bin
                </span>
              </div>
              <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <span>View Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Multi Demo Banner Callout */}
      <section className="bg-gradient-to-r from-emerald-950 via-teal-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white border border-emerald-600/40 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-black uppercase tracking-wider">
            ✨ Multi-Waste Showcase
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Scanned multiple items in one photo?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            See how EcoScan isolates a Plastic Water Bottle, Aluminum Soda Can, and Banana Peel simultaneously from a single picnic image.
          </p>

          <div>
            <Link
              to="/demo/multi"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 font-black text-xs shadow-md transition-all"
            >
              <span>Explore Multi-Waste Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden border border-emerald-500/30 shadow-xl group">
          <img
            src="/images/multi-waste.jpg"
            alt="Multi-waste AI vision detection showing bounding boxes"
            className="w-full h-auto object-cover transform group-hover:scale-102 transition duration-500"
          />
        </div>
      </section>

      {/* Environmental Impact Counter */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
          <p className="text-2xl sm:text-3xl font-black text-emerald-500">95%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Energy saved recycling aluminum</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
          <p className="text-2xl sm:text-3xl font-black text-teal-500">450 yrs</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Decomposition time of plastic bottles</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
          <p className="text-2xl sm:text-3xl font-black text-amber-500">28x</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Methane potency from food in landfills</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
          <p className="text-2xl sm:text-3xl font-black text-purple-500">100%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Glass infinitely recyclable</p>
        </div>
      </section>
    </div>
  );
}
