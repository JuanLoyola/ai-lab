import { MotionConfig } from 'motion/react';
import { Background } from '@/components/Background';
import { ProjectCard } from '@/components/ProjectCard';
import { Reveal, WordReveal } from '@/components/motion';
import { PROJECTS } from '@/lib/projects';

const LOOP_STEPS = [
  { label: 'Propone', note: 'el LLM, con contexto limitado y presupuestado' },
  { label: 'Valida', note: 'el código: JSON, parches, reglas de negocio' },
  { label: 'Verifica', note: 'tests reales en un subprocess fresco' },
  { label: 'Reintenta', note: 'con el error concreto como feedback' },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <Background />

      <main className="mx-auto max-w-5xl px-6">
        {/* ---------- hero ---------- */}
        <section className="pt-32 pb-24">
          <Reveal>
            <Eyebrow>AI Lab · Juan Loyola</Eyebrow>
          </Reveal>
          <WordReveal
            text="El LLM propone, el código valida."
            className="mt-6 text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl"
          />
          <Reveal delay={0.45} className="mt-8 max-w-2xl">
            <p className="text-[15px] leading-relaxed text-white/70">
              Tres agentes LLM construidos con la misma premisa: cada proceso manual
              convertido en un sistema con harness de validación, autocorrección y
              entrega end-to-end — Python, TDD y CI/CD desde el primer commit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#proyectos"
                className="inline-flex h-12 items-center rounded-full bg-white px-7 text-sm font-medium text-black transition-colors hover:bg-accent"
              >
                Ver proyectos
              </a>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center rounded-full border border-line px-7 text-sm text-muted transition-colors hover:border-line-strong hover:text-white"
              >
                CV (PDF)
              </a>
            </div>
          </Reveal>
        </section>

        {/* ---------- el loop: cada paso entra escalonado ---------- */}
        <section aria-label="El loop de autocorrección" className="pb-28">
          <Reveal>
            <Eyebrow>El loop</Eyebrow>
            <h2 className="text-gradient mt-5 text-3xl font-medium tracking-tight md:text-4xl">
              Un ciclo, repetido en los tres proyectos
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {LOOP_STEPS.map((step, index) => (
              <Reveal key={step.label} delay={index * 0.12}>
                <div className="panel h-full rounded-2xl p-6">
                  <span className="font-mono text-xs text-accent">0{index + 1}</span>
                  <p className="mt-3 text-lg font-medium tracking-tight">{step.label}</p>
                  <p className="mt-1 text-sm text-muted">{step.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.5}>
            <p className="mt-6 text-sm text-muted">
              <span className="font-mono text-accent">↺</span> y vuelve a empezar — hasta que
              los tests pasan o se acaba el presupuesto.
            </p>
          </Reveal>
        </section>

        {/* ---------- proyectos ---------- */}
        <section id="proyectos" aria-label="Proyectos" className="pb-28">
          <Reveal>
            <Eyebrow>Proyectos</Eyebrow>
            <h2 className="text-gradient mt-5 text-3xl font-medium tracking-tight md:text-4xl">
              Tres agentes, una premisa
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {PROJECTS.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.12}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      {/* ---------- footer ---------- */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm text-muted">
          <p>
            ¿Hablamos?{' '}
            <a
              href="mailto:jloyoladev@gmail.com"
              className="text-white transition-colors hover:text-accent"
            >
              jloyoladev@gmail.com
            </a>
          </p>
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/loyolajuan"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              LinkedIn ↗
            </a>
            <a href="/cv.pdf" className="transition-colors hover:text-white">
              CV (PDF)
            </a>
          </div>
        </div>
      </footer>
    </MotionConfig>
  );
}
