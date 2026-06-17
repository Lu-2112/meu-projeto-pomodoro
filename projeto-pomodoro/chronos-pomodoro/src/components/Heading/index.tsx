// src/components/Heading/index.tsx
import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
}

export function Heading({ children }: HeadingProps) {
  return (
    <h2 style={{ textAlign: 'center', fontSize: '3rem', margin: '2rem 0', color: 'var(--link-color)' }}>
      {children}
    </h2>
  );
}