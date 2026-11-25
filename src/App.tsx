import { MotionConfig } from 'motion/react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { GitHubActivity } from './components/GitHubActivity';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { SpacerBand } from './components/SectionDivider';
import { TechStack } from './components/TechStack';
import { useActiveSection } from './hooks/useActiveSection';
import { useTheme } from './hooks/useTheme';

const SECTION_IDS = ['inicio', 'sobre', 'projetos', 'contato'] as const;

export function App() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full overflow-x-clip bg-[var(--bg)] text-[var(--fg)]">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-[var(--fg)] focus:px-3 focus:py-2 focus:text-xs focus:font-semibold focus:text-[var(--bg)]"
        >
          Pular para o conteúdo principal
        </a>

        <Navbar theme={theme} onToggleTheme={toggleTheme} activeSection={activeSection} />

        <main id="conteudo-principal">
          <Hero />
          <SpacerBand />
          <About />
          <SpacerBand />
          <Projects />
          <SpacerBand />
          <TechStack />
          <SpacerBand />
          <GitHubActivity />
          <SpacerBand />
          <Contact />
          <SpacerBand />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
