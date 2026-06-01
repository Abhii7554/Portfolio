import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Brain, Server } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Frontend Dev", desc: "React, TypeScript, Modern CSS" },
  { icon: Server, label: "MERN Stack", desc: "MongoDB, Express, React, Node" },
  { icon: Brain, label: "Data Science", desc: "Python, Pandas, ML Basics" },
  { icon: Database, label: "DBMS", desc: "SQL, MongoDB, Data Modeling" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">About Me</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Passionate <span className="neon-text">Developer</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            I'm a frontend developer on a journey to becoming a versatile full-stack engineer. 
            With 3 frontend projects, 2 full-stack projects, and 3 data science projects under my belt, 
            I'm constantly expanding my skill set across web development and data science.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="glass-card-hover p-6 text-center group"
            >
              <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <h.icon className="text-primary" size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-1">{h.label}</h3>
              <p className="text-sm text-muted-foreground">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
