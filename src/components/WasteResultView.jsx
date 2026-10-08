import React, { useState } from "react";
import { Link } from "react-router";
import { BIN_CONFIG } from "../features/waste/constants";
import {
  Sparkles,
  Camera,
  Share2,
  Bookmark,
  Layers,
  Check,
  CheckCircle,
  Clock,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function WasteResultView({
  result,
  isDemo = false,
  multiItems = [],
  onSelectItem,
  selectedItemIndex = 0,
  userImage,
}) {
  const [toastMessage, setToastMessage] = useState(null);
  const [showEcoDetails, setShowEcoDetails] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = () => {
    const text = `I just sorted "${result?.itemName || "waste"}" with EcoScan AI! It belongs in the ${result?.bin || "proper"} bin.`;
    if (navigator.share) {
      navigator
        .share({ title: "EcoScan AI Classification", text, url: window.location.href })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!");
    }
  };

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem("ecoscan_saved") || "[]");
    const exists = saved.some((s) => s.itemName === result?.itemName);
    if (!exists && result) {
      saved.unshift({ ...result, savedAt: new Date().toISOString() });
      localStorage.setItem("ecoscan_saved", JSON.stringify(saved.slice(0, 30)));
    }
    showToast("Saved to your saved items!");
  };

  // ── Empty state ──
  if (!result) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 max-w-lg mx-auto my-8">
        <Sparkles className="w-10 h-10 text-emerald-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          No Waste Item Selected
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Upload a photo or choose an item from our Demos to see which bin it belongs in.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/scan"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition shadow-sm"
          >
            Scan Photo Now
          </Link>
          <Link
            to="/demo"
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition"
          >
            Browse Demos
          </Link>
        </div>
      </div>
    );
  }

  // ── Derived data ──
  const binKey = result.bin?.toLowerCase() || "non-recyclable";
  const binMeta = BIN_CONFIG[binKey] || BIN_CONFIG["non-recyclable"];
  const BinIcon = binMeta.icon;

  const itemPhoto =
    userImage ||
    result.image ||
    (result.id ? `/images/items/${result.id}.jpg` : null) ||
    (result.itemName
      ? `/images/items/${result.itemName.toLowerCase().replace(/\s+/g, "-")}.jpg`
      : null);

  const binBgTheme = {
    recyclable: {
      hero: "bg-emerald-500 text-white",
      badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300",
      accent: "text-emerald-600 dark:text-emerald-400",
      pill: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200",
    },
    organic: {
      hero: "bg-amber-600 text-white",
      badge: "bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300",
      accent: "text-amber-600 dark:text-amber-400",
      pill: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-200",
    },
    compost: {
      hero: "bg-amber-600 text-white",
      badge: "bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300",
      accent: "text-amber-600 dark:text-amber-400",
      pill: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-200",
    },
    "non-recyclable": {
      hero: "bg-slate-700 text-white",
      badge: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300",
      accent: "text-slate-600 dark:text-slate-400",
      pill: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-200",
    },
    special: {
      hero: "bg-purple-600 text-white",
      badge: "bg-purple-100 text-purple-900 dark:bg-purple-950/70 dark:text-purple-300 border-purple-300",
      accent: "text-purple-600 dark:text-purple-400",
      pill: "bg-purple-500/10 text-purple-800 dark:text-purple-300 border-purple-200",
    },
  }[binKey] || {
    hero: "bg-slate-700 text-white",
    badge: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300",
    accent: "text-slate-600",
    pill: "bg-slate-500/10 text-slate-700 border-slate-200",
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in duration-200">
      {/* ── Toast Notification ────────────────────────────────────────── */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold border border-slate-700 animate-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Top Bar: Status + Quick Actions ───────────────────────────── */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          {isDemo ? (
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-[11px] font-bold">
              Demo Preview
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Scan Result</span>
            </span>
          )}
          {multiItems.length > 1 && (
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-400 text-[11px] font-bold">
              {multiItems.length} items
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-600 dark:text-slate-300 text-xs font-medium transition cursor-pointer"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleSave}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-600 dark:text-slate-300 text-xs font-medium transition cursor-pointer"
            title="Save"
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <Link
            to="/scan"
            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Scan Another</span>
          </Link>
        </div>
      </div>

      {/* ── Multi-item Tabs (if multiple items in photo) ───────────────── */}
      {multiItems.length > 1 && (
        <div className="bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-wrap gap-1.5">
          {multiItems.map((item, idx) => {
            const isSelected = idx === selectedItemIndex;
            return (
              <button
                key={idx}
                onClick={() => onSelectItem && onSelectItem(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-emerald-500 text-white shadow-xs"
                    : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600"
                }`}
              >
                <span>{item.itemName}</span>
                <span className="text-[10px] opacity-75 capitalize">({item.bin})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          CARD 1: THE VERDICT (Immediate answer in under 2 seconds)
      ══════════════════════════════════════════════════════════════ */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        {/* Item & Bin Header Banner */}
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-4">
            {itemPhoto && (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-700 shadow-2xs">
                <img
                  src={itemPhoto}
                  alt={result.itemName}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>
            )}
            <div>
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {result.category || "General Waste"} {result.material ? `• ${result.material}` : ""}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {result.itemName}
              </h1>
            </div>
          </div>

          {/* Big unmistakable Bin Badge */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/80 shrink-0 self-start sm:self-auto">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${binMeta.badgeColor}`}>
              <BinIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-400">
                Put in
              </p>
              <p className="text-base font-black text-slate-900 dark:text-white capitalize">
                {binMeta.colorName}
              </p>
              <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 -mt-0.5">
                {binMeta.label}
              </p>
            </div>
          </div>
        </div>

        {/* 1-Sentence Action Tip */}
        {result.tip && (
          <div className="bg-emerald-50/70 dark:bg-emerald-950/20 px-5 py-3.5 flex items-start gap-2.5 text-xs text-emerald-900 dark:text-emerald-200 border-b border-emerald-100 dark:border-emerald-900/40">
            <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="font-bold">Quick Rule: </strong>
              {result.tip}
            </p>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            CARD 2: HOW TO PREPARE (Clear, numbered 3-step checklist)
        ══════════════════════════════════════════════════════════════ */}
        {result.howToPrepare && result.howToPrepare.length > 0 && (
          <div className="p-5 sm:p-6 space-y-3">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>How to Prepare Before Tossing</span>
            </h3>

            <div className="grid grid-cols-1 gap-2">
              {result.howToPrepare.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          CARD 3: ENVIRONMENTAL IMPACT & DETAILS (Clean, compact)
      ══════════════════════════════════════════════════════════════ */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          {result.decompositionTime && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/70 dark:border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                Decomposition
              </span>
              <span className="font-black text-slate-900 dark:text-white text-sm">
                {result.decompositionTime}
              </span>
            </div>
          )}

          {result.recyclability && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/70 dark:border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                Recyclability
              </span>
              <span className="font-black text-slate-900 dark:text-white text-sm capitalize">
                {result.recyclability}
              </span>
            </div>
          )}
        </div>

        {/* Why It Matters */}
        {result.whyItMatters && (
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
            <strong className="text-slate-800 dark:text-slate-200 font-semibold">Why it matters: </strong>
            {result.whyItMatters}
          </p>
        )}

        {/* Optional Collapsible Details (Reuse Ideas / Fun Fact / Common Mistake) */}
        {(result.reuseIdeas?.length > 0 || result.funFact || result.commonMistake) && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-700/70">
            <button
              onClick={() => setShowEcoDetails(!showEcoDetails)}
              className="w-full flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 py-1 cursor-pointer"
            >
              <span>{showEcoDetails ? "Hide Extra Tips & Fun Facts" : "Show Extra Tips & Fun Facts"}</span>
              {showEcoDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showEcoDetails && (
              <div className="space-y-3 pt-3 animate-in fade-in duration-200 text-xs">
                {/* Reuse ideas */}
                {result.reuseIdeas?.length > 0 && (
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 text-purple-900 dark:text-purple-200">
                    <p className="font-bold text-[11px] mb-1.5">✨ Creative Reuse Ideas</p>
                    <ul className="space-y-1">
                      {result.reuseIdeas.map((idea, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-purple-500 font-bold">•</span>
                          <span>{idea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Fun fact */}
                {result.funFact && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200">
                    <p className="font-bold text-[11px] mb-1">🌟 Did You Know?</p>
                    <p className="leading-relaxed">{result.funFact}</p>
                  </div>
                )}

                {/* Common mistake */}
                {result.commonMistake && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200">
                    <p className="font-bold text-[11px] mb-1">⚠️ Common Mistake to Avoid</p>
                    <p className="leading-relaxed">{result.commonMistake}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Bottom Simple Actions ─────────────────────────────────────── */}
      <div className="pt-2 flex items-center justify-between gap-3 text-xs">
        <Link
          to="/bins"
          className="text-slate-500 hover:text-emerald-600 transition flex items-center gap-1 font-medium"
        >
          <span>Need bin color guide?</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to="/scan"
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition flex items-center gap-1.5 shadow-xs"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Scan Next Item</span>
        </Link>
      </div>
    </div>
  );
}
