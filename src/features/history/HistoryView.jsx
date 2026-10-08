import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearHistory, resetScore, setActiveTab } from "../eco/ecoSlice";
import {
  History,
  Award,
  Flame,
  CheckCircle2,
  XCircle,
  Trash2,
  TrendingUp,
} from "lucide-react";

export default function HistoryView() {
  const dispatch = useDispatch();
  const { history, score, streak, bestStreak } = useSelector((state) => state.eco);

  const totalSorted = history.length;
  const correctCount = history.filter((h) => h.isCorrect).length;
  const accuracy = totalSorted > 0 ? Math.round((correctCount / totalSorted) * 100) : 0;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title & Stats */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 shrink-0" />
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900">
              Activity & Sorting History
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your recycling decisions, scores, and streaks across sessions.
          </p>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => dispatch(clearHistory())}
              className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition cursor-pointer flex items-center justify-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <button
              onClick={() => dispatch(resetScore())}
              className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition cursor-pointer text-center"
            >
              Reset Points
            </button>
          </div>
        )}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500">Total Points</p>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl sm:text-3xl font-black text-slate-900 mt-1.5 sm:mt-2">{score}</p>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500">Accuracy Rate</p>
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-xl sm:text-3xl font-black text-slate-900 mt-1.5 sm:mt-2">{accuracy}%</p>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500">Current Streak</p>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl sm:text-3xl font-black text-amber-600 mt-1.5 sm:mt-2">{streak}x</p>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500">Best Streak</p>
            <Flame className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-xl sm:text-3xl font-black text-orange-600 mt-1.5 sm:mt-2">{bestStreak}x</p>
        </div>
      </div>

      {/* History Log */}
      {history.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-xs sm:text-sm text-slate-900">Recent Sorting Decisions</h3>
            <span className="text-[11px] sm:text-xs text-slate-500">{history.length} items recorded</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      entry.isCorrect
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {entry.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{entry.itemName}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500">
                      Category: {entry.category || "General"} • Correct Bin:{" "}
                      <span className="font-semibold text-slate-700 capitalize">
                        {entry.bin}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs w-full sm:w-auto pt-2 sm:pt-0 border-t border-slate-100 sm:border-0">
                  <div className="text-left sm:text-right">
                    <span
                      className={`font-semibold px-2 py-0.5 rounded-full capitalize text-[11px] sm:text-xs ${
                        entry.isCorrect
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      Your pick: {entry.userBin}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5 sm:mt-1">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </p>
                  </div>

                  <span
                    className={`font-bold px-2 py-1 rounded-lg text-xs shrink-0 ${
                      entry.isCorrect
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {entry.isCorrect ? `+${entry.pointsEarned} pts` : "0 pts"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center space-y-4">
          <History className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No activity recorded yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try sorting a demo item or scan your own trash to start earning Eco points and building your history!
          </p>
          <button
            onClick={() => dispatch(setActiveTab("sort"))}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Play Sorting Game Now
          </button>
        </div>
      )}
    </div>
  );
}
