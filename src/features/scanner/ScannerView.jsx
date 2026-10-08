import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useScanImageMutation,
  useLazyGetDemoResultQuery,
  useLazyGetMultiDemoQuery,
  useGetDemoListQuery,
} from "../../app/services/ecoScanApi";
import { setActiveItem, setActiveTab, startScanQueue } from "../eco/ecoSlice";
import WasteResultCard from "../waste/WasteResultCard";
import {
  Camera,
  UploadCloud,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Image as ImageIcon,
  X,
  FlipHorizontal,
  Sliders,
  CheckCircle2,
  Layers,
  ArrowRight,
  ListOrdered,
} from "lucide-react";

export default function ScannerView() {
  const dispatch = useDispatch();
  const { activeItem } = useSelector((state) => state.eco);
  const [scanImage, { isLoading: isScanLoading }] = useScanImageMutation();
  const [fetchDemoResult, { isLoading: isDemoLoading }] =
    useLazyGetDemoResultQuery();
  const [fetchMultiDemo, { isLoading: isMultiDemoLoading }] =
    useLazyGetMultiDemoQuery();
  const { data: demoList } = useGetDemoListQuery();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");

  // Mode: 'ai' or 'demo'
  const [scanMode, setScanMode] = useState("ai");
  const [scanError, setScanError] = useState(null);
  const [fallbackResult, setFallbackResult] = useState(null);
  const [autoFallbackUsed, setAutoFallbackUsed] = useState(false);

  // Multi-waste detection state
  const [detectedBatch, setDetectedBatch] = useState(null);
  const [selectedBatchIndex, setSelectedBatchIndex] = useState(0);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const isLoading = isScanLoading || isDemoLoading || isMultiDemoLoading;

  // Stop camera stream callback
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  // Clean up object URLs and camera tracks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      stopCamera();
    };
  }, [previewUrl, stopCamera]);

  // Start camera stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        stopCamera();
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.warn("Camera access error:", err);
      setCameraError(
        "Could not access camera. Please allow camera permissions or upload an image file instead.",
      );
      setIsCameraActive(false);
    }
  };

  // Helper to process either envelope or single WasteResult
  const processScanResponse = (result) => {
    if (!result) return;
    let items = [];
    let primary = null;

    if (
      result.items &&
      Array.isArray(result.items) &&
      result.items.length > 0
    ) {
      items = result.items;
      primary = result.primaryItem || result.items[0];
    } else if (result.itemName) {
      items = [result];
      primary = result;
    }

    if (items.length > 0) {
      setDetectedBatch({
        items,
        totalDetected: result.totalDetected || items.length,
      });
      setSelectedBatchIndex(0);
      dispatch(setActiveItem(primary || items[0]));
    }
  };

  // Helper to map filename to relevant demo item
  const resolveDemoId = (fileName = "") => {
    const lower = fileName.toLowerCase();
    if (
      lower.includes("multi") ||
      lower.includes("picnic") ||
      lower.includes("combo")
    )
      return "multi";
    if (
      lower.includes("bottle") ||
      lower.includes("pet") ||
      lower.includes("plastic")
    )
      return "plastic-bottle";
    if (
      lower.includes("can") ||
      lower.includes("aluminum") ||
      lower.includes("soda")
    )
      return "aluminum-can";
    if (
      lower.includes("banana") ||
      lower.includes("peel") ||
      lower.includes("fruit")
    )
      return "banana-peel";
    if (lower.includes("paper") || lower.includes("doc")) return "paper";
    if (lower.includes("glass") || lower.includes("wine"))
      return "glass-bottle";
    if (
      lower.includes("food") ||
      lower.includes("waste") ||
      lower.includes("organic")
    )
      return "food-waste";
    if (lower.includes("bag")) return "plastic-bag";
    if (lower.includes("battery") || lower.includes("cell")) return "battery";
    if (lower.includes("cardboard") || lower.includes("box"))
      return "cardboard";

    // Random fallback from available list
    if (demoList && demoList.length > 0) {
      const rand = demoList[Math.floor(Math.random() * demoList.length)];
      return rand.id;
    }
    return "plastic-bottle";
  };

  // Execute fallback to demo simulation
  const handleTriggerFallback = async (fileName = selectedFile?.name) => {
    const demoId = resolveDemoId(fileName);
    try {
      let demoData;
      if (demoId === "multi") {
        demoData = await fetchMultiDemo().unwrap();
      } else {
        demoData = await fetchDemoResult(demoId).unwrap();
      }
      processScanResponse(demoData);
      setFallbackResult(demoData);
      setAutoFallbackUsed(true);
      setScanError(null);
    } catch (fallbackErr) {
      console.warn("Demo fallback also failed:", fallbackErr);
    }
  };

  // Perform Scan (AI or Demo mode)
  const handleExecuteScan = async (fileToScan = selectedFile) => {
    if (!fileToScan) return;
    setScanError(null);
    setAutoFallbackUsed(false);
    setFallbackResult(null);

    // If user selected Demo Simulation mode directly:
    if (scanMode === "demo") {
      await handleTriggerFallback(fileToScan.name);
      return;
    }

    // Live AI Mode: send FormData to POST /api/scan
    const formData = new FormData();
    formData.append("image", fileToScan);

    try {
      const result = await scanImage(formData).unwrap();
      processScanResponse(result);
      setScanError(null);
    } catch (err) {
      // Backend returned 502 / 503 / 500 error from Gemini service
      const errorMessage =
        err?.data?.message ||
        (err?.status === 502 || err?.status === 503
          ? "Gemini AI vision service is currently experiencing high demand or downtime."
          : "The image scan failed. Please try again.");

      setScanError({
        status: err?.status || 500,
        message: errorMessage,
      });

      // Automatically offer graceful demo simulation
      console.warn(
        "Live scan failed with status",
        err?.status,
        "- offering graceful fallback to simulated demo.",
      );
    }
  };

  // Capture frame from video
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], "camera-scan.jpg", {
          type: "image/jpeg",
        });
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        stopCamera();
        handleExecuteScan(file);
      },
      "image/jpeg",
      0.9,
    );
  };

  // Switch camera front/back
  const toggleFacingMode = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
    if (isCameraActive) {
      startCamera();
    }
  };

  // Handle file select from input
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScanError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Drag and drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    setScanError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Preset sample test images using authentic photos
  const handleSampleImage = async (type) => {
    const fileMap = {
      bottle: { path: "/images/items/plastic-bottle.jpg", name: "plastic-bottle.jpg" },
      can: { path: "/images/items/aluminum-can.jpg", name: "aluminum-can.jpg" },
      banana: { path: "/images/items/banana-peel.jpg", name: "banana-peel.jpg" },
      multi: { path: "/images/multi-waste.jpg", name: "multi-waste-combo.jpg" },
    };

    const target = fileMap[type] || fileMap.bottle;

    try {
      const response = await fetch(target.path);
      const blob = await response.blob();
      const file = new File([blob], target.name, { type: "image/jpeg" });
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setScanError(null);
    } catch (err) {
      console.warn("Failed to load local sample image file, using fallback canvas", err);
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = type === "bottle" ? "#e0f2fe" : type === "can" ? "#fef3c7" : "#dcfce7";
      ctx.fillRect(0, 0, 400, 400);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const file = new File([blob], target.name, { type: "image/jpeg" });
          setSelectedFile(file);
          setPreviewUrl(URL.createObjectURL(file));
          setScanError(null);
        },
        "image/jpeg",
        0.9
      );
    }
  };

  return (
    <div className="space-y-5 sm:space-y-8 max-w-5xl mx-auto">
      {/* Title & Mode Switcher Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 shrink-0" />
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
              AI Waste Scanner
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Capture or upload images to classify recyclability via{" "}
            <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono text-[11px] sm:text-xs">
              POST /api/scan
            </code>
          </p>
        </div>

        {/* Right Controls: Mode Toggle */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Scan Engine Mode Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => setScanMode("ai")}
              className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-1.5 text-[11px] sm:text-xs ${
                scanMode === "ai"
                  ? "bg-white text-emerald-700 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live AI Vision</span>
            </button>
            <button
              onClick={() => setScanMode("demo")}
              className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-1.5 text-[11px] sm:text-xs ${
                scanMode === "demo"
                  ? "bg-white text-indigo-700 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Demo Sim</span>
            </button>
          </div>
        </div>
      </div>

      {/* Graceful Fallback Alert when Live AI encounters high demand or error */}
      {scanError && (
        <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/90 text-amber-950 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">
                  Live AI Scan Encountered Error (HTTP {scanError.status})
                </h4>
                <p className="text-xs text-amber-900 mt-0.5">
                  {scanError.message}
                </p>
                <p className="text-[11px] text-amber-800 mt-1">
                  You can seamlessly use the built-in demo simulation engine to
                  continue without interruption.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleTriggerFallback()}
              disabled={isLoading}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Use Demo Fallback Scan</span>
            </button>
          </div>
        </div>
      )}

      {/* Fallback success notification badge */}
      {autoFallbackUsed && (
        <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 text-xs flex items-center justify-between animate-in fade-in">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              <strong>Simulated Demo Scan Loaded: </strong> Displaying full
              recycling classification for{" "}
              <strong>{fallbackResult?.itemName}</strong>.
            </span>
          </span>
          <button
            onClick={() => dispatch(setActiveTab("sort"))}
            className="text-emerald-700 font-bold hover:underline"
          >
            Sort Into Bins ➔
          </button>
        </div>
      )}

      {/* Main Scanner Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Left Column: Live Camera or Upload Box */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-3 sm:mb-4 flex items-center justify-between">
              <span>Input Source</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isCameraActive) stopCamera();
                    else startCamera();
                  }}
                  className={`text-xs px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    isCameraActive
                      ? "bg-rose-100 text-rose-700 hover:bg-rose-200"
                      : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{isCameraActive ? "Stop Camera" : "Open Camera"}</span>
                </button>
              </div>
            </h2>

            {/* Camera Viewfinder */}
            {isCameraActive ? (
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-4/3 max-h-[380px] sm:max-h-[420px] flex items-center justify-center border-2 border-emerald-500 shadow-md">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Laser scan animation overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-[bounce_2s_infinite]"></div>
                  <div className="absolute inset-4 border-2 border-dashed border-emerald-400/50 rounded-xl"></div>
                </div>

                {/* Controls on Camera */}
                <div className="absolute bottom-3 sm:bottom-4 inset-x-0 flex items-center justify-center gap-2 sm:gap-4 z-10 px-2">
                  <button
                    onClick={toggleFacingMode}
                    className="p-2.5 sm:p-3 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-xs transition"
                    title="Flip camera"
                  >
                    <FlipHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={capturePhoto}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transform active:scale-95 transition"
                  >
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Snap & Scan</span>
                  </button>
                  <button
                    onClick={stopCamera}
                    className="p-2.5 sm:p-3 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-xs transition"
                    title="Close camera"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Drag and Drop Zone */
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/20 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center aspect-4/3 max-h-[380px] sm:max-h-[420px]"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 shadow-2xs">
                  <UploadCloud className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  Tap to upload or drag image here
                </p>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
                  Supports JPEG, PNG, WebP (Max 5MB)
                </p>
              </div>
            )}

            {cameraError && (
              <p className="text-xs text-rose-600 mt-2 bg-rose-50 p-2 rounded-lg">
                {cameraError}
              </p>
            )}
          </div>

          {/* Preset Sample Images for Quick Testing */}
          <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2">
              Or test instantly with sample images:
            </p>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              <button
                onClick={() => handleSampleImage("bottle")}
                className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition cursor-pointer group"
              >
                <img
                  src="/images/items/plastic-bottle.jpg"
                  alt="Plastic Bottle"
                  className="w-4 h-4 rounded object-cover shrink-0"
                />
                <span>Plastic Bottle</span>
              </button>
              <button
                onClick={() => handleSampleImage("can")}
                className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition cursor-pointer group"
              >
                <img
                  src="/images/items/aluminum-can.jpg"
                  alt="Aluminum Can"
                  className="w-4 h-4 rounded object-cover shrink-0"
                />
                <span>Soda Can</span>
              </button>
              <button
                onClick={() => handleSampleImage("banana")}
                className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition cursor-pointer group"
              >
                <img
                  src="/images/items/banana-peel.jpg"
                  alt="Banana Peel"
                  className="w-4 h-4 rounded object-cover shrink-0"
                />
                <span>Banana Peel</span>
              </button>
              <button
                onClick={() => handleSampleImage("multi")}
                className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-xs font-bold text-indigo-700 flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs col-span-2 sm:col-span-1 group"
                title="Simulates or scans 3 items in a single photo"
              >
                <img
                  src="/images/multi-waste.jpg"
                  alt="Multi-Waste Combo"
                  className="w-4 h-4 rounded object-cover shrink-0"
                />
                <span>Multi-Waste Combo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Preview & Scan Trigger */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-3 sm:mb-4 flex items-center justify-between">
              <span>Image Preview</span>
              {selectedFile && (
                <span className="text-[11px] sm:text-xs text-slate-500 font-mono">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </span>
              )}
            </h2>

            {previewUrl ? (
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-4/3 max-h-[380px] sm:max-h-[420px] flex items-center justify-center border border-slate-200">
                <img
                  src={previewUrl}
                  alt="Selected waste to scan"
                  className="w-full h-full object-contain"
                />

                {isLoading && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4">
                    <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 animate-spin mb-3" />
                    <p className="font-bold text-xs sm:text-sm">
                      {scanMode === "ai"
                        ? "Analyzing with Gemini Vision..."
                        : "Simulating Classification..."}
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-300 mt-1">
                      Identifying waste type and disposal bin
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 text-center text-slate-400 aspect-4/3 max-h-[380px] sm:max-h-[420px] flex flex-col items-center justify-center bg-slate-50">
                <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mb-2" />
                <p className="text-xs sm:text-sm font-semibold text-slate-600">No image selected yet</p>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
                  Upload an image or snap a photo to preview here
                </p>
              </div>
            )}
          </div>

          {/* Trigger Button */}
          <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400 truncate max-w-[200px] hidden sm:inline">
              {selectedFile ? selectedFile.name : "Select an image"}
            </span>

            <button
              onClick={() => handleExecuteScan()}
              disabled={!selectedFile || isLoading}
              className={`w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                selectedFile && !isLoading
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>
                    {scanMode === "ai"
                      ? "Send to AI Scanner"
                      : "Simulate Demo Scan"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Waste Detection Header & Selector Panel */}
      {detectedBatch && detectedBatch.items.length > 1 && !isLoading && (
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl p-4 sm:p-6 text-white shadow-lg space-y-4 border border-emerald-700/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 shrink-0" />
                <h3 className="text-base sm:text-xl font-black">
                  {detectedBatch.totalDetected} Distinct Waste Items Detected!
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-200 mt-1">
                Gemini AI detected multiple recyclable and compostable items in this single photo.
              </p>
            </div>

            <button
              onClick={() => {
                dispatch(startScanQueue(detectedBatch.items));
                dispatch(setActiveTab("sort"));
              }}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <ListOrdered className="w-4 h-4 shrink-0" />
              <span>
                Start Sorting Challenge ({detectedBatch.items.length} Items)
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Item Selector Pills */}
          <div className="flex items-center gap-2 pt-3 border-t border-white/10 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap">
            <span className="text-xs font-bold text-emerald-300 mr-1 shrink-0">
              Inspect Items:
            </span>
            {detectedBatch.items.map((item, idx) => {
              const isCurrent = selectedBatchIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedBatchIndex(idx);
                    dispatch(setActiveItem(item));
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                    isCurrent
                      ? "bg-white text-slate-900 shadow-md ring-2 ring-emerald-400"
                      : "bg-white/15 text-white hover:bg-white/25"
                  }`}
                >
                  <span className="opacity-70">#{idx + 1}</span>
                  <span>{item.itemName}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase ${
                      item.bin === "recyclable"
                        ? "bg-blue-100 text-blue-900"
                        : item.bin === "organic"
                          ? "bg-emerald-100 text-emerald-900"
                          : item.bin === "special"
                            ? "bg-amber-100 text-amber-900"
                            : "bg-rose-100 text-rose-900"
                    }`}
                  >
                    {item.bin}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Render Scan Results if available */}
      {activeItem && !isLoading && (
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex flex-wrap items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{activeItem.itemName}</span>
              {detectedBatch && detectedBatch.items.length > 1 && (
                <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  Item {selectedBatchIndex + 1} of {detectedBatch.items.length}
                </span>
              )}
              {autoFallbackUsed && (
                <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                  Simulated Fallback
                </span>
              )}
            </h3>
            <button
              onClick={() => {
                if (detectedBatch && detectedBatch.items.length > 1) {
                  dispatch(startScanQueue(detectedBatch.items));
                }
                dispatch(setActiveTab("sort"));
              }}
              className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
            >
              <span>
                {detectedBatch && detectedBatch.items.length > 1
                  ? "Play Multi-Item Sorting Challenge"
                  : "Take to Sorting Game"}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <WasteResultCard
            item={activeItem}
            onSortClick={() => {
              if (detectedBatch && detectedBatch.items.length > 1) {
                dispatch(startScanQueue(detectedBatch.items));
              }
              dispatch(setActiveTab("sort"));
            }}
          />
        </div>
      )}
    </div>
  );
}
