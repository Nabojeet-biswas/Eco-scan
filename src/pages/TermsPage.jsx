import React from "react";
import { FileText, CheckCircle2, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto py-4">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500">Last updated: October 2026</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the EcoScan web application, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>2. Educational Purpose &amp; Local Guidelines Precedence</span>
          </h2>
          <p>
            EcoScan is provided as an educational and advisory platform powered by computer vision artificial intelligence. While we strive for extreme accuracy, waste management contracts and processing facility capabilities vary widely across cities, counties, and countries.
          </p>
          <p>
            Your local municipal recycling authority's published guidelines always supersede any recommendation provided by EcoScan.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            3. Prohibited Content
          </h2>
          <p>
            Users agree not to upload non-waste imagery containing personally identifiable sensitive documentation, offensive imagery, or malicious exploit payloads.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            4. Disclaimer of Warranty
          </h2>
          <p>
            EcoScan is provided "as is" without warranty of any kind. EcoScan shall not be held liable for municipal fines, contamination penalties, or equipment damage resulting from item disposal.
          </p>
        </section>
      </div>
    </div>
  );
}
