'use client';

import { ReactNode, useState, useEffect } from 'react';

interface WrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: string;
  threshold?: number;
  scale?: number;
  from?: string;
}

export function FadeInWhenVisible({ children, className = '' }: WrapperProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerContainer({ children, className = '' }: WrapperProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className = '' }: WrapperProps) {
  return <div className={className}>{children}</div>;
}

export function ScaleOnHover({ children, className = '' }: WrapperProps) {
  return <div className={className}>{children}</div>;
}

export function FadeInScroll({ children, className = '' }: WrapperProps) {
  return <div className={className}>{children}</div>;
}

export function SlideIn({ children, className = '' }: WrapperProps) {
  return <div className={className}>{children}</div>;
}

export function RotateIn({ children, className = '' }: WrapperProps) {
  return <div className={className}>{children}</div>;
}

export function Pulse({ children, className = '' }: WrapperProps) {
  return <div className={className}>{children}</div>;
}

export function Parallax({ children, className = '' }: WrapperProps) {
  return <div className={className}>{children}</div>;
}

export function AnimatedBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full blur-3xl opacity-5" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent rounded-full blur-2xl opacity-5" />
    </div>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TypewriterText({
  text,
  className = '',
  speed = 100,
  delay = 0,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, speed);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return <span className={className}>{displayedText}</span>;
}
