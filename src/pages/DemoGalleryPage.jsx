import React from "react";
import { Link } from "react-router";
import { DEMO_ITEMS } from "../data/demoData";
import { useGetDemoListQuery } from "../app/services/ecoScanApi";
import {
  Layers,
  Sparkles,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Package
} from "lucide-react";

export default function DemoGalleryPage() {
  const { data: serverDemoList, isLoading, isError, refetch } = useGetDemoListQuery();

  // Use server list or rich fallback catalog
  const displayItems = serverDemoList && serverDemoList.length > 0 ? serverDemoList : DEMO_ITEMS;

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
            <span>✨ Demo Mode Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Demo Items Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Explore 9 pre-analyzed waste items. Click any item to view its complete classification, recyclability, and lifecycle details.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => refetch()}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition shrink-0 cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Multi-Waste Combo Showcase Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border border-emerald-600/40 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-black uppercase tracking-wider">
                🍱 Multi-Waste Combo
              </span>
              <code className="text-[11px] font-mono text-emerald-200 bg-white/10 px-2 py-0.5 rounded">
                GET /api/demo/multi
              </code>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Multi-Waste Picnic Combo (3 Items in One Photo)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Simulates detection of multiple waste items from a single image: Plastic Water Bottle, Aluminum Soda Can, and Banana Peel.
            </p>
          </div>

          <Link
            to="/demo/multi"
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-md shrink-0"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Launch Multi-Waste Demo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 9 Demo Items Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider px-1">
          Catalog Items (Click to inspect full result)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayItems.map((item) => (
            <Link
              key={item.id}
              to={`/demo/${item.id}`}
              className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col justify-between"
            >
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 mb-4 shadow-xs">
                <img
                  src={item.image || `/images/items/${item.id}.jpg`}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-md shadow-sm">
                  {item.category || "Waste"}
                </span>
              </div>

              <div>
                <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {item.tip || `View disposal guide and bin recommendation for ${item.name}.`}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span className="capitalize">{item.bin || "Recyclable"} Bin</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Inspect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
