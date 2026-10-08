import pptxgen from "pptxgenjs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "EcoScan AI - TechVista 2026 Presentation";
pres.author = "Dhruba Bachhar, Nabojeet Biswas, Subrata Roy";
pres.company = "Siliguri Government Polytechnic";

// Color Palette
const COLORS = {
  forestDark: "064E3B",
  emerald: "10B981",
  emeraldLight: "D1FAE5",
  mintBg: "ECFDF5",
  slateDark: "0F172A",
  slateMedium: "334155",
  slateLight: "64748B",
  cardBg: "F8FAFC",
  borderLight: "E2E8F0",
  amber: "F59E0B",
  amberLight: "FEF3C7",
  white: "FFFFFF",
  blue: "2563EB",
  blueLight: "EFF6FF",
  purple: "7C3AED",
  purpleLight: "F5F3FF",
  rose: "E11D48",
  roseLight: "FFE4E6",
};

const FONT_TITLE = "Arial";
const FONT_BODY = "Arial";

// Helper: Standard Slide Header
function addSlideHeader(slide, title, category = "ECOSCAN • TECHVISTA 2026") {
  // Top category badge
  slide.addText(category, {
    x: 0.8,
    y: 0.4,
    w: 8.4,
    h: 0.3,
    fontSize: 10,
    fontFace: FONT_TITLE,
    bold: true,
    color: COLORS.emerald,
    charSpacing: 2,
  });

  // Main slide title
  slide.addText(title, {
    x: 0.8,
    y: 0.7,
    w: 8.4,
    h: 0.5,
    fontSize: 22,
    fontFace: FONT_TITLE,
    bold: true,
    color: COLORS.slateDark,
  });

  // Top accent line
  slide.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: 1.25,
    w: 8.4,
    h: 0.03,
    fill: { color: COLORS.emerald },
    line: { color: COLORS.emerald },
  });

  // Footer bar
  slide.addText("EcoScan AI  |  TechVista 2026  |  Siliguri Government Polytechnic (CST Dept.)", {
    x: 0.8,
    y: 5.25,
    w: 8.4,
    h: 0.3,
    fontSize: 8.5,
    fontFace: FONT_BODY,
    color: COLORS.slateLight,
  });
}

// ==========================================
// SLIDE 1: TITLE SLIDE
// ==========================================
const s1 = pres.addSlide();
s1.background = { color: COLORS.forestDark };

// College branding
s1.addText("SILIGURI GOVERNMENT POLYTECHNIC", {
  x: 0.8,
  y: 0.6,
  w: 8.4,
  h: 0.35,
  fontSize: 14,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.emeraldLight,
  charSpacing: 2,
});
s1.addText("Government of West Bengal  •  TechVista 2026", {
  x: 0.8,
  y: 0.95,
  w: 8.4,
  h: 0.25,
  fontSize: 10,
  fontFace: FONT_BODY,
  color: "A7F3D0",
});

// Event tag
s1.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 1.35,
  w: 5.6,
  h: 0.35,
  rectRadius: 0.1,
  fill: { color: "065F46" },
  line: { color: COLORS.emerald, width: 1 },
});
s1.addText("INTER-DEPARTMENT TECHNICAL MODEL COMPETITION", {
  x: 0.8,
  y: 1.35,
  w: 5.6,
  h: 0.35,
  fontSize: 9,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.white,
  align: "center",
  valign: "middle",
});

// Project Title
s1.addText("EcoScan", {
  x: 0.8,
  y: 1.8,
  w: 5.6,
  h: 0.9,
  fontSize: 48,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.white,
});
s1.addText("AI-Powered Smart Waste Sorting & Recycling Assistant", {
  x: 0.8,
  y: 2.7,
  w: 5.6,
  h: 0.45,
  fontSize: 15,
  fontFace: FONT_BODY,
  bold: true,
  color: "34D399",
});

// Theme Banner
s1.addText('Theme: "From Ideas to Impact: Building a Sustainable Future"\nThink Green • Build Better • For a Sustainable Tomorrow', {
  x: 0.8,
  y: 3.25,
  w: 5.6,
  h: 0.6,
  fontSize: 10.5,
  fontFace: FONT_BODY,
  color: "E2E8F0",
  italic: true,
});

// Team card
s1.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 4.0,
  w: 5.6,
  h: 1.25,
  rectRadius: 0.12,
  fill: { color: "043527" },
  line: { color: "10B981", width: 1 },
});
s1.addText("STUDENT TEAM (Dept. of Computer Science & Technology):", {
  x: 0.95,
  y: 4.08,
  w: 5.3,
  h: 0.25,
  fontSize: 9,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.amber,
});
s1.addText("1. Dhruba Bachhar    2. Nabojeet Biswas    3. Subrata Roy\nMentor: Faculty Advisor, Department of CST   |   Date: 9th October 2026", {
  x: 0.95,
  y: 4.35,
  w: 5.3,
  h: 0.75,
  fontSize: 9.5,
  fontFace: FONT_BODY,
  color: COLORS.white,
});

// Poster Image embed on the right
const posterPath = path.join(__dirname, "screenshots", "techvista_poster.jpg");
if (fs.existsSync(posterPath)) {
  s1.addImage({
    path: posterPath,
    x: 6.8,
    y: 0.7,
    w: 2.5,
    h: 4.5,
  });
}

// ==========================================
// SLIDE 2: INTRODUCTION & OVERVIEW
// ==========================================
const s2 = pres.addSlide();
s2.background = { color: COLORS.white };
addSlideHeader(s2, "Introduction & Project Overview");

s2.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 1.5,
  w: 4.0,
  h: 3.5,
  rectRadius: 0.12,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.borderLight, width: 1 },
});
s2.addText("About EcoScan", {
  x: 1.0,
  y: 1.7,
  w: 3.6,
  h: 0.35,
  fontSize: 14,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.forestDark,
});
s2.addText(
  "• AI-Assisted Waste Identification: Users snap a photo or upload an image to identify materials instantly.\n\n" +
  "• 4-Bin Municipal Standard: Recommends precise municipal disposal bins (Recyclable, Organic, Hazardous, General).\n\n" +
  "• Actionable Preparation: Delivers simple disposal advice like rinsing containers, detaching caps, and toxic alerts.\n\n" +
  "• Gamified Civic Learning: Tap-to-sort challenge reinforces memory with real-time score points and daily streaks.\n\n" +
  "• Exhibition-Proof Demo Mode: 9 pre-analyzed demo items guarantee 100% booth uptime even without Wi-Fi.",
  {
    x: 1.0,
    y: 2.1,
    w: 3.6,
    h: 2.7,
    fontSize: 10,
    fontFace: FONT_BODY,
    color: COLORS.slateMedium,
  }
);

s2.addShape(pres.ShapeType.roundRect, {
  x: 5.2,
  y: 1.5,
  w: 4.0,
  h: 3.5,
  rectRadius: 0.12,
  fill: { color: COLORS.mintBg },
  line: { color: COLORS.emerald, width: 1 },
});
s2.addText("Inspiration & TechVista Alignment", {
  x: 5.4,
  y: 1.7,
  w: 3.6,
  h: 0.35,
  fontSize: 14,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.forestDark,
});
s2.addText(
  "• Engineering Domain: Environmental Informatics, Multimodal Computer Vision, and Modern Full-Stack Web.\n\n" +
  "• Addressing Landfill Overflow: Over 60% of recyclable plastic ends up in landfills due to incorrect consumer sorting.\n\n" +
  "• Bridging the Awareness Gap: Most citizens find municipal color coding confusing; EcoScan answers 'Which bin?' in seconds.\n\n" +
  "• Competition Theme: Directly answers TechVista 2026: 'From Ideas to Impact: Building a Sustainable Future'.",
  {
    x: 5.4,
    y: 2.1,
    w: 3.6,
    h: 2.7,
    fontSize: 10,
    fontFace: FONT_BODY,
    color: COLORS.slateMedium,
  }
);

// ==========================================
// SLIDE 3: PROBLEM STATEMENT
// ==========================================
const s3 = pres.addSlide();
s3.background = { color: COLORS.white };
addSlideHeader(s3, "Problem Statement: The Municipal Waste Crisis");

s3.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 1.5,
  w: 4.0,
  h: 3.5,
  rectRadius: 0.12,
  fill: { color: COLORS.roseLight },
  line: { color: COLORS.rose, width: 1 },
});
s3.addText("Current Manual Issues & Bottlenecks", {
  x: 1.0,
  y: 1.7,
  w: 3.6,
  h: 0.35,
  fontSize: 13,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.rose,
});
s3.addText(
  "• High Contamination Rates: Recyclable dry paper & plastic get contaminated by wet organic kitchen waste.\n\n" +
  "• Ambiguous Visual Clues: Multi-layer packaging (chips packets, coffee cups) look recyclable but are composite landfill trash.\n\n" +
  "• Toxic Household Hazards: Batteries, aerosol cans, and e-waste improperly discarded into municipal bins leach toxic lead.\n\n" +
  "• Zero Real-Time Feedback: Citizens have no feedback or guidance at the exact second they discard an item.",
  {
    x: 1.0,
    y: 2.15,
    w: 3.6,
    h: 2.65,
    fontSize: 10,
    fontFace: FONT_BODY,
    color: COLORS.slateDark,
  }
);

s3.addShape(pres.ShapeType.roundRect, {
  x: 5.2,
  y: 1.5,
  w: 4.0,
  h: 3.5,
  rectRadius: 0.12,
  fill: { color: COLORS.blueLight },
  line: { color: COLORS.blue, width: 1 },
});
s3.addText("Why an AI-Powered Software Solution?", {
  x: 5.4,
  y: 1.7,
  w: 3.6,
  h: 0.35,
  fontSize: 13,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.blue,
});
s3.addText(
  "• Instant Vision AI Inference: Multimodal Gemini Vision classifies polymers and items from a single image.\n\n" +
  "• Zero Hardware Expense: Works on any existing smartphone, tablet, or laptop browser without buying expensive sensors.\n\n" +
  "• Plain-Language Guidance: Translates complex waste disposal manuals into 3 clean, step-by-step instructions.\n\n" +
  "• Gamified Habit Formation: Points, streaks, and sorting mini-games convert passive citizens into proactive eco-champions.",
  {
    x: 5.4,
    y: 2.15,
    w: 3.6,
    h: 2.65,
    fontSize: 10,
    fontFace: FONT_BODY,
    color: COLORS.slateDark,
  }
);

// ==========================================
// SLIDE 4: OBJECTIVES & SCOPE
// ==========================================
const s4 = pres.addSlide();
s4.background = { color: COLORS.white };
addSlideHeader(s4, "Project Objectives & Scope");

const cardW = 2.6;
const cardH = 3.5;

// Functional
s4.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 1.5,
  w: cardW,
  h: cardH,
  rectRadius: 0.12,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.emerald, width: 1 },
});
s4.addText("Functional Scope", {
  x: 0.95,
  y: 1.65,
  w: 2.3,
  h: 0.3,
  fontSize: 12,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.forestDark,
});
s4.addText(
  "✔ Live Camera & Upload scanning\n\n" +
  "✔ Multimodal AI item detection\n\n" +
  "✔ 4-Bin municipal allocation\n\n" +
  "✔ Multi-waste batch detection (detects 3 items in 1 photo)\n\n" +
  "✔ Gamified tap-to-sort challenge\n\n" +
  "✔ Persistent browser Eco Points\n\n" +
  "✔ Zero-Wi-Fi Demo Mode catalog",
  {
    x: 0.95,
    y: 2.05,
    w: 2.3,
    h: 2.8,
    fontSize: 9,
    fontFace: FONT_BODY,
    color: COLORS.slateMedium,
  }
);

// Non-Functional
s4.addShape(pres.ShapeType.roundRect, {
  x: 3.7,
  y: 1.5,
  w: cardW,
  h: cardH,
  rectRadius: 0.12,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.blue, width: 1 },
});
s4.addText("Non-Functional Scope", {
  x: 3.85,
  y: 1.65,
  w: 2.3,
  h: 0.3,
  fontSize: 12,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.blue,
});
s4.addText(
  "⚡ Speed: Sub-2 second scan responses\n\n" +
  "🔒 Security: Google API key safely stored on Spring Boot backend\n\n" +
  "📱 Responsive: Flawless layout on mobile, tablet, and PC\n\n" +
  "🛡️ Resilience: Seamless fallback to demo catalog if AI limits exceed\n\n" +
  "🧹 Clean Code: Modular Redux slices and Spring services",
  {
    x: 3.85,
    y: 2.05,
    w: 2.3,
    h: 2.8,
    fontSize: 9,
    fontFace: FONT_BODY,
    color: COLORS.slateMedium,
  }
);

// Future Boundaries
s4.addShape(pres.ShapeType.roundRect, {
  x: 6.6,
  y: 1.5,
  w: cardW,
  h: cardH,
  rectRadius: 0.12,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.slateLight, width: 1 },
});
s4.addText("Planned for Phase 2", {
  x: 6.75,
  y: 1.65,
  w: 2.3,
  h: 0.3,
  fontSize: 12,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.slateDark,
});
s4.addText(
  "⏳ User accounts & cloud DB sync\n\n" +
  "⏳ Smart-bin robotic servo lids\n\n" +
  "⏳ Ultrasonic fill-level hardware\n\n" +
  "⏳ Bengali & Hindi audio guidance\n\n" +
  "⏳ Municipal GIS pickup heatmap\n\n" +
  "⏳ Offline on-device TensorFlow Lite model",
  {
    x: 6.75,
    y: 2.05,
    w: 2.3,
    h: 2.8,
    fontSize: 9,
    fontFace: FONT_BODY,
    color: COLORS.slateMedium,
  }
);

// ==========================================
// SLIDE 5: SYSTEM ARCHITECTURE
// ==========================================
const s5 = pres.addSlide();
s5.background = { color: COLORS.white };
addSlideHeader(s5, "Proposed System Architecture: Client-Server-AI");

// Diagram representation using cards & connectors
const boxY = 1.6;
const boxH = 2.4;

// Client
s5.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: boxY,
  w: 2.4,
  h: boxH,
  rectRadius: 0.1,
  fill: { color: COLORS.mintBg },
  line: { color: COLORS.emerald, width: 2 },
});
s5.addText("1. Client Frontend\n(React 19 + RTK Query)", {
  x: 0.9,
  y: boxY + 0.15,
  w: 2.2,
  h: 0.45,
  fontSize: 11,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.forestDark,
  align: "center",
});
s5.addText("• Camera / File Upload UI\n• Redux Toolkit State Engine\n• LocalStorage (Eco Points)\n• Tailwind CSS v4 Responsive\n• Interactive 4-Bin Sort Game", {
  x: 0.9,
  y: boxY + 0.65,
  w: 2.2,
  h: 1.6,
  fontSize: 8.5,
  fontFace: FONT_BODY,
  color: COLORS.slateMedium,
});

// Arrow 1
s5.addText("HTTP POST /api/scan\nFormData (Image)\n──────►\n◄──────\nJSON WasteResult", {
  x: 3.25,
  y: boxY + 0.6,
  w: 1.5,
  h: 1.2,
  fontSize: 7.5,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.emerald,
  align: "center",
});

// Backend
s5.addShape(pres.ShapeType.roundRect, {
  x: 4.8,
  y: boxY,
  w: 2.5,
  h: boxH,
  rectRadius: 0.1,
  fill: { color: COLORS.blueLight },
  line: { color: COLORS.blue, width: 2 },
});
s5.addText("2. Backend API Server\n(Spring Boot 3.4 on :8080)", {
  x: 4.9,
  y: boxY + 0.15,
  w: 2.3,
  h: 0.45,
  fontSize: 11,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.blue,
  align: "center",
});
s5.addText("• ImageValidator (Type & 5MB)\n• GeminiService (Prompt Builder)\n• DemoService (Offline Catalog)\n• Global Exception Handler\n• Secure API Key Storage", {
  x: 4.9,
  y: boxY + 0.65,
  w: 2.3,
  h: 1.6,
  fontSize: 8.5,
  fontFace: FONT_BODY,
  color: COLORS.slateMedium,
});

// Arrow 2
s5.addText("Spring WebClient\nPrompt + Base64\n──────►\n◄──────\nAI JSON Schema", {
  x: 7.35,
  y: boxY + 0.6,
  w: 1.15,
  h: 1.2,
  fontSize: 7.5,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.amber,
  align: "center",
});

// AI Service
s5.addShape(pres.ShapeType.roundRect, {
  x: 8.5,
  y: boxY,
  w: 1.6,
  h: boxH,
  rectRadius: 0.1,
  fill: { color: COLORS.amberLight },
  line: { color: COLORS.amber, width: 2 },
});
s5.addText("3. Vision AI\n(Google Gemini)", {
  x: 8.55,
  y: boxY + 0.15,
  w: 1.5,
  h: 0.45,
  fontSize: 10,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.amber,
  align: "center",
});
s5.addText("• Gemini Vision\n• Structured JSON\n• Zero Client Key\n• 4-Bin Matching", {
  x: 8.55,
  y: boxY + 0.65,
  w: 1.5,
  h: 1.6,
  fontSize: 8,
  fontFace: FONT_BODY,
  color: COLORS.slateMedium,
});

// Architecture Summary banner at bottom
s5.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 4.25,
  w: 8.4,
  h: 0.85,
  rectRadius: 0.1,
  fill: { color: COLORS.slateDark },
});
s5.addText(
  "ARCHITECTURAL RESILIENCE & SECURITY GUARANTEE:\n" +
  "• Security: Gemini credentials stay isolated on Spring Boot — zero API key leakage in browser dev tools.\n" +
  "• Offline Exhibition Mode: If Internet/API limits fail during TechVista presentation, EcoScan gracefully routes requests to /api/demo.",
  {
    x: 1.0,
    y: 4.3,
    w: 8.0,
    h: 0.75,
    fontSize: 9,
    fontFace: FONT_BODY,
    color: COLORS.white,
  }
);

// ==========================================
// SLIDE 6: TECH STACK & TOOLS
// ==========================================
const s6 = pres.addSlide();
s6.background = { color: COLORS.white };
addSlideHeader(s6, "Technology Stack & Development Tools");

const tW = 2.0;
const tH = 3.5;

// Frontend
s6.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.5, w: tW, h: tH, rectRadius: 0.1, fill: { color: COLORS.cardBg }, line: { color: COLORS.emerald, width: 1 } });
s6.addText("Frontend Web", { x: 0.9, y: 1.65, w: 1.8, h: 0.3, fontSize: 12, fontFace: FONT_TITLE, bold: true, color: COLORS.forestDark });
s6.addText("• React 19 (Hooks)\n• Redux Toolkit (RTK)\n• RTK Query (caching)\n• Tailwind CSS v4\n• Lucide React icons\n• Redux Persist\n• Vite 8 Build Tool", { x: 0.9, y: 2.05, w: 1.8, h: 2.8, fontSize: 9.5, fontFace: FONT_BODY, color: COLORS.slateMedium });

// Backend
s6.addShape(pres.ShapeType.roundRect, { x: 2.95, y: 1.5, w: tW, h: tH, rectRadius: 0.1, fill: { color: COLORS.cardBg }, line: { color: COLORS.blue, width: 1 } });
s6.addText("Backend Core", { x: 3.05, y: 1.65, w: 1.8, h: 0.3, fontSize: 12, fontFace: FONT_TITLE, bold: true, color: COLORS.blue });
s6.addText("• Java 21 LTS\n• Spring Boot 3.4.3\n• Spring WebClient\n• Jackson JSON Parser\n• Multipart Validation\n• Maven Build System\n• CORS Configuration", { x: 3.05, y: 2.05, w: 1.8, h: 2.8, fontSize: 9.5, fontFace: FONT_BODY, color: COLORS.slateMedium });

// AI
s6.addShape(pres.ShapeType.roundRect, { x: 5.1, y: 1.5, w: tW, h: tH, rectRadius: 0.1, fill: { color: COLORS.cardBg }, line: { color: COLORS.amber, width: 1 } });
s6.addText("AI & Cloud", { x: 5.2, y: 1.65, w: 1.8, h: 0.3, fontSize: 12, fontFace: FONT_TITLE, bold: true, color: COLORS.amber });
s6.addText("• Google Gemini Vision\n• Prompt Engineering\n• Structured Output\n• 4-Bin Waste Schema\n• Low-latency inference\n• Multi-item detection\n• Fallback catalog", { x: 5.2, y: 2.05, w: 1.8, h: 2.8, fontSize: 9.5, fontFace: FONT_BODY, color: COLORS.slateMedium });

// Tools
s6.addShape(pres.ShapeType.roundRect, { x: 7.25, y: 1.5, w: tW, h: tH, rectRadius: 0.1, fill: { color: COLORS.cardBg }, line: { color: COLORS.purple, width: 1 } });
s6.addText("Dev & QA Tools", { x: 7.35, y: 1.65, w: 1.8, h: 0.3, fontSize: 12, fontFace: FONT_TITLE, bold: true, color: COLORS.purple });
s6.addText("• Git & GitHub\n• VS Code / IntelliJ\n• pnpm Package Mgr\n• Chrome DevTools\n• Edge Headless CLI\n• JUnit 5 / Maven Test\n• REST Client (.http)", { x: 7.35, y: 2.05, w: 1.8, h: 2.8, fontSize: 9.5, fontFace: FONT_BODY, color: COLORS.slateMedium });

// ==========================================
// SLIDE 7: DATA MODEL & REST APIS
// ==========================================
const s7 = pres.addSlide();
s7.background = { color: COLORS.white };
addSlideHeader(s7, "System Data Models & REST Endpoints");

// Left Card: Data Models
s7.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 1.5,
  w: 4.0,
  h: 3.5,
  rectRadius: 0.12,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.borderLight, width: 1 },
});
s7.addText("Core Data Models (POJO & JSON)", {
  x: 1.0,
  y: 1.7,
  w: 3.6,
  h: 0.3,
  fontSize: 13,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.forestDark,
});
s7.addText(
  "WasteResult (Single Item Contract):\n" +
  "• itemName: String (e.g. 'Plastic Water Bottle')\n" +
  "• category: String (e.g. 'Plastic', 'Organic', 'E-Waste')\n" +
  "• bin: String ('recyclable' | 'organic' | 'hazardous' | 'general')\n" +
  "• tip: String (disposal advice and rinsing guide)\n" +
  "• warning: String (toxic hazard instructions)\n" +
  "• recyclable: boolean\n\n" +
  "MultiWasteResult (Batch Envelope):\n" +
  "• totalDetected: int (e.g. 3)\n" +
  "• items: List<WasteResult>\n" +
  "• primaryItem: WasteResult",
  {
    x: 1.0,
    y: 2.05,
    w: 3.6,
    h: 2.8,
    fontSize: 9,
    fontFace: "Courier New",
    color: COLORS.slateDark,
  }
);

// Right Card: REST Endpoints
s7.addShape(pres.ShapeType.roundRect, {
  x: 5.2,
  y: 1.5,
  w: 4.0,
  h: 3.5,
  rectRadius: 0.12,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.borderLight, width: 1 },
});
s7.addText("Spring Boot REST Endpoints", {
  x: 5.4,
  y: 1.7,
  w: 3.6,
  h: 0.3,
  fontSize: 13,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.blue,
});
s7.addText(
  "GET /api/status\n" +
  "Returns server status & Gemini AI availability boolean.\n\n" +
  "POST /api/scan  [Multipart/form-data]\n" +
  "Payload: 'image' (JPEG/PNG/WebP, max 5MB)\n" +
  "Returns: Structured WasteResult or MultiWasteResult JSON.\n\n" +
  "GET /api/demo\n" +
  "Returns catalog of 9 pre-analyzed demo waste items.\n\n" +
  "GET /api/demo/{id}\n" +
  "Returns detailed single demo item classification.\n\n" +
  "GET /api/demo/multi\n" +
  "Returns 3-item multi-waste picnic combo.",
  {
    x: 5.4,
    y: 2.05,
    w: 3.6,
    h: 2.8,
    fontSize: 9,
    fontFace: "Courier New",
    color: COLORS.slateDark,
  }
);

// ==========================================
// SLIDE 8: SYSTEM WORKFLOW & FLOWCHART
// ==========================================
const s8 = pres.addSlide();
s8.background = { color: COLORS.white };
addSlideHeader(s8, "End-to-End Workflow: Capture to Eco Points");

const stepCards = [
  { num: "01", title: "Capture Image", desc: "User snaps camera photo or uploads JPEG/PNG/WebP (<5MB)." },
  { num: "02", title: "Route & Validate", desc: "Spring Boot checks file size, format headers & MIME type." },
  { num: "03", title: "AI Vision Analysis", desc: "Gemini Vision detects item, polymer, bin & prep instructions." },
  { num: "04", title: "3-Layer Result Card", desc: "Clean UI shows bin color, degradation years & disposal tips." },
  { num: "05", title: "Tap-to-Sort Game", desc: "User tests memory: taps 1 of 4 bins to earn +10 Eco Points." },
];

stepCards.forEach((c, idx) => {
  const x = 0.8 + idx * 1.72;
  s8.addShape(pres.ShapeType.roundRect, {
    x,
    y: 1.6,
    w: 1.6,
    h: 3.2,
    rectRadius: 0.1,
    fill: { color: idx === 2 ? COLORS.mintBg : COLORS.cardBg },
    line: { color: idx === 2 ? COLORS.emerald : COLORS.borderLight, width: 1.5 },
  });
  s8.addText(c.num, {
    x,
    y: 1.75,
    w: 1.6,
    h: 0.35,
    fontSize: 16,
    fontFace: FONT_TITLE,
    bold: true,
    color: idx === 2 ? COLORS.emerald : COLORS.slateLight,
    align: "center",
  });
  s8.addText(c.title, {
    x: x + 0.1,
    y: 2.15,
    w: 1.4,
    h: 0.5,
    fontSize: 11,
    fontFace: FONT_TITLE,
    bold: true,
    color: COLORS.slateDark,
    align: "center",
  });
  s8.addText(c.desc, {
    x: x + 0.1,
    y: 2.7,
    w: 1.4,
    h: 1.9,
    fontSize: 9,
    fontFace: FONT_BODY,
    color: COLORS.slateMedium,
    align: "center",
  });
});

// Bottom Flow Banner
s8.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 4.95,
  w: 8.4,
  h: 0.35,
  rectRadius: 0.08,
  fill: { color: COLORS.forestDark },
});
s8.addText("Camera Snap  ➔  ImageValidator  ➔  Gemini Vision  ➔  3-Layer Visual Card  ➔  4-Bin Game  ➔  LocalStorage Points", {
  x: 0.8,
  y: 4.95,
  w: 8.4,
  h: 0.35,
  fontSize: 8.5,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.white,
  align: "center",
  valign: "middle",
});

// ==========================================
// SLIDE 9: KEY FEATURES & MODULES
// ==========================================
const s9 = pres.addSlide();
s9.background = { color: COLORS.white };
addSlideHeader(s9, "Core Application Modules & Engineering Highlights");

const featGrid = [
  { title: "1. AI Waste Scanner", desc: "Live webcam viewfinder, camera switching, drag-and-drop file upload with animated multi-step analysis indicators." },
  { title: "2. 3-Layer Result Visualizer", desc: "Clean visual architecture: Layer 1 (Bin recommendation), Layer 2 (Fast facts & degradation time), Layer 3 (Disposal prep instructions)." },
  { title: "3. Multi-Waste Detection", desc: "Detects multiple items simultaneously from complex scenes (e.g., plastic bottle + soda can + banana peel) with an interactive batch selector." },
  { title: "4. Gamified 4-Bin Sort Game", desc: "Educational tap-to-sort challenge awarding +10 Eco Points per correct answer with persistent browser streaks and feedback audio." },
  { title: "5. Municipal Bin Knowledge Hub", desc: "Comprehensive guide for municipal color standards (Green, Blue, Brown, Purple) with accepted materials and forbidden contaminants." },
  { title: "6. Resilient Exhibition Demo Engine", desc: "Self-contained pre-analyzed demo catalog guaranteeing zero downtime during technical exhibitions, even if internet connection drops." },
];

featGrid.forEach((f, idx) => {
  const col = idx % 3;
  const row = Math.floor(idx / 3);
  const x = 0.8 + col * 2.85;
  const y = 1.6 + row * 1.75;
  s9.addShape(pres.ShapeType.roundRect, {
    x,
    y,
    w: 2.7,
    h: 1.6,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.borderLight, width: 1 },
  });
  s9.addText(f.title, {
    x: x + 0.15,
    y: y + 0.12,
    w: 2.4,
    h: 0.3,
    fontSize: 11,
    fontFace: FONT_TITLE,
    bold: true,
    color: COLORS.forestDark,
  });
  s9.addText(f.desc, {
    x: x + 0.15,
    y: y + 0.45,
    w: 2.4,
    h: 1.05,
    fontSize: 8.5,
    fontFace: FONT_BODY,
    color: COLORS.slateMedium,
  });
});

// ==========================================
// SLIDE 10: SCREENSHOT 1: HOME & SCANNER
// ==========================================
const s10 = pres.addSlide();
s10.background = { color: COLORS.white };
addSlideHeader(s10, "Live UI Walkthrough: Landing Page & AI Scanner");

const shotHome = path.join(__dirname, "screenshots", "screenshot_home.png");
const shotScan = path.join(__dirname, "screenshots", "screenshot_scan.png");

// Left Image (Home)
if (fs.existsSync(shotHome)) {
  s10.addImage({ path: shotHome, x: 0.8, y: 1.5, w: 4.1, h: 2.5 });
}
s10.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 4.1, w: 4.1, h: 0.95, rectRadius: 0.08, fill: { color: COLORS.cardBg }, line: { color: COLORS.emerald, width: 1 } });
s10.addText("Homepage & Mission Portal (/) : Modern nature-inspired hero, live civic statistics badge, quick 3-step explainer card, and instant scan CTA.", {
  x: 0.9, y: 4.15, w: 3.9, h: 0.85, fontSize: 8.5, fontFace: FONT_BODY, color: COLORS.slateDark
});

// Right Image (Scanner)
if (fs.existsSync(shotScan)) {
  s10.addImage({ path: shotScan, x: 5.1, y: 1.5, w: 4.1, h: 2.5 });
}
s10.addShape(pres.ShapeType.roundRect, { x: 5.1, y: 4.1, w: 4.1, h: 0.95, rectRadius: 0.08, fill: { color: COLORS.cardBg }, line: { color: COLORS.blue, width: 1 } });
s10.addText("Live Waste Scanner (/scan) : Drag-and-drop zone, camera snapshot support, authentic preset sample images (bottle, can, peel, battery), and auto demo fallback.", {
  x: 5.2, y: 4.15, w: 3.9, h: 0.85, fontSize: 8.5, fontFace: FONT_BODY, color: COLORS.slateDark
});

// ==========================================
// SLIDE 11: SCREENSHOT 2: RESULT & MULTI-WASTE
// ==========================================
const s11 = pres.addSlide();
s11.background = { color: COLORS.white };
addSlideHeader(s11, "Live UI Walkthrough: 3-Layer Result & Multi-Waste Detection");

const shotResult = path.join(__dirname, "screenshots", "screenshot_result.png");
const shotMulti = path.join(__dirname, "screenshots", "screenshot_multi.png");

// Left Image (Result)
if (fs.existsSync(shotResult)) {
  s11.addImage({ path: shotResult, x: 0.8, y: 1.5, w: 4.1, h: 2.5 });
}
s11.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 4.1, w: 4.1, h: 0.95, rectRadius: 0.08, fill: { color: COLORS.cardBg }, line: { color: COLORS.emerald, width: 1 } });
s11.addText("3-Layer Result Visualizer (/demo/plastic-bottle) : Clean layer 1 (Green Bin classification), layer 2 (PET facts & 450-yr degradation), layer 3 (cap separation guide).", {
  x: 0.9, y: 4.15, w: 3.9, h: 0.85, fontSize: 8.5, fontFace: FONT_BODY, color: COLORS.slateDark
});

// Right Image (Multi-Waste)
if (fs.existsSync(shotMulti)) {
  s11.addImage({ path: shotMulti, x: 5.1, y: 1.5, w: 4.1, h: 2.5 });
}
s11.addShape(pres.ShapeType.roundRect, { x: 5.1, y: 4.1, w: 4.1, h: 0.95, rectRadius: 0.08, fill: { color: COLORS.cardBg }, line: { color: COLORS.purple, width: 1 } });
s11.addText("Multi-Waste Detection (/demo/multi) : Detects 3 separate items in a single photo (Plastic Bottle, Soda Can, Banana Peel) with interactive batch selector and sorting queue.", {
  x: 5.2, y: 4.15, w: 3.9, h: 0.85, fontSize: 8.5, fontFace: FONT_BODY, color: COLORS.slateDark
});

// ==========================================
// SLIDE 12: SCREENSHOT 3: GAME & BIN GUIDE
// ==========================================
const s12 = pres.addSlide();
s12.background = { color: COLORS.white };
addSlideHeader(s12, "Live UI Walkthrough: Gamified Sorting & Bin Guide");

const shotGame = path.join(__dirname, "screenshots", "screenshot_game.png");
const shotBins = path.join(__dirname, "screenshots", "screenshot_bins.png");

// Left Image (Game)
if (fs.existsSync(shotGame)) {
  s12.addImage({ path: shotGame, x: 0.8, y: 1.5, w: 4.1, h: 2.5 });
}
s12.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 4.1, w: 4.1, h: 0.95, rectRadius: 0.08, fill: { color: COLORS.cardBg }, line: { color: COLORS.amber, width: 1 } });
s12.addText("Interactive Sorting Game (/game) : 4 color-coded municipal bins, real-time score tracker, dynamic streak counters, and instant feedback audio + animations.", {
  x: 0.9, y: 4.15, w: 3.9, h: 0.85, fontSize: 8.5, fontFace: FONT_BODY, color: COLORS.slateDark
});

// Right Image (Bins Guide)
if (fs.existsSync(shotBins)) {
  s12.addImage({ path: shotBins, x: 5.1, y: 1.5, w: 4.1, h: 2.5 });
}
s12.addShape(pres.ShapeType.roundRect, { x: 5.1, y: 4.1, w: 4.1, h: 0.95, rectRadius: 0.08, fill: { color: COLORS.cardBg }, line: { color: COLORS.emerald, width: 1 } });
s12.addText("Municipal Bins Guide (/bins) : Comprehensive guide for 4 bins: Green (Dry Recyclables), Blue (Landfill), Brown (Organic Compost), and Purple (Hazardous/E-Waste).", {
  x: 5.2, y: 4.15, w: 3.9, h: 0.85, fontSize: 8.5, fontFace: FONT_BODY, color: COLORS.slateDark
});

// ==========================================
// SLIDE 13: METHODOLOGY & AGILE SPRINTS
// ==========================================
const s13 = pres.addSlide();
s13.background = { color: COLORS.white };
addSlideHeader(s13, "Methodology & Development Approach: Agile Sprints");

const sprints = [
  { name: "Sprint 1", title: "Plan & Design", color: COLORS.forestDark, tasks: "• Requirement engineering\n• UI/UX wireframes\n• Municipal bin research\n• Architecture planning" },
  { name: "Sprint 2", title: "Frontend UI", color: COLORS.emerald, tasks: "• React 19 app setup\n• Tailwind CSS v4 styling\n• Webcam & file upload\n• Redux Toolkit store" },
  { name: "Sprint 3", title: "AI Vision", color: COLORS.amber, tasks: "• Google Gemini Vision\n• Prompt optimization\n• Structured JSON parsing\n• Confidence scoring" },
  { name: "Sprint 4", title: "Backend Bridge", color: COLORS.blue, tasks: "• Spring Boot 3 setup\n• Secure API gateway\n• CORS & multipart rules\n• Demo catalog service" },
  { name: "Sprint 5", title: "QA & Exhibition", color: COLORS.purple, tasks: "• 37 Maven unit tests\n• Multi-waste feature\n• Performance tuning\n• TechVista readiness" },
];

sprints.forEach((sp, idx) => {
  const x = 0.8 + idx * 1.72;
  s13.addShape(pres.ShapeType.roundRect, {
    x,
    y: 1.6,
    w: 1.6,
    h: 3.2,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: sp.color, width: 2 },
  });
  s13.addText(sp.name, {
    x,
    y: 1.75,
    w: 1.6,
    h: 0.25,
    fontSize: 10,
    fontFace: FONT_TITLE,
    bold: true,
    color: sp.color,
    align: "center",
  });
  s13.addText(sp.title, {
    x: x + 0.05,
    y: 2.0,
    w: 1.5,
    h: 0.4,
    fontSize: 11,
    fontFace: FONT_TITLE,
    bold: true,
    color: COLORS.slateDark,
    align: "center",
  });
  s13.addText(sp.tasks, {
    x: x + 0.1,
    y: 2.5,
    w: 1.4,
    h: 2.1,
    fontSize: 8.5,
    fontFace: FONT_BODY,
    color: COLORS.slateMedium,
  });
});

s13.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 4.95,
  w: 8.4,
  h: 0.35,
  rectRadius: 0.08,
  fill: { color: COLORS.slateDark },
});
s13.addText("Agile Principles: Continuous Integration, Weekly Demo Testing, and Zero-API-Key Exposure on Frontend", {
  x: 0.8,
  y: 4.95,
  w: 8.4,
  h: 0.35,
  fontSize: 8.5,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.white,
  align: "center",
  valign: "middle",
});

// ==========================================
// SLIDE 14: TESTING & QUALITY ASSURANCE
// ==========================================
const s14 = pres.addSlide();
s14.background = { color: COLORS.white };
addSlideHeader(s14, "Testing, Verification & Quality Assurance");

// Table
const qaRows = [
  [
    { text: "Test Dimension", options: { bold: true, fill: { color: COLORS.forestDark }, color: COLORS.white } },
    { text: "Component Tested", options: { bold: true, fill: { color: COLORS.forestDark }, color: COLORS.white } },
    { text: "Methodology & Tools", options: { bold: true, fill: { color: COLORS.forestDark }, color: COLORS.white } },
    { text: "Outcome & Status", options: { bold: true, fill: { color: COLORS.forestDark }, color: COLORS.white } },
  ],
  [
    { text: "Backend Unit Testing", options: { bold: true, color: COLORS.slateDark } },
    { text: "ImageValidator, GeminiResultParser, DemoService", options: { color: COLORS.slateMedium } },
    { text: "JUnit 5, Mockito, Maven Test Runner", options: { color: COLORS.slateMedium } },
    { text: "✔ 37 / 37 Tests Passing (100% Pass)", options: { bold: true, color: COLORS.emerald } },
  ],
  [
    { text: "Image Validation Testing", options: { bold: true, color: COLORS.slateDark } },
    { text: "Invalid files, text notes, >5MB images", options: { color: COLORS.slateMedium } },
    { text: "HTTP 400 Bad Request error assertions", options: { color: COLORS.slateMedium } },
    { text: "✔ Secure rejection of invalid MIME formats", options: { bold: true, color: COLORS.emerald } },
  ],
  [
    { text: "Integration Testing", options: { bold: true, color: COLORS.slateDark } },
    { text: "React RTK Query ➔ Spring Boot ➔ Gemini AI", options: { color: COLORS.slateMedium } },
    { text: "Full multipart payload upload & JSON check", options: { color: COLORS.slateMedium } },
    { text: "✔ End-to-end classification in < 2.0s", options: { bold: true, color: COLORS.emerald } },
  ],
  [
    { text: "Offline Resilience Testing", options: { bold: true, color: COLORS.slateDark } },
    { text: "Demo catalog fallback mechanism", options: { color: COLORS.slateMedium } },
    { text: "Simulated network disconnect & 502 mock", options: { color: COLORS.slateMedium } },
    { text: "✔ Zero downtime: Seamless switch to demo", options: { bold: true, color: COLORS.emerald } },
  ],
  [
    { text: "Responsive & Cross-Device", options: { bold: true, color: COLORS.slateDark } },
    { text: "Webcam viewfinder, sorting cards, touch", options: { color: COLORS.slateMedium } },
    { text: "Chrome DevTools, Edge, Mobile viewports", options: { color: COLORS.slateMedium } },
    { text: "✔ 100% Mobile & Desktop compatible", options: { bold: true, color: COLORS.emerald } },
  ],
];

s14.addTable(qaRows, {
  x: 0.8,
  y: 1.6,
  w: 8.4,
  h: 3.3,
  colW: [2.0, 2.3, 2.3, 1.8],
  fontSize: 9,
  fontFace: FONT_BODY,
  border: { pt: 0.5, color: COLORS.borderLight },
  align: "left",
  valign: "middle",
});

// ==========================================
// SLIDE 15: CHALLENGES & SOLUTIONS
// ==========================================
const s15 = pres.addSlide();
s15.background = { color: COLORS.white };
addSlideHeader(s15, "Engineering Challenges & Implemented Solutions");

const challenges = [
  {
    c: "API Key Exposure in Browser",
    s: "Calling Gemini directly from React would expose the API key in client network logs. Solution: Migrated all AI logic into a Spring Boot gateway where credentials remain strictly server-side.",
    col: COLORS.rose,
  },
  {
    c: "Exhibition Connectivity & Rate Limits",
    s: "College exhibitions have unpredictable Wi-Fi. Solution: Built an offline Demo Catalog (`/api/demo`) with 9 pre-analyzed items and a multi-waste picnic combo for 100% reliable live demonstrations.",
    col: COLORS.amber,
  },
  {
    c: "Spring 7 Colon URI Template Encoding Bug",
    s: "Google's endpoint uses `:generateContent`. Spring's WebClient encoded the colon into `%3A`, causing HTTP 404 errors. Solution: Re-engineered with `URI.create()` to preserve exact RFC compliance.",
    col: COLORS.blue,
  },
  {
    c: "Multi-Item Garbage Discards in Single Photo",
    s: "Real-world waste photos frequently contain multiple items (e.g., bottle + can). Solution: Built `MultiWasteResult` schema with dynamic AI array parsing and interactive item-by-item sorting.",
    col: COLORS.purple,
  },
];

challenges.forEach((item, idx) => {
  const y = 1.5 + idx * 0.9;
  s15.addShape(pres.ShapeType.roundRect, {
    x: 0.8,
    y,
    w: 8.4,
    h: 0.8,
    rectRadius: 0.08,
    fill: { color: COLORS.cardBg },
    line: { color: item.col, width: 1.5 },
  });
  s15.addText(`CHALLENGE ${idx + 1}: ${item.c}`, {
    x: 0.95,
    y: y + 0.08,
    w: 8.1,
    h: 0.25,
    fontSize: 9.5,
    fontFace: FONT_TITLE,
    bold: true,
    color: item.col,
  });
  s15.addText(`ENGINEERING SOLUTION: ${item.s}`, {
    x: 0.95,
    y: y + 0.32,
    w: 8.1,
    h: 0.42,
    fontSize: 8.5,
    fontFace: FONT_BODY,
    color: COLORS.slateDark,
  });
});

// ==========================================
// SLIDE 16: IMPACT & SUSTAINABILITY (SDGs)
// ==========================================
const s16 = pres.addSlide();
s16.background = { color: COLORS.white };
addSlideHeader(s16, "Impact & Sustainability: Link to TechVista Theme");

const sdgs = [
  {
    num: "SDG 11",
    title: "Sustainable Cities & Communities",
    color: COLORS.amber,
    pts: [
      "Cleaner urban & campus spaces",
      "Less open dumping and street littering",
      "Encourages local civic segregation habits",
      "Enhances municipal collection efficiency",
    ],
  },
  {
    num: "SDG 12",
    title: "Responsible Consumption",
    color: COLORS.forestDark,
    pts: [
      "Diverts clean recyclables from landfills",
      "Prevents recycling stream contamination",
      "Promotes circular economy reuse practices",
      "Educates on single-use plastic reduction",
    ],
  },
  {
    num: "SDG 13",
    title: "Climate Action",
    color: COLORS.blue,
    pts: [
      "Reduces methane gas emissions in landfills",
      "Prevents hazardous battery chemical leaching",
      "Saves energy required to produce virgin plastic",
      "Supports national Swachh Bharat mission",
    ],
  },
];

sdgs.forEach((s, idx) => {
  const x = 0.8 + idx * 2.85;
  s16.addShape(pres.ShapeType.roundRect, {
    x,
    y: 1.5,
    w: 2.7,
    h: 3.2,
    rectRadius: 0.12,
    fill: { color: COLORS.cardBg },
    line: { color: s.color, width: 2 },
  });
  s16.addShape(pres.ShapeType.rect, {
    x: x + 0.2,
    y: 1.7,
    w: 2.3,
    h: 0.45,
    fill: { color: s.color },
  });
  s16.addText(s.num, {
    x: x + 0.2,
    y: 1.7,
    w: 2.3,
    h: 0.45,
    fontSize: 14,
    fontFace: FONT_TITLE,
    bold: true,
    color: COLORS.white,
    align: "center",
    valign: "middle",
  });
  s16.addText(s.title, {
    x: x + 0.15,
    y: 2.25,
    w: 2.4,
    h: 0.4,
    fontSize: 10.5,
    fontFace: FONT_TITLE,
    bold: true,
    color: COLORS.slateDark,
    align: "center",
  });
  const bulletText = s.pts.map((p) => `• ${p}`).join("\n\n");
  s16.addText(bulletText, {
    x: x + 0.15,
    y: 2.75,
    w: 2.4,
    h: 1.8,
    fontSize: 8.5,
    fontFace: FONT_BODY,
    color: COLORS.slateMedium,
  });
});

s16.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 4.85,
  w: 8.4,
  h: 0.45,
  rectRadius: 0.08,
  fill: { color: COLORS.forestDark },
});
s16.addText('TechVista Motto: "From Ideas to Impact: Building a Sustainable Future" — Small Steps, Big Change!', {
  x: 0.8,
  y: 4.85,
  w: 8.4,
  h: 0.45,
  fontSize: 10,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.white,
  align: "center",
  valign: "middle",
});

// ==========================================
// SLIDE 17: FUTURE ROADMAP & IOT HARDWARE
// ==========================================
const s17 = pres.addSlide();
s17.background = { color: COLORS.white };
addSlideHeader(s17, "Future Roadmap: IoT Smart-Bin Integration");

const roadmaps = [
  {
    phase: "Phase 1 (Accomplished)",
    color: COLORS.emerald,
    title: "Web & Vision Core",
    items: [
      "Full multimodal Gemini AI Vision scanner",
      "Spring Boot 3 secure gateway proxy",
      "React 19 responsive UI with gamification",
      "Multi-waste detection & offline exhibition mode",
    ],
  },
  {
    phase: "Phase 2 (Next 6 Months)",
    color: COLORS.blue,
    title: "IoT Hardware Smart Bin",
    items: [
      "Physical bin prototype with Raspberry Pi / ESP32",
      "Servo-actuated motorized lids opening automatically",
      "Ultrasonic fill-level sensors reporting bin capacity",
      "On-device TensorFlow Lite model for zero-latency",
    ],
  },
  {
    phase: "Phase 3 (Long-Term Vision)",
    color: COLORS.purple,
    title: "Civic & Municipal Deployment",
    items: [
      "Regional voice guidance in Bengali and Hindi",
      "Municipal Corporation ward analytics dashboard",
      "GPS geotagging for smart collection route optimization",
      "Reward integration with municipal eco-coupons",
    ],
  },
];

roadmaps.forEach((r, idx) => {
  const x = 0.8 + idx * 2.85;
  s17.addShape(pres.ShapeType.roundRect, {
    x,
    y: 1.5,
    w: 2.7,
    h: 3.5,
    rectRadius: 0.12,
    fill: { color: COLORS.cardBg },
    line: { color: r.color, width: 2 },
  });
  s17.addText(r.phase, {
    x: x + 0.15,
    y: 1.65,
    w: 2.4,
    h: 0.25,
    fontSize: 9.5,
    fontFace: FONT_TITLE,
    bold: true,
    color: r.color,
  });
  s17.addText(r.title, {
    x: x + 0.15,
    y: 1.95,
    w: 2.4,
    h: 0.35,
    fontSize: 12,
    fontFace: FONT_TITLE,
    bold: true,
    color: COLORS.slateDark,
  });
  const text = r.items.map((i) => `✔ ${i}`).join("\n\n");
  s17.addText(text, {
    x: x + 0.15,
    y: 2.4,
    w: 2.4,
    h: 2.4,
    fontSize: 8.5,
    fontFace: FONT_BODY,
    color: COLORS.slateMedium,
  });
});

// ==========================================
// SLIDE 18: CONCLUSION & THANK YOU
// ==========================================
const s18 = pres.addSlide();
s18.background = { color: COLORS.forestDark };

s18.addText("Thank You!", {
  x: 0.8,
  y: 1.0,
  w: 8.4,
  h: 0.9,
  fontSize: 48,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.white,
  align: "center",
});
s18.addText("Small Steps, Big Change  •  Be a Sustainable Innovator", {
  x: 0.8,
  y: 1.9,
  w: 8.4,
  h: 0.4,
  fontSize: 15,
  fontFace: FONT_TITLE,
  bold: true,
  color: "34D399",
  align: "center",
});

// Summary box
s18.addShape(pres.ShapeType.roundRect, {
  x: 1.5,
  y: 2.5,
  w: 7.0,
  h: 1.8,
  rectRadius: 0.15,
  fill: { color: "043527" },
  line: { color: COLORS.emerald, width: 1.5 },
});
s18.addText("PROJECT SUMMARY & IMPACT:", {
  x: 1.7,
  y: 2.65,
  w: 6.6,
  h: 0.25,
  fontSize: 10,
  fontFace: FONT_TITLE,
  bold: true,
  color: COLORS.amber,
});
s18.addText(
  "EcoScan demonstrates how modern web engineering (React 19 + Spring Boot 3) coupled with Google Gemini Vision AI can eliminate waste segregation confusion, promote lifelong civic recycling habits through gamification, and build a sustainable green future for Siliguri Government Polytechnic and our broader community.",
  {
    x: 1.7,
    y: 2.95,
    w: 6.6,
    h: 0.85,
    fontSize: 9.5,
    fontFace: FONT_BODY,
    color: COLORS.white,
  }
);
s18.addText("We invite the respected Judges & Faculty to test our Live Camera Scanner at our project stall!", {
  x: 1.7,
  y: 3.85,
  w: 6.6,
  h: 0.35,
  fontSize: 9.5,
  fontFace: FONT_TITLE,
  bold: true,
  color: "A7F3D0",
  align: "center",
});

// Footer
s18.addText("Team: Dhruba Bachhar  •  Nabojeet Biswas  •  Subrata Roy  |  Department of Computer Science & Technology  |  TechVista 2026", {
  x: 0.8,
  y: 4.8,
  w: 8.4,
  h: 0.35,
  fontSize: 9,
  fontFace: FONT_BODY,
  color: "94A3B8",
  align: "center",
});

// Write to File
const outputPath = path.join(__dirname, "EcoScan_TechVista_2026.pptx");
pres
  .writeFile({ fileName: outputPath })
  .then((fileName) => {
    console.log(`Presentation generated successfully: ${fileName}`);
  })
  .catch((err) => {
    console.error("Error generating presentation:", err);
  });
