import React from "react";
import { Link } from "react-router";
import { Recycle, Heart, Shield, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/25">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Eco<span className="text-emerald-400">Scan</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering individuals and communities with instant Google Gemini AI waste identification, clear color-coded disposal rules, and actionable circular lifecycle knowledge.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-xl w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Powered by Google Gemini 2.0 AI Vision</span>
            </div>
          </div>

          {/* Core Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore & Scan
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition">
                  Home Landing
                </Link>
              </li>
              <li>
                <Link to="/scan" className="hover:text-emerald-400 transition flex items-center gap-1.5 font-medium text-emerald-400">
                  <span>Scan Waste</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300">Live</span>
                </Link>
              </li>
              <li>
                <Link to="/demo" className="hover:text-emerald-400 transition">
                  Demo Gallery (9 Items)
                </Link>
              </li>
              <li>
                <Link to="/demo/multi" className="hover:text-emerald-400 transition">
                  Multi-Item Detection
                </Link>
              </li>
              <li>
                <Link to="/game" className="hover:text-emerald-400 transition">
                  Sorting Practice Game
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational Guides */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Learn & Guides
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/learn" className="hover:text-emerald-400 transition">
                  Learning Center
                </Link>
              </li>
              <li>
                <Link to="/bins" className="hover:text-emerald-400 transition">
                  4 Bins Guide
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-emerald-400 transition">
                  Waste Categories
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-emerald-400 transition">
                  How AI Vision Works
                </Link>
              </li>
              <li>
                <Link to="/tips" className="hover:text-emerald-400 transition">
                  Tips & Best Practices
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Trust */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Organization & Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-400 transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition">
                  Contact & Feedback
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-emerald-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-emerald-400 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EcoScan. Scan. Sort. Save the Planet. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span>Built with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
              <span>for a cleaner planet</span>
            </span>
            <span>•</span>
            <Link to="/privacy" className="hover:text-slate-400">
              Zero Photo Retention
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
