// src/components/content/ClientPageHeader.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ClientPageHeaderProps {
  title: string;
  description: string;
  icon: ReactNode;
  iconClassName?: string;
}

export function ClientPageHeader({
  title,
  description,
  icon,
  iconClassName,
}: ClientPageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <motion.div
            className={cn(
              'mb-6 w-fit rounded-2xl bg-gradient-to-br from-background to-muted/50 p-4 shadow-lg',
              iconClassName
            )}
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
          >
            {icon}
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
