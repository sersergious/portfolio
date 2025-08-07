// components/content/ContentHeader.tsx
"use client";

import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Code,
  Download,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Share2,
  Tag,
  User,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlogPost, Project, ResearchPaper } from "@/lib/mdx-content";

type Content = BlogPost | Project | ResearchPaper;

interface ContentHeaderProps {
  content: Content;
  type: "blog" | "project" | "research";
}

const contentConfig = {
  blog: {
    icon: FileText,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    backLink: "/blog",
    backText: "All Posts",
  },
  project: {
    icon: Code,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    backLink: "/projects",
    backText: "All Projects",
  },
  research: {
    icon: BookOpen,
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
    backLink: "/research",
    backText: "All Research",
  },
};

export function ContentHeader({ content, type }: ContentHeaderProps) {
  const config = contentConfig[type];
  const Icon = config.icon;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text:
            "description" in content
              ? content.description
              : "abstract" in content
                ? content.abstract
                : "",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const renderMetaItem = (
    IconComponent: React.ElementType,
    label: string | React.ReactNode,
    delay: number = 0,
  ) => (
    <motion.div
      className="flex items-center gap-2 text-sm text-muted-foreground"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <IconComponent className="h-4 w-4" />
      </motion.div>
      <span>{label}</span>
    </motion.div>
  );

  return (
    <header className="relative w-full overflow-hidden border-b bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-xl"
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Link
            href={config.backLink}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-all duration-200 hover:text-foreground hover:gap-3"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {config.backText}
          </Link>
        </motion.div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            whileHover={{
              scale: 1.05,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 },
            }}
            className={cn(
              "relative flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-3xl shadow-xl",
              `bg-gradient-to-br ${config.color}`,
              "cursor-pointer",
            )}
          >
            <Icon className="h-12 w-12 text-white" />
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex-grow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.h1
              className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {content.title}
            </motion.h1>

            <motion.p
              className="mb-6 max-w-3xl text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {"description" in content && content.description}
              {"abstract" in content && content.abstract}
            </motion.p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/50 pt-6">
              {"author" in content &&
                renderMetaItem(User, content.author.name, 0.7)}
              {"authors" in content &&
                renderMetaItem(Users, content.authors.join(", "), 0.7)}
              {renderMetaItem(
                Calendar,
                new Date(content.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                0.8,
              )}
              {"readingTime" in content &&
                renderMetaItem(Clock, content.readingTime, 0.9)}
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          {"github" in content && content.github && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" className="group">
                <a
                  href={content.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  GitHub
                </a>
              </Button>
            </motion.div>
          )}
          {"demo" in content && content.demo && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="group">
                <a
                  href={content.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  Live Demo
                </a>
              </Button>
            </motion.div>
          )}
          {"pdf" in content && content.pdf && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="group">
                <a href={content.pdf} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
                  PDF
                </a>
              </Button>
            </motion.div>
          )}
          {"doi" in content && content.doi && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" className="group">
                <a
                  href={`https://doi.org/${content.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  DOI
                </a>
              </Button>
            </motion.div>
          )}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleShare} variant="outline" className="group">
              <Share2 className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
              Share
            </Button>
          </motion.div>
        </motion.div>

        {/* Tags */}
        {"tags" in content && content.tags && content.tags.length > 0 && (
          <motion.div
            className="mt-6 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            {content.tags.map((tag: string, index: number) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 px-3 py-1.5"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tech Stack */}
        {"techStack" in content &&
          content.techStack &&
          content.techStack.length > 0 && (
            <motion.div
              className="mt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              {content.techStack.map((tech: string, index: number) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1.5 px-3 py-1.5"
                  >
                    <Zap className="h-3 w-3" />
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          )}
      </div>
    </header>
  );
}
