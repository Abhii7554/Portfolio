import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] w-3 h-3 rounded-full"
      animate={{
        x: pos.x - 6,
        y: pos.y - 6,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.3 }}
      style={{
        background: "linear-gradient(135deg, hsl(220 90% 56%), hsl(270 80% 60%))",
        boxShadow: "0 0 8px hsl(220 90% 56% / 0.5)",
      }}
    />
  );
};

export default CustomCursor;
