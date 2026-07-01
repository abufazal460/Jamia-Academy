import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/footer/Footer";

// ====================================================================
// App.jsx
// Ye Routes ka entry point hai. React.lazy() use kiya hai taki
// SIRF jo page click kiya jaye wahi load ho, baaki pages load hi nahi honge
// (Code Splitting). Isse initial bundle size chhota rehta hai = fast load.
// ====================================================================

// Lazy imports - har page apni alag JS chunk file me build hogi.
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Course = lazy(() => import("./pages/Course"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));

// Simple, lightweight fallback loader - Suspense ke andar dikhta hai
// jab tak lazy chunk download/parse ho raha ho.
function PageLoader() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="text-sm font-medium text-slate-400">Loading...</span>
    </div>
  );
}

export default function App() {
  return (
    <>
      {/* Navbar sabhi pages par common rahega isliye Routes ke bahar rakha gaya hai */}
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/course" element={<Course />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
