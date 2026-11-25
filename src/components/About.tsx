import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import { RailRow, SectionHeadingRow } from './SectionDivider';

export function About() {
  const { about } = portfolioData;

  return (
    <section id="sobre" aria-labelledby="sobre-heading" className="scroll-mt-14">
      <SectionHeadingRow id="sobre-heading" title={about.heading} />
      <RailRow>
        <motion.div
          initial={{ opacity: 0.78, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="px-3 py-4 sm:px-4 sm:py-5"
        >
          <ul className="m-0 list-none space-y-3 p-0 text-[14px] leading-[1.68] text-[var(--fg-secondary)] sm:text-[15.5px]">
            {about.sentences.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-[2px] shrink-0 text-[var(--fg-subtle)] select-none"
                >
                  •
                </span>
                <p className="m-0">
                  {item.text}
                  <strong className="font-semibold text-[var(--fg)] underline decoration-[var(--rail-strong)] underline-offset-4">
                    {item.emphasis}
                  </strong>
                  {item.after}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </RailRow>
    </section>
  );
}
