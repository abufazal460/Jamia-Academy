import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/footer/Footer";
import { IntroLoader, useAppReady } from "./App/ui/intro-loader";
import {
  PageTransitionProvider,
  RouteTransitionWatcher,
} from "./components/pageTransition";
import SmoothScroll from "./components/smoothScroll/SmoothScroll";
import OrganizationSchema from "./components/seo/OrganizationSchema";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const CertificatePage = lazy(() => import("./pages/CertificatePage"));

export default function App() {
  const appReady = useAppReady(); // ye batata hai site load ho gayi ya nahi
  return (
    <>
    <OrganizationSchema />
      {/* Navbar sabhi pages par common rahega isliye Routes ke bahar rakha gaya hai */}
      <IntroLoader appReady={appReady}>
        <PageTransitionProvider>
          <SmoothScroll>
            <Suspense fallback={null}>
              <Navbar />
              <RouteTransitionWatcher />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/course" element={<CoursesPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/certificate" element={<CertificatePage />} />
              </Routes>
              <Footer />
            </Suspense>
          </SmoothScroll>
        </PageTransitionProvider>
      </IntroLoader>
    </>
  );
}
