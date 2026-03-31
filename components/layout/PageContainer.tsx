import React from 'react';
import styles from './PageContainer.module.css';

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
  return (
    <Tag
      className={[
        styles.container,
        width === 'narrow' ? styles.narrow : '',
        width === 'wide' ? styles.wide : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
}
