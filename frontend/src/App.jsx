import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/footer/Footer";
import { IntroLoader, useAppReady } from "./components/introLoader";
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
const Login = lazy(() => import("./pages/Login"));
const Certificate = lazy(() => import("./pages/Certificate"));

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
                <Route path="/login" element={<Login />} />
                <Route path="/certificate" element={<Certificate />} />
              </Routes>
              <Footer />
            </Suspense>
          </SmoothScroll>
        </PageTransitionProvider>
      </IntroLoader>
    </>
  );
}
