import React from "react";
import { Link, useLocation } from "react-router";
import { Camera, Sparkles } from "lucide-react";

export default function FloatingScanButton() {
  const location = useLocation();

  // Hide on the scan page itself
  if (location.pathname === "/scan") {
    return null;
  }

  return (
    <Link
      to="/scan"
      className="fixed bottom-6 right-5 z-40 md:hidden flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/35 hover:scale-105 active:scale-95 transition-all focus:outline-hidden"
      aria-label="Scan Waste"
    >
      <div className="relative">
        <Camera className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
      </div>
      <span>Scan Waste</span>
    </Link>
  );
}
