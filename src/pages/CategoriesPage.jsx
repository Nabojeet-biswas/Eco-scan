import React, { useState } from "react";
import { Link } from "react-router";
import { WASTE_CATEGORIES } from "../data/demoData";
import {
  BookOpen,
  Recycle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function CategoriesPage() {
  const [selectedCat, setSelectedCat] = useState("plastic");

  const categoriesDetail = {
    plastic: {
      title: "Plastics & Polymers",
      image: "/images/items/plastic-bottle.jpg",
      icon: "🥤",
      resinCodes: [
        { code: "#1 PET", name: "Polyethylene Terephthalate", accepted: "Widely Recycled", examples: "Water bottles, soda bottles, salad dressing jugs" },
        { code: "#2 HDPE", name: "High-Density Polyethylene", accepted: "Widely Recycled", examples: "Milk jugs, shampoo bottles, detergent bottles" },
        { code: "#3 PVC", name: "Polyvinyl Chloride", accepted: "Rarely Recycled", examples: "Pipes, shower curtains, medical tubing" },
        { code: "#4 LDPE", name: "Low-Density Polyethylene", accepted: "Grocery Drop-off Only", examples: "Squeeze bottles, grocery bags, bread bags" },
        { code: "#5 PP", name: "Polypropylene", accepted: "Frequently Recycled", examples: "Yogurt cups, medicine bottles, bottle caps" },
        { code: "#6 PS", name: "Polystyrene (Styrofoam)", accepted: "Landfill Only", examples: "Foam takeout clamshells, disposable cups, packing peanuts" },
        { code: "#7 Other", name: "Polycarbonate / Multi-Layer", accepted: "Landfill Only", examples: "Multi-resin chips bags, baby bottles, optical discs" }
      ],
      rules: [
        "Empty liquid contents completely before recycling.",
        "Keep plastic screw-on caps securely attached to bottles.",
        "Never place thin plastic grocery bags or plastic film in curbside bins.",
        "Avoid dark/black plastics as automated optical sorters cannot detect carbon black pigment."
      ],
      lifecycle: "PET and HDPE are shredded into flakes, washed, melted into clean pellets, and re-spun into fleece fabric, carpeting, or new food-grade bottles."
    },
    metal: {
      title: "Metals & Alloys",
      image: "/images/items/aluminum-can.jpg",
      icon: "🥫",
      resinCodes: [
        { code: "Aluminum", name: "Beverage & Foil Alloy", accepted: "100% Recyclable", examples: "Soda cans, beer cans, clean pie pans" },
        { code: "Steel / Tin", name: "Ferrous Canned Goods", accepted: "100% Recyclable", examples: "Soup cans, vegetable tins, coffee cans" },
        { code: "Copper / Brass", name: "Non-Ferrous Scrap", accepted: "Scrap Metal Depots", examples: "Plumbing pipes, electrical wiring" }
      ],
      rules: [
        "Do not crush aluminum cans completely flat; optical sorters may confuse them with paper sheets.",
        "Ensure aerosol spray cans are completely depleted before recycling.",
        "Scrape food chunks from soup tins, but no need to remove paper labels."
      ],
      lifecycle: "Aluminum and steel are melted down in electric arc furnaces and rolled into sheet coils with zero degradation in metal quality — forever."
    },
    paper: {
      title: "Paper & Cardboard",
      image: "/images/items/cardboard.jpg",
      icon: "📦",
      resinCodes: [
        { code: "Corrugated", name: "Fluted Shipping Cardboard", accepted: "Highest Value", examples: "Amazon shipping boxes, appliance boxes" },
        { code: "Paperboard", name: "Single-Layer Chipboard", accepted: "Widely Recycled", examples: "Cereal boxes, tissue boxes, shoe boxes" },
        { code: "Office Paper", name: "Bleached High-Grade White", accepted: "Widely Recycled", examples: "Printer paper, envelopes, documents" },
        { code: "Mixed Paper", name: "Newsprint & Glossy", accepted: "Widely Recycled", examples: "Magazines, brochures, flyers" }
      ],
      rules: [
        "Cardboard and paper must remain clean and completely dry.",
        "Flatten all corrugated boxes to conserve bin volume.",
        "Greasy pizza boxes with cheese grease belong in organic compost or regular trash, NOT clean paper bins."
      ],
      lifecycle: "Paper is churned with warm water into pulp, screened for inks and adhesives, and pressed into new cardboard or tissue products up to 7 times."
    },
    glass: {
      title: "Glass Containers",
      image: "/images/items/glass-bottle.jpg",
      icon: "🍾",
      resinCodes: [
        { code: "Flint Glass", name: "Clear Container Glass", accepted: "100% Recyclable", examples: "Pickle jars, water bottles, baby food jars" },
        { code: "Amber Glass", name: "Brown Beverage Glass", accepted: "100% Recyclable", examples: "Beer bottles, pharmaceutical bottles" },
        { code: "Emerald Glass", name: "Green Beverage Glass", accepted: "100% Recyclable", examples: "Wine bottles, olive oil bottles" }
      ],
      rules: [
        "Rinse out food remains; paper labels do not need to be scraped off.",
        "Remove metal lids and plastic corks.",
        "Never place window panes, Pyrex ovenware, drinking tumblers, or ceramics in the glass recycling bin."
      ],
      lifecycle: "Crushed cullet glass is mixed with sand and melted in kilns at lower temperatures than raw materials, saving massive energy emissions."
    },
    organic: {
      title: "Organics & Food Scraps",
      image: "/images/items/banana-peel.jpg",
      icon: "🍌",
      resinCodes: [
        { code: "Green Waste", name: "Nitrogen-Rich Kitchen Scraps", accepted: "Compost Bin", examples: "Fruit peels, vegetable trimmings, coffee grounds" },
        { code: "Brown Waste", name: "Carbon-Rich Plant Matter", accepted: "Compost Bin", examples: "Dry leaves, twigs, plain shredded cardboard" },
        { code: "Food Soiled", name: "Unbleached Paper Products", accepted: "Compost Bin", examples: "Napkins, greasy unlined paper plates" }
      ],
      rules: [
        "Peel off tiny plastic stickers on fruits and vegetables.",
        "Do not wrap scraps in standard plastic bags.",
        "Keep pet waste and cat litter out of municipal food compost streams."
      ],
      lifecycle: "Microorganisms break down organic matter in 60-90 days, producing nutrient-rich humus compost that rejuvenates farm topsoils and sequesters carbon."
    },
    ewaste: {
      title: "E-Waste & Dangerous Items",
      image: "/images/items/battery.jpg",
      icon: "🔋",
      resinCodes: [
        { code: "Lithium-Ion", name: "Rechargeable Batteries", accepted: "Special Drop-Off Only", examples: "Phones, vape pens, laptops, power tools" },
        { code: "Alkaline", name: "Single-Use Cylindrical", accepted: "Battery Recycling Kiosk", examples: "AA, AAA, 9V batteries" },
        { code: "Consumer Electronics", name: "Circuit Boards & Monitors", accepted: "E-Waste Depot", examples: "Old laptops, tablets, chargers, cords" }
      ],
      rules: [
        "DANGER: Never place lithium batteries in household garbage or curbside bins.",
        "Cover battery terminals with electrical or clear tape to prevent short circuits.",
        "Take gadgets to electronics retailers or municipal drop-off days."
      ],
      lifecycle: "Specialized shredding and pyrometallurgical facilities recover high-purity lithium, cobalt, nickel, and copper to manufacture new vehicle batteries."
    }
  };

  const activeCategory = categoriesDetail[selectedCat] || categoriesDetail.plastic;

  return (
    <div className="space-y-12 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Material Encyclopedia</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Waste Categories
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Explore the composition, resin classifications, preparation checklists, and circular lifecycles of everyday waste materials.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Object.entries(categoriesDetail).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => setSelectedCat(key)}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              selectedCat === key
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25 ring-2 ring-emerald-300 dark:ring-emerald-700"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-300"
            }`}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-5 h-5 rounded-md object-cover shrink-0 shadow-2xs"
            />
            <span>{cat.title}</span>
          </button>
        ))}
      </div>

      {/* Selected Category Deep Dive Panel */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-8 animate-in fade-in">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-700 shrink-0 shadow-md">
            <img
              src={activeCategory.image}
              alt={activeCategory.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {activeCategory.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Detailed classifications, acceptable items, and processing rules.
            </p>
          </div>
        </div>

        {/* Resin Codes / Classification Table */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            Material Classifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeCategory.resinCodes.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-slate-900 dark:text-white">
                    {item.code}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.accepted.includes("Widely") || item.accepted.includes("100%") || item.accepted.includes("Compost")
                      ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                      : "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                  }`}>
                    {item.accepted}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {item.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Examples: {item.examples}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Rules */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            Disposal &amp; Preparation Rules
          </h3>
          <ul className="space-y-2.5">
            {activeCategory.rules.map((rule, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  ✓
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lifecycle Explanation */}
        <div className="bg-emerald-50/60 dark:bg-emerald-950/30 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-1">
          <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>After Recycling: Circular Lifecycle</span>
          </h4>
          <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed">
            {activeCategory.lifecycle}
          </p>
        </div>
      </div>
    </div>
  );
}
