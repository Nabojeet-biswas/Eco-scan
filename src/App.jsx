import React from "react";
import { Routes, Route } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingScanButton from "./components/FloatingScanButton";

// Pages
import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import ScanResultPage from "./pages/ScanResultPage";
import DemoGalleryPage from "./pages/DemoGalleryPage";
import DemoResultPage from "./pages/DemoResultPage";
import MultiDemoPage from "./pages/MultiDemoPage";
import LearnGuidePage from "./pages/LearnGuidePage";
import BinGuidePage from "./pages/BinGuidePage";
import CategoriesPage from "./pages/CategoriesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import TipsPage from "./pages/TipsPage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/ContactPage";
import SortGamePage from "./pages/SortGamePage";
import ApiExplorerPage from "./pages/ApiExplorerPage";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#F9FBFA] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-150">
        <ScrollToTop />

        {/* Persistent Top Navigation Bar */}
        <Navbar />

        {/* Main Routed Page Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/result" element={<ScanResultPage />} />
            <Route path="/demo" element={<DemoGalleryPage />} />
            <Route path="/demo/:id" element={<DemoResultPage />} />
            <Route path="/demo/multi" element={<MultiDemoPage />} />
            <Route path="/learn" element={<LearnGuidePage />} />
            <Route path="/bins" element={<BinGuidePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/tips" element={<TipsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/game" element={<SortGamePage />} />
            <Route path="/sort" element={<SortGamePage />} />
            <Route path="/explorer" element={<ApiExplorerPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Mobile Floating Action Button */}
        <FloatingScanButton />

        {/* Persistent Nature-Inspired Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
