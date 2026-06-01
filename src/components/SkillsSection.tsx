import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  {
    title: "Frontend",
    skills: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "REST APIs"],
  },
  {
    title: "Database",
    skills: ["MongoDB", "SQL", "Data Modeling"],
  },
  {
    title: "Data Science",
    skills: ["Python", "Pandas", "ML Basics", "Data Viz"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">My Skills</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Tech <span className="neon-text">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + ci * 0.15, duration: 0.5 }}
              className="glass-card p-6 md:p-8"
            >
              <h3 className="text-xl font-bold mb-6 neon-text">{cat.title}</h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 0.3 + ci * 0.15 + si * 0.06,
                      duration: 0.4,
                      ease: "backOut",
                    }}
                    className="px-4 py-2 rounded-full text-sm font-medium border bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/40 hover:shadow-[0_0_12px_hsl(var(--primary)/0.25)] transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
