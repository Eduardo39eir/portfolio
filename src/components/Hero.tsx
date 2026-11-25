import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Eye, MapPin } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import { RailRow } from './SectionDivider';
import { GitHubIcon, LinkedInIcon } from './TechIcons';

const VIEWS_STORAGE_KEY = 'eduardo-portfolio-views';
const VIEWS_SESSION_KEY = 'eduardo-portfolio-viewed-session';

function usePageViews(apiUrl: string) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const trimmedUrl = apiUrl.trim();
    const alreadyCounted = (() => {
      try {
        return sessionStorage.getItem(VIEWS_SESSION_KEY) === '1';
      } catch {
        return false;
      }
    })();

    if (trimmedUrl) {
      const controller = new AbortController();
      fetch(trimmedUrl, {
        method: alreadyCounted ? 'GET' : 'POST',
        signal: controller.signal,
      })
        .then((res) => (res.ok ? (res.json() as Promise<{ count?: number }>) : null))
        .then((data) => {
          if (typeof data?.count === 'number') {
            setViews(data.count);
            try {
              sessionStorage.setItem(VIEWS_SESSION_KEY, '1');
            } catch {
              // Ignore storage errors
            }
          }
        })
        .catch(() => {
          // Fallback silently to local counter below if endpoint is unavailable
        });
      return () => controller.abort();
    }

    try {
      const stored = Number(localStorage.getItem(VIEWS_STORAGE_KEY) || '0');
      const base = Number.isFinite(stored) && stored > 0 ? stored : 0;
      const nextCount = alreadyCounted && base > 0 ? base : base + 1;
      localStorage.setItem(VIEWS_STORAGE_KEY, String(nextCount));
      sessionStorage.setItem(VIEWS_SESSION_KEY, '1');
      setViews(nextCount);
    } catch {
      setViews(1);
    }
  }, [apiUrl]);

  return views;
}

function CyclingRole({ phrases }: { phrases: readonly string[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || phrases.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3400);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, phrases.length]);

  const currentPhrase = phrases[index] ?? phrases[0] ?? '';

  if (prefersReducedMotion) {
    return (
      <p className="mt-1 text-[13px] font-semibold text-[var(--fg-muted)] sm:text-[17px]">
        {phrases[0]}
      </p>
    );
  }

  return (
    <div
      className="mt-1 flex min-h-[20px] items-center overflow-hidden sm:min-h-[26px]"
      aria-live="off"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={currentPhrase}
          aria-label={currentPhrase}
          className="m-0 flex flex-wrap text-[13px] leading-snug font-semibold text-[var(--fg-muted)] sm:text-[17px]"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {Array.from(currentPhrase).map((char, charIdx) => (
            <motion.span
              key={`${index}-${charIdx}`}
              aria-hidden="true"
              className="inline-block whitespace-pre"
              variants={{
                hidden: { opacity: 0, y: 6, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 0.28,
                    delay: charIdx * 0.016,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
                exit: {
                  opacity: 0,
                  y: -5,
                  filter: 'blur(4px)',
                  transition: {
                    duration: 0.18,
                    delay: charIdx * 0.008,
                    ease: 'easeIn',
                  },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  const { identity, heroMedia, socialLinks, viewsCounter } = portfolioData;
  const pageViews = usePageViews(viewsCounter.apiUrl);

  return (
    <section id="inicio" aria-labelledby="hero-heading" className="scroll-mt-14 pt-12">
      {/* Row 1: Animated pixel-art GIF banner framed cleanly from the top window/witch down to Mario's desk line */}
      <RailRow>
        <div className="p-2 sm:p-2.5">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full overflow-hidden rounded-[3px] border border-[var(--rail)] bg-[#0b0a14]"
          >
            {/* Crops 1920x1080 vertically to [38.2% .. 83.7%] (492px band -> ~199px desktop height, matching sam.larp.af) */}
            <div className="relative h-32 w-full overflow-hidden sm:h-auto sm:aspect-[1920/492]">
              <picture className="block h-full w-full">
                <source
                  srcSet={heroMedia.staticFallbackSrc}
                  media="(prefers-reduced-motion: reduce)"
                />
                <img
                  src={heroMedia.animatedSrc}
                  alt={heroMedia.alt}
                  width={heroMedia.width}
                  height={heroMedia.height}
                  decoding="async"
                  fetchPriority="high"
                  className="block h-full w-full object-cover object-[50%_70.1%] select-none"
                />
              </picture>
            </div>
          </motion.div>
        </div>
      </RailRow>

      {/* Row 2: Avatar placeholder ("EL") + Identity + Live São Paulo Time */}
      <RailRow>
        <div className="px-3 py-4 sm:px-4 sm:py-5">
          <div className="flex flex-row items-center gap-3.5 sm:gap-6">
            {/* Avatar frame — exact proportions matching sam.larp.af; editable via portfolioData.identity.avatarUrl */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="size-[92px] shrink-0 rounded-[12px] border border-[var(--rail-strong)] bg-[var(--bg-avatar-frame)] p-1 sm:size-[116px]"
            >
              {identity.avatarUrl ? (
                <img
                  src={identity.avatarUrl}
                  alt={`Foto de perfil de ${identity.name}`}
                  className="h-full w-full rounded-[8px] object-cover object-top select-none"
                />
              ) : (
                <div
                  role="img"
                  aria-label={`Monograma provisório ${identity.initials} de ${identity.name}`}
                  className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[8px] border border-dashed border-[var(--rail-strong)] bg-[var(--bg-avatar-inner)] select-none"
                >
                  <span className="font-serif-display text-[36px] leading-none tracking-tight text-[var(--fg)] sm:text-[46px]">
                    {identity.initials}
                  </span>
                  <span className="font-mono-label mt-1 text-[8px] tracking-[0.2em] text-[var(--fg-subtle)] uppercase sm:text-[9px]">
                    avatar
                  </span>
                </div>
              )}
            </motion.div>

            {/* Name, Role, Location */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.12 }}
              className="min-w-0 flex-1"
            >
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--fg-muted)]">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-[var(--accent-emerald)]"
                  />
                  <span>{identity.availability}</span>
                </span>

                {pageViews !== null ? (
                  <span
                    className="font-mono-label inline-flex items-center gap-1.5 text-[11px] text-[var(--fg-subtle)] tabular-nums sm:text-xs"
                    title="Visualizações do portfólio"
                    aria-label={`${pageViews} ${pageViews === 1 ? 'visualização' : 'visualizações'}`}
                  >
                    <Eye className="size-3.5 shrink-0" aria-hidden="true" />
                    <span>{pageViews.toLocaleString('pt-BR')}</span>
                  </span>
                ) : null}
              </div>

              <h1
                id="hero-heading"
                className="font-serif-display text-[24px] leading-[1.05] tracking-[-0.01em] text-[var(--fg)] sm:text-[36px]"
              >
                {identity.name}
              </h1>

              <CyclingRole phrases={identity.roleCycle} />

              <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-medium text-[var(--fg-muted)] sm:text-xs">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3 shrink-0 text-[var(--fg-subtle)]" aria-hidden="true" />
                  <span>{identity.location}</span>
                </span>
                {identity.education ? (
                  <>
                    <span aria-hidden="true" className="hidden text-[var(--fg-subtle)] sm:inline">
                      •
                    </span>
                    <span className="text-[var(--fg-subtle)]">{identity.education}</span>
                  </>
                ) : null}
              </div>
            </motion.div>
          </div>

          {/* Hero short bio + complement + configurable social links */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.16 }}
            className="mt-4 border-t border-dashed border-[var(--rail)] pt-3.5"
          >
            <p className="max-w-[66ch] text-[14px] leading-relaxed text-[var(--fg-secondary)] sm:text-[15.5px]">
              {identity.heroSummary}
            </p>

            <ul
              aria-label="Principais interesses e tecnologias"
              className="font-mono-label mt-2.5 flex list-none flex-wrap items-center gap-x-3 gap-y-1 p-0 text-[11px] text-[var(--fg-muted)]"
            >
              {identity.roleComplement.split('•').map((item) => (
                <li key={item.trim()} className="whitespace-nowrap">
                  {item.trim()}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="#projetos"
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-[var(--fg)] px-4 text-[13px] font-semibold text-[var(--bg)] transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Ver projetos</span>
                <ArrowDown className="size-3.5" aria-hidden="true" />
              </a>

              {socialLinks.map((social) => {
                const Icon = social.id === 'github' ? GitHubIcon : LinkedInIcon;
                const isConfigured = Boolean(social.url.trim());

                if (isConfigured) {
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-sm border border-dotted border-[var(--rail-strong)] bg-[var(--bg-surface)] px-3 text-[12.5px] font-medium text-[var(--fg-secondary)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--fg)]"
                    >
                      <Icon className="size-3.5" />
                      <span>{social.label}</span>
                      <ArrowUpRight className="size-3 text-[var(--fg-subtle)]" aria-hidden="true" />
                    </a>
                  );
                }

                return (
                  <span
                    key={social.id}
                    aria-disabled="true"
                    title={`${social.label}: configure a URL em src/data/portfolioData.ts`}
                    className="inline-flex min-h-[38px] cursor-not-allowed items-center gap-1.5 rounded-sm border border-dotted border-[var(--rail-strong)] bg-[var(--bg-surface)] px-3 text-[12px] text-[var(--fg-muted)] opacity-80 select-none"
                  >
                    <Icon className="size-3.5" />
                    <span>{social.label}</span>
                    <span className="font-mono-label text-[10px] text-[var(--fg-subtle)]">
                      · em breve
                    </span>
                  </span>
                );
              })}
            </div>
          </motion.div>
        </div>
      </RailRow>
    </section>
  );
}
