// components/research/ResearchPageHeader.tsx
"use client";

import { BookOpen } from "lucide-react";
import { ClientPageHeader } from "@/components/content/ClientPageHeader";

export function ResearchPageHeader() {
  return (
    <ClientPageHeader
      title="Research"
      description="Exploring the frontiers of AI, quantum computing, and cryptography through rigorous academic research."
      icon={<BookOpen className="h-8 w-8 text-white" />}
      iconClassName="bg-gradient-to-br from-blue-500 to-indigo-600 text-white "
    />
  );
}
