import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useGetStatusQuery } from "../app/services/ecoScanApi";
import { useTheme } from "../context/ThemeContext";
import {
  Recycle,
  Camera,
  Layers,
  BookOpen,
  Info,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Gamepad2,
  Trash2,
  ArrowRight
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: statusData, isError, isLoading } = useGetStatusQuery(undefined, {
    pollingInterval: 15000,
  });
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();

  const isAiOnline = !isError && Boolean(statusData?.aiEnabled);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/scan", label: "Scan Waste", highlight: true },
    { to: "/demo", label: "Demos" },
    { to: "/bins", label: "4 Bins Guide" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              <Recycle className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Eco<span className="text-emerald-500">Scan</span>
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 -mt-1 hidden sm:block">
                AI Waste Classifier
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? link.highlight
                          ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
                          : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold"
                        : link.highlight
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Bar (Status + Dark Mode + Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Minimalist AI Status Pill */}
            <Link
              to={isAiOnline ? "/scan" : "/demo"}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                isAiOnline
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                  : "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300"
              }`}
              title={
                isAiOnline
                  ? "Gemini AI Vision is live"
                  : "AI in simulation mode — click to open Demos"
              }
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  isAiOnline ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              <span className="hidden sm:inline">
                {isLoading ? "Checking..." : isAiOnline ? "AI Active" : "Demo Mode"}
              </span>
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open mobile menu"
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-1 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
            <Link
              to="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 text-center hover:text-emerald-500"
            >
              Categories
            </Link>
            <Link
              to="/tips"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 text-center hover:text-emerald-500"
            >
              Recycling Tips
            </Link>
            <Link
              to="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 text-center hover:text-emerald-500"
            >
              FAQ
            </Link>
            <Link
              to="/game"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 text-center hover:text-emerald-500"
            >
              Sorting Game
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
