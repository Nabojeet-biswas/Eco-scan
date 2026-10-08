import React from "react";
import { Link } from "react-router";
import {
  Lightbulb,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  XCircle,
  Recycle,
  ArrowRight
} from "lucide-react";

export default function TipsPage() {
  const tips = [
    {
      title: "The 30-Second Cold Rinse Rule",
      category: "Preparation",
      icon: "💧",
      summary: "Containers don't need to be dish-washer sterile, but food grease ruins recycling batches.",
      body: "A quick splash of cold water to rinse out milk, yogurt, or salad dressing is all that's required. Leaving thick peanut butter or oils in jars attracts rodents and can cause entire pallets of paper to be rejected if oils splatter in the compactor."
    },
    {
      title: "Caps On or Off? (Leave Them On!)",
      category: "Plastics",
      icon: "🥤",
      summary: "Modern recycling facilities prefer caps screwed tightly onto plastic bottles.",
      body: "Historically, facilities asked people to remove caps because the cap (often polypropylene #5) is a different plastic than the bottle (PET #1). Today, flotation tanks automatically separate them! Loose caps fall through mechanical sorting screens into landfill trash — leaving them on ensures both get recycled."
    },
    {
      title: "Don't Crush Aluminum Cans Flat",
      category: "Metals",
      icon: "🥫",
      summary: "Keep cans in their 3D cylinder shape so sorting machines recognize them.",
      body: "Modern material recovery facilities (MRFs) use automated optical infrared sensors and spinning eddy-current rotors. Completely flattened cans look like flat sheets of cardboard to the optical sensor and accidentally get blown into the paper stream."
    },
    {
      title: "The Great Pizza Box Dilemma",
      category: "Paper & Cardboard",
      icon: "🍕",
      summary: "Tear the box in half: clean lid in recycling, greasy bottom in organic/trash.",
      body: "Cardboard cannot be cleaned with water during pulping if it is soaked in animal fats and melted cheese. Tear off the clean top lid and recycle it; put the greasy bottom into your compost caddy or landfill bin."
    },
    {
      title: "Avoid 'Wishcycling' at All Costs",
      category: "Mindset",
      icon: "⚠️",
      summary: "Hoping an unrecyclable item gets recycled actually causes more harm than good.",
      body: "Putting garden hoses, bowling balls, or plastic clothes hangers in your recycling bin causes gear tangles, fires, and equipment breakdowns. When in doubt, check EcoScan or toss it in the landfill bin."
    },
    {
      title: "No Plastic Bags in Curbside Bins",
      category: "Common Mistake",
      icon: "🛍️",
      summary: "Plastic grocery bags belong in supermarket storefront drop-offs only.",
      body: "Thin films wrap around spinning cylindrical shafts like giant weeds, requiring operators to halt multimillion-dollar plants twice a day and cut them out with utility knives."
    }
  ];

  const upcyclingIdeas = [
    {
      name: "Glass Jars to Food Pantry Containers",
      desc: "Remove labels with warm soapy water and use pasta sauce jars to store grains, rice, or homemade dressings."
    },
    {
      name: "Cardboard Egg Cartons for Seed Starting",
      desc: "Fill cardboard egg cups with potting soil and plant seeds; plant the entire biodegradable cup directly in the garden."
    },
    {
      name: "Plastic Bottle Self-Watering Planters",
      desc: "Cut a 2L soda bottle in half, invert the top with a wick thread, and you have an automated herb hydration system."
    },
    {
      name: "Coffee Grounds as Natural Fertilizer",
      desc: "Acid-loving plants like blueberries, hydrangeas, and roses love nitrogen-rich leftover espresso and drip coffee grounds."
    }
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Pro Recycling Habits</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Tips &amp; Best Practices
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Master the small everyday adjustments that make an outsized impact on landfill diversion and municipal recycling efficiency.
        </p>
      </div>

      {/* Top 6 Pro Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((t, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3 hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">{t.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {t.category}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.title}
            </h3>

            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {t.summary}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
              {t.body}
            </p>
          </div>
        ))}
      </div>

      {/* Upcycling & Reuse Inspiration */}
      <div className="bg-slate-100 dark:bg-slate-800/60 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 space-y-6">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Circular Creativity
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Creative Reuse &amp; Upcycling Ideas
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Before recycling an item, consider whether it can be repurposed around the home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {upcyclingIdeas.map((idea, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1.5"
            >
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>{idea.name}</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {idea.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
