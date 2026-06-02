import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Milestone, Flag, Rocket, Telescope } from "lucide-react";

const milestones = [
  {
    phase: "The Spark",
    icon: Milestone,
    title: "Frontend Foundations",
    desc: "Started my journey with HTML, CSS, and JavaScript. Built my first 3 responsive projects and fell in love with seeing code come to life visually.",
    tech: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    phase: "The Deep Dive",
    icon: Flag,
    title: "Full Stack Journey",
    desc: "Moved beyond the surface to explore the MERN stack. Built 2 complex applications with authentication and database management, learning how to structure real-world apps.",
    tech: ["Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    phase: "The New Frontier",
    icon: Rocket,
    title: "Data Science Exploration",
    desc: "Dived into the world of data using Python and machine learning. Completed 3 projects that taught me how to find patterns and make predictions from raw numbers.",
    tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
  },
  {
    phase: "The Horizon",
    icon: Telescope,
    title: "What's Next",
    desc: "Currently focused on mastering TypeScript and cloud technologies. I'm excited about deep learning and how it can be integrated into modern web applications.",
    tech: ["Data Visualization", "AWS", "Docker", "Deep Learning"],
  },
];

const JourneySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="section-padding relative overflow-hidden">
      {/* Hand-drawn style background line */}
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block" />
      
      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 inline-block">
            My Path
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            A Story of <span className="neon-text">Continuous Growth</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto italic handwritten">
            Tracing my steps from the first "Hello World" to complex full-stack systems.
          </p>
        </motion.div>

        <div className="space-y-12">
          {milestones.map((m, i) => (
            <motion.div
              key={m.phase}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              className={`flex flex-col md:flex-row gap-8 items-center ${
                i % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Visual Phase Indicator */}
              <div className="md:w-1/2 flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative creative-card p-10 flex flex-col items-center text-center max-w-sm">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                      <m.icon className="text-primary" size={32} />
                    </div>
                    <span className="text-xs font-mono text-primary tracking-[0.2em] uppercase mb-2">{m.phase}</span>
                    <h3 className="text-2xl font-bold mb-4">{m.title}</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {m.tech.map((t) => (
                        <span key={t} className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Content */}
              <div className="md:w-1/2">
                <div className="relative p-6 border-l-2 border-primary/20 md:border-none">
                  <p className="text-lg text-muted-foreground leading-relaxed italic relative">
                    <span className="text-5xl text-primary/10 absolute -top-4 -left-2 font-serif">"</span>
                    {m.desc}
                    <span className="text-5xl text-primary/10 absolute -bottom-10 right-0 font-serif">"</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Developer Note - Human Touch */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="mt-24 text-center p-8 border-t border-white/5"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-glass border border-white/10 shadow-xl animate-float-slow">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <p className="text-sm font-medium italic handwritten text-foreground/80">
              Personal Note: I believe the best code is written with curiosity and a bit of caffeine.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
