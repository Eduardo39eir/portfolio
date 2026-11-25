import { useEffect, useRef } from 'react';
import { ArrowUpRight, Layers, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ProjectItem } from '../data/portfolioData';
import { GitHubIcon } from './TechIcons';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[88vh] w-full max-w-[580px] overflow-y-auto rounded-md border border-dashed border-[var(--rail-strong)] bg-[var(--bg)] text-[var(--fg)] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-dashed border-[var(--rail)] px-4 py-3.5 sm:px-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    id="project-modal-title"
                    className="font-serif-display text-[28px] leading-none text-[var(--fg)]"
                  >
                    {project.title}
                  </h3>
                  <span className="font-mono-label rounded-sm border border-dotted border-[var(--rail-strong)] bg-[var(--bg-surface)] px-2 py-0.5 text-[10.5px] text-[var(--fg-muted)]">
                    {project.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--fg-subtle)]">{project.subtitle}</p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Fechar detalhes do projeto"
                className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-[var(--rail)] text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--fg)]"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4 px-4 py-4 sm:px-5">
              {/* Cover or honest placeholder */}
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={`Preview de ${project.title}`}
                  className="aspect-video w-full rounded-sm border border-[var(--rail)] object-cover"
                />
              ) : (
                <div
                  className={`flex items-center justify-between rounded-sm border border-[var(--rail)] bg-gradient-to-br p-4 text-white ${project.previewGradient}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-serif-display flex size-12 items-center justify-center rounded-sm border border-white/20 bg-black/55 text-2xl">
                      {project.monogram}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white">{project.previewLabel}</p>
                      <p className="font-mono-label mt-0.5 text-[10.5px] text-white/80">
                        Capa real em breve · configurável em portfolioData.ts
                      </p>
                    </div>
                  </div>
                  <Layers className="size-5 text-white/50" aria-hidden="true" />
                </div>
              )}

              <div>
                <h4 className="font-mono-label text-[11px] tracking-wider text-[var(--fg-subtle)] uppercase">
                  Sobre o projeto
                </h4>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--fg-secondary)]">
                  {project.details}
                </p>
              </div>

              <div>
                <h4 className="font-mono-label text-[11px] tracking-wider text-[var(--fg-subtle)] uppercase">
                  Escopo e pontos principais
                </h4>
                <ul className="mt-1.5 list-none space-y-1.5 p-0 text-[13.5px] text-[var(--fg-secondary)]">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-[var(--fg-subtle)]">
                        •
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono-label text-[11px] tracking-wider text-[var(--fg-subtle)] uppercase">
                  Tecnologias e competências envolvidas
                </h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-dotted border-[var(--rail-strong)] bg-[var(--bg-surface)] px-2 py-0.5 text-xs text-[var(--fg-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-[var(--rail)] bg-[var(--bg-band)] px-4 py-3 sm:px-5">
              <div className="flex flex-wrap items-center gap-2">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-md bg-[var(--fg)] px-3.5 text-xs font-semibold text-[var(--bg)] transition-opacity hover:opacity-90"
                  >
                    <span>Abrir demonstração</span>
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="font-mono-label text-[11px] text-[var(--fg-subtle)]">
                    Demonstração pública ainda não publicada
                  </span>
                )}

                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-md border border-[var(--rail-strong)] bg-[var(--bg-surface)] px-3 text-xs font-medium text-[var(--fg-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--fg)]"
                  >
                    <GitHubIcon className="size-3.5" />
                    <span>Repositório</span>
                  </a>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-[38px] cursor-pointer items-center rounded-md border border-[var(--rail-strong)] px-3 text-xs font-medium text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--fg)]"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
