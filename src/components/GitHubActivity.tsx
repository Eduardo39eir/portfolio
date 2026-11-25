import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import { RailRow, SectionHeadingRow } from './SectionDivider';
import { GitHubIcon } from './TechIcons';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionApiResponse {
  total?: Record<string, number>;
  contributions?: ContributionDay[];
}

const WEEKS_COUNT = 52;
const DAYS_PER_WEEK = 7;

const MONTH_LABELS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

function getCellColor(level: 0 | 1 | 2 | 3 | 4) {
  return `var(--contrib-${level})`;
}

export function GitHubActivity() {
  const username = portfolioData.github.username.trim();
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [status, setStatus] = useState<'unconfigured' | 'loading' | 'ready' | 'error'>(
    username ? 'loading' : 'unconfigured',
  );
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    if (!username) {
      setStatus('unconfigured');
      return;
    }

    const controller = new AbortController();
    setStatus('loading');

    fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json() as Promise<ContributionApiResponse>;
      })
      .then((payload) => {
        const list = Array.isArray(payload.contributions) ? payload.contributions : [];
        if (list.length === 0) {
          setStatus('error');
          return;
        }
        setDays(list);
        const total =
          payload.total?.lastYear ?? list.reduce((sum, item) => sum + (item.count || 0), 0);
        setTotalContributions(total);
        setStatus('ready');
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setStatus('error');
      });

    return () => controller.abort();
  }, [username]);

  const weeks = useMemo(() => {
    if (days.length === 0) return [];
    const grouped: ContributionDay[][] = [];
    for (let i = 0; i < days.length; i += DAYS_PER_WEEK) {
      grouped.push(days.slice(i, i + DAYS_PER_WEEK));
    }
    return grouped.slice(-WEEKS_COUNT);
  }, [days]);

  const monthMarkers = useMemo(() => {
    if (weeks.length === 0) return [];
    const raw: { weekIndex: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, index) => {
      const firstDay = week[0];
      if (!firstDay) return;
      const month = Number(firstDay.date.slice(5, 7)) - 1;
      if (month >= 0 && month < 12 && month !== lastMonth) {
        raw.push({ weekIndex: index, label: MONTH_LABELS[month] });
        lastMonth = month;
      }
    });
    // Avoid overlapping labels when the first partial month has fewer than 3 columns
    return raw.filter((marker, idx) => {
      if (idx === 0 && raw.length > 1 && raw[1].weekIndex - marker.weekIndex < 3) {
        return false;
      }
      return true;
    });
  }, [weeks]);

  return (
    <section id="github" aria-labelledby="github-heading" className="scroll-mt-14">
      <SectionHeadingRow
        id="github-heading"
        title="Atividade no GitHub"
        rightSlot={
          username ? (
            <a
              href={`https://github.com/${encodeURIComponent(username)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-label text-[11px] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
            >
              @{username} ↗
            </a>
          ) : (
            <span className="font-mono-label text-[11px] text-[var(--fg-subtle)]">
              configuração pendente
            </span>
          )
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
          {status === 'ready' && weeks.length > 0 ? (
            <div>
              <div className="scrollbar-subtle overflow-x-auto pb-2">
                <div className="w-full min-w-[680px]">
                  {/* Month row */}
                  <div
                    className="mb-1.5 grid h-4 items-center gap-[3.5px] text-[11px] text-[var(--fg-subtle)]"
                    style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
                  >
                    {weeks.map((_, weekIdx) => {
                      const marker = monthMarkers.find((m) => m.weekIndex === weekIdx);
                      return (
                        <span key={weekIdx} className="overflow-visible whitespace-nowrap">
                          {marker ? marker.label : ''}
                        </span>
                      );
                    })}
                  </div>

                  {/* 52-week monochrome grid spanning the full architectural rail width */}
                  <div
                    className="grid gap-[3.5px]"
                    style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
                    role="img"
                    aria-label="Calendário de contribuições do GitHub"
                  >
                    {weeks.map((week, weekIdx) => (
                      <div key={weekIdx} className="flex flex-col gap-[3.5px]">
                        {week.map((day) => (
                          <button
                            key={day.date}
                            type="button"
                            onMouseEnter={() => setHoveredDay(day)}
                            onFocus={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            aria-label={`${day.count} contribuições em ${day.date}`}
                            style={{ backgroundColor: getCellColor(day.level) }}
                            className="aspect-square w-full rounded-[2px] border-0 p-0 transition-transform hover:scale-125"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calendar footer */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[12px] text-[var(--fg-muted)]">
                <span>
                  {hoveredDay
                    ? `${hoveredDay.count} ${hoveredDay.count === 1 ? 'contribuição' : 'contribuições'} em ${hoveredDay.date}`
                    : `${totalContributions ?? 0} contribuições no último ano`}
                </span>

                <div className="flex items-center gap-1 text-[11px] text-[var(--fg-subtle)]">
                  <span>Menos</span>
                  {([0, 1, 2, 3, 4] as const).map((level) => (
                    <span
                      key={level}
                      aria-hidden="true"
                      style={{ backgroundColor: getCellColor(level) }}
                      className="size-[10px] rounded-[2px]"
                    />
                  ))}
                  <span>Mais</span>
                </div>
              </div>
            </div>
          ) : (
            /* Honest pending-configuration or fallback state — zero invented contributions */
            <div className="relative overflow-hidden rounded-md border border-dashed border-[var(--rail-strong)] bg-[var(--bg-surface)] p-4 sm:p-5">
              {/* Empty architectural matrix backdrop (uniform level-0 cells, zero fake activity) */}
              <div
                aria-hidden="true"
                className="pointer-events-none flex gap-[3px] overflow-hidden opacity-45 select-none"
              >
                {Array.from({ length: WEEKS_COUNT }).map((_, weekIdx) => (
                  <div key={weekIdx} className="flex shrink-0 flex-col gap-[3px]">
                    {Array.from({ length: DAYS_PER_WEEK }).map((__, dayIdx) => (
                      <span
                        key={dayIdx}
                        style={{ backgroundColor: 'var(--contrib-0)' }}
                        className="size-[10px] rounded-[2px]"
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Clean centered status overlay */}
              <div className="relative z-10 -mt-[78px] flex min-h-[82px] items-center justify-center sm:-mt-[82px]">
                <div className="max-w-[520px] rounded-md border border-[var(--rail-strong)] bg-[var(--bg)]/95 px-4 py-3 text-center shadow-sm backdrop-blur-xs">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--fg)]">
                    <GitHubIcon className="size-3.5 text-[var(--fg-muted)]" />
                    <span>
                      {status === 'loading'
                        ? 'Carregando contribuições reais do GitHub…'
                        : status === 'error'
                          ? 'Não foi possível carregar os dados do GitHub no momento'
                          : 'Atividade do GitHub aguardando configuração'}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--fg-muted)]">
                    {status === 'error'
                      ? 'Verifique o username informado ou a disponibilidade da API pública do GitHub.'
                      : 'Nenhuma contribuição é simulada. Assim que o username oficial for configurado em src/data/portfolioData.ts, o calendário real será exibido aqui.'}
                  </p>
                </div>
              </div>

              {/* Footer legend */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-[var(--rail)] pt-3 text-[11.5px] text-[var(--fg-subtle)]">
                <span className="font-mono-label text-[11px]">
                  {status === 'loading'
                    ? 'Consultando API…'
                    : 'Sem dados fictícios · aguardando username'}
                </span>
                <div className="flex items-center gap-1 text-[11px]">
                  <span>Menos</span>
                  {([0, 1, 2, 3, 4] as const).map((level) => (
                    <span
                      key={level}
                      aria-hidden="true"
                      style={{ backgroundColor: getCellColor(level) }}
                      className="size-[10px] rounded-[2px]"
                    />
                  ))}
                  <span>Mais</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </RailRow>
    </section>
  );
}
