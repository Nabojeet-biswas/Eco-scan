import React from "react";
import { useParams, Link } from "react-router";
import { useGetDemoResultQuery } from "../app/services/ecoScanApi";
import { DEMO_ITEMS } from "../data/demoData";
import WasteResultView from "../components/WasteResultView";
import { RefreshCw, Camera, ArrowLeft } from "lucide-react";

export default function DemoResultPage() {
  const { id } = useParams();
  const { data: serverResult, isLoading, isError } = useGetDemoResultQuery(id);

  // Fallback to local demo data if backend is offline or loading
  const fallbackItem = DEMO_ITEMS.find((d) => d.id === id) || DEMO_ITEMS[0];
  const itemToRender = serverResult || fallbackItem;

  return (
    <div className="space-y-6 py-4">
      {/* Navigation Breadcrumb / Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/demo"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Demo Gallery</span>
        </Link>

        <Link
          to="/scan"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition shadow-sm"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Try Real AI Scan</span>
        </Link>
      </div>

      {isLoading && (
        <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 animate-pulse space-y-2">
          <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Fetching classification details for {id}...
          </p>
        </div>
      )}

      {/* Main Result View in Demo Mode */}
      <WasteResultView result={itemToRender} isDemo={true} />
    </div>
  );
}
