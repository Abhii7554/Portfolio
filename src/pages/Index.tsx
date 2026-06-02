import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

// Lazy load sections below the fold
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const JourneySection = lazy(() => import("@/components/JourneySection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030303]"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-1">
          <span className="text-xl md:text-2xl font-medium tracking-tight text-foreground/80 handwritten italic">
            Initializing curiosity
          </span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="w-1.5 h-6 bg-primary rounded-full mt-1"
          />
        </div>
        
        <div className="mt-6 w-32 h-[1px] bg-white/5 mx-auto relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-primary/40"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reduced loading time to 1000ms for better perceived performance
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030303]">
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10"
      >
        <ScrollProgress />
        <Navbar />
        <HeroSection />
        <Suspense fallback={<div className="h-20" />}>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <JourneySection />
          <ContactSection />
          <Footer />
        </Suspense>
      </motion.div>
    </div>
  );
};

export default Index;
