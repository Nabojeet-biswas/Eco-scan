import React, { useState } from "react";
import { Terminal, Play, Copy, Check, Clock } from "lucide-react";

const ENDPOINTS = [
  {
    id: "status",
    name: "System Status",
    method: "GET",
    endpoint: "/api/status",
    description: "Check if backend server is online and whether Gemini AI vision is enabled.",
    expectedStatus: 200,
    hasFile: false,
    curl: "curl -X GET http://localhost:8080/api/status",
  },
  {
    id: "demo_list",
    name: "Demo List",
    method: "GET",
    endpoint: "/api/demo",
    description: "Retrieve catalog of 9 preset recyclable items with IDs, names, and icons.",
    expectedStatus: 200,
    hasFile: false,
    curl: "curl -X GET http://localhost:8080/api/demo",
  },
  {
    id: "demo_item",
    name: "Demo Result (Plastic Bottle)",
    method: "GET",
    endpoint: "/api/demo/plastic-bottle",
    description: "Fetch comprehensive recycling breakdown for sample item 'plastic-bottle'.",
    expectedStatus: 200,
    hasFile: false,
    curl: "curl -X GET http://localhost:8080/api/demo/plastic-bottle",
  },
  {
    id: "demo_multi",
    name: "Multi-Waste Demo Combo",
    method: "GET",
    endpoint: "/api/demo/multi",
    description: "Fetch multi-item envelope containing 3 distinct waste items detected in one image.",
    expectedStatus: 200,
    hasFile: false,
    curl: "curl -X GET http://localhost:8080/api/demo/multi",
  },
  {
    id: "scan_good",
    name: "Scan Image",
    method: "POST",
    endpoint: "/api/scan",
    description: "Upload an image (multipart/form-data) to identify waste classification with AI.",
    expectedStatus: 200,
    hasFile: true,
    fileType: "image/jpeg",
    fileName: "plastic-bottle.jpg",
    curl: `curl -X POST http://localhost:8080/api/scan -F "image=@plastic-bottle.jpg"`,
  },
];

export default function ApiExplorer() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
  const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINTS[0]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // Execute request against live backend
  const executeRequest = async (ep = selectedEndpoint) => {
    setLoading(true);
    setResponse(null);
    const startTime = performance.now();

    try {
      let res;
      let url = `${baseUrl}${ep.endpoint}`;

      if (ep.method === "GET") {
        res = await fetch(url);
      } else if (ep.method === "POST") {
        const formData = new FormData();
        try {
          const imgRes = await fetch("/images/items/plastic-bottle.jpg");
          const blob = await imgRes.blob();
          formData.append("image", blob, ep.fileName);
        } catch {
          const canvas = document.createElement("canvas");
          canvas.width = 100;
          canvas.height = 100;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#38bdf8";
          ctx.fillRect(0, 0, 100, 100);
          const blob = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/jpeg", 0.8)
          );
          formData.append("image", blob, ep.fileName);
        }

        res = await fetch(url, {
          method: "POST",
          body: formData,
        });
      }

      const duration = Math.round(performance.now() - startTime);
      let data = null;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      setResponse({
        status: res.status,
        statusText:
          res.statusText ||
          (res.status === 200
            ? "OK"
            : res.status === 400
            ? "Bad Request"
            : res.status === 404
            ? "Not Found"
            : "Error"),
        duration,
        data,
      });
    } catch (err) {
      const duration = Math.round(performance.now() - startTime);
      setResponse({
        status: 0,
        statusText: "Network Error / Offline",
        duration,
        data: {
          error: err.message,
          hint: "Ensure the Spring Boot backend is running on http://localhost:8080",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, setFlag) => {
    navigator.clipboard.writeText(text);
    setFlag(true);
    setTimeout(() => setFlag(false), 2000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
      {/* Title */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 shrink-0" />
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900">
              Interactive API Explorer
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Test and inspect all 6 HTTP client endpoints configured for <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">{baseUrl}</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] sm:text-xs text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
            @baseUrl = {baseUrl}
          </span>
        </div>
      </div>

      {/* Explorer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left: Endpoints Menu */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Endpoints
          </h2>
          <div className="space-y-2">
            {ENDPOINTS.map((ep) => {
              const isSelected = selectedEndpoint.id === ep.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => {
                    setSelectedEndpoint(ep);
                    setResponse(null);
                  }}
                  className={`p-3 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-emerald-50/50 border-emerald-500 shadow-xs ring-1 ring-emerald-200"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      {ep.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                        ep.method === "POST"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {ep.method}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-500 truncate">
                    {ep.endpoint}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {ep.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Request Details & Live Response */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Header info */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded font-mono shrink-0 ${
                      selectedEndpoint.method === "POST"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {selectedEndpoint.method}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-semibold text-slate-800 truncate">
                    {selectedEndpoint.endpoint}
                  </span>
                </div>

                <button
                  onClick={() => executeRequest(selectedEndpoint)}
                  disabled={loading}
                  className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${loading ? "animate-spin" : ""}`} />
                  <span>{loading ? "Sending..." : "Send Request"}</span>
                </button>
              </div>

              <p className="text-xs text-slate-500 mt-2">
                {selectedEndpoint.description}
              </p>
            </div>

            {/* Request Specification Preview */}
            <div className="bg-slate-900 text-slate-100 rounded-xl p-3 sm:p-4 font-mono text-xs space-y-2 overflow-x-auto">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span>HTTP Request Preview</span>
                <button
                  onClick={() => copyToClipboard(selectedEndpoint.curl, setCopiedCurl)}
                  className="hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  {copiedCurl ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedCurl ? "Copied" : "Copy cURL"}</span>
                </button>
              </div>

              <div className="text-emerald-400 font-bold">
                {selectedEndpoint.method} {baseUrl}{selectedEndpoint.endpoint}
              </div>

              {selectedEndpoint.hasFile && (
                <div className="text-slate-400 text-[11px] pt-1">
                  <div>Content-Type: multipart/form-data</div>
                  <div>Content-Disposition: form-data; name="image"; filename="{selectedEndpoint.fileName}"</div>
                  <div>Content-Type: {selectedEndpoint.fileType}</div>
                  {selectedEndpoint.fileContent && (
                    <div className="text-amber-300 mt-1 italic">
                      Payload: "{selectedEndpoint.fileContent}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Response Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Response
                </span>
                {response && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {response.duration} ms
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full font-mono ${
                        response.status === 200
                          ? "bg-emerald-100 text-emerald-800"
                          : response.status === 400 || response.status === 404
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {response.status} {response.statusText}
                    </span>
                  </div>
                )}
              </div>

              {response ? (
                <div className="relative">
                  <pre className="bg-slate-900 text-slate-100 rounded-xl p-3 sm:p-4 font-mono text-xs overflow-x-auto max-h-[350px]">
                    {typeof response.data === "object"
                      ? JSON.stringify(response.data, null, 2)
                      : response.data}
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        typeof response.data === "object"
                          ? JSON.stringify(response.data, null, 2)
                          : response.data,
                        setCopiedJson
                      )
                    }
                    className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs cursor-pointer shadow-sm"
                    title="Copy response JSON"
                  >
                    {copiedJson ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 text-center text-slate-400 text-xs">
                  Click "Send Request" to test this endpoint live against http://localhost:8080
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
