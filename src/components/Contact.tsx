import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { portfolioData, type SocialLinkItem } from '../data/portfolioData';
import { RailRow, SectionHeadingRow } from './SectionDivider';
import { GitHubIcon, LinkedInIcon } from './TechIcons';

function ContactCard({
  item,
  hasRightBorder,
}: {
  item: SocialLinkItem;
  hasRightBorder: boolean;
}) {
  const Icon = item.id === 'github' ? GitHubIcon : LinkedInIcon;
  const isConfigured = Boolean(item.url.trim());

  const borderClass = hasRightBorder
    ? 'border-b border-dashed border-[var(--rail)] sm:border-r sm:border-b-0'
    : '';

  if (isConfigured) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex min-h-[76px] items-center justify-between gap-3 px-4 py-4 transition-colors hover:bg-[var(--bg-surface-hover)] ${borderClass}`}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-[var(--rail-strong)] bg-[var(--bg-surface)] text-[var(--fg-secondary)] transition-colors group-hover:border-[var(--fg-subtle)] group-hover:text-[var(--fg)]">
            <Icon className="size-4.5" />
          </span>
          <div>
            <p className="m-0 text-sm font-semibold text-[var(--fg)]">{item.label}</p>
            <p className="font-mono-label m-0 mt-0.5 text-[11px] text-[var(--fg-subtle)]">
              {item.displayHandle || 'Abrir perfil'}
            </p>
          </div>
        </div>
        <ArrowUpRight
          className="size-4 text-[var(--fg-subtle)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--fg)]"
          aria-hidden="true"
        />
      </a>
    );
  }

  return (
    <div
      aria-disabled="true"
      title={`${item.label}: defina a URL real em src/data/portfolioData.ts`}
      className={`flex min-h-[76px] cursor-not-allowed items-center justify-between gap-3 px-4 py-4 opacity-75 select-none ${borderClass}`}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-dashed border-[var(--rail-strong)] bg-[var(--bg-surface)] text-[var(--fg-subtle)]">
          <Icon className="size-4.5" />
        </span>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--fg-secondary)]">{item.label}</p>
          <p className="font-mono-label m-0 mt-0.5 text-[11px] text-[var(--fg-subtle)]">
            {item.pendingLabel}
          </p>
        </div>
      </div>
      <span className="font-mono-label rounded-sm border border-dotted border-[var(--rail-strong)] px-2 py-0.5 text-[10px] text-[var(--fg-subtle)]">
        pendente
      </span>
    </div>
  );
}

export function Contact() {
  const { socialLinks } = portfolioData;

  return (
    <section id="contato" aria-labelledby="contato-heading" className="scroll-mt-14">
      <SectionHeadingRow
        id="contato-heading"
        title="Contato"
        rightSlot={
          <span className="font-mono-label text-[11px] text-[var(--fg-subtle)]">
            canais profissionais
          </span>
        }
      />

      <RailRow>
        <motion.div
          initial={{ opacity: 0.78, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2"
        >
          {socialLinks.map((item, index) => (
            <ContactCard
              key={item.id}
              item={item}
              hasRightBorder={index < socialLinks.length - 1}
            />
          ))}
        </motion.div>
      </RailRow>
    </section>
  );
}
