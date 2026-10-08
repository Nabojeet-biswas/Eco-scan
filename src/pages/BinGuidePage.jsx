import React from "react";
import { Link } from "react-router";
import { FOUR_BINS_GUIDE } from "../data/demoData";
import {
  Recycle,
  Sprout,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  AlertOctagon,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function BinGuidePage() {
  const binIcons = {
    recyclable: Recycle,
    organic: Sprout,
    "non-recyclable": Trash2,
    special: AlertTriangle,
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Recycle className="w-3.5 h-3.5" />
          <span>Universal Municipal Guidelines</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          The 4 Bins Guide
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Sorting correctly prevents recycling truckloads from being rejected and sent to landfills. Here is exactly what belongs in each color-coded stream.
        </p>
      </div>

      {/* Visual 4 Bins Hero Graphic */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl bg-white dark:bg-slate-800">
        <img
          src="/images/four-bins.jpg"
          alt="Four color-coded municipal recycling bins: Green, Brown, Gray, Purple"
          className="w-full h-auto object-cover max-h-[380px]"
        />
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center justify-around gap-3 text-xs font-bold text-center">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Green: Recyclables</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-700" />
            <span>Brown: Organics &amp; Food</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <span>Gray: General Trash</span>
          </div>
          <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
            <span>Purple / Amber: E-Waste</span>
          </div>
        </div>
      </div>

      {/* 4 Bins Deep Dive Cards */}
      <div className="space-y-8">
        {FOUR_BINS_GUIDE.map((bin) => {
          const Icon = binIcons[bin.id] || Recycle;
          return (
            <div
              key={bin.id}
              className={`bg-white dark:bg-slate-800 rounded-3xl border-2 ${bin.borderClass} shadow-md overflow-hidden transition-all`}
            >
              {/* Header */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/80">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bin.iconBg} shadow-md`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${bin.badgeBg}`}>
                      {bin.binColor}
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      {bin.name}
                    </h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md sm:text-right">
                  {bin.description}
                </p>
              </div>

              {/* What Goes In vs What Stays Out */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 dark:bg-slate-800/40">
                {/* Accepted */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 space-y-3">
                  <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>What Goes In</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {bin.whatGoesIn.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prohibited */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-rose-200 dark:border-rose-800/60 space-y-3">
                  <h3 className="font-bold text-sm text-rose-900 dark:text-rose-300 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>What Stays Out</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {bin.whatStaysOut.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="p-6 sm:p-8 bg-amber-50/60 dark:bg-amber-950/20 border-t border-amber-100 dark:border-amber-900/40">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-2 mb-3">
                  <AlertOctagon className="w-4 h-4 text-amber-600" />
                  <span>Frequent Mistakes for this Bin</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {bin.commonMistakes.map((mistake, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-amber-200 dark:border-amber-800/60 text-xs text-amber-950 dark:text-amber-200"
                    >
                      <span className="font-bold block mb-1">Mistake #{idx + 1}:</span>
                      {mistake}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-black">
          Unsure about a specific item in front of you?
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Don't guess or wishcycle. Snap a quick photo with EcoScan AI to get the instant correct bin assignment.
        </p>
        <div className="pt-2">
          <Link
            to="/scan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/30 transition"
          >
            <span>Scan Your Waste Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
