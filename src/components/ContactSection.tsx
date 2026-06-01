import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Github, Linkedin, Mail, MapPin, ArrowUpRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Note: You need to get an access key from https://web3forms.com/
      // It's free and takes 1 minute. You can either:
      // 1. Replace 'YOUR_ACCESS_KEY_HERE' below with your key
      // 2. Or better, add VITE_WEB3FORMS_ACCESS_KEY=your_key to a .env file
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Portfolio Message from ${form.name}`,
          from_name: `${import.meta.env.VITE_USER_NAME || "Portfolio"} Contact Form`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please check your connection.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-transparent border rounded-xl px-5 py-3.5 text-sm transition-all duration-300 placeholder:text-muted-foreground/40 focus:outline-none ${
      focused === field
        ? "border-primary/60 shadow-[0_0_20px_hsl(220_90%_56%/0.15)]"
        : "border-glass-border/60 hover:border-muted-foreground/30"
    }`;

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px]" />

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="neon-text">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-3 glass-card p-8 md:p-10 space-y-6 relative overflow-hidden"
          >
            {/* Subtle inner glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/5 blur-[60px]" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-secondary/5 blur-[60px]" />

            <div className="relative z-10 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-2.5 block">
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    required
                    className={inputClass("name")}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-2.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    required
                    className={inputClass("email")}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-2.5 block">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  required
                  rows={5}
                  className={`${inputClass("message")} resize-none`}
                  placeholder="Tell me about your project or idea..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-neon flex items-center gap-2.5 w-full sm:w-auto justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Sending... <Loader2 size={15} className="animate-spin" /></>
                ) : (
                  <>Send Message <Send size={15} /></>
                )}
              </button>
            </div>
          </motion.form>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              {
                icon: Github,
                label: "GitHub",
                value: import.meta.env.VITE_GITHUB_USERNAME || "@Abhii7554",
                href: import.meta.env.VITE_GITHUB_URL || "https://github.com/Abhii7554",
                detail: "Check out my repos",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value: import.meta.env.VITE_USER_NAME || "Abhishek Patel",
                href: import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/abhishek-patel-595055286",
                detail: "Let's connect professionally",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Available Remote",
                href: "#",
                detail: "Open to opportunities worldwide",
              },
            ].map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                className="glass-card p-5 flex items-center gap-4 group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_hsl(220_90%_56%/0.1)] block relative overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.03] transition-colors duration-500" />
                <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 flex-shrink-0">
                  <s.icon className="text-primary" size={20} />
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.detail}</p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="relative z-10 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
