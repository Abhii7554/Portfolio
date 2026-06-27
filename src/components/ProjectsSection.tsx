import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, X, Folder, ArrowRight } from "lucide-react";

type Category = "all" | "frontend" | "fullstack" | "datascience";

interface Project {
  title: string;
  desc: string;
  tech: string[];
  category: Category;
  color: string;
  image: string | null;
  demo: string | null;
  github: string | null;
  isGroup?: boolean;
  subProjects?: Project[];
}

const projects: Project[] = [
  {
    title: "AI Powered Job Hunt",
    desc: "A modern job tracking platform featuring an AI-powered KNN Job Matching System and real-time communication between job seekers and employers.",
    tech: ["React", "JavaScript", "Machine Learning", "Firebase"],
    category: "fullstack",
    color: "from-neon-blue/20 to-neon-purple/20",
    image: "./job-hunt.png",
    demo: null,
    github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}/AI-Powered-Job-Hunt-and-Applicant-Tracking-System.git`,
  },
  {
    title: "Fasal Salah",
    desc: "An AI-powered agriculture platform helping Indian farmers make informed crop and fertilizer decisions without expensive soil testing.",
    tech: ["React", "TypeScript", "PostgreSQL", "Deno", "Gemini AI"],
    category: "fullstack",
    color: "from-neon-purple/20 to-neon-cyan/20",
    image: "./fasal-salah.png.png",
    demo: null,
    github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}/Fasal_Salah.git`,
  },
  {
    title: "Frontend Projects",
    desc: "A showcase of responsive, user-centric web interfaces focusing on premium aesthetics, animations, and clean design.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "frontend",
    color: "from-neon-blue/20 to-neon-cyan/20",
    image: `https://api.microlink.io/?url=https://${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}.github.io/product-landing-page/&screenshot=true&embed=screenshot.url`,
    demo: null,
    github: null,
    isGroup: true,
    subProjects: [
      {
        title: "Product Landing Page",
        desc: "A sleek landing page for a smartwatch product, featuring smooth animations and a fully responsive layout.",
        tech: ["HTML", "CSS", "JavaScript"],
        category: "frontend",
        color: "from-neon-blue/20 to-neon-cyan/20",
        image: `https://api.microlink.io/?url=https://${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}.github.io/product-landing-page/&screenshot=true&embed=screenshot.url`,
        demo: `https://${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}.github.io/product-landing-page/`,
        github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}/product-landing-page.git`,
      },
      {
        title: "Personal Blog Website",
        desc: "A modern blog platform with dark mode and responsive design, built to share thoughts and articles with a clean reading experience.",
        tech: ["HTML", "CSS", "JavaScript"],
        category: "frontend",
        color: "from-neon-cyan/20 to-neon-blue/20",
        image: `https://api.microlink.io/?url=https://${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}.github.io/personalblog/&screenshot=true&embed=screenshot.url`,
        demo: `https://${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}.github.io/personalblog/`,
        github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}/personalblog.git`,
      },
    ],
  },
  {
    title: "Data Science Projects",
    desc: "A curated collection of machine learning models and data analysis projects forecasting prices, detecting spam, and predicting sales revenue.",
    tech: ["Python", "Pandas", "Scikit-learn", "NLP"],
    category: "datascience",
    color: "from-neon-cyan/20 to-neon-green/20",
    image: null,
    demo: null,
    github: null,
    isGroup: true,
    subProjects: [
      {
        title: "Car Price Prediction",
        desc: "Predicts used car prices using Machine Learning algorithms such as Linear Regression and Random Forest.",
        tech: ["Python", "Pandas", "NumPy", "Scikit-learn"],
        category: "datascience",
        color: "from-neon-cyan/20 to-neon-green/20",
        image: null,
        demo: null,
        github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}/Car_Price_Prediction_Model.git`,
      },
      {
        title: "Email Spam Detection",
        desc: "Classifies emails as Spam or Not Spam using Natural Language Processing (NLP) and Machine Learning techniques.",
        tech: ["Python", "NLTK", "Scikit-learn", "Pandas"],
        category: "datascience",
        color: "from-neon-green/20 to-neon-purple/20",
        image: null,
        demo: null,
        github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}/Email_spam_detector.git`,
      },
      {
        title: "Sales Prediction",
        desc: "Predicts sales revenue based on TV, Radio, and Newspaper advertising investments using Linear Regression.",
        tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn"],
        category: "datascience",
        color: "from-neon-purple/20 to-neon-cyan/20",
        image: null,
        demo: null,
        github: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME?.replace("@", "") || "Abhii7554"}/Sales_Prediction_model.git`,
      },
    ],
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
  const [selectedGroup, setSelectedGroup] = useState<Project | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedGroup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedGroup]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedGroup(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className={`glass-card-hover group overflow-hidden flex flex-col h-full ${p.isGroup ? "cursor-pointer" : ""}`}
              onClick={() => {
                if (p.isGroup) {
                  setSelectedGroup(p);
                }
              }}
            >
              <div className={`aspect-video bg-gradient-to-br ${p.color} flex items-center justify-center relative overflow-hidden flex-shrink-0`}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-4xl font-black text-foreground/5 select-none group-hover:scale-110 transition-transform duration-500">
                    {p.title.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                
                {/* Project Count Pill */}
                {p.isGroup && (
                  <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-glass-border/60 text-[11px] font-semibold text-primary shadow-lg flex items-center gap-1">
                    <Folder size={12} />
                    {p.subProjects?.length} Projects
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pt-2 mt-auto border-t border-border/20">
                  {p.isGroup ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGroup(p);
                      }}
                      className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-semibold cursor-pointer"
                    >
                      Explore Collection <ArrowRight size={14} />
                    </button>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Grouped Project Details Modal */}
      <AnimatePresence>
        {selectedGroup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGroup(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-card border border-border/80 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden glass-card z-10"
            >
              {/* Header */}
              <div className="p-6 border-b border-border/40 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-2xl font-bold neon-text">{selectedGroup.title}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20 flex items-center gap-1">
                      <Folder size={12} />
                      {selectedGroup.subProjects?.length} Projects
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedGroup.desc}</p>
                </div>
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="p-2 rounded-lg bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300 border border-border/50 hover:border-border cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body (Scrollable list of projects) */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-[#030303]/40">
                <div className={`grid grid-cols-1 md:grid-cols-2 ${selectedGroup.subProjects?.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2 max-w-4xl mx-auto"} gap-6`}>
                  {selectedGroup.subProjects?.map((sub, i) => (
                    <motion.div
                      key={sub.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className="glass-card-hover group overflow-hidden flex flex-col h-full"
                    >
                      <div className={`aspect-video bg-gradient-to-br ${sub.color} flex items-center justify-center relative overflow-hidden flex-shrink-0`}>
                        {sub.image ? (
                          <img
                            src={sub.image}
                            alt={sub.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-4xl font-black text-foreground/5 select-none group-hover:scale-110 transition-transform duration-500">
                            {sub.title.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h4 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">{sub.title}</h4>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow">{sub.desc}</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {sub.tech.map((t) => (
                            <span key={t} className="text-[10px] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3 pt-2 mt-auto border-t border-border/20">
                          {sub.demo ? (
                            <a
                              href={sub.demo}
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
                          {sub.github ? (
                            <a
                              href={sub.github}
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
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
