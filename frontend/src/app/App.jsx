import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../shared/components/navigation/Navbar";
import Footer from "../shared/components/footer/Footer";
import { IntroLoader, useAppReady } from "./ui/intro-loader";
import {
  PageTransitionProvider,
  RouteTransitionWatcher,
} from "../app/providers/page-transition";
import SmoothScroll from "./providers/SmoothScroll";
import OrganizationSchema from "../shared/seo/OrganizationSchema";
import Layout from "../shared/components/layout/Layout";
import ErrorBoundary from "./providers/ErrorBoundary";


const HomePage = lazy(() => import("../pages/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const CoursesPage = lazy(() => import("../pages/CoursesPage"));
const GalleryPage = lazy(() => import("../pages/GalleryPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const CertificatePage = lazy(() => import("../pages/CertificatePage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

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
              <Layout>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/course" element={<CoursesPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/certificate" element={<CertificatePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </ErrorBoundary>
              </Layout>
              <Footer />
            </Suspense>
          </SmoothScroll>
        </PageTransitionProvider>
      </IntroLoader>
    </>
  );
}
