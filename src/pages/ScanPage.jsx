import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  useScanImageMutation,
  useGetStatusQuery,
} from "../app/services/ecoScanApi";
import { setActiveItem, startScanQueue } from "../features/eco/ecoSlice";
import { DEMO_ITEMS } from "../data/demoData";
import {
  UploadCloud,
  Camera,
  Sparkles,
  AlertCircle,
  FileWarning,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  ImageIcon,
  X,
  Play,
} from "lucide-react";

export default function ScanPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [scanStepMessage, setScanStepMessage] = useState(
    "Checking your item with AI...",
  );

  const [scanImageMutation, { isLoading: isScanning }] = useScanImageMutation();
  const { data: statusData, isError: isStatusError } = useGetStatusQuery();

  const isAiOnline = !isStatusError && Boolean(statusData?.aiEnabled);

  const handleFileChange = (file) => {
    setErrorMessage(null);
    if (!file) return;

    // Validate size (5MB max)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setErrorMessage(
        "Photo is too large (over 5MB). Please upload a smaller photo under 5MB.",
      );
      return;
    }

    // Validate format
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrorMessage(
        "Unsupported file type. Please upload a JPEG, PNG, or WebP photo.",
      );
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const triggerScan = async (fileToScan = selectedFile, customPreviewUrl = null) => {
    if (!fileToScan) return;
    setErrorMessage(null);

    const activeImageUrl =
      customPreviewUrl ||
      previewUrl ||
      (fileToScan instanceof Blob ? URL.createObjectURL(fileToScan) : null);

    // Step animation feedback
    setScanStepMessage("Checking what this item is made of...");
    const stepTimer = setTimeout(() => {
      setScanStepMessage("Finding the right bin for your item...");
    }, 1200);

    try {
      const formData = new FormData();
      formData.append("image", fileToScan);

      const result = await scanImageMutation(formData).unwrap();
      clearTimeout(stepTimer);

      if (result) {
        // Multi-waste result check
        if (result.items && result.items.length > 0) {
          dispatch(startScanQueue(result.items));
          dispatch(setActiveItem(result.primaryItem || result.items[0]));
          navigate("/result", {
            state: { result, isMulti: true, scannedImageUrl: activeImageUrl },
          });
        } else {
          dispatch(setActiveItem(result));
          navigate("/result", {
            state: { result, scannedImageUrl: activeImageUrl },
          });
        }
      }
    } catch (err) {
      clearTimeout(stepTimer);
      console.error("Scan mutation error:", err);

      let msg = err?.data?.message;
      if (!msg) {
        if (err?.status === 400) {
          msg = "Could not read the photo. Please try a clearer picture.";
        } else if (err?.status === 502) {
          msg =
            "AI service is temporarily busy. Please try again or explore our Demo Gallery.";
        } else if (err?.status === 503) {
          msg =
            "AI mode is not active right now. Please explore our Demo Gallery instead.";
        } else if (err?.status === 500) {
          msg =
            "Something went wrong while scanning. Please try again in a moment.";
        } else {
          msg =
            "Scan could not finish. Please check your internet connection or try again.";
        }
      }
      setErrorMessage(msg);
    }
  };

  // Quick sample photo selection
  const handleSelectSample = async (sampleType) => {
    setErrorMessage(null);
    try {
      const samplePath = `/images/items/${sampleType}.jpg`;
      const response = await fetch(samplePath);
      const blob = await response.blob();
      const sampleFile = new File([blob], `${sampleType}.jpg`, {
        type: "image/jpeg",
      });
      setSelectedFile(sampleFile);
      setPreviewUrl(samplePath);
      triggerScan(sampleFile, samplePath);
    } catch (err) {
      console.warn("Could not load sample image:", err);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-4">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          <span>AI Waste Scanner</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Scan Your Waste
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          Take a photo or upload an image to find out what it's made of and which bin to use.
        </p>
      </div>

      {/* AI Disabled / Simulation Notice */}
      {!isAiOnline && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="font-bold">
                AI in Demo Mode:{" "}
              </strong>
              AI is currently running with sample data. You can still scan or explore our instant Demo Gallery.
            </div>
          </div>
          <Link
            to="/demo"
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 transition"
          >
            Switch to Demo Mode
          </Link>
        </div>
      )}

      {/* Main Drag-and-Drop & Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative rounded-3xl border-2 border-dashed p-6 sm:p-12 text-center transition-all ${
          dragActive
            ? "border-emerald-500 bg-emerald-500/5 scale-102"
            : previewUrl
              ? "border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-800"
              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-emerald-400"
        } shadow-sm`}
      >
        {/* Hidden inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files?.[0])}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files?.[0])}
        />

        {/* Scanning Loading State Overlay */}
        {isScanning && (
          <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl z-20 flex flex-col items-center justify-center p-6 space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
              <Sparkles className="w-6 h-6 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Checking your item with AI...
              </h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-pulse">
                {scanStepMessage}
              </p>
            </div>
          </div>
        )}

        {previewUrl ? (
          /* Image Selected Preview */
          <div className="space-y-6">
            <div className="relative max-w-sm mx-auto rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 max-h-[340px]">
              <img
                src={previewUrl}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition cursor-pointer"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => triggerScan()}
                disabled={isScanning}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-sm shadow-lg shadow-emerald-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Scan This Waste</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isScanning}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs transition cursor-pointer"
              >
                Choose Different Photo
              </button>
            </div>
          </div>
        ) : (
          /* Empty Upload State */
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Drag and drop your photo here
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                or choose from your device
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Take Photo</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Upload Photo</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 pt-2">
              Supported formats: JPEG, PNG, WebP • Maximum file size: 5MB
            </p>
          </div>
        )}
      </div>

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-rose-900 dark:text-rose-200 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs space-y-2">
            <strong className="font-bold block text-sm">
              Could Not Complete Scan
            </strong>
            <p>{errorMessage}</p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => triggerScan()}
                className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-[11px] hover:bg-rose-700 transition"
              >
                Retry Scan
              </button>
              <Link
                to="/demo"
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-700 text-rose-700 dark:text-rose-300 font-bold text-[11px] hover:bg-rose-50 transition"
              >
                Explore Demo Mode Instead
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quick Test Sample Images Preset Row */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>No photo right now? Try an instant example:</span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => handleSelectSample("plastic-bottle")}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-600 hover:border-emerald-400 text-left transition flex items-center gap-2.5 cursor-pointer group"
          >
            <img
              src="/images/items/plastic-bottle.jpg"
              alt="Plastic Bottle"
              className="w-9 h-9 rounded-lg object-cover shrink-0 shadow-2xs border border-slate-200 dark:border-slate-600 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0">
              <p className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">
                Plastic Bottle
              </p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Green Bin
              </span>
            </div>
          </button>

          <button
            onClick={() => handleSelectSample("aluminum-can")}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-600 hover:border-emerald-400 text-left transition flex items-center gap-2.5 cursor-pointer group"
          >
            <img
              src="/images/items/aluminum-can.jpg"
              alt="Aluminum Can"
              className="w-9 h-9 rounded-lg object-cover shrink-0 shadow-2xs border border-slate-200 dark:border-slate-600 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0">
              <p className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">
                Aluminum Can
              </p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Green Bin
              </span>
            </div>
          </button>

          <button
            onClick={() => handleSelectSample("banana-peel")}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-600 hover:border-emerald-400 text-left transition flex items-center gap-2.5 cursor-pointer group"
          >
            <img
              src="/images/items/banana-peel.jpg"
              alt="Banana Peel"
              className="w-9 h-9 rounded-lg object-cover shrink-0 shadow-2xs border border-slate-200 dark:border-slate-600 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0">
              <p className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">
                Banana Peel
              </p>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                Brown Bin
              </span>
            </div>
          </button>

          <button
            onClick={() => handleSelectSample("battery")}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-600 hover:border-emerald-400 text-left transition flex items-center gap-2.5 cursor-pointer group"
          >
            <img
              src="/images/items/battery.jpg"
              alt="Battery"
              className="w-9 h-9 rounded-lg object-cover shrink-0 shadow-2xs border border-slate-200 dark:border-slate-600 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0">
              <p className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">
                Battery
              </p>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                Special Bin
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
