import { site } from '@/data/site';

export const pt = {
  htmlLang: 'pt-BR',
  localeName: 'Português',
  switchTo: 'English',
  switchToAria: 'Ver esta página em inglês',

  nav: {
    services: 'Serviços',
    explainer: 'Preciso de cabine?',
    interpreters: 'Intérpretes',
    events: 'Eventos',
    contact: 'Contato',
    quote: 'Pedir orçamento',
    menu: 'Menu',
    close: 'Fechar',
    skipToContent: 'Pular para o conteúdo',
  },

  home: {
    // The second-channel hero: the Portuguese claim, then the same claim in
    // English arriving a beat behind it (§11).
    heroPt: 'Tradução simultânea em Recife, com equipamento próprio.',
    heroEn: 'Simultaneous interpretation in Recife, with our own equipment.',
    heroSub:
      'Dois intérpretes de carreira, 30 receptores nossos e quatro plataformas de tradução remota. Você fala com quem vai estar na sala.',
    heroCtaQuote: 'Pedir orçamento',
    heroCtaWhats: 'Chamar no WhatsApp',
    heroVideoAlt: 'Intérpretes trabalhando durante um evento técnico',

    trustStrip: {
      label: 'Credenciais',
      apic: 'APIC',
      abrates: 'ABRATES',
      cnpj: 'CNPJ ativo',
      nf: 'Emitimos nota fiscal',
      area: `Recife e todo o Nordeste`,
    },

    pair: {
      title: 'Uma dupla fixa, não dois freelancers montados por evento',
      body: 'Gustavo e Lorena trabalham juntos. Vocês não precisam testar a compatibilidade da dupla no dia do evento, e a agência não precisa gastar esforço combinando intérpretes que nunca se ouviram. O revezamento já está resolvido.',
      alt: 'Gustavo e Lorena, intérpretes da Recife Translators',
    },

    owned: {
      title: 'O que é nosso',
      body: `Sistema portátil de tradução simultânea com ${site.equipment.receivers} receptores. Equipamento nosso, transporte nosso, operação nossa. Até ${site.equipment.receivers} ouvintes o evento inteiro sai daqui, sem terceirizar nada.`,
      scaleUp:
        'Acima disso, ou quando o formato pede cabine, contratamos equipamento e intérpretes parceiros — e dizemos isso no orçamento, não depois.',
      cta: 'Ver como funciona o portátil',
    },

    remote: {
      title: 'Tradução simultânea remota',
      body: 'Atendemos nas quatro plataformas que as agências pedem com mais frequência.',
      cta: 'Ver detalhes de RSI',
    },

    contactSplit: {
      title: 'Dois caminhos, sem hierarquia',
      whatsTitle: 'Conferir uma data',
      whatsBody: 'Se a pergunta é “vocês estão livres no dia 14”, o WhatsApp responde mais rápido.',
      formTitle: 'Pedir orçamento',
      formBody: 'Se você precisa de uma proposta formal, o formulário já coleta o que define o preço.',
    },
  },

  services: {
    title: 'Serviços',
    intro:
      'Quatro frentes, listadas pela quantidade de entrega que está sob o nosso controle direto. O que é nosso vem primeiro.',
    inHouse: 'Equipe e equipamento próprios',
    partnered: 'Equipamento e equipe parceiros',
    upTo: (n: number) => `Até ${n} ouvintes`,
    noEquipment: 'Sem equipamento',
    readMore: 'Ver detalhes',
    pairsLabel: 'Pares',
    platformsLabel: 'Plataformas',
  },

  explainer: {
    title: 'Preciso de cabine para tradução simultânea?',
    intro:
      'Esta página existe porque quase toda primeira conversa começa nas mesmas seis dúvidas. As respostas são honestas, inclusive quando a resposta é “nesse caso você precisa de cabine e isso encarece”.',
    tocLabel: 'Nesta página',
  },

  interpreters: {
    title: 'Os intérpretes',
    intro: 'Duas pessoas, com nome, formação e histórico verificáveis.',
    pairsLabel: 'Pares de idiomas',
    memberLabel: 'Associação',
    sinceLabel: 'Atuando desde',
    eventsLabel: 'Tipos de evento',
  },

  events: {
    title: 'Eventos',
    intro:
      'Uma amostra do trabalho recente. Onde o cliente não autorizou o uso do nome, aparecem o setor e a cidade — o registro vale igual e não custa nada em confidencialidade.',
    confidential: 'Cliente sob confidencialidade',
    listeners: (n: number) => `${n} ouvintes`,
    formats: {
      portable: 'Simultânea portátil',
      booth: 'Cabine',
      remote: 'Remota',
      consecutive: 'Consecutiva',
      escort: 'Acompanhamento',
    },
    empty: 'Ainda não há eventos publicados.',
  },

  quote: {
    title: 'Pedir orçamento',
    intro: `Não publicamos tabela porque o preço depende de formato, duração e número de ouvintes. Com estes campos preenchidos, a primeira resposta já vem com número em vez de cinco perguntas. Respondemos em até ${site.contact.responseTimeHours} horas em dias úteis.`,
    fields: {
      dates: 'Data ou datas do evento',
      datesHelp: 'A disponibilidade decide todo o resto, por isso vem primeiro.',
      city: 'Cidade',
      venue: 'Local / espaço',
      roomFormat: 'Formato da sala',
      roomOptions: {
        auditorium: 'Auditório com palco e sonorização',
        meeting: 'Sala de reunião',
        tour: 'Visita com deslocamento',
        online: 'Online',
      },
      duration: 'Duração',
      durationOptions: { half: 'Meio período', full: 'Período integral', multi: 'Vários dias' },
      listeners: 'Quantas pessoas vão ouvir a tradução',
      pairs: 'Pares de idiomas',
      hasEquipment: 'O cliente já tem equipamento?',
      yes: 'Sim',
      no: 'Não',
      unsure: 'Não sei',
      clientType: 'Tipo de cliente',
      clientTypes: { agency: 'Agência / produtora', company: 'Empresa', institution: 'Instituição / universidade / órgão público' },
      name: 'Nome',
      email: 'E-mail',
      whatsapp: 'WhatsApp',
      notes: 'Alguma observação',
      consent: `Autorizo o contato e o tratamento dos meus dados para responder a este pedido de orçamento, conforme a Política de Privacidade.`,
      submit: 'Enviar pedido',
      submitting: 'Enviando…',
      required: 'obrigatório',
      optional: 'opcional',
    },
    success: {
      title: 'Pedido recebido',
      body: `Respondemos em até ${site.contact.responseTimeHours} horas em dias úteis, com um número ou com as duas ou três perguntas que ainda faltarem. Se a data for urgente, chame no WhatsApp que é mais rápido.`,
    },
    error: {
      title: 'Não foi possível enviar',
      body: 'Algo falhou no envio. Tente de novo, ou fale direto no WhatsApp.',
    },
    validation: {
      required: 'Preencha este campo.',
      pairsRequired: 'Selecione pelo menos um par de idiomas.',
      email: 'Informe um e-mail válido.',
      consent: 'Precisamos do seu consentimento para responder.',
    },
  },

  contact: {
    title: 'Contato',
    whatsapp: 'WhatsApp',
    email: 'E-mail',
    legalTitle: 'Dados da empresa',
    razaoSocial: 'Razão social',
    cnpj: 'CNPJ',
    nf: 'Nota fiscal',
    nfYes: 'Emitimos nota fiscal para empresas, instituições e órgãos públicos.',
    areaTitle: 'Onde atendemos',
    areaBody: 'Recife como base, com deslocamento para:',
    responseTitle: 'Tempo de resposta',
    responseBody: `Até ${site.contact.responseTimeHours} horas em dias úteis.`,
  },

  privacy: {
    title: 'Política de privacidade',
    updated: 'Atualizada em',
  },

  footer: {
    tagline: 'Tradução simultânea, consecutiva e remota. Recife, Pernambuco.',
    servicesTitle: 'Serviços',
    companyTitle: 'Empresa',
    contactTitle: 'Contato',
    rights: 'Todos os direitos reservados.',
  },

  common: {
    breadcrumb: 'Você está aqui',
    home: 'Início',
    backTo: 'Voltar para',
  },
};

/**
 * The Portuguese file is the reference shape. `en.ts` must satisfy this type,
 * so a missing or misnamed key fails the type check rather than the page.
 */
export type Strings = typeof pt;
