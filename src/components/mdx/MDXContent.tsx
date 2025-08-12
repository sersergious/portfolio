//src/mdx/MDXContent.tsx
"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

// Custom components for MDX
const mdxComponents = {
  // Headings with better styling
  h1: ({ children, ...props }: any) => (
    <h1
      className="text-3xl font-bold mb-6 mt-8 scroll-mt-20 first:mt-0"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl font-semibold mb-4 mt-8 scroll-mt-20" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl font-semibold mb-3 mt-6 scroll-mt-20" {...props}>
      {children}
    </h3>
  ),

  // Paragraphs and text
  p: ({ children, ...props }: any) => (
    <p className="mb-4 leading-relaxed text-muted-foreground" {...props}>
      {children}
    </p>
  ),

  // Lists
  ul: ({ children, ...props }: any) => (
    <ul className="mb-4 list-disc list-inside space-y-2 ml-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="mb-4 list-decimal list-inside space-y-2 ml-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-muted-foreground" {...props}>
      {children}
    </li>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground bg-muted/30 py-2 rounded-r"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code
  code: ({ children, ...props }: any) => (
    <code
      className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre
      className="bg-muted p-4 rounded-lg overflow-x-auto mb-6 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),

  // Links
  a: ({ children, href, ...props }: any) => {
    // Internal links
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-primary hover:text-primary/80 underline underline-offset-2"
          {...props}
        >
          {children}
        </Link>
      );
    }
    // External links
    return (
      <a
        href={href}
        className="text-primary hover:text-primary/80 underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },

  // Images with Next.js optimization
  img: ({ src, alt, ...props }: any) => (
    <Image
      src={src}
      alt={alt || ""}
      width={800}
      height={400}
      className="rounded-lg my-6 w-full h-auto"
      {...props}
    />
  ),

  // Tables
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-border rounded-lg" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-muted/50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: any) => (
    <th
      className="border border-border px-4 py-2 text-left font-semibold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="border border-border px-4 py-2" {...props}>
      {children}
    </td>
  ),

  // Horizontal rule
  hr: ({ ...props }: any) => <hr className="my-8 border-border" {...props} />,
};

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
  components?: Record<string, React.ComponentType<any>>;
}

export function MDXContent({ source, components = {} }: MDXContentProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <MDXRemote {...source} components={{ ...mdxComponents, ...components }} />
    </div>
  );
}
