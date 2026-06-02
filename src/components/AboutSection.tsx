import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Sparkles, Pencil, BookOpen, Coffee } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-secondary/5 blur-3xl rounded-full" />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <Pencil size={14} /> The Story Behind The Code
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            A Little <span className="neon-text">About Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Creative Quote Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <div className="creative-card p-10 md:p-14 group">
              <Quote className="absolute top-6 left-6 text-primary/10 group-hover:text-primary/20 transition-colors" size={80} />
              
              <div className="relative z-10 space-y-8">
                <p className="text-2xl md:text-3xl font-medium leading-tight text-foreground/90 italic">
                  "Hi, I'm Abhishek. I enjoy building things for the web and finding patterns in data. In other words, I like making sense of both <span className="text-primary font-bold">pixels</span> and <span className="text-secondary font-bold">numbers</span>."
                </p>
                
                <div className="flex items-center gap-4 py-4 border-y border-white/5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Coffee size={20} className="text-primary" />
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Currently learning, building, and occasionally debugging things that worked perfectly five minutes ago.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium">
                    <Sparkles size={14} className="text-yellow-400" /> Curious Learner
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium">
                    <BookOpen size={14} className="text-blue-400" /> Problem Solver
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating elements / Fun facts */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-card p-6 border-primary/10 hover:border-primary/30 transition-all animate-float-slow"
            >
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> 
                Personal Philosophy
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Code is more than just instructions for machines; it's a way to solve human problems and create delightful experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="glass-card p-6 border-secondary/10 hover:border-secondary/30 transition-all animate-float-slow"
              style={{ animationDelay: "1s" }}
            >
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> 
                Beyond the Screen
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                When I'm not coding, you'll probably find me riding my bike or exploring new data patterns in everyday life.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
