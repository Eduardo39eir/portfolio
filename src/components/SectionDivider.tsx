import type { ReactNode } from 'react';

interface RailRowProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  as?: 'div' | 'section' | 'header' | 'footer';
  borderBottom?: boolean;
}

/**
 * Architectural horizontal row spanning 100% viewport width with a dashed bottom
 * border, framing a centered 800px rail column with persistent vertical dashed borders.
 */
export function RailRow({
  children,
  className = '',
  innerClassName = '',
  id,
  as: Tag = 'div',
  borderBottom = true,
}: RailRowProps) {
  return (
    <Tag
      id={id}
      className={`w-full ${borderBottom ? 'border-b border-dashed border-[var(--rail)]' : ''} ${className}`}
    >
      <div
        className={`mx-auto w-[calc(100%-16px)] max-w-[800px] border-x border-dashed border-[var(--rail)] sm:w-[calc(100%-32px)] ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}

/**
 * Full-width 20px tinted horizontal spacer band matching the architectural
 * rhythm between sections on the reference portfolio.
 */
export function SpacerBand({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-5 w-full border-b border-dashed border-[var(--rail)] bg-[var(--bg-band)] ${className}`}
    >
      <div className="mx-auto h-full w-[calc(100%-16px)] max-w-[800px] border-x border-dashed border-[var(--rail)] sm:w-[calc(100%-32px)]" />
    </div>
  );
}

interface SectionHeadingRowProps {
  title: string;
  rightSlot?: ReactNode;
  id?: string;
}

export function SectionHeadingRow({ title, rightSlot, id }: SectionHeadingRowProps) {
  return (
    <RailRow>
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-4">
        <h2
          id={id}
          className="font-serif-display text-[27px] leading-none tracking-[-0.01em] text-[var(--fg)] sm:text-[31px]"
        >
          {title}
        </h2>
        {rightSlot ? <div className="flex items-center gap-2">{rightSlot}</div> : null}
      </div>
    </RailRow>
  );
}
