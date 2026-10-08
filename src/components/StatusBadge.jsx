import React from "react";
import { useGetStatusQuery } from "../app/services/ecoScanApi";
import { Server, Sparkles, RefreshCw, AlertTriangle } from "lucide-react";

export default function StatusBadge({ compact = false }) {
  const { data, error, isLoading, isFetching, refetch } = useGetStatusQuery(undefined, {
    pollingInterval: 15000,
  });

  const isOnline = !error && !isLoading;
  const aiEnabled = data?.aiEnabled;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
      {/* Backend Server Status */}
      <div
        className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full font-medium border transition-colors ${
          isOnline
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-rose-50 text-rose-700 border-rose-200"
        }`}
        title={`Server: ${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"} (${isOnline ? "Online" : "Offline"})`}
      >
        <span className="relative flex h-2 w-2">
          {isOnline && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isOnline ? "bg-emerald-500" : "bg-rose-500"
            }`}
          ></span>
        </span>
        <Server className="w-3.5 h-3.5 shrink-0" />
        <span className={compact ? "text-[11px]" : "hidden sm:inline"}>
          {isLoading ? "Checking..." : isOnline ? (compact ? "API OK" : "Backend Online") : "Offline"}
        </span>
      </div>

      {/* AI Status */}
      {isOnline && (
        <div
          className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full font-medium border transition-colors ${
            aiEnabled
              ? "bg-indigo-50 text-indigo-700 border-indigo-200"
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}
          title={aiEnabled ? "Gemini AI Vision Active" : "Demo Mode Only (AI disabled)"}
        >
          {aiEnabled ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse shrink-0" />
              <span className={compact ? "text-[11px]" : "hidden sm:inline"}>
                {compact ? "AI On" : "Gemini AI Active"}
              </span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className={compact ? "text-[11px]" : "hidden sm:inline"}>
                {compact ? "Demo" : "Demo Only"}
              </span>
            </>
          )}
        </div>
      )}

      {/* Refetch Button */}
      <button
        onClick={() => refetch()}
        disabled={isFetching}
        className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
        title="Refresh backend status check"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
      </button>
    </div>
  );
}
