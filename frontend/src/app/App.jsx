import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
  const appReady = useAppReady(); 
  const location = useLocation(); 

  return (
    <>
      <OrganizationSchema />
      <IntroLoader appReady={appReady}>
        <PageTransitionProvider>
          <SmoothScroll>
            <Suspense fallback={null}>
              <Navbar />
              <RouteTransitionWatcher />
              <Layout>
                <ErrorBoundary resetKeys={[location.pathname , location.search]}>   
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
