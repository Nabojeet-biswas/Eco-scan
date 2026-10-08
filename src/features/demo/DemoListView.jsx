import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetDemoListQuery,
  useLazyGetDemoResultQuery,
  useLazyGetMultiDemoQuery,
} from "../../app/services/ecoScanApi";
import { setActiveItem, setActiveTab, startScanQueue } from "../eco/ecoSlice";
import WasteResultCard from "../waste/WasteResultCard";
import {
  Layers,
  Sparkles,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  ListOrdered,
  Package,
} from "lucide-react";

export default function DemoListView() {
  const dispatch = useDispatch();
  const { activeItem } = useSelector((state) => state.eco);

  const {
    data: demoList,
    isLoading,
    isError,
    error: listError,
    refetch,
  } = useGetDemoListQuery();

  const [triggerGetResult, { isLoading: isItemLoading }] = useLazyGetDemoResultQuery();
  const [triggerGetMultiDemo, { isLoading: isMultiLoading }] = useLazyGetMultiDemoQuery();

  const [selectedId, setSelectedId] = useState(null);
  const [multiDemoBatch, setMultiDemoBatch] = useState(null);
  const [selectedBatchIndex, setSelectedBatchIndex] = useState(0);

  // Handle clicking a single demo item
  const handleSelectDemo = async (item) => {
    setSelectedId(item.id);
    setMultiDemoBatch(null);
    try {
      const result = await triggerGetResult(item.id).unwrap();
      dispatch(setActiveItem(result));
    } catch (err) {
      console.error("Failed to fetch demo result:", err);
    }
  };

  // Handle clicking Multi-Waste Demo Combo: GET /api/demo/multi
  const handleSelectMultiDemo = async () => {
    setSelectedId("multi");
    try {
      const res = await triggerGetMultiDemo().unwrap();
      if (res && res.items && res.items.length > 0) {
        setMultiDemoBatch(res);
        setSelectedBatchIndex(0);
        dispatch(setActiveItem(res.primaryItem || res.items[0]));
      }
    } catch (err) {
      console.error("Failed to fetch multi demo combo:", err);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title & Explainer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 shrink-0" />
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900">
              Preset Demo Items Catalog
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fetched via <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono text-xs">GET /api/demo</code>. Click any item to query detailed breakdown with <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono text-xs">GET /api/demo/:id</code>.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => refetch()}
            className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition shrink-0 cursor-pointer"
            title="Refresh demo list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Multi-Waste Combo Showcase Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-indigo-950 rounded-2xl p-4 sm:p-6 text-white border border-emerald-600/50 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[10px] sm:text-[11px] font-black uppercase tracking-wide">
                ✨ Multi-Item Detection Preset
              </span>
              <code className="text-[10px] sm:text-[11px] font-mono text-emerald-200 bg-white/10 px-2 py-0.5 rounded">
                GET /api/demo/multi
              </code>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex flex-wrap items-center gap-2">
              <span>🍱 Multi-Waste Picnic Combo</span>
              <span className="text-xs font-normal text-emerald-200">(3 Distinct Items)</span>
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Simulates detection of multiple wastes in a single photo: 🥤 Plastic Water Bottle, 🥫 Aluminum Soda Can, and 🍌 Banana Peel.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={handleSelectMultiDemo}
              disabled={isMultiLoading}
              className="px-3.5 sm:px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              {isMultiLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Loading Combo...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Inspect Combo</span>
                </>
              )}
            </button>

            <button
              onClick={async () => {
                try {
                  const res = await triggerGetMultiDemo().unwrap();
                  if (res && res.items) {
                    dispatch(startScanQueue(res.items));
                    dispatch(setActiveTab("sort"));
                  }
                } catch (e) {
                  console.error(e);
                }
              }}
              disabled={isMultiLoading}
              className="px-3.5 sm:px-4 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md text-center"
            >
              <ListOrdered className="w-3.5 h-3.5 shrink-0" />
              <span>Launch Sorting Queue (3 Items)</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>


      {/* Loading & Error States */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 animate-pulse space-y-3"
            >
              <div className="w-10 h-10 bg-slate-200 rounded-lg mx-auto"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
          <h3 className="font-bold text-rose-900">Failed to load demo list</h3>
          <p className="text-xs text-rose-700 max-w-md mx-auto">
            {listError?.data?.message || listError?.error || "Could not connect to backend at http://localhost:8080."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 transition"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Demo Items Grid */}
      {demoList && demoList.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {demoList.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleSelectDemo(item)}
                className={`bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 transition-all cursor-pointer flex flex-col items-center text-center justify-between group ${
                  isSelected
                    ? "border-emerald-500 shadow-md ring-2 ring-emerald-200 bg-emerald-50/20"
                    : "border-slate-200 hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-slate-100 overflow-hidden mb-2 sm:mb-3 group-hover:scale-105 transition-transform shadow-xs flex items-center justify-center border border-slate-200">
                  <img
                    src={item.image || `/images/items/${item.id}.jpg`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.nextSibling) {
                        e.currentTarget.nextSibling.style.display = "block";
                      }
                    }}
                  />
                  <span className="hidden text-2xl sm:text-3xl">{item.icon || "📦"}</span>
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-1">{item.name}</h3>
                  <code className="text-[9px] sm:text-[10px] text-slate-400 font-mono mt-0.5 block truncate max-w-[120px]">
                    {item.id}
                  </code>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 w-full flex items-center justify-center text-[11px] sm:text-xs text-emerald-600 font-medium sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Item Loading State */}
      {isItemLoading && (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 animate-pulse">
          <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-600">
            Fetching detailed breakdown for {selectedId}...
          </p>
        </div>
      )}

      {/* Detailed Result Card */}
      {activeItem && !isItemLoading && (
        <div className="space-y-4 pt-4">
          {multiDemoBatch && (
            <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-700">
                  Inspecting Multi-Waste Batch ({multiDemoBatch.totalDetected} items):
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {multiDemoBatch.items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedBatchIndex(idx);
                      dispatch(setActiveItem(item));
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      selectedBatchIndex === idx
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    #{idx + 1} {item.itemName}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
              <span>Detailed Classification: {activeItem.itemName}</span>
            </h3>
            <span className="text-[11px] sm:text-xs text-slate-500">
              Loaded via <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">GET /api/demo/{selectedId || "id"}</code>
            </span>
          </div>

          <WasteResultCard
            item={activeItem}
            onSortClick={() => {
              if (multiDemoBatch) {
                dispatch(startScanQueue(multiDemoBatch.items));
              }
              dispatch(setActiveTab("sort"));
            }}
          />
        </div>
      )}
    </div>
  );
}
