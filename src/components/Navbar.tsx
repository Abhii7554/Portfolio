import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50);

      // ScrollSpy logic
      const sections = ["hero", "about", "skills", "projects", "journey", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    console.log(`[NAVBAR] Mobile link tapped: ${href}`);
    console.log(`[DEBUG] scrollTo entered with href: ${href}`);
    
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    console.log(`[DEBUG] ID extracted: ${id}, element lookup: ${element ? 'FOUND' : 'NOT FOUND'}`);
    console.log(`[DEBUG] window.scrollY before scroll: ${window.scrollY}`);

    const performScroll = (offsetPosition: number) => {
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      console.log(`[DEBUG] window.scrollY after scroll (immediate): ${window.scrollY}`);

      setTimeout(() => {
        console.log(`[DEBUG] window.scrollY after 300ms: ${window.scrollY}`);
      }, 300);

      setTimeout(() => {
        console.log(`[DEBUG] window.scrollY after 1000ms: ${window.scrollY}`);
      }, 1000);
    };

    if (element) {
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      console.log(`[DEBUG] bodyRect.top: ${bodyRect}, elementRect.top: ${elementRect}`);
      console.log(`[DEBUG] Calculated offsetPosition: ${offsetPosition}`);

      if (open) {
        setOpen(false);
        setTimeout(() => {
          performScroll(offsetPosition);
        }, 100);
      } else {
        performScroll(offsetPosition);
      }
      
      // Manually set active section for immediate feedback
      setActiveSection(id);
    } else {
      // Fallback: standard scrollIntoView if element exists by selector
      const el = document.querySelector(href);
      if (el) {
        if (open) {
          setOpen(false);
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
        setActiveSection(id);
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open ? "glass-card border-b py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button 
          type="button"
          onClick={() => scrollTo("#hero")} 
          className="text-xl font-bold neon-text font-mono cursor-pointer"
        >
          {"Portfolio"}
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              type="button"
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={`text-sm transition-colors relative group cursor-pointer ${
                activeSection === l.href.replace("#", "")
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1 left-0 h-[1.5px] bg-primary transition-all duration-300 ${
                  activeSection === l.href.replace("#", "") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
          <button 
            type="button"
            onClick={() => window.open("./resume.pdf", "_blank")} 
            className="btn-neon text-sm py-2 px-5 cursor-pointer flex items-center gap-2"
          >
            <FileText size={16} /> Resume
          </button>
        </div>

        {/* Mobile toggle */}
        <button 
          type="button"
          className="md:hidden text-foreground cursor-pointer" 
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/30 mt-3 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <button
                  type="button"
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className={`text-base transition-colors text-left cursor-pointer ${
                    activeSection === l.href.replace("#", "")
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <button 
                type="button"
                onClick={() => {
                  setOpen(false);
                  window.open("./resume.pdf", "_blank");
                }} 
                className="btn-neon text-sm py-3 px-6 w-full cursor-pointer flex items-center justify-center gap-2"
              >
                <FileText size={18} /> Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
