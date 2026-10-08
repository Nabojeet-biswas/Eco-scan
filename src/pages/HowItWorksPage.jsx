import React from "react";
import { Link } from "react-router";
import {
  Camera,
  Cpu,
  Sparkles,
  Recycle,
  CheckCircle2,
  ShieldCheck,
  Server,
  Layers,
  ArrowRight
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      step: 1,
      title: "Image Capture & Normalization",
      subtitle: "Client-side processing & compression",
      icon: Camera,
      color: "from-blue-500 to-cyan-500",
      description:
        "When you snap a photo or upload an image, EcoScan automatically normalizes EXIF orientation, validates the file format (JPEG, PNG, WebP), and ensures the payload conforms to our 5MB high-speed transmission standard.",
      techNote: "Canvas-based client preview & instant memory serialization"
    },
    {
      step: 2,
      title: "Spring Boot Microservice Ingestion",
      subtitle: "Secure multipart streaming & validation",
      icon: Server,
      color: "from-teal-500 to-emerald-500",
      description:
        "Your image is safely sent via multipart/form-data to our Spring Boot backend. The server checks content types, filters malicious binaries, and buffers the photo ephemerally in RAM — never saving photos to persistent hard drives.",
      techNote: "Zero photo retention • Ephemeral byte-stream processing"
    },
    {
      step: 3,
      title: "Google Gemini 2.0 AI Vision Inference",
      subtitle: "Multi-modal spatial reasoning & segmentation",
      icon: Sparkles,
      color: "from-emerald-500 to-teal-600",
      description:
        "The image bytes are fed to Google's state-of-the-art Gemini 2.0 multi-modal AI. The model identifies visual material cues (transparency of PET, reflective glints of aluminum, organic textures of peels) and isolates multiple distinct items in a single shot.",
      techNote: "Multi-waste object segmentation & polymer recognition"
    },
    {
      step: 4,
      title: "Universal Bin Mapping & Guidance",
      subtitle: "Actionable municipal circular economy directives",
      icon: Recycle,
      color: "from-amber-500 to-emerald-600",
      description:
        "The identified waste polymers are cross-referenced with municipal recycling taxonomies. You receive an unambiguous color-coded bin (Green, Brown, Gray, Purple), preparation instructions, decomposition timelines, and reuse ideas.",
      techNote: "Color-coded bin classification + circular lifecycle enrichment"
    }
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          <span>Under the Hood</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          How AI Vision Works
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          From the click of your smartphone camera to actionable circular economy guidance: explore our end-to-end multi-modal architecture.
        </p>
      </div>

      {/* Visual Pipeline Steps */}
      <div className="space-y-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-start gap-6 relative overflow-hidden"
            >
              <div className="flex items-center gap-4 md:flex-col md:items-center md:text-center shrink-0">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center shadow-md`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Step 0{s.step}
                </span>
              </div>

              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {s.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {s.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {s.description}
                </p>

                {/* Step Visual Asset */}
                {s.step === 3 && (
                  <div className="pt-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-w-lg">
                    <img
                      src="/images/hero-scan.jpg"
                      alt="Google Gemini Vision multi-modal scanning"
                      className="w-full h-auto object-cover max-h-48"
                    />
                  </div>
                )}

                {s.step === 4 && (
                  <div className="pt-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-w-lg">
                    <img
                      src="/images/four-bins.jpg"
                      alt="Universal 4 color-coded bins"
                      className="w-full h-auto object-cover max-h-48"
                    />
                  </div>
                )}

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/60 px-3 py-1 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{s.techNote}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Try It CTA */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-black">Ready to test it in action?</h3>
        <p className="text-xs sm:text-sm text-emerald-50 max-w-md mx-auto">
          Scan any household packaging right now or test our pre-computed Demo Gallery.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/scan"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white text-slate-950 font-black text-xs hover:bg-slate-100 transition shadow-md"
          >
            Open Live Camera Scanner
          </Link>
          <Link
            to="/demo"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-700/60 text-white font-bold text-xs hover:bg-emerald-700 transition"
          >
            Explore Demo Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
