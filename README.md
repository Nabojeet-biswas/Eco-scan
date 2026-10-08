# EcoScan — React & Redux Toolkit (RTK) Query Frontend

An AI-powered recycling classification and educational sorting application built with **React 19**, **Redux Toolkit Query (RTK Query)**, **Redux Persist**, and **Tailwind CSS v4**, connected to a Spring Boot backend running on `http://localhost:8080`.

---

## 🚀 Features

- **Redux Toolkit Query Architecture**:
  - `getStatus`: Health and Gemini AI readiness (`GET /api/status`)
  - `getDemoList`: Catalog of 9 preset recyclable items (`GET /api/demo`)
  - `getDemoResult`: Detailed 15-field waste analysis (`GET /api/demo/{id}`)
  - `scanImage`: Multipart image upload mutation with Gemini Vision (`POST /api/scan`)
- **Interactive Waste Scanner**:
  - Live webcam / device camera feed with crosshair viewfinder and instant frame capture
  - Drag-and-drop file upload supporting JPEG, PNG, and WebP (up to 5MB)
  - Quick-test synthetic sample presets (Plastic Bottle, Soda Can, Banana Peel)
  - Bad file type test button (`notes.txt`) verifying 400 Bad Request error handling
- **Preset Demo Items Showcase**:
  - Interactive grid with emoji icons (Plastic Bottle 🥤, Aluminum Can 🥫, Banana Peel 🍌, Paper 📄, Glass Bottle 🍾, Food Waste 🍲, Plastic Bag 🛍️, Battery 🔋, Cardboard 📦)
  - Unknown identifier test button verifying 404 Not Found handling (`GET /api/demo/unknown`)
- **Comprehensive Waste Information Panel**:
  - Color-coded bin classification: **Recyclable (Blue)**, **Organic (Green)**, **Non-Recyclable (Red)**, **Special Disposal (Amber)**
  - Material and recyclability difficulty badge (`easy`, `medium`, `hard`)
  - Step-by-step preparation checklist
  - Decomposition timeline and environmental impact
  - Side-by-side pros of right disposal vs cons of wrong disposal
  - Circular economy products & creative reuse ideas
  - Fun facts and common mistake warnings
- **Interactive Sorting Game & Gamification**:
  - Sort items into 4 recycling bins with immediate feedback
  - Eco Points counter (+10 base points + streak multiplier)
  - Persistent user history across page refreshes via Redux Persist
- **Live API Explorer**:
  - In-app interactive HTTP client to test and inspect all 6 endpoints with live status codes, request duration, and formatted JSON responses.

---

## 🔌 API Specification & Endpoints

Base URL: `http://localhost:8080` (configured via `VITE_API_BASE_URL` in `.env`)

### 1. Scan a Local Image
```http
POST http://localhost:8080/api/scan
Content-Type: multipart/form-data; boundary=EcoScanBoundary

--EcoScanBoundary
Content-Disposition: form-data; name="image"; filename="plastic-bottle.jpg"
Content-Type: image/jpeg

< C:\images\plastic-bottle.jpg
--EcoScanBoundary--
```

### 2. Demo List
```http
GET http://localhost:8080/api/demo
```

### 3. Demo Result
```http
GET http://localhost:8080/api/demo/plastic-bottle
```

### 4. Unknown Demo Identifier (404 Test)
```http
GET http://localhost:8080/api/demo/unknown
```

### 5. System Status
```http
GET http://localhost:8080/api/status
```

### 6. Bad File Type (400 Test)
```http
POST http://localhost:8080/api/scan
Content-Type: multipart/form-data; boundary=EcoScanBadFile

--EcoScanBadFile
Content-Disposition: form-data; name="image"; filename="notes.txt"
Content-Type: text/plain

This is not an image.
--EcoScanBadFile--
```

*(You can also run these directly using the included `api.http` file in VS Code REST Client or IntelliJ HTTP Client)*

---

## 🛠️ Project Structure

```
ecoscan-frontend/
├── api.http                         # HTTP Client request specification
├── .env                             # Environment configuration (VITE_API_BASE_URL)
├── src/
│   ├── app/
│   │   ├── baseApi.js               # RTK Query createApi & fetchBaseQuery setup
│   │   ├── store.js                 # Redux store with persistReducer & RTK Query middleware
│   │   └── services/
│   │       └── ecoScanApi.js        # Injected RTK Query endpoints & custom hooks
│   ├── features/
│   │   ├── eco/
│   │   │   └── ecoSlice.js          # Redux slice for points, streak, history, active tab
│   │   ├── scanner/
│   │   │   └── ScannerView.jsx      # Webcam, file upload, sample presets, bad file test
│   │   ├── demo/
│   │   │   └── DemoListView.jsx     # Demo items catalog & 404 test handler
│   │   ├── sorting/
│   │   │   └── SortingGame.jsx      # 4-bin interactive sorting challenge
│   │   ├── waste/
│   │   │   ├── constants.js         # Bin colors, icons, and metadata
│   │   │   └── WasteResultCard.jsx  # Comprehensive 15-field waste breakdown
│   │   ├── history/
│   │   │   └── HistoryView.jsx      # Sorting accuracy stats and activity log
│   │   └── explorer/
│   │       └── ApiExplorer.jsx      # Live interactive HTTP request tester
│   ├── components/
│   │   ├── Navbar.jsx               # Navigation bar with points & streak badge
│   │   └── StatusBadge.jsx          # Live backend health & Gemini status pill
│   ├── App.jsx                      # Main application view container
│   ├── main.jsx                     # Root React 19 entry with Redux Provider & PersistGate
│   └── index.css                    # Tailwind CSS v4 styling
└── package.json
```

---

## 🏃 Running the Application

### Prerequisites
- Node.js 18+ & pnpm
- Spring Boot Backend running on `http://localhost:8080`

### Commands
```bash
# Install dependencies
pnpm install

# Start Vite development server
pnpm run dev

# Run Oxlint
pnpm run lint

# Build production bundle
pnpm run build
```
