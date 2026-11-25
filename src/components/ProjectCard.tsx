import { ArrowUpRight, Info, Layers } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';
import { GitHubIcon } from './TechIcons';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
  borderClassName?: string;
}

function StatusIndicator({ status, tone }: { status: string; tone: ProjectItem['statusTone'] }) {
  const dotClass =
    tone === 'live'
      ? 'bg-[var(--accent-emerald)]'
      : tone === 'academic'
        ? 'bg-sky-400'
        : 'bg-amber-400/90';

  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--fg-muted)]">
      <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${dotClass}`} />
      <span>{status}</span>
    </span>
  );
}

function PreviewCanvas({ project }: { project: ProjectItem }) {
  return (
    <div
      className={`relative h-[196px] w-full overflow-hidden rounded-md bg-gradient-to-br sm:h-[216px] ${project.previewGradient} border border-[var(--rail)]`}
    >
      {/* Subtle architectural dot grid texture inside the gradient canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.55) 1px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
      />

      {project.featured ? (
        <span className="font-mono-label absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 rounded-sm border border-white/20 bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-400" />
          Projeto principal
        </span>
      ) : null}

      {/* Floating offset frame mimicking sam.larp.af's hover-gliding preview card */}
      <div className="absolute -right-5 -bottom-4 h-[78%] w-[84%] overflow-hidden rounded-tl-md border border-white/15 bg-[#121113]/92 shadow-xl transition-transform duration-200 ease-out group-hover:-translate-x-2 group-hover:-translate-y-1.5">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={`Captura de tela do projeto ${project.title}`}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-between pt-3.5 pr-8 pb-6 pl-3.5 text-white">
            {/* Minimal browser/app chrome bar */}
            <div className="flex items-center justify-between gap-2 border-b border-dashed border-white/15 pb-2">
              <div className="flex shrink-0 items-center gap-1" aria-hidden="true">
                <span className="size-1.5 rounded-full bg-white/30" />
                <span className="size-1.5 rounded-full bg-white/20" />
                <span className="size-1.5 rounded-full bg-white/15" />
              </div>
              <span className="font-mono-label min-w-0 truncate text-[9.5px] text-neutral-300">
                {project.previewLabel}
              </span>
            </div>

            {/* Clean monogram + subtle icon placeholder */}
            <div className="flex items-center justify-between gap-2 py-1.5">
              <div className="flex min-w-0 items-baseline gap-2.5">
                <span className="font-serif-display shrink-0 text-[34px] leading-none tracking-tight text-white/95 sm:text-[40px]">
                  {project.monogram}
                </span>
                <span className="truncate text-[11px] font-medium text-neutral-200">
                  {project.title}
                </span>
              </div>
              <Layers className="size-4 shrink-0 text-white/40" aria-hidden="true" />
            </div>

            {/* Honest "Capa em breve" notice */}
            <div className="flex items-center justify-between gap-2 border-t border-dashed border-white/15 pt-2">
              <span className="font-mono-label text-[9.5px] tracking-wider text-neutral-300 uppercase">
                Capa em breve
              </span>
              <span className="font-mono-label shrink-0 text-[9.5px] text-neutral-400">
                {project.demoUrl ? 'demo ativa ↗' : 'detalhes →'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectCard({ project, onSelect, borderClassName = '' }: ProjectCardProps) {
  const hasDemo = Boolean(project.demoUrl.trim());
  const hasRepo = Boolean(project.repoUrl.trim());

  return (
    <article
      className={`group flex flex-col justify-between p-3 transition-colors duration-150 hover:bg-[var(--bg-surface)] sm:p-4 ${
        project.featured ? 'md:col-span-2' : ''
      } ${borderClassName}`}
    >
      <div
        className={
          project.featured ? 'grid grid-cols-1 gap-4 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-5' : 'flex flex-col'
        }
      >
        {/* Clickable preview opens project details */}
        <button
          type="button"
          onClick={() => onSelect(project)}
          aria-label={`Abrir detalhes do projeto ${project.title}`}
          className="block w-full cursor-pointer text-left focus-visible:outline-2"
        >
          <PreviewCanvas project={project} />
        </button>

        {/* Textual information */}
        <div className={project.featured ? 'flex flex-col justify-between' : 'mt-3.5 flex flex-1 flex-col'}>
          <div>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-[19px] leading-tight font-semibold text-[var(--fg)] sm:text-[20px]">
                  <button
                    type="button"
                    onClick={() => onSelect(project)}
                    className="cursor-pointer text-left transition-opacity hover:opacity-80"
                  >
                    {project.title}
                  </button>
                </h3>
                <p className="mt-0.5 text-[12px] text-[var(--fg-subtle)]">{project.subtitle}</p>
              </div>

              <StatusIndicator status={project.status} tone={project.statusTone} />
            </div>

            <p className="mt-2.5 text-[13px] leading-[1.6] text-[var(--fg-secondary)] sm:text-[13.5px]">
              {project.summary}
            </p>
          </div>

          {/* Tech tags matching sam.larp.af's dotted chips */}
          <ul
            aria-label={`Tecnologias de ${project.title}`}
            className="mt-3.5 flex list-none flex-wrap gap-1.5 p-0"
          >
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-sm border border-dotted border-[var(--rail-strong)] bg-[var(--bg-surface)] px-2 py-0.5 text-[11px] font-medium text-[var(--fg-muted)] sm:text-xs"
              >
                {tag}
              </li>
            ))}
          </ul>

          {/* Action row: never dead buttons; always provides real destination or project details */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-dashed border-[var(--rail)] pt-3">
            {hasDemo ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-md border border-[var(--rail-strong)] bg-[var(--fg)] px-3 text-[12.5px] font-semibold text-[var(--bg)] transition-opacity hover:opacity-90"
              >
                <span>Abrir demo</span>
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            ) : null}

            <button
              type="button"
              onClick={() => onSelect(project)}
              className="inline-flex min-h-[38px] cursor-pointer items-center gap-1.5 rounded-md border border-[var(--rail-strong)] bg-[var(--bg-surface)] px-3 text-[12.5px] font-medium text-[var(--fg-secondary)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--fg)]"
            >
              <Info className="size-3.5" aria-hidden="true" />
              <span>Ver detalhes</span>
            </button>

            {hasRepo ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Repositório GitHub de ${project.title}`}
                title="Abrir repositório no GitHub"
                className={
                  hasDemo
                    ? 'inline-flex size-[38px] items-center justify-center rounded-md border border-[var(--rail-strong)] bg-[var(--bg-surface)] text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--fg)]'
                    : 'inline-flex min-h-[38px] items-center gap-1.5 rounded-md border border-[var(--rail-strong)] bg-[var(--bg-surface)] px-3 text-[12.5px] font-medium text-[var(--fg-secondary)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--fg)]'
                }
              >
                <GitHubIcon className="size-3.5" />
                {!hasDemo ? (
                  <>
                    <span>GitHub</span>
                    <ArrowUpRight className="size-3 text-[var(--fg-subtle)]" aria-hidden="true" />
                  </>
                ) : null}
              </a>
            ) : !hasDemo ? (
              <span className="font-mono-label ml-auto text-[10.5px] text-[var(--fg-subtle)]">
                Link público em breve
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
