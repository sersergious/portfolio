import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

// Headings shift down one level: the page owns the h1, so markdown starts at h2.
// Hairline rules under the top two levels, body at 16px.
const components: Components = {
  h1: ({ children, ...props }) => (
    <h2
      className="mt-8 mb-4 scroll-mt-20 border-b border-base-content/15 pb-2 text-2xl font-semibold first:mt-0"
      {...props}
    >
      {children}
    </h2>
  ),
  h2: ({ children, ...props }) => (
    <h3
      className="mt-8 mb-4 scroll-mt-20 border-b border-base-content/15 pb-2 text-xl font-semibold first:mt-0"
      {...props}
    >
      {children}
    </h3>
  ),
  h3: ({ children, ...props }) => (
    <h4 className="mt-6 mb-3 scroll-mt-20 text-base font-semibold" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-4 ml-6 list-disc space-y-1.5" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1.5" {...props}>
      {children}
    </ol>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-4 border-l-4 border-base-content/15 pl-4 text-base-content/60"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-base-200 px-1.5 py-0.5 font-mono text-[0.85em]"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="mb-4 overflow-x-auto rounded-box bg-base-200 p-4 text-xs"
      {...props}
    >
      {children}
    </pre>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="link link-primary link-hover"
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
      loading="lazy"
      decoding="async"
      className="my-4 h-auto w-full rounded-box border border-base-content/15"
      {...props}
    />
  ),
  table: ({ children, ...props }) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse" {...props}>
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
      className="border border-base-content/15 px-3 py-1.5 text-left font-semibold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-base-content/15 px-3 py-1.5" {...props}>
      {children}
    </td>
  ),
  hr: props => <hr className="my-6 border-base-content/15" {...props} />,
};

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="text-base">
      <ReactMarkdown components={components}>{source}</ReactMarkdown>
    </div>
  );
}
