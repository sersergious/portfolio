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
    <div className="relative overflow-hidden border-b border-base-300 bg-base-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl">
          <div
            className={cn(
              'mb-6 w-fit rounded-2xl bg-base-200 p-4 shadow-lg',
              iconClassName
            )}
          >
            {icon}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-base-content/60">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
