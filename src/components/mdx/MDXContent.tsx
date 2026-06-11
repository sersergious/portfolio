import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

const components: Components = {
  h1: ({ children, ...props }) => (
    <h1
      className="text-3xl font-bold mb-6 mt-8 scroll-mt-20 first:mt-0"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl font-semibold mb-4 mt-8 scroll-mt-20" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl font-semibold mb-3 mt-6 scroll-mt-20" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-relaxed text-base-content/60" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-4 list-disc list-inside space-y-2 ml-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 list-decimal list-inside space-y-2 ml-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-base-content/60" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-6 text-base-content/60 bg-base-200 py-2 rounded-r"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-base-200 px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="bg-base-200 p-4 rounded-lg overflow-x-auto mb-6 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-2 hover:opacity-80"
      {...(href && !href.startsWith('/')
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ''}
      className="rounded-lg my-6 w-full h-auto border border-base-300"
      {...props}
    />
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6">
      <table
        className="min-w-full border border-base-300 rounded-lg"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-base-200" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border border-base-300 px-4 py-2 text-left font-semibold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-base-300 px-4 py-2" {...props}>
      {children}
    </td>
  ),
  hr: props => <hr className="my-8 border-base-300" {...props} />,
};

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown components={components}>{source}</ReactMarkdown>
    </div>
  );
}
