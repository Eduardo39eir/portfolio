import pixelArtHeroGif from '../../assets/pixel-art-hero.gif';
import pixelArtHeroStatic from '../../assets/pixel-art-hero-static.png';
import avatarEduardo from '../../assets/avatar-eduardo.jpg';

export type TechCategory = 'all' | 'frontend' | 'design' | 'learning';

export interface SocialLinkItem {
  id: 'github' | 'linkedin' | 'email';
  label: string;
  /** Deixe vazio ('') enquanto o link oficial não for informado */
  url: string;
  /** Exibido quando a URL estiver preenchida (opcional) */
  displayHandle?: string;
  /** Indicação exibida enquanto a URL estiver pendente */
  pendingLabel: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  monogram: string;
  featured?: boolean;
  status: string;
  statusTone: 'live' | 'academic' | 'wip';
  summary: string;
  details: string;
  highlights: string[];
  tags: string[];
  /** URL real verificada. Deixe '' se ainda não houver demonstração pública */
  demoUrl: string;
  /** URL real do repositório. Deixe '' se ainda não estiver público/informado */
  repoUrl: string;
  /** Caminho/import de screenshot real do projeto. Deixe '' para exibir placeholder "Capa em breve" */
  coverImage: string;
  /** Gradiente discreto da moldura de preview, inspirado na estética da referência */
  previewGradient: string;
  /** Rótulo curto da categoria de interface no placeholder */
  previewLabel: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  category: Exclude<TechCategory, 'all'>;
  levelLabel: string;
  note: string;
  docsUrl: string;
}

export const portfolioData = {
  identity: {
    name: 'Eduardo Luna Floriano',
    brandName: 'Eduardo',
    initials: 'EL',
    /**
     * Avatar em pixel art importado de assets/avatar-eduardo.jpg.
     * Caso fique vazio (''), exibe o monograma "EL".
     */
    avatarUrl: avatarEduardo,
    role: 'Front-End Developer',
    /** Frases exibidas em ciclo animado no hero (inspirado na referência) */
    roleCycle: [
      'Front-End Developer',
      'Design Engineer',
      'Full Stack Engineer',
      'UI/UX Engineer',
    ],
    roleComplement: 'HTML5 • CSS3 • JavaScript • React.js • Figma • UI/UX',
    location: 'São Paulo, Brasil',
    education: '',
    availability: 'Disponível para oportunidades',
    heroSummary:
      'Desenvolvedor Front-End em formação, interessado em criar interfaces modernas, responsivas e experiências digitais interativas.',
  },

  heroMedia: {
    /**
     * GIF animado original (1920x1080, 64 frames) importado localmente de assets/pixel-art-hero.gif.
     * Para publicação comercial, basta substituir este arquivo por outra mídia autoral ou licenciada.
     */
    animatedSrc: pixelArtHeroGif,
    /** Frame estático extraído do próprio GIF, usado automaticamente quando prefers-reduced-motion está ativo */
    staticFallbackSrc: pixelArtHeroStatic,
    width: 1920,
    height: 1080,
    frames: 64,
    alt: 'Cena animada em pixel art de um quarto gamer em tons de azul, roxo e rosa com computador e prateleiras',
    artistAttribution: 'Pixel Jeff (2023)',
    usageNote:
      'Arte provisória com elementos de terceiros; substitua em assets/pixel-art-hero.gif antes de uso comercial.',
  },

  about: {
    heading: 'Sobre',
    /** Texto exato em português dividido em seus três períodos naturais para leitura limpa */
    sentences: [
      {
        text: 'Sou desenvolvedor Front-End em formação técnica pelo ',
        emphasis: 'SENAI',
        after: ', com foco em interfaces responsivas e experiências digitais interativas.',
      },
      {
        text: 'Desenvolvo projetos próprios que unem ',
        emphasis: 'design, tecnologia e funcionalidades práticas',
        after: '.',
      },
      {
        text: 'Tenho interesse em ',
        emphasis: 'HTML, CSS, JavaScript, React e Figma',
        after:
          ', e busco minha primeira oportunidade profissional para evoluir ao lado de outros desenvolvedores.',
      },
    ],
  },

  /**
   * Configure githubUsername com seu usuário real do GitHub (ex.: 'eduardoluna')
   * para carregar automaticamente o gráfico real de contribuições do último ano.
   * Enquanto permanecer vazio (''), será exibido um estado honesto de configuração pendente.
   */
  github: {
    username: 'Eduardo39eir',
  },

  /**
   * Contador de visualizações exibido no hero (ícone de olho + número).
   * - Se `apiUrl` estiver vazio (''), contabiliza visitas localmente no navegador (sem números inventados).
   * - Ao publicar (ex.: Vercel + Upstash/KV), informe a URL do endpoint que retorna `{ count: number }`.
   */
  viewsCounter: {
    apiUrl: '',
  },

  /**
   * URLs profissionais oficiais configuradas.
   */
  socialLinks: [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/Eduardo39eir/',
      displayHandle: '@Eduardo39eir',
      pendingLabel: 'Link a configurar',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://br.linkedin.com/in/eduardo-luna-floriano-3563582b8',
      displayHandle: 'eduardo-luna-floriano',
      pendingLabel: 'Link a configurar',
    },
  ] as SocialLinkItem[],

  projects: [
    {
      id: 'gerenciador-de-farmacos',
      title: 'Gerenciador de Fármacos',
      subtitle: 'TCC SENAI · demanda de estoque UNESP',
      monogram: 'GF',
      status: 'TCC · SENAI',
      statusTone: 'academic',
      summary:
        'Sistema web de TCC no SENAI associado a uma demanda de gerenciamento de estoque de fármacos da UNESP, com fornecedores, fármacos, lotes, movimentações e indicadores.',
      details:
        'Projeto de Trabalho de Conclusão de Curso no SENAI desenvolvido a partir de uma demanda real de controle de estoque farmacêutico ligada à UNESP. A aplicação estrutura cadastros de fornecedores e fármacos, acompanhamento de lotes, registro de movimentações e visualização de indicadores operacionais — mantido estritamente como projeto acadêmico, sem alegação de implantação institucional.',
      highlights: [
        'Cadastro estruturado de fornecedores, fármacos e lotes',
        'Registro de entradas, saídas e movimentações de estoque',
        'Painel de indicadores para leitura rápida da situação dos itens',
      ],
      tags: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'UI/UX'],
      demoUrl: '',
      repoUrl: '',
      coverImage: '',
      previewGradient: 'from-emerald-300/75 via-teal-500/75 to-slate-950',
      previewLabel: 'Sistema web · Gestão de estoque',
    },
    {
      id: 'ui-components-library',
      title: 'UI Components Library',
      subtitle: 'Componentes React e microinterações',
      monogram: 'UI',
      status: 'Em desenvolvimento',
      statusTone: 'wip',
      summary:
        'Coleção pessoal de componentes React e animações, com previews, microinterações e experimentos visuais.',
      details:
        'Biblioteca pessoal de estudo e experimentação em React para criar componentes reutilizáveis, estados de interação refinados, transições suaves e boas práticas de acessibilidade por teclado.',
      highlights: [
        'Previews interativos de componentes reutilizáveis em React',
        'Estudo prático de microinterações, transições e feedback visual',
        'Consistência de espaçamento, tipografia e estados de foco',
      ],
      tags: ['React.js', 'CSS3', 'JavaScript', 'UI/UX'],
      demoUrl: '',
      repoUrl: '',
      coverImage: '',
      previewGradient: 'from-sky-300/75 via-blue-500/75 to-slate-950',
      previewLabel: 'Componentes · Experimentos UI',
    },
    {
      id: 'atlas',
      title: 'Atlas',
      subtitle: 'Experimento de aplicativo de viagens',
      monogram: 'AT',
      status: 'Em desenvolvimento',
      statusTone: 'wip',
      summary:
        'Projeto experimental de aplicativo de viagens focado em navegação fluida, planejamento e interfaces visuais.',
      details:
        'Experimento autoral em andamento dedicado a explorar arquitetura de informação, planejamento de roteiros e telas visuais limpas para descoberta e organização de viagens.',
      highlights: [
        'Exploração de fluxos de navegação e planejamento de roteiros',
        'Prototipação visual e hierarquia de cartões de destinos',
        'Em estágio inicial de construção e refinamento de interface',
      ],
      tags: ['React.js', 'Figma', 'UI/UX', 'CSS3'],
      demoUrl: '',
      repoUrl: '',
      coverImage: '',
      previewGradient: 'from-amber-200/75 via-orange-500/75 to-slate-950',
      previewLabel: 'App de viagens · Protótipo',
    },
    {
      id: 'cinema-seat-experience',
      title: 'Cinema Seat Experience',
      subtitle: 'Mapa 2D de assentos e protótipo 3D',
      monogram: 'CS',
      status: 'Em desenvolvimento',
      statusTone: 'wip',
      summary:
        'Seletor de assentos para cinema com mapa 2D, seleção de grupos contíguos e protótipo de visualização 3D.',
      details:
        'Experimento interativo voltado à experiência de escolha de poltronas em salas de cinema: combina seleção clara em mapa 2D, apoio para grupos contíguos e um protótipo de perspectiva 3D da sala em desenvolvimento.',
      highlights: [
        'Mapa 2D interativo para escolha individual ou em grupo',
        'Lógica de seleção de assentos contíguos na mesma fileira',
        'Protótipo em evolução para visualização em perspectiva 3D',
      ],
      tags: ['React.js', 'JavaScript', 'CSS3', 'UI/UX'],
      demoUrl: '',
      repoUrl: '',
      coverImage: '',
      previewGradient: 'from-fuchsia-300/75 via-purple-600/75 to-slate-950',
      previewLabel: 'Seletor 2D · Protótipo 3D',
    },
  ] as ProjectItem[],

  techStack: [
    {
      id: 'html5',
      name: 'HTML5',
      category: 'frontend',
      levelLabel: 'Destaque',
      note: 'Estrutura semântica, formulários e acessibilidade básica na web.',
      docsUrl: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML',
    },
    {
      id: 'css3',
      name: 'CSS3',
      category: 'frontend',
      levelLabel: 'Destaque',
      note: 'Flexbox, Grid, design responsivo, variáveis e transições.',
      docsUrl: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS',
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'frontend',
      levelLabel: 'Destaque',
      note: 'Manipulação de estado, eventos, interatividade e lógica front-end.',
      docsUrl: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript',
    },
    {
      id: 'react',
      name: 'React.js',
      category: 'frontend',
      levelLabel: 'Destaque',
      note: 'Componentização, hooks e construção de interfaces interativas.',
      docsUrl: 'https://react.dev/',
    },
    {
      id: 'figma',
      name: 'Figma',
      category: 'design',
      levelLabel: 'Destaque',
      note: 'Wireframes, protótipos de tela e tradução de layout para código.',
      docsUrl: 'https://www.figma.com/',
    },
    {
      id: 'uiux',
      name: 'UI/UX',
      category: 'design',
      levelLabel: 'Interesse & foco',
      note: 'Hierarquia visual, clareza de fluxos, contraste e responsividade.',
      docsUrl: '',
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'learning',
      levelLabel: 'Em estudo',
      note: 'Tipagem estática em estudo e aplicada na estrutura deste portfólio.',
      docsUrl: 'https://www.typescriptlang.org/',
    },
  ] as TechStackItem[],

  footer: {
    copyrightYear: 2026,
    creditLine: 'Eduardo Luna Floriano',
    tagline: 'Front-End Developer · São Paulo, Brasil',
  },
} as const;
