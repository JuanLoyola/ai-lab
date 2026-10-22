import type { Project } from '@/lib/projects';

/*
 * Tarjeta de proyecto en estilo Minimal: panel con borde hairline (nunca
 * sombra), un underline esmeralda que aparece al hover, y los highlights
 * en muted. La demo conserva el fallback inteligente: Swagger si hay
 * deploy, video si existe, si no el repo.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="panel group relative rounded-2xl p-6">
      {/* hairline accent que se enciende al hover del grupo */}
      <span
        aria-hidden
        className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-baseline justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
            Proyecto <span className="font-mono text-accent">{project.number}</span>
          </span>
          <h3 className="mt-2 text-xl font-medium tracking-tight text-white">{project.name}</h3>
        </div>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-white"
        >
          Ver código ↗
        </a>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-white/70">{project.tagline}</p>

      <p className="mt-4 inline-flex items-center gap-2 text-xs text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {project.proves}
      </p>

      <ul className="mt-4 space-y-2">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2 text-sm text-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/25" />
            {highlight}
          </li>
        ))}
      </ul>

      <DemoSlot project={project} />

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-line bg-white/[0.03] px-2 py-1 text-[11px] text-white/40"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

function DemoSlot({ project }: { project: Project }) {
  const { demo } = project;

  // 1. Swagger interactivo, cuando la API está deployada
  if (demo.kind === 'swagger' && demo.url) {
    return (
      <div className="mt-5">
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted">{demo.label}</span>
        <iframe
          src={demo.url}
          title={`${project.name} — demo interactiva`}
          className="mt-2 h-96 w-full rounded-xl border border-line bg-ink"
          loading="lazy"
        />
      </div>
    );
  }

  // 2. Video grabado (mp4 + poster en public/demos)
  if (demo.video?.ready) {
    const { url, label } = demo.video;
    return (
      <div className="mt-5">
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
          {label ?? demo.label}
        </span>
        <video
          src={url}
          poster={url.replace(/\.mp4$/, '.jpg')}
          controls
          preload="metadata"
          playsInline
          className="mt-2 aspect-video w-full rounded-xl border border-line bg-black"
        />
      </div>
    );
  }

  // 3. Sin deploy ni video todavía: link de ejemplo
  return (
    <a
      href={demo.kind === 'video' ? project.repoUrl : demo.url || project.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 flex items-center gap-3 rounded-xl border border-dashed border-line px-4 py-3 text-sm text-muted transition-colors hover:border-accent/40 hover:text-white"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-xs text-accent">
        {demo.kind === 'video' ? '▶' : '↗'}
      </span>
      <span>
        {demo.label}
        <span className="block text-xs text-white/30">
          {demo.kind === 'video' ? 'próximamente — mientras tanto, el código' : 'deploy pendiente'}
        </span>
      </span>
    </a>
  );
}
