import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/footer/Footer";
import { IntroLoader, useAppReady } from "./components/introLoader";

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


export default function App() {
  const appReady = useAppReady(); // ye batata hai site load ho gayi ya nahi
  return (
    <>
      {/* Navbar sabhi pages par common rahega isliye Routes ke bahar rakha gaya hai */}
      <IntroLoader appReady={appReady}>
        <Suspense>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/course" element={<Course />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </Suspense>
      </IntroLoader>
    </>
  );
}
