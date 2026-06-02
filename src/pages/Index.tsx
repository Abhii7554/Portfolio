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

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030303]"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-1">
          <span className="text-xl md:text-2xl font-medium tracking-tight text-foreground/80 handwritten italic">
            Initializing curiosity
          </span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "steps(2)" }}
            className="w-1.5 h-6 bg-primary rounded-full mt-1"
          />
        </div>
        
        <div className="mt-6 w-32 h-[1px] bg-white/5 mx-auto relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-primary/40"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
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
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10"
      >
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
    </div>
  );
};

export default Index;
