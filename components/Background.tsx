/*
 * Fondo del sistema Minimal: grilla hairline de 64px con máscara radial
 * que se desvanece hacia abajo + un solo glow esmeralda detrás del hero.
 * Estático — sin drift, sin orbes de colores.
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div
        className="absolute left-1/2 top-[-260px] h-[620px] w-[980px] -translate-x-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(52, 211, 153, 0.13), transparent 65%)',
          filter: 'blur(50px)',
        }}
      />
    </div>
  );
}
