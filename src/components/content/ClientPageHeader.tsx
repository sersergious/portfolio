import { ReactNode } from 'react';

interface ClientPageHeaderProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function ClientPageHeader({ title, description, icon }: ClientPageHeaderProps) {
  return (
    <div className="pt-32 md:pt-40 pb-8 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="bg-base-200 border border-base-300 rounded-2xl p-8">
          <div className="flex flex-row items-center gap-4 mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full shrink-0">
              {icon}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          </div>
          <p className="text-lg text-base-content/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
