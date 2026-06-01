import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import JourneySection from "@/components/JourneySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Loader = () => (
  <motion.div
    className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl font-bold font-mono neon-text mb-4">{"<Dev />"}</div>
      <div className="w-48 h-1 rounded-full overflow-hidden bg-muted mx-auto">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--gradient-neon)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  </motion.div>
);

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <ScrollProgress />
          <Navbar />
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <JourneySection />
          <ContactSection />
          <Footer />
        </motion.div>
      )}
    </>
  );
};

export default Index;
