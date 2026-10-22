export type Project = {
  id: string;
  number: string;
  name: string;
  tagline: string; // what it does, in business language
  proves: string; // the skill it demonstrates
  stack: string[];
  highlights: string[];
  repoUrl: string;
  demo: {
    kind: 'swagger' | 'video';
    url: string;
    label: string;
    /** mp4 grabado en public/demos — ready se pone en true cuando existe */
    video?: { url: string; ready: boolean; label?: string };
  };
};

export const PROJECTS: Project[] = [
  {
    id: 'slack-triage-bot',
    number: '01',
    name: 'Slack Triage Bot',
    tagline:
      'Un bot que lee los mensajes que lo mencionan en Slack y los clasifica solo: categoría, prioridad y equipo asignado.',
    proves: 'LLM agent con harness de validación y autocorrección',
    stack: ['Python', 'OpenAI', 'slack-bolt', 'Pydantic', 'GitHub Actions'],
    highlights: [
      'Feedback loop: si la respuesta del LLM falla la validación, recibe el error concreto y reintenta (máx. 3 intentos)',
      'Escalado a humanos: confianza < 0.75 o prioridad P0 salta del bot',
      'Deduplica redeliveries de Slack — un mensaje = una clasificación',
    ],
    repoUrl: 'https://github.com/loyolajuan/slack-triage-bot',
    demo: {
      kind: 'video',
      url: '/demos/slack-triage.mp4',
      label: 'Demo en Slack (60s)',
      video: { url: '/demos/slack-triage.mp4', ready: false, label: 'Demo en Slack (60s)' },
    },
  },
  {
    id: 'invoice-agent',
    number: '02',
    name: 'Invoice Agent',
    tagline:
      'API que convierte facturas en texto crudo en registros validados y enrutados: extrae, corrige, aplica reglas de negocio y notifica.',
    proves: 'Automatización de un proceso manual end-to-end',
    stack: ['Python', 'FastAPI', 'SQLite', 'OpenAI', 'Pydantic'],
    highlights: [
      'Reglas divididas por quién puede corregirlas: aritmética → el LLM reintenta; fecha futura → hold para humanos',
      'Nunca persiste una factura medio extraída',
      'Money como Decimal, dedupe por proveedor + número, Slack notificador que no rompe el pipeline',
    ],
    repoUrl: 'https://github.com/loyolajuan/invoice-agent',
    demo: {
      kind: 'swagger',
      url: process.env.NEXT_PUBLIC_INVOICE_URL ?? '',
      label: 'API interactiva (Swagger)',
      video: { url: '/demos/invoice-agent.mp4', ready: true, label: 'Demo de la API (53s)' },
    },
  },
  {
    id: 'code-agent',
    number: '03',
    name: 'Code Agent',
    tagline:
      'Harness de agente que arregla código hasta que los tests pasan: propone un parche, lo aplica en sandbox, verifica contra pytest real y se autocorrige.',
    proves: 'Context management + harness + loop de autocorrección',
    stack: ['Python', 'LangGraph', 'OpenAI', 'pytest', 'subprocess'],
    highlights: [
      'Contexto con presupuesto: archivos enteros, más chicos primero, y dice qué dejó fuera',
      'Verificación honesta: subprocess fresco por corrida, la suite real manda',
      'Budget duro de intentos; parches validados contra path traversal antes de tocar disco',
    ],
    repoUrl: 'https://github.com/loyolajuan/code-agent',
    demo: {
      kind: 'video',
      url: '/demos/code-agent.mp4',
      label: 'Demo del loop (40s)',
      video: { url: '/demos/code-agent.mp4', ready: true, label: 'Demo del loop (40s)' },
    },
  },
];
