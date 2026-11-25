import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import type { ThemeMode } from '../hooks/useTheme';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'inicio', label: 'Início', href: '#inicio' },
  { id: 'sobre', label: 'Sobre', href: '#sobre' },
  { id: 'projetos', label: 'Projetos', href: '#projetos' },
  { id: 'contato', label: 'Contato', href: '#contato' },
] as const;

export function Navbar({ theme, onToggleTheme, activeSection }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-dashed border-[var(--rail)] bg-[var(--bg-nav)] backdrop-blur-md">
      <div className="mx-auto flex h-12 w-[calc(100%-16px)] max-w-[800px] items-center justify-between border-x border-dashed border-[var(--rail)] px-3 sm:w-[calc(100%-32px)] sm:px-4">
        <a
          href="#inicio"
          className="font-serif-display text-[28px] leading-none tracking-[-0.01em] text-[var(--fg)] transition-opacity hover:opacity-80 sm:text-[30px]"
          aria-label={`${portfolioData.identity.name} — voltar ao início`}
        >
          {portfolioData.identity.brandName}
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-5 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-[13.5px] transition-colors ${
                  isActive
                    ? 'font-semibold text-[var(--fg)]'
                    : 'font-normal text-[var(--fg-muted)] hover:text-[var(--fg)]'
                }`}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute -bottom-[2px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-[var(--fg)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                ) : null}
              </a>
            );
          })}

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
            className="ml-1 inline-flex size-9 items-center justify-center rounded-md text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--fg)]"
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            className="inline-flex size-10 items-center justify-center rounded-md text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--fg)]"
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
            className="inline-flex size-10 items-center justify-center rounded-md text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--fg)]"
          >
            {menuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-nav-menu"
            aria-label="Navegação mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="overflow-hidden border-t border-dashed border-[var(--rail)] bg-[var(--bg)] md:hidden"
          >
            <div className="mx-auto flex w-[calc(100%-16px)] max-w-[800px] flex-col border-x border-dashed border-[var(--rail)] px-3 py-2 sm:w-[calc(100%-32px)]">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex min-h-[44px] items-center justify-between rounded-sm px-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-[var(--bg-surface-hover)] font-semibold text-[var(--fg)]'
                        : 'text-[var(--fg-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--fg)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive ? <span className="size-1.5 rounded-full bg-[var(--fg)]" /> : null}
                  </a>
                );
              })}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
