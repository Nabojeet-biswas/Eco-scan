import React, { useState } from "react";
import { Link } from "react-router";
import { FAQS } from "../data/demoData";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ArrowRight
} from "lucide-react";

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <div className="space-y-12 max-w-3xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Answers &amp; Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Everything you need to know about EcoScan's AI vision, bin guidelines, image security, and supported formats.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs transition-colors"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
              >
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {faq.q}
                </span>
                <span className="p-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/80 pt-4 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Prompt */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 text-center space-y-3">
        <MessageCircle className="w-8 h-8 text-emerald-500 mx-auto" />
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          Have a question not answered here?
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          We are constantly refining our material taxonomy. Send us your feedback or report an item classification.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition shadow-sm"
        >
          <span>Send Us Feedback</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
