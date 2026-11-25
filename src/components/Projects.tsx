import { useState } from 'react';
import { motion } from 'motion/react';
import { portfolioData, type ProjectItem } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { RailRow, SectionHeadingRow } from './SectionDivider';

export function Projects() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projetos" aria-labelledby="projetos-heading" className="scroll-mt-14">
      <SectionHeadingRow
        id="projetos-heading"
        title="Projetos"
        rightSlot={
          <span className="font-mono-label text-[11px] text-[var(--fg-subtle)]">
            {projects.length} projetos
          </span>
        }
      />

      <RailRow>
        <motion.div
          initial={{ opacity: 0.78, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {(() => {
            const regularProjects = projects.filter((p) => !p.featured);
            const regularCount = regularProjects.length;
            const lastDesktopRowStart =
              regularCount % 2 === 0 ? Math.max(0, regularCount - 2) : Math.max(0, regularCount - 1);
            let regularCursor = 0;

            return projects.map((project, index) => {
              const isFeatured = Boolean(project.featured);
              const isLastOverall = index === projects.length - 1;
              const currentRegularIndex = isFeatured ? -1 : regularCursor++;
              const isLeftColumn = !isFeatured && currentRegularIndex % 2 === 0;
              const isInLastDesktopRow = !isFeatured && currentRegularIndex >= lastDesktopRowStart;

              const borderClasses = [
                !isLastOverall ? 'border-b border-dashed border-[var(--rail)]' : '',
                isInLastDesktopRow ? 'md:border-b-0' : '',
                isLeftColumn ? 'md:border-r md:border-dashed md:border-[var(--rail)]' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                  borderClassName={borderClasses}
                />
              );
            });
          })()}
        </motion.div>
      </RailRow>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
