//src/mdx/MDXContent.tsx
'use client'

import { useMDXComponent } from 'next-contentlayer/hooks'

const mdxComponents = {
  // Custom components for your MDX content
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl font-bold mb-6 scroll-mt-20" {...props}>
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
  p: ({ children, ...props }: any) => (
    <p className="mb-4 leading-relaxed text-muted-foreground" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="mb-4 list-disc list-inside space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="mb-4 list-decimal list-inside space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-muted-foreground" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: any) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-6" {...props}>
      {children}
    </pre>
  ),
  a: ({ children, href, ...props }: any) => (
    <a
      href={href}
      className="text-primary hover:underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
}

interface MDXContentProps {
  content: any // This will be the body from Contentlayer
}

export function MDXContent({ content }: MDXContentProps) {
  const Component = useMDXComponent(content.code)

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <Component components={mdxComponents} />
    </div>
  )
}