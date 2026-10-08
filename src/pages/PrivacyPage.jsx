import React from "react";
import { Shield, Lock, EyeOff, Server } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto py-4">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" />
          <span>Security &amp; Ethics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">Last updated: October 2026</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-emerald-500" />
            <span>1. Zero Photo Retention Policy</span>
          </h2>
          <p>
            EcoScan does not permanently store, persist, or catalog photographs uploaded by users. When you scan an image, the image byte-stream is processed ephemerally in volatile RAM solely for the purpose of executing the Google Gemini Vision inference request. Once classification finishes, the image buffer is deallocated immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-500" />
            <span>2. Data Transmission &amp; Security</span>
          </h2>
          <p>
            All network communication between your web browser and our Spring Boot backend occurs over encrypted TLS/HTTPS protocols. No biometric or facial recognition algorithms are applied to imagery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-500" />
            <span>3. Local Storage Preferences</span>
          </h2>
          <p>
            We use your browser's standard <code>localStorage</code> only to remember your interface theme preferences (Light vs Dark mode) and your voluntary sorting game streak. No third-party behavioral advertising trackers are embedded.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            4. Contact Our Data Protection Team
          </h2>
          <p>
            If you have questions regarding data privacy or security practices, contact us at <code>privacy@ecoscan.app</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
