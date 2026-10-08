import { Recycle, Sprout, Trash2, AlertTriangle } from "lucide-react";

export const BIN_CONFIG = {
  recyclable: {
    label: "Recyclable",
    icon: Recycle,
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700",
    headerBg: "from-emerald-600 to-teal-600",
    cardBorder: "border-emerald-200 dark:border-emerald-800",
    accentText: "text-emerald-600 dark:text-emerald-400",
    colorName: "Green Bin",
  },
  organic: {
    label: "Organic / Compost",
    icon: Sprout,
    badgeColor: "bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-700",
    headerBg: "from-amber-700 to-stone-800",
    cardBorder: "border-amber-200 dark:border-amber-800",
    accentText: "text-amber-700 dark:text-amber-400",
    colorName: "Brown Bin",
  },
  compost: {
    label: "Organic / Compost",
    icon: Sprout,
    badgeColor: "bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-700",
    headerBg: "from-amber-700 to-stone-800",
    cardBorder: "border-amber-200 dark:border-amber-800",
    accentText: "text-amber-700 dark:text-amber-400",
    colorName: "Brown Bin",
  },
  "non-recyclable": {
    label: "Non-Recyclable (Landfill)",
    icon: Trash2,
    badgeColor: "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700",
    headerBg: "from-slate-600 to-slate-800",
    cardBorder: "border-slate-200 dark:border-slate-800",
    accentText: "text-slate-600 dark:text-slate-400",
    colorName: "Gray Bin",
  },
  special: {
    label: "Special Disposal (E-Waste / Hazard)",
    icon: AlertTriangle,
    badgeColor: "bg-purple-100 text-purple-900 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-700",
    headerBg: "from-purple-600 to-indigo-700",
    cardBorder: "border-purple-200 dark:border-purple-800",
    accentText: "text-purple-600 dark:text-purple-400",
    colorName: "Purple / Amber Bin",
  },
};
