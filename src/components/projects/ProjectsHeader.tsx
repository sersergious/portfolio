// components/projects/ProjectsHeader.tsx
"use client";

import { Code } from "lucide-react";
import { ClientPageHeader } from "@/components/content/ClientPageHeader";

export function ProjectsHeader() {
  return (
    <ClientPageHeader
      title="Projects"
      description="Building innovative solutions that push boundaries and solve real problems."
      icon={<Code className="h-8 w-8 text-white" />}
      iconClassName="bg-gradient-to-br from-purple-500 to-violet-600 text-white"
    />
  );
}
