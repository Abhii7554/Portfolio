import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Sparkles, Coffee, Bike, Code, Brain, FileText } from "lucide-react";

const currentlyItems = [
  { text: "building responsive web experiences", icon: Code, color: "text-blue-400" },
  { text: "exploring data science", icon: Brain, color: "text-purple-400" },
  { text: "debugging yesterday's confidence", icon: Coffee, color: "text-orange-400" },
  { text: "riding my fav bike", icon: Bike, color: "text-green-400" },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % currentlyItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const CurrentIcon = currentlyItems[index].icon;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Orbs with more personality */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-[120px] animate-pulse delay-700" />
      
      <div className="relative z-10 flex flex-col items-center px-6 max-w-5xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Profile Picture Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group justify-self-center lg:justify-self-start"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary via-secondary to-primary animate-spin-slow opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-primary via-secondary to-primary opacity-30 group-hover:opacity-100 transition-opacity blur-sm" />
              
              <div className="relative h-full w-full rounded-3xl overflow-hidden border-2 border-white/10 bg-glass shadow-2xl">
                <img 
                  src="./profile-pic.jpeg" 
                  alt="Abhishek Patel" 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                {/* Floating badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 flex items-center gap-2"
                >
                  <Sparkles size={14} className="text-yellow-400" />
                  <span className="text-xs font-semibold tracking-wide uppercase">Open to Work</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary tracking-widest uppercase mb-4">
                Full Stack & Data Science
              </span>
              <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
                Hi, I'm <br />
                <span className="neon-text relative">
                  {(import.meta.env.VITE_USER_NAME || "Abhishek Patel").split(" ")[0]}
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </h1>
            </motion.div>

            {/* Currently Card - Replaces Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative h-20 flex items-center justify-center lg:justify-start"
            >
              <div className="glass-card px-6 py-4 flex items-center gap-4 min-w-[280px] border-primary/20 shadow-lg group hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, rotate: -20 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 20 }}
                    >
                      <CurrentIcon size={20} className={currentlyItems[index].color} />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Currently</p>
                  <div className="h-6 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="text-sm md:text-base font-medium"
                      >
                        {currentlyItems[index].text}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed handwritten"
            >
              Building modern web experiences with clean code and a creative soul. Let's build something meaningful.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <button onClick={() => scrollTo("#projects")} className="btn-neon group">
                <span className="flex items-center gap-2">
                  View My Work <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => window.open("./resume.pdf", "_blank")} 
                className="btn-outline-neon flex items-center gap-2"
              >
                <FileText size={16} /> View Resume
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors hidden md:block"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
