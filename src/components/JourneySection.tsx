import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const milestones = [
  {
    phase: "Phase 1",
    title: "Frontend Foundations",
    desc: "Learned HTML, CSS, JavaScript and built 3 responsive frontend projects.",
    tech: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    phase: "Phase 2",
    title: "Full Stack Journey",
    desc: "Explored MERN stack, built 2 full-stack applications with authentication and databases.",
    tech: ["Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    phase: "Phase 3",
    title: "Data Science Exploration",
    desc: "Dived into Python, data analysis, and machine learning. Completed 3 beginner projects.",
    tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
  },
  {
    phase: "Phase 4",
    title: "What's Next",
    desc: "Deepening full-stack skills, exploring cloud deployment, and advanced ML techniques.",
    tech: ["TypeScript", "AWS", "Docker", "Deep Learning"],
  },
];

const JourneySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="section-padding relative">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">My Path</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Learning <span className="neon-text">Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {milestones.map((m, i) => (
            <motion.div
              key={m.phase}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
              className={`relative flex flex-col md:flex-row items-start mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary neon-glow -translate-x-1/2 mt-2 z-10" />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="glass-card-hover p-6">
                  <span className="text-xs font-mono text-primary tracking-widest">{m.phase}</span>
                  <h3 className="text-xl font-bold mt-1 mb-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{m.desc}</p>
                  <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                    {m.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
