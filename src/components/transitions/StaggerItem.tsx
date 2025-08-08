// =======================================
// components/transitions/StaggerItem.tsx
// =======================================

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const itemVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.25, 0, 1],
    },
  },
};

export function StaggerItem({
  children,
  className = "",
  delay = 0,
}: StaggerItemProps) {
  return (
    <motion.div
      variants={itemVariants as any}
      className={className}
      style={{ "--delay": `${delay}s` } as any}
    >
      {children}
    </motion.div>
  );
}
