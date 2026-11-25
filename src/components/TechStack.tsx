import { useState } from 'react';
import { motion } from 'motion/react';
import {
  portfolioData,
  type TechCategory,
  type TechStackItem,
} from '../data/portfolioData';
import { RailRow, SectionHeadingRow } from './SectionDivider';
import { TechBadgeIcon } from './TechIcons';

const FILTER_OPTIONS: { id: TechCategory; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'frontend', label: 'Front-End' },
  { id: 'design', label: 'Design & UI/UX' },
  { id: 'learning', label: 'Em estudo' },
];

export function TechStack() {
  const { techStack } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<TechCategory>('all');
  const [focusedTech, setFocusedTech] = useState<TechStackItem | null>(techStack[0] ?? null);

  const visibleItems =
    activeCategory === 'all'
      ? techStack
      : techStack.filter((item) => item.category === activeCategory);

  return (
    <section id="stack" aria-labelledby="stack-heading" className="scroll-mt-14">
      <SectionHeadingRow
        id="stack-heading"
        title="Tech Stack"
        rightSlot={
          <div
            role="tablist"
            aria-label="Filtrar tecnologias por categoria"
            className="hidden items-center gap-1 sm:flex"
          >
            {FILTER_OPTIONS.map((option) => {
              const isSelected = activeCategory === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(option.id)}
                  className={`cursor-pointer rounded-sm px-2.5 py-1 text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-[var(--bg-surface-hover)] font-semibold text-[var(--fg)]'
                      : 'text-[var(--fg-subtle)] hover:text-[var(--fg-secondary)]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        }
      />

      <RailRow>
        <motion.div
          initial={{ opacity: 0.78, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="px-3 py-4 sm:px-4 sm:py-5"
        >
          {/* Mobile filter bar */}
          <div
            role="tablist"
            aria-label="Filtrar tecnologias"
            className="mb-3 flex flex-wrap gap-1 sm:hidden"
          >
            {FILTER_OPTIONS.map((option) => {
              const isSelected = activeCategory === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(option.id)}
                  className={`min-h-[32px] cursor-pointer rounded-sm border px-2.5 text-[11.5px] font-medium transition-colors ${
                    isSelected
                      ? 'border-[var(--rail-strong)] bg-[var(--bg-surface-hover)] font-semibold text-[var(--fg)]'
                      : 'border-transparent text-[var(--fg-subtle)] hover:text-[var(--fg-secondary)]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* Tech pills matching sam.larp.af dotted style */}
          <div className="flex flex-wrap gap-2">
            {visibleItems.map((tech) => {
              const isSelected = focusedTech?.id === tech.id;
              return (
                <button
                  key={tech.id}
                  type="button"
                  onMouseEnter={() => setFocusedTech(tech)}
                  onFocus={() => setFocusedTech(tech)}
                  onClick={() => setFocusedTech(tech)}
                  aria-pressed={isSelected}
                  className={`group inline-flex min-h-[36px] cursor-pointer items-center gap-2 rounded-sm border border-dotted px-3 py-1.5 text-[12.5px] transition-all duration-150 hover:-translate-y-[1px] sm:text-[13.5px] ${
                    isSelected
                      ? 'border-[var(--fg-subtle)] bg-[var(--bg-surface-hover)] text-[var(--fg)]'
                      : 'border-[var(--rail-strong)] bg-[var(--bg-surface)] text-[var(--fg-secondary)] hover:border-[var(--fg-subtle)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--fg)]'
                  }`}
                >
                  <TechBadgeIcon
                    id={tech.id}
                    className="size-4 shrink-0 text-[var(--fg-muted)] transition-colors group-hover:text-[var(--fg)]"
                  />
                  <span className="font-medium">{tech.name}</span>
                  <span className="font-mono-label text-[10px] text-[var(--fg-subtle)]">
                    · {tech.levelLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Concise dynamic context bar for hovered/selected technology */}
          <div
            aria-live="polite"
            className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-[var(--rail)] pt-3 text-xs text-[var(--fg-muted)]"
          >
            {focusedTech ? (
              <p className="m-0 leading-relaxed">
                <span className="font-semibold text-[var(--fg)]">{focusedTech.name}</span>
                <span className="mx-1.5 text-[var(--fg-subtle)]">·</span>
                <span className="font-mono-label text-[11px] text-[var(--fg-subtle)]">
                  {focusedTech.levelLabel}
                </span>
                <span className="mx-1.5 text-[var(--fg-subtle)]">—</span>
                <span>{focusedTech.note}</span>
              </p>
            ) : (
              <p className="m-0 text-[var(--fg-subtle)]">
                Passe o cursor ou selecione uma tecnologia para ver o contexto de uso.
              </p>
            )}
          </div>
        </motion.div>
      </RailRow>
    </section>
  );
}
