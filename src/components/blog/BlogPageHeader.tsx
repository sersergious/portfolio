// components/blog/BlogPageHeader.tsx
"use client";

import { FileText } from "lucide-react";
import { ClientPageHeader } from "@/components/content/ClientPageHeader";

export function BlogPageHeader() {
  return (
    <ClientPageHeader
      title="Blog"
      description="Thoughts on software development, AI research, and building innovative technology."
      icon={<FileText className="h-8 w-8 text-white" />}
      iconClassName="bbg-gradient-to-br from-emerald-500 to-green-600 text-white"
    />
  );
}
