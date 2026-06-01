import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

type Category = "all" | "frontend" | "fullstack" | "datascience";

const projects = [
  {
    title: "AI Powered Job Hunt",
    desc: "A modern job tracking platform featuring an AI-powered KNN Job Matching System and real-time communication between job seekers and employers.",
    tech: ["React", "JavaScript", "Machine Learning", "Firebase"],
    category: "fullstack" as const,
    color: "from-neon-blue/20 to-neon-purple/20",
    image: "./job-hunt.png",
    demo: null,
    github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}/AI-Powered-Job-Hunt-and-Applicant-Tracking-System.git`,
  },
  {
    title: "Fasal Salah",
    desc: "An AI-powered agriculture platform helping Indian farmers make informed crop and fertilizer decisions without expensive soil testing.",
    tech: ["React", "TypeScript", "PostgreSQL", "Deno", "Gemini AI"],
    category: "fullstack" as const,
    color: "from-neon-purple/20 to-neon-cyan/20",
    image: "./fasal-salah.png.png",
    demo: null,
    github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}/Fasal_Salah.git`,
  },
  {
    title: "Personal Blog Website",
    desc: "A modern blog platform with dark mode and responsive design, built to share thoughts and articles with a clean reading experience.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "frontend" as const,
    color: "from-neon-cyan/20 to-neon-blue/20",
    image: `https://api.microlink.io/?url=https://${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}.github.io/personalblog/&screenshot=true&embed=screenshot.url`,
    demo: `https://${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}.github.io/personalblog/`,
    github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}/personalblog.git`,
  },
  {
    title: "Product Landing Page",
    desc: "A sleek landing page for a smartwatch product, featuring smooth animations and a fully responsive layout.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "frontend" as const,
    color: "from-neon-blue/20 to-neon-cyan/20",
    image: `https://api.microlink.io/?url=https://${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}.github.io/product-landing-page/&screenshot=true&embed=screenshot.url`,
    demo: `https://${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}.github.io/product-landing-page/`,
    github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}/product-landing-page.git`,
  },
  {
    title: "Car Price Prediction",
    desc: "Predicts used car prices using Machine Learning algorithms such as Linear Regression and Random Forest.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    category: "datascience" as const,
    color: "from-neon-cyan/20 to-neon-green/20",
    image: null,
    demo: null,
    github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}/Car_Price_Prediction_Model.git`,
  },
  {
    title: "Email Spam Detection",
    desc: "Classifies emails as Spam or Not Spam using Natural Language Processing (NLP) and Machine Learning techniques.",
    tech: ["Python", "NLTK", "Scikit-learn", "Pandas"],
    category: "datascience" as const,
    color: "from-neon-green/20 to-neon-purple/20",
    image: null,
    demo: null,
    github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}/Email_spam_detector.git`,
  },
  {
    title: "Sales Prediction",
    desc: "Predicts sales revenue based on TV, Radio, and Newspaper advertising investments using Linear Regression.",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn"],
    category: "datascience" as const,
    color: "from-neon-purple/20 to-neon-cyan/20",
    image: null,
    demo: null,
    github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}/Sales_Prediction_model.git`,
  },
];

const filters: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Data Science", value: "datascience" },
];

const ProjectsSection = () => {
  const [active, setActive] = useState<Category>("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">My Work</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Featured <span className="neon-text">Projects</span>
          </h2>

          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === f.value
                    ? "btn-neon py-2 px-5"
                    : "glass-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="glass-card-hover group overflow-hidden"
            >
              <div className={`aspect-video bg-gradient-to-br ${p.color} flex items-center justify-center relative overflow-hidden`}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <span className="text-4xl font-black text-foreground/5 select-none group-hover:scale-110 transition-transform duration-500">
                    {p.title.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {p.demo ? (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={14} /> Demo
                    </a>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground/40 cursor-not-allowed">
                      <ExternalLink size={14} /> Demo
                    </span>
                  )}
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github size={14} /> Code
                    </a>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground/40 cursor-not-allowed">
                      <Github size={14} /> Code
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
