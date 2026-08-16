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

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Course = lazy(() => import("./pages/Course"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
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
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/course" element={<Course />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
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
