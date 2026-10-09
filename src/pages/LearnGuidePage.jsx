import React from "react";
import { Link } from "react-router";
import { WASTE_CATEGORIES, FOUR_BINS_GUIDE } from "../data/demoData";
import {
  BookOpen,
  ArrowRight,
  Recycle,
  Lightbulb,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  HelpCircle,
  Sparkles
} from "lucide-react";

export default function LearnGuidePage() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Recycling Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Recycling &amp; Disposal Guide
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Understanding where trash goes helps everyone recycle better. Learn the rules, avoid common mistakes, and keep clean materials out of dumps.
        </p>
      </div>

      {/* Quick Nav Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/bins"
          className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <Recycle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-lg text-slate-900 dark:text-white">
              The 4 Bins System
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Color-coded rules for Recyclables, Food scraps, Regular trash, and Special items.
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Explore Bins</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          to="/categories"
          className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-lg text-slate-900 dark:text-white">
              Waste Categories
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Clear guide to Plastics, Metals, Paper, Glass, and Food scraps.
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-bold text-teal-600 dark:text-teal-400 gap-1 group-hover:translate-x-1 transition-transform">
            <span>View Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          to="/tips"
          className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-lg text-slate-900 dark:text-white">
              Tips &amp; Best Practices
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Quick tips, rinsing rules, mistakes to avoid, and creative reuse ideas.
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-bold text-amber-600 dark:text-amber-400 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Read Tips</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* Overview of 6 Major Waste Categories */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Waste Types at a Glance
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Click any card to see how to recycle it and how long it takes to break down.
            </p>
          </div>

          <Link
            to="/categories"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WASTE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4 hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-2xl">
                  {cat.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {cat.recyclability}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{cat.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-1 text-xs">
                <strong className="text-slate-700 dark:text-slate-300 font-bold block">
                  Quick Prep Tip:
                </strong>
                <p className="text-slate-600 dark:text-slate-400">{cat.prepTip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Callout Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl sm:text-2xl font-black">
            Put your knowledge to the test!
          </h3>
          <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
            Practice sorting random waste items into the 4 bins in our interactive game and build your eco streak.
          </p>
        </div>

        <Link
          to="/game"
          className="px-6 py-3.5 rounded-2xl bg-white text-slate-950 font-black text-xs hover:bg-slate-100 transition shadow-md shrink-0 flex items-center gap-2"
        >
          <span>Play Sorting Game</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
