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
      title: "Plastics",
      image: "/images/items/plastic-bottle.jpg",
      icon: "🥤",
      resinCodes: [
        { code: "#1 PET", name: "Drink Bottles (Clear Plastic)", accepted: "Widely Recycled", examples: "Water bottles, soda bottles, salad dressing jugs" },
        { code: "#2 HDPE", name: "Heavy Jugs (Thick Plastic)", accepted: "Widely Recycled", examples: "Milk jugs, shampoo bottles, detergent bottles" },
        { code: "#3 PVC", name: "Pipes & Tubes (Hard Plastic)", accepted: "Rarely Recycled", examples: "Pipes, shower curtains, medical tubing" },
        { code: "#4 LDPE", name: "Plastic Wrap & Soft Bags", accepted: "Store Drop-off Only", examples: "Squeeze bottles, grocery bags, bread bags" },
        { code: "#5 PP", name: "Hard Tubs & Containers", accepted: "Frequently Recycled", examples: "Yogurt cups, medicine bottles, bottle caps" },
        { code: "#6 PS", name: "Styrofoam & Foam Cups", accepted: "Regular Trash Only", examples: "Takeout foam containers, disposable cups" },
        { code: "#7 Other", name: "Mixed Plastics", accepted: "Regular Trash Only", examples: "Chip bags, snack pouches, baby bottles" }
      ],
      rules: [
        "Pour out all liquids completely before tossing.",
        "Screw plastic bottle caps back on tightly.",
        "Never put soft plastic grocery bags in home recycling bins.",
        "Avoid black plastic when possible; sorting sensors have trouble seeing dark colors."
      ],
      lifecycle: "Plastics are chopped into tiny flakes, washed, melted down, and turned into new bottles, warm jackets, or carpet fibers."
    },
    metal: {
      title: "Metals",
      image: "/images/items/aluminum-can.jpg",
      icon: "🥫",
      resinCodes: [
        { code: "Aluminum", name: "Drink Cans & Clean Foil", accepted: "100% Recyclable", examples: "Soda cans, sparkling water cans, clean pie pans" },
        { code: "Steel / Tin", name: "Food & Soup Cans", accepted: "100% Recyclable", examples: "Soup cans, canned beans, pet food cans" },
        { code: "Copper / Brass", name: "Wires & Pipes", accepted: "Scrap Metal Centers", examples: "Old pipes, charging cords, electrical wiring" }
      ],
      rules: [
        "Do not smash cans completely flat; sorting cameras might mistake a flat disc for paper!",
        "Make sure spray cans are completely empty before recycling.",
        "Rinse food chunks from food cans; you can leave paper labels on."
      ],
      lifecycle: "Aluminum and steel are melted down and made into new cans again and again without losing any strength."
    },
    paper: {
      title: "Paper & Cardboard",
      image: "/images/items/cardboard.jpg",
      icon: "📦",
      resinCodes: [
        { code: "Cardboard", name: "Brown Shipping Boxes", accepted: "Highest Value", examples: "Delivery boxes, moving boxes" },
        { code: "Paperboard", name: "Food Boxes & Cartons", accepted: "Widely Recycled", examples: "Cereal boxes, tissue boxes, shoe boxes" },
        { code: "White Paper", name: "Office & School Sheets", accepted: "Widely Recycled", examples: "Printer paper, envelopes, notebooks" },
        { code: "Newsprint", name: "Newspapers & Magazines", accepted: "Widely Recycled", examples: "Magazines, flyers, comics" }
      ],
      rules: [
        "Keep all cardboard and paper dry and clean.",
        "Flatten all shipping boxes so they take up less space.",
        "Greasy pizza boxes belong in the food compost bin or regular trash, not the clean paper bin."
      ],
      lifecycle: "Paper is mixed with warm water, cleaned of ink, and pressed into new cardboard or tissues up to 7 times."
    },
    glass: {
      title: "Glass",
      image: "/images/items/glass-bottle.jpg",
      icon: "🍾",
      resinCodes: [
        { code: "Clear Glass", name: "Jars & Bottles", accepted: "100% Recyclable", examples: "Pickle jars, water bottles, jam jars" },
        { code: "Brown Glass", name: "Drink Bottles", accepted: "100% Recyclable", examples: "Beer bottles, medicine bottles" },
        { code: "Green Glass", name: "Green Bottles", accepted: "100% Recyclable", examples: "Wine bottles, olive oil bottles" }
      ],
      rules: [
        "Rinse out food scraps; labels can stay on.",
        "Take off metal caps and corks.",
        "Never put lightbulbs, window glass, mirrors, or ceramic coffee mugs in the glass bin."
      ],
      lifecycle: "Used glass is crushed, melted down easily, and poured into new jars and bottles with almost zero waste."
    },
    organic: {
      title: "Food & Organics",
      image: "/images/items/banana-peel.jpg",
      icon: "🍌",
      resinCodes: [
        { code: "Food Scraps", name: "Kitchen Leftovers", accepted: "Compost Bin", examples: "Fruit peels, vegetable ends, coffee grounds" },
        { code: "Yard Waste", name: "Garden Trimmings", accepted: "Compost Bin", examples: "Dry leaves, twigs, grass clippings" },
        { code: "Soiled Paper", name: "Uncoated Paper", accepted: "Compost Bin", examples: "Paper napkins, greasy unlined paper plates" }
      ],
      rules: [
        "Peel off tiny plastic stickers on fruits and vegetables.",
        "Do not toss food in plastic bags unless certified compostable.",
        "Keep dog and cat waste out of food compost bins."
      ],
      lifecycle: "Natural microbes break down food scraps in 2 to 3 months, turning them into rich fertilizer that helps plants grow."
    },
    ewaste: {
      title: "Electronics & Batteries",
      image: "/images/items/battery.jpg",
      icon: "🔋",
      resinCodes: [
        { code: "Rechargeable", name: "Phone & Tool Batteries", accepted: "Special Drop-Off", examples: "Phones, vape pens, laptops, power tools" },
        { code: "Single-Use", name: "Everyday Batteries", accepted: "Battery Drop-Off", examples: "AA, AAA, 9V batteries" },
        { code: "Electronics", name: "Old Gadgets & Cords", accepted: "Electronics Drop-Off", examples: "Old laptops, phones, cables, chargers" }
      ],
      rules: [
        "WARNING: Never put batteries in regular trash cans; they can cause fires.",
        "Tape the ends of batteries with clear tape before dropping them off.",
        "Bring old gadgets to local electronic drop-off centers or store bins."
      ],
      lifecycle: "Specialized recycling centers safely take apart batteries to recover valuable metals like lithium and copper for new devices."
    }
  };

  const activeCategory = categoriesDetail[selectedCat] || categoriesDetail.plastic;

  return (
    <div className="space-y-12 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Waste Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Waste Categories
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Learn what everyday items are made of, how to prepare them, and what happens when they get recycled.
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
            <span className="text-base leading-none shrink-0">{cat.icon}</span>
            <span>{cat.title}</span>
          </button>
        ))}
      </div>

      {/* Selected Category Deep Dive Panel */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-8 animate-in fade-in">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-700 shrink-0 shadow-md flex items-center justify-center">
            <img
              src={activeCategory.image}
              alt={activeCategory.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = "block";
              }}
            />
            <span className="hidden text-3xl sm:text-4xl">{activeCategory.icon}</span>
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
