import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  width?: 'narrow' | 'default' | 'wide';
  className?: string;
  as?: React.ElementType;
}

export default function PageContainer({
  children,
  width = 'default',
  className = '',
  as: Tag = 'div',
}: PageContainerProps) {
  const widthClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[90rem]',
  };

  return (
    <Tag
      className={[
        'w-full mx-auto px-4 sm:px-6',
        widthClasses[width],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
}
