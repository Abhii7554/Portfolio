import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()}{" "}
        <span className="neon-text font-semibold">{import.meta.env.VITE_USER_NAME || "Abhishek Patel"}</span>. Built with passion.
      </p>
      <div className="flex items-center gap-4">
        {[
          { icon: Github, href: import.meta.env.VITE_GITHUB_URL || "https://github.com/Abhii7554" },
          { icon: Linkedin, href: import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/abhishek-patel-595055286" },
        ].map((s, i) => (
          <a
            key={i}
            href={s.href}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
          >
            <s.icon size={18} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
