import type { Lang } from './site';

/**
 * The two interpreters. Pairs are stated per person, not per company: EN↔PT is
 * a complete in-house pair, while Spanish is Lorena's individual capability and
 * a second Spanish interpreter has to be subcontracted for a full booth day
 * (§3). Saying so here prevents inquiries that have to be walked back.
 */
export interface Interpreter {
  id: 'ayrton' | 'lorena';
  name: string;
  /** BCP-47 tags, used directly in JSON-LD `knowsLanguage`. */
  knowsLanguage: string[];
  association: { name: string; full: Record<Lang, string>; url: string };
  since: number;
  photo: string;
  pairs: string[];
  bio: Record<Lang, string>;
  eventTypes: Record<Lang, string[]>;
}

export const interpreters: Interpreter[] = [
  {
    id: 'ayrton',
    name: 'Ayrton',
    knowsLanguage: ['pt-BR', 'en'],
    association: {
      name: 'APIC',
      full: {
        pt: 'APIC — Associação Profissional de Intérpretes de Conferência',
        en: 'APIC — Brazilian Association of Conference Interpreters',
      },
      url: 'https://www.apic.org.br/',
    },
    since: 2014,
    photo: '/media/ayrton.jpg',
    pairs: ['en-pt', 'pt-en'],
    bio: {
      pt: 'Intérprete de conferência associado à APIC, com inglês e português como par de trabalho. Atua em auditorias técnicas, visitas de planta, reuniões de conselho e negociações — formatos em que o intérprete precisa acompanhar o grupo pelo espaço, e não ficar preso a uma cabine. Responsável pela operação do equipamento portátil.',
      en: 'Conference interpreter and APIC member, working between English and Portuguese. Works on technical audits, plant visits, board meetings and negotiations — formats where the interpreter has to move with the group rather than stay fixed in a booth. Runs the portable equipment.',
    },
    eventTypes: {
      pt: ['Auditorias técnicas', 'Visitas de planta', 'Reuniões de conselho', 'Negociações', 'Treinamentos'],
      en: ['Technical audits', 'Plant visits', 'Board meetings', 'Negotiations', 'Training days'],
    },
  },
  {
    id: 'lorena',
    name: 'Lorena',
    knowsLanguage: ['pt-BR', 'en', 'es'],
    association: {
      name: 'ABRATES',
      full: {
        pt: 'ABRATES — Associação Brasileira de Tradutores e Intérpretes',
        en: 'ABRATES — Brazilian Association of Translators and Interpreters',
      },
      url: 'https://abrates.com.br/',
    },
    since: 2016,
    photo: '/media/lorena.jpg',
    pairs: ['en-pt', 'pt-en', 'pt-es', 'es-pt'],
    bio: {
      pt: 'Intérprete de conferência associada à ABRATES. Trabalha com inglês e português e, individualmente, também com espanhol — um par que a maioria das duplas na região não cobre. Atua em congressos, eventos institucionais e interpretação remota, além de simultânea portátil.',
      en: 'Conference interpreter and ABRATES member. Works between English and Portuguese and, individually, also with Spanish — a pair most local pairings do not cover. Works on conferences, institutional events and remote interpreting, alongside portable simultaneous.',
    },
    eventTypes: {
      pt: ['Congressos', 'Eventos institucionais', 'Interpretação remota', 'Simultânea portátil', 'Acompanhamento'],
      en: ['Conferences', 'Institutional events', 'Remote interpreting', 'Portable simultaneous', 'Escort'],
    },
  },
];
