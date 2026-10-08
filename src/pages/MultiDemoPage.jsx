import React, { useState } from "react";
import { Link } from "react-router";
import { useGetMultiDemoQuery } from "../app/services/ecoScanApi";
import { MULTI_DEMO_DATA } from "../data/demoData";
import WasteResultView from "../components/WasteResultView";
import { ArrowLeft, Sparkles, Layers, ArrowRight, Camera } from "lucide-react";

export default function MultiDemoPage() {
  const { data: serverMulti, isLoading } = useGetMultiDemoQuery();
  const multiData = serverMulti || MULTI_DEMO_DATA;

  const items = multiData.items || MULTI_DEMO_DATA.items;
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeItem = items[selectedIdx] || items[0];

  return (
    <div className="space-y-6 py-4">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          to="/demo"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Demo Gallery</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/game"
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition"
          >
            Practice Sorting Game
          </Link>
          <Link
            to="/scan"
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Scan Real Photo</span>
          </Link>
        </div>
      </div>

      {/* Showcase Explainer Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border border-emerald-600/50 shadow-md flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-black uppercase tracking-wider">
              ✨ Multi-Waste Showcase
            </span>
            <span className="text-xs text-emerald-200 font-mono">GET /api/demo/multi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Picnic Combo: 3 Separate Waste Items
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In real life, photos rarely contain only one piece of trash. Here, EcoScan has segmented 3 distinct waste items from a single image: Plastic Bottle (Recyclable), Aluminum Can (Recyclable), and Banana Peel (Organic).
          </p>
        </div>

        <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden border border-emerald-500/30 shadow-lg">
          <img
            src="/images/multi-waste.jpg"
            alt="Multi-waste AI vision detection with bounding boxes"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Main Waste Result View with Multi-Item Selector */}
      <WasteResultView
        result={activeItem}
        isDemo={true}
        multiItems={items}
        selectedItemIndex={selectedIdx}
        onSelectItem={(idx) => setSelectedIdx(idx)}
      />
    </div>
  );
}
