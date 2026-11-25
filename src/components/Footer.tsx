import { portfolioData } from '../data/portfolioData';
import { RailRow } from './SectionDivider';

export function Footer() {
  const { footer } = portfolioData;

  return (
    <RailRow as="footer" borderBottom={false}>
      <div className="flex flex-col gap-3 px-3 py-6 text-xs text-[var(--fg-subtle)] sm:flex-row sm:items-end sm:justify-between sm:px-4 sm:py-7">
        <div>
          <p className="font-serif-display m-0 text-[22px] leading-none text-[var(--fg)]">
            {footer.creditLine}
          </p>
          <p className="m-0 mt-1.5 text-[12px] text-[var(--fg-muted)]">{footer.tagline}</p>
        </div>

        <p className="m-0 text-[12px] text-[var(--fg-muted)] sm:text-right">
          © {footer.copyrightYear} {footer.creditLine}
        </p>
      </div>
    </RailRow>
  );
}
