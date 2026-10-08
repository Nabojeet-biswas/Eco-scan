import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  recordSort,
  setActiveItem,
  setActiveTab,
  startScanQueue,
  advanceQueueItem,
  cancelScanQueue,
} from "../eco/ecoSlice";
import {
  useGetDemoListQuery,
  useLazyGetDemoResultQuery,
  useLazyGetMultiDemoQuery,
} from "../../app/services/ecoScanApi";
import {
  Recycle,
  Sprout,
  Trash2,
  AlertTriangle,
  Flame,
  CheckCircle2,
  XCircle,
  RefreshCw,
  HelpCircle,
  Layers,
  Award,
  ArrowRight,
  RotateCcw,
  Camera,
  Check,
  X,
} from "lucide-react";

const BINS = [
  {
    key: "recyclable",
    title: "Recyclable",
    subtitle: "Blue Bin",
    examples: "Bottles, cans, paper, clean cardboard, glass",
    icon: Recycle,
    bgGradient: "from-blue-600 to-cyan-700",
    hoverBorder: "hover:border-blue-400 hover:ring-4 hover:ring-blue-100",
    badge: "bg-blue-100 text-blue-800",
  },
  {
    key: "organic",
    title: "Organic Waste",
    subtitle: "Green Bin",
    examples: "Food leftovers, fruit peels, compostable items",
    icon: Sprout,
    bgGradient: "from-emerald-600 to-green-700",
    hoverBorder: "hover:border-emerald-400 hover:ring-4 hover:ring-emerald-100",
    badge: "bg-emerald-100 text-emerald-800",
  },
  {
    key: "non-recyclable",
    title: "Non-Recyclable",
    subtitle: "Red / Gray Bin",
    examples: "Plastic wraps, chip bags, soiled items, landfill",
    icon: Trash2,
    bgGradient: "from-rose-600 to-red-700",
    hoverBorder: "hover:border-rose-400 hover:ring-4 hover:ring-rose-100",
    badge: "bg-rose-100 text-rose-800",
  },
  {
    key: "special",
    title: "Special Disposal",
    subtitle: "Amber / Hazard Bin",
    examples: "Batteries, e-waste, chemicals, lightbulbs",
    icon: AlertTriangle,
    bgGradient: "from-amber-500 to-orange-700",
    hoverBorder: "hover:border-amber-400 hover:ring-4 hover:ring-amber-100",
    badge: "bg-amber-100 text-amber-800",
  },
];

export default function SortingGame() {
  const dispatch = useDispatch();
  const {
    activeItem,
    lastSortResult,
    score,
    streak,
    isQueueActive,
    scanQueue,
    queueIndex,
    batchSummary,
  } = useSelector((state) => state.eco);

  const { data: demoItems } = useGetDemoListQuery();
  const [fetchDemoResult] = useLazyGetDemoResultQuery();
  const [fetchMultiDemo, { isLoading: isMultiDemoLoading }] = useLazyGetMultiDemoQuery();

  const [selectedBin, setSelectedBin] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // If no item is active, automatically pick a random demo item
  const handlePickRandomDemo = async () => {
    if (!demoItems || demoItems.length === 0) return;
    const random = demoItems[Math.floor(Math.random() * demoItems.length)];
    const result = await fetchDemoResult(random.id).unwrap();
    dispatch(setActiveItem(result));
    setSelectedBin(null);
  };

  // Start Multi-Waste Demo Challenge
  const handleStartMultiDemo = async () => {
    try {
      const res = await fetchMultiDemo().unwrap();
      if (res && res.items && res.items.length > 0) {
        dispatch(startScanQueue(res.items));
        setSelectedBin(null);
      }
    } catch (err) {
      console.error("Failed to load multi demo", err);
    }
  };

  const handleNextQueueItem = () => {
    setSelectedBin(null);
    dispatch(advanceQueueItem());
  };

  const handleSort = (binKey) => {
    if (!activeItem || isAnimating) return;
    setSelectedBin(binKey);
    setIsAnimating(true);

    setTimeout(() => {
      dispatch(recordSort({ item: activeItem, selectedBin: binKey }));
      setIsAnimating(false);
    }, 400);
  };

  return (
    <div className="space-y-5 sm:space-y-8 max-w-5xl mx-auto">
      {/* Top Banner & Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-2xl p-4 sm:p-6 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <Recycle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300 shrink-0" />
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight">Interactive Recycling Sorting Game</h1>
          </div>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Test your knowledge! Sort the waste item into the correct recycling bin.
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/20 self-stretch sm:self-auto justify-around sm:justify-start">
          <div>
            <p className="text-[10px] uppercase font-bold text-emerald-200">Total Eco Points</p>
            <p className="text-lg sm:text-xl font-black">{score}</p>
          </div>
          <div className="h-7 sm:h-8 w-px bg-white/20"></div>
          <div>
            <p className="text-[10px] uppercase font-bold text-amber-300 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" />
              Streak
            </p>
            <p className="text-lg sm:text-xl font-black text-amber-300">{streak}x</p>
          </div>
        </div>
      </div>

      {/* Celebration Batch Summary View */}
      {!isQueueActive && batchSummary && batchSummary.itemsSorted.length > 0 && (
        <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border border-emerald-600/40 space-y-5 sm:space-y-6 animate-in zoom-in-95">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl sm:text-2xl shadow-lg shrink-0">
                🏆
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Challenge Completed
                </span>
                <h2 className="text-xl sm:text-3xl font-black">
                  Multi-Waste Batch Summary!
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => dispatch(startScanQueue(scanQueue))}
                className="flex-1 sm:flex-initial px-3 sm:px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Batch</span>
              </button>
              <button
                onClick={() => {
                  dispatch(cancelScanQueue());
                  dispatch(setActiveTab("scanner"));
                }}
                className="flex-1 sm:flex-initial px-3 sm:px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Camera className="w-4 h-4" />
                <span>Scan New</span>
              </button>
            </div>
          </div>

          {/* Batch Stats Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-1 sm:pt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/10 text-center sm:text-left">
              <p className="text-[9px] sm:text-xs text-emerald-300 font-bold uppercase">Sorted</p>
              <p className="text-base sm:text-2xl font-black mt-0.5 sm:mt-1">
                {batchSummary.itemsSorted.length}/{batchSummary.totalItems}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/10 text-center sm:text-left">
              <p className="text-[9px] sm:text-xs text-amber-300 font-bold uppercase">Points</p>
              <p className="text-base sm:text-2xl font-black text-amber-300 mt-0.5 sm:mt-1">
                +{batchSummary.totalPoints}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/10 text-center sm:text-left">
              <p className="text-[9px] sm:text-xs text-cyan-300 font-bold uppercase">Accuracy</p>
              <p className="text-base sm:text-2xl font-black text-cyan-300 mt-0.5 sm:mt-1">
                {batchSummary.totalItems > 0
                  ? `${Math.round((batchSummary.correctCount / batchSummary.totalItems) * 100)}%`
                  : "100%"}
              </p>
            </div>
          </div>

          {/* Item Breakdown List */}
          <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
            <h3 className="text-xs sm:text-sm font-bold uppercase text-slate-300">
              Item By Item Breakdown:
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {batchSummary.itemsSorted.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 sm:p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                    item.isCorrect
                      ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-100"
                      : "bg-rose-950/60 border-rose-500/40 text-rose-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center font-bold shrink-0 ${
                        item.isCorrect
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-rose-500 text-white"
                      }`}
                    >
                      {item.isCorrect ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </div>
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/20 bg-slate-800">
                      <img
                        src={
                          item.image ||
                          (item.id ? `/images/items/${item.id}.jpg` : null) ||
                          (item.itemName ? `/images/items/${item.itemName.toLowerCase().replace(/\s+/g, "-")}.jpg` : null) ||
                          "/images/items/plastic-bottle.jpg"
                        }
                        alt={item.itemName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-white">
                        #{idx + 1} {item.itemName}
                      </p>
                      <p className="text-[10px] sm:text-[11px] opacity-75">
                        {item.category} • Picked: {item.userBin} • Correct: {item.correctBin}
                      </p>
                    </div>
                  </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-xs sm:text-sm">
                        {item.isCorrect ? `+${item.pointsEarned} pts` : "0 pts"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
            <button
              onClick={() => dispatch(cancelScanQueue())}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Dismiss and return to free play
            </button>
          </div>
        </div>
      )}

      {/* Sequential Queue Stepper Header (When Active) */}
      {isQueueActive && (
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-5 text-white border border-indigo-700/50 shadow-md space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <h3 className="font-black text-base">
                Sequential Sorting Queue: Item {queueIndex + 1} of {scanQueue.length}
              </h3>
            </div>
            <button
              onClick={() => dispatch(cancelScanQueue())}
              className="text-xs text-indigo-300 hover:text-white underline cursor-pointer self-start sm:self-auto"
            >
              Cancel Queue
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 to-teal-300 h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${((queueIndex + (lastSortResult ? 1 : 0)) / scanQueue.length) * 100}%`,
              }}
            ></div>
          </div>

          {/* Item Chips in Queue */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {scanQueue.map((item, idx) => {
              const isDone = idx < queueIndex || (idx === queueIndex && lastSortResult);
              const isCurrent = idx === queueIndex && !lastSortResult;
              return (
                <span
                  key={idx}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 ${
                    isDone
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : isCurrent
                      ? "bg-white text-slate-900 shadow-xs ring-2 ring-indigo-400 font-bold"
                      : "bg-white/10 text-slate-400"
                  }`}
                >
                  <span>#{idx + 1}</span>
                  <span>{item.itemName}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Waste Item to Sort */}
      {activeItem ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              {isQueueActive ? `Queue Item #${queueIndex + 1}` : "Item to Classify"}
            </span>
          </div>

          {/* Real Photo of Item */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-2xl overflow-hidden shadow-md border-2 border-slate-200 bg-slate-100 relative group">
            <img
              src={
                activeItem.image ||
                (activeItem.id ? `/images/items/${activeItem.id}.jpg` : null) ||
                (activeItem.itemName
                  ? `/images/items/${activeItem.itemName.toLowerCase().replace(/\s+/g, "-")}.jpg`
                  : null) ||
                "/images/items/plastic-bottle.jpg"
              }
              alt={activeItem.itemName || activeItem.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="max-w-md mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{activeItem.itemName || activeItem.name}</h2>
            <p className="text-sm text-slate-500 mt-1">
              Category: <span className="font-semibold text-slate-700">{activeItem.category}</span>
              {activeItem.material ? ` • Material: ${activeItem.material}` : ""}
            </p>
            {activeItem.tip && (
              <p className="text-xs text-amber-800 bg-amber-50 rounded-lg p-2 mt-3 border border-amber-200">
                💡 <span className="font-semibold">Clue:</span> {activeItem.tip}
              </p>
            )}
          </div>

          <p className="text-xs font-semibold text-slate-400">
            👇 Click the matching bin below:
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Item Selected for Sorting</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Pick a demo waste item to practice sorting, launch a multi-item challenge, or scan an image using the AI camera!
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={handleStartMultiDemo}
              disabled={isMultiDemoLoading}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-sm font-bold shadow-sm transition cursor-pointer flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4" />
              <span>🍱 Start Multi-Item Challenge (3 Items)</span>
            </button>
            <button
              onClick={handlePickRandomDemo}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              🎲 Pick Random Demo Item
            </button>
            <button
              onClick={() => dispatch(setActiveTab("demo"))}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              Browse Demo Catalog
            </button>
            <button
              onClick={() => dispatch(setActiveTab("scanner"))}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-sm transition cursor-pointer"
            >
              📸 Scan Your Own Item
            </button>
          </div>
        </div>
      )}

      {/* The 4 Bins: 2x2 on Mobile, 4 Columns on Large Screens */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {BINS.map((bin) => {
          const BinIcon = bin.icon;
          const isSelected = selectedBin === bin.key;

          return (
            <div
              key={bin.key}
              onClick={() => handleSort(bin.key)}
              className={`relative rounded-2xl p-3.5 sm:p-5 border-2 transition-all cursor-pointer flex flex-col justify-between select-none ${
                activeItem
                  ? "hover:-translate-y-1 hover:shadow-xl active:scale-95"
                  : "opacity-75 cursor-not-allowed"
              } ${
                isSelected
                  ? "ring-4 ring-emerald-400 scale-98 border-emerald-500 bg-emerald-50/50"
                  : "bg-white border-slate-200"
              } ${bin.hoverBorder}`}
            >
              {/* Bin Header */}
              <div>
                <div
                  className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${bin.bgGradient} text-white flex items-center justify-center shadow-md mb-2 sm:mb-3`}
                >
                  <BinIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-bold text-xs sm:text-base text-slate-900 leading-tight">{bin.title}</h3>
                  <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full w-fit ${bin.badge}`}>
                    {bin.subtitle}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1.5 sm:mt-2 leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {bin.examples}
                </p>
              </div>

              {/* Action Prompt */}
              <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs">
                <span className="font-semibold text-slate-400 truncate">
                  {activeItem ? "Tap to drop" : "Select item"}
                </span>
                <span className="text-slate-300">➔</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Result Feedback Banner / Modal */}
      {lastSortResult && (
        <div
          className={`rounded-2xl p-4 sm:p-6 border shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2 ${
            lastSortResult.isCorrect
              ? "bg-emerald-50 border-emerald-300 text-emerald-950"
              : "bg-rose-50 border-rose-300 text-rose-950"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  lastSortResult.isCorrect
                    ? "bg-emerald-600 text-white"
                    : "bg-rose-600 text-white"
                }`}
              >
                {lastSortResult.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                ) : (
                  <XCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                )}
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-white shadow-2xs">
                <img
                  src={
                    lastSortResult.image ||
                    (lastSortResult.id ? `/images/items/${lastSortResult.id}.jpg` : null) ||
                    (lastSortResult.itemName
                      ? `/images/items/${lastSortResult.itemName.toLowerCase().replace(/\s+/g, "-")}.jpg`
                      : null) ||
                    "/images/items/plastic-bottle.jpg"
                  }
                  alt={lastSortResult.itemName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <h3 className="text-base sm:text-lg font-bold">
                    {lastSortResult.isCorrect
                      ? "🎉 Awesome! Correct Bin!"
                      : "Oops! Incorrect Bin"}
                  </h3>
                  {lastSortResult.isCorrect && (
                    <span className="text-[11px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                      +{lastSortResult.pointsEarned} Points
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm mt-1">
                  <strong>{lastSortResult.itemName}</strong> belongs in the{" "}
                  <span className="font-bold underline uppercase">
                    {lastSortResult.correctBin}
                  </span>{" "}
                  bin.
                  {!lastSortResult.isCorrect && (
                    <> You selected <span className="italic">{lastSortResult.selectedBin}</span>.</>
                  )}
                </p>
              </div>
            </div>

            {/* Actions: In Queue mode, show Next Queue Item button */}
            {isQueueActive ? (
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={handleNextQueueItem}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>
                    {queueIndex + 1 < scanQueue.length
                      ? `Next Item (${queueIndex + 2} of ${scanQueue.length})`
                      : "Finish Batch & View Summary"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={handlePickRandomDemo}
                  className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Next Random</span>
                </button>
                <button
                  onClick={() => dispatch(setActiveTab("demo"))}
                  className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold rounded-xl shadow-2xs transition cursor-pointer flex items-center justify-center"
                >
                  Demo List
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
