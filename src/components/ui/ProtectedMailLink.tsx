'use client';

import { useEffect, useState } from 'react';

interface ProtectedMailLinkProps {
  /** Base64-encoded email address (without the `mailto:` prefix) */
  encoded: string;
  className?: string;
  'aria-label'?: string;
  children: React.ReactNode;
}

export function ProtectedMailLink({
  encoded,
  className,
  children,
  ...rest
}: ProtectedMailLinkProps) {
  const [href, setHref] = useState<string>();

  useEffect(() => {
    setHref(`mailto:${atob(encoded)}`);
  }, [encoded]);

  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}
