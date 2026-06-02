import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Hammer, Laptop, Terminal, Compass } from "lucide-react";

const categories = [
  {
    title: "Frontend",
    icon: Laptop,
    skills: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS"],
    description: "Crafting intuitive and smooth user interfaces.",
  },
  {
    title: "Backend",
    icon: Terminal,
    skills: ["Node.js", "Express", "REST APIs"],
    description: "Building robust systems that power applications.",
  },
  {
    title: "Database",
    icon: Hammer,
    skills: ["MongoDB", "SQL"],
    description: "Designing efficient data architectures.",
  },
  {
    title: "Data Science",
    icon: Compass,
    skills: ["Python", "Pandas", "ML Basics"],
    description: "Finding meaningful patterns in numbers.",
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3 px-4 py-1 rounded-full bg-primary/10 border border-primary/20">
            Tech Stack
          </p>
          <h2 className="text-4xl md:text-5xl font-bold max-w-xl">
            Tools I use to bring <span className="neon-text italic">ideas</span> to life.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + ci * 0.15, duration: 0.5 }}
              className="creative-card p-8 group"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                  <cat.icon className="text-primary" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed italic">{cat.description}</p>
                  
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: 0.4 + ci * 0.15 + si * 0.06,
                          duration: 0.4,
                        }}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border bg-white/5 text-foreground/80 border-white/10 hover:border-primary/50 hover:text-primary transition-all duration-300"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently Exploring Mini Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 p-8 glass-card border-dashed border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold flex items-center gap-2 justify-center md:justify-start">
              <Compass className="text-secondary" size={20} /> 
              Currently Exploring
            </h4>
            <p className="text-sm text-muted-foreground italic">What's brewing in my lab right now...</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {["Next.js 14", "Deep Learning", "Docker", "Cloud Native"].map((tech) => (
              <span key={tech} className="text-xs font-mono px-3 py-1.5 rounded bg-secondary/10 text-secondary border border-secondary/20">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
