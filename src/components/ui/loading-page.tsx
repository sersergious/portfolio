import React from "react";
import { RefreshCw } from "lucide-react";

export const LoadingPage = ({
  message = "Loading...",
  size = "default",
}: {
  message?: string;
  size?: "small" | "default" | "large";
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12",
  } as const;

  return (
    <div className="flex flex-col items-center justify-center min-h-64 space-y-4">
      <div className="relative">
        <RefreshCw
          className={`${sizeClasses[size]} text-primary animate-spin`}
        />
      </div>
      <p className="text-muted-foreground text-sm font-medium">{message}</p>
    </div>
  );
};
