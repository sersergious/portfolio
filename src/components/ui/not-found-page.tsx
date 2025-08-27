'use client';

import { AlertCircle, Home } from 'lucide-react';

export const NotFoundPage = ({
  title = 'Page Not Found',
  message = "Sorry, we couldn't find the page you're looking for.",
  showHomeButton = true,
  onHomeClick = () => window.history.back(),
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 px-4 text-center">
      <div className="mb-8">
        <AlertCircle className="w-24 h-24 text-muted-foreground/50 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-muted-foreground/30 mb-2">
          404
        </h1>
      </div>

      <div className="max-w-md">
        <h2 className="text-2xl font-semibold text-foreground mb-3">{title}</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">{message}</p>

        {showHomeButton && (
          <button
            onClick={onHomeClick}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};
