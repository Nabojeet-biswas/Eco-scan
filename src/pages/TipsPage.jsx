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
      summary: "Containers don't need to be squeaky clean, but grease ruins recycling.",
      body: "A quick splash of water to rinse out milk, yogurt, or salad dressing is all you need. Leaving thick peanut butter or grease in jars can ruin clean paper and cardboard in the recycling truck."
    },
    {
      title: "Caps On or Off? (Leave Them On!)",
      category: "Plastics",
      icon: "🥤",
      summary: "Recycling centers prefer caps screwed tightly onto plastic bottles.",
      body: "In the past, recycling centers asked people to remove caps. Today, modern machines easily separate them in water tanks! If caps are left loose, they fall through sorting screens into regular trash. Screwing them on keeps them together."
    },
    {
      title: "Don't Crush Aluminum Cans Flat",
      category: "Metals",
      icon: "🥫",
      summary: "Keep cans in their normal cylinder shape so machines recognize them.",
      body: "Recycling sorting centers use smart cameras. If a can is crushed completely flat, the camera might mistake it for paper and send it to the wrong pile!"
    },
    {
      title: "The Great Pizza Box Dilemma",
      category: "Paper & Cardboard",
      icon: "🍕",
      summary: "Tear the box in half: clean lid in recycling, greasy bottom in trash.",
      body: "Cardboard cannot be recycled if it is soaked in melted cheese and grease. Tear off the clean top lid and recycle it; put the greasy bottom into food compost or regular trash."
    },
    {
      title: "Don't Guess — Only Recycle What Belongs",
      category: "Mindset",
      icon: "⚠️",
      summary: "Hoping non-recyclable trash will magically get recycled actually ruins clean batches.",
      body: "Putting garden hoses, wire hangers, or broken toys in your recycling bin tangles machinery and causes breakdowns. When in doubt, check EcoScan or put it in the regular trash bin."
    },
    {
      title: "No Plastic Bags in Home Recycling Bins",
      category: "Common Mistake",
      icon: "🛍️",
      summary: "Plastic grocery bags belong in grocery store drop-off bins only.",
      body: "Thin plastic bags wrap around spinning sorting gears like giant weeds, forcing workers to stop the whole factory to cut them out."
    }
  ];

  const upcyclingIdeas = [
    {
      name: "Glass Jars as Pantry Storage",
      desc: "Wash off labels with warm water and use glass pasta sauce jars to store rice, beans, or snacks."
    },
    {
      name: "Cardboard Egg Cartons for Small Plants",
      desc: "Fill cardboard egg cups with soil and seeds. You can plant the whole cup right into the garden soil because it breaks down naturally."
    },
    {
      name: "Plastic Bottle Self-Watering Planters",
      desc: "Cut a large plastic bottle in half, flip the top upside down with a short string, and you have an easy self-watering plant pot."
    },
    {
      name: "Coffee Grounds as Plant Food",
      desc: "Leftover coffee grounds are packed with nutrients that help garden soil and indoor potted plants grow."
    }
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Helpful Recycling Habits</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Tips &amp; Best Practices
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Learn simple everyday habits that keep trash out of dumps and make recycling easy and effective.
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
            Creative Reuse
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Creative Reuse &amp; Upcycling Ideas
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Before throwing an item away, see if you can give it a second life at home.
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
