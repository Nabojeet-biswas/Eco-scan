import React from "react";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../eco/ecoSlice";
import { BIN_CONFIG } from "./constants";
import {
  Clock,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Lightbulb,
} from "lucide-react";

export default function WasteResultCard({ item, onSortClick }) {
  const dispatch = useDispatch();

  if (!item) return null;

  const binKey = item.bin?.toLowerCase() || "non-recyclable";
  const binMeta = BIN_CONFIG[binKey] || BIN_CONFIG["non-recyclable"];
  const BinIcon = binMeta.icon;

  const recyclabilityColors = {
    easy: "bg-emerald-100 text-emerald-800 border-emerald-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    hard: "bg-rose-100 text-rose-800 border-rose-200",
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border overflow-hidden transition-all ${binMeta.cardBorder}`}>
      {/* Header Banner */}
      <div className={`bg-gradient-to-r ${binMeta.headerBg} p-4 sm:p-6 text-white relative overflow-hidden`}>
        <div className="absolute -right-6 -bottom-6 opacity-15">
          <BinIcon className="w-28 h-28 sm:w-36 sm:h-36" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
              <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold px-2 sm:px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
                {item.category || "General Waste"}
              </span>
              {item.material && (
                <span className="text-[11px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 rounded-full bg-black/20">
                  {item.material}
                </span>
              )}
              {item.recyclability && (
                <span className={`text-[11px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 rounded-full border capitalize ${
                  recyclabilityColors[item.recyclability?.toLowerCase()] || "bg-white/20"
                }`}>
                  Recyclability: {item.recyclability}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">{item.itemName}</h2>
          </div>

          {/* Recommended Bin Badge */}
          <div className="bg-white/95 text-slate-900 rounded-xl p-2.5 sm:p-3 shadow-md flex items-center gap-2.5 sm:gap-3 backdrop-blur-xs shrink-0 self-start sm:self-auto">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${binMeta.badgeColor}`}>
              <BinIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 font-bold">Recommended Bin</p>
              <p className="text-xs sm:text-sm font-bold capitalize text-slate-900">{binMeta.label}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tip Banner */}
      {item.tip && (
        <div className="bg-amber-50 border-b border-amber-100 p-3 sm:p-4 flex items-start gap-2.5 sm:gap-3">
          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900">
            <strong className="font-semibold text-amber-950">Disposal Tip: </strong>
            {item.tip}
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Key Metrics: Decomposition & Why It Matters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {item.decompositionTime && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">Decomposition Time</p>
                <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{item.decompositionTime}</p>
              </div>
            </div>
          )}

          {item.whyItMatters && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">Why It Matters</p>
                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">{item.whyItMatters}</p>
              </div>
            </div>
          )}
        </div>

        {/* How to prepare */}
        {item.howToPrepare && item.howToPrepare.length > 0 && (
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              How to Prepare for Disposal
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {item.howToPrepare.map((step, idx) => (
                <li key={idx} className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-xs text-slate-700 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="break-words">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Side-by-Side: Pros vs Cons */}
        {((item.prosOfRightDisposal && item.prosOfRightDisposal.length > 0) ||
          (item.consOfWrongDisposal && item.consOfWrongDisposal.length > 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Pros */}
            {item.prosOfRightDisposal && item.prosOfRightDisposal.length > 0 && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Benefits of Proper Sorting</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-emerald-950">
                  {item.prosOfRightDisposal.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold shrink-0">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cons */}
            {item.consOfWrongDisposal && item.consOfWrongDisposal.length > 0 && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-rose-50/70 border border-rose-200">
                <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Consequences of Wrong Disposal</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-rose-950">
                  {item.consOfWrongDisposal.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold shrink-0">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Circular Economy: After recycling & Reuse ideas */}
        {((item.afterRecyclingItBecomes && item.afterRecyclingItBecomes.length > 0) ||
          (item.reuseIdeas && item.reuseIdeas.length > 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {item.afterRecyclingItBecomes && item.afterRecyclingItBecomes.length > 0 && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-cyan-50/70 border border-cyan-200">
                <h4 className="text-xs font-bold text-cyan-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>After Recycling It Becomes</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.afterRecyclingItBecomes.map((product, idx) => (
                    <span key={idx} className="text-xs bg-white text-cyan-800 font-medium px-2.5 py-1 rounded-md border border-cyan-200 shadow-2xs">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.reuseIdeas && item.reuseIdeas.length > 0 && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-purple-50/70 border border-purple-200">
                <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Creative Reuse Ideas</span>
                </h4>
                <ul className="space-y-1 text-xs text-purple-950">
                  {item.reuseIdeas.map((idea, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-purple-600 shrink-0">✦</span>
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Callouts: Fun Fact & Common Mistake */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {item.funFact && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs">
              <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                <span>🌟</span>
                <span>Fun Fact</span>
              </div>
              <p className="text-amber-950 leading-relaxed">{item.funFact}</p>
            </div>
          )}

          {item.commonMistake && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-orange-50/60 border border-orange-200/80 text-xs">
              <div className="font-bold text-orange-900 flex items-center gap-1.5 mb-1">
                <span>⚠️</span>
                <span>Common Mistake</span>
              </div>
              <p className="text-orange-950 leading-relaxed">{item.commonMistake}</p>
            </div>
          )}
        </div>

        {/* Sort Action CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Earn eco points and test your recycling knowledge!
          </p>
          <button
            onClick={() => {
              if (onSortClick) {
                onSortClick(item);
              } else {
                dispatch(setActiveTab("sort"));
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <span>Practice Sorting into Bins</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
