'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

/** El único ease del sistema: entradas suaves que deceleran fuerte. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Revelado al entrar en viewport — una sola vez, desde 28px abajo.
 * Los grids de cards pasan `delay: i * 0.12` para el stagger.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hero: el titular aparece palabra por palabra —
 * opacity 0→1, y 0.35em→0, blur(10px)→0, ~70ms de stagger.
 * Cada palabra lleva el gradiente propia para que el filter
 * del motion no rompa el background-clip del padre.
 */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <h1 className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="text-gradient inline-block"
          initial={{ opacity: 0, y: '0.35em', filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: EASE, delay: index * 0.07 }}
        >
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </h1>
  );
}
