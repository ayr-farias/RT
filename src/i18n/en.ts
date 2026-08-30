import { site } from '@/data/site';
import type { Strings } from './pt';

export const en = {
  htmlLang: 'en',
  localeName: 'English',
  switchTo: 'Português',
  switchToAria: 'View this page in Portuguese',

  nav: {
    services: 'Services',
    explainer: 'Do I need a booth?',
    interpreters: 'Interpreters',
    events: 'Events',
    contact: 'Contact',
    quote: 'Request a quote',
    menu: 'Menu',
    close: 'Close',
    skipToContent: 'Skip to content',
  },

  home: {
    heroPt: 'Tradução simultânea em Recife, com equipamento próprio.',
    heroEn: 'Simultaneous interpretation in Recife, with our own equipment.',
    heroSub:
      'Two career interpreters, 30 receivers we own outright, and four remote interpreting platforms. You talk to the people who will be in the room.',
    heroCtaQuote: 'Request a quote',
    heroCtaWhats: 'Message on WhatsApp',
    heroVideoAlt: 'Interpreters working during a technical event',

    trustStrip: {
      label: 'Credentials',
      apic: 'APIC',
      abrates: 'ABRATES',
      cnpj: 'Registered CNPJ',
      nf: 'We issue nota fiscal',
      area: 'Recife and across the Northeast',
    },

    pair: {
      title: 'A fixed working pair, not two freelancers assembled per job',
      body: 'Ayrton and Lorena work together. You are not testing the pairing on the day of the event, and an agency does not have to spend effort matching interpreters who have never heard each other work. The handover is already solved.',
      alt: 'Ayrton and Lorena, interpreters at Recife Translators',
    },

    owned: {
      title: 'What we own',
      body: `A portable simultaneous interpretation system with ${site.equipment.receivers} receivers. Our equipment, our transport, our operation. Up to ${site.equipment.receivers} listeners, the whole event is handled end to end with nothing subcontracted.`,
      scaleUp:
        'Above that, or when the format calls for a booth, we bring in partner equipment and partner interpreters — and we say so in the quote, not afterwards.',
      cta: 'See how the portable system works',
    },

    remote: {
      title: 'Remote simultaneous interpretation',
      body: 'We work on the four platforms agencies ask for most often.',
      cta: 'See RSI details',
    },

    contactSplit: {
      title: 'Two paths, neither buried under the other',
      whatsTitle: 'Check a date',
      whatsBody: 'If the question is “are you free on the 14th”, WhatsApp answers faster.',
      formTitle: 'Request a quote',
      formBody: 'If you need a formal proposal, the form already collects what sets the price.',
    },
  },

  services: {
    title: 'Services',
    intro:
      'Four offerings, ordered by how much of the delivery is under our direct control. What we own comes first.',
    inHouse: 'Our own team and equipment',
    partnered: 'Partner equipment and team',
    upTo: (n: number) => `Up to ${n} listeners`,
    noEquipment: 'No equipment required',
    readMore: 'See details',
    pairsLabel: 'Pairs',
    platformsLabel: 'Platforms',
  },

  explainer: {
    title: 'Do I need a booth for simultaneous interpretation?',
    intro:
      'This page exists because nearly every first conversation starts with the same six questions. The answers are honest, including when the answer is “in that case you need a booth, and that costs more”.',
    tocLabel: 'On this page',
  },

  interpreters: {
    title: 'The interpreters',
    intro: 'Two people, with names, training and a verifiable track record.',
    pairsLabel: 'Language pairs',
    memberLabel: 'Association',
    sinceLabel: 'Working since',
    eventsLabel: 'Event types',
  },

  events: {
    title: 'Events',
    intro:
      'A sample of recent work. Where a client has not cleared the use of its name, the sector and city appear instead — the entry carries the same weight and costs nothing in confidentiality.',
    confidential: 'Client under confidentiality',
    listeners: (n: number) => `${n} listeners`,
    formats: {
      portable: 'Portable simultaneous',
      booth: 'Booth',
      remote: 'Remote',
      consecutive: 'Consecutive',
      escort: 'Escort',
    },
    empty: 'No events published yet.',
  },

  quote: {
    title: 'Request a quote',
    intro: `We do not publish a price list, because the price depends on format, duration and the number of listeners. With these fields filled in, the first reply comes back with a number instead of five questions. We reply within ${site.contact.responseTimeHours} hours on business days.`,
    fields: {
      dates: 'Event date or dates',
      datesHelp: 'Availability decides everything else, so it comes first.',
      city: 'City',
      venue: 'Venue',
      roomFormat: 'Room format',
      roomOptions: {
        auditorium: 'Auditorium with stage and PA',
        meeting: 'Meeting room',
        tour: 'Moving tour',
        online: 'Online',
      },
      duration: 'Duration',
      durationOptions: { half: 'Half day', full: 'Full day', multi: 'Multiple days' },
      listeners: 'How many people will listen to the interpretation',
      pairs: 'Language pairs',
      hasEquipment: 'Do you already have equipment?',
      yes: 'Yes',
      no: 'No',
      unsure: 'Not sure',
      clientType: 'Client type',
      clientTypes: { agency: 'Agency / production company', company: 'Company', institution: 'Institution / university / government' },
      name: 'Name',
      email: 'Email',
      whatsapp: 'WhatsApp',
      notes: 'Anything else we should know',
      consent:
        'I consent to being contacted and to my data being processed in order to answer this quote request, as described in the Privacy Policy.',
      submit: 'Send request',
      submitting: 'Sending…',
      required: 'required',
      optional: 'optional',
    },
    success: {
      title: 'Request received',
      body: `We reply within ${site.contact.responseTimeHours} hours on business days, with a number or with the two or three questions still missing. If the date is urgent, WhatsApp is faster.`,
    },
    error: {
      title: 'Could not send',
      body: 'Something failed on the way out. Try again, or message us directly on WhatsApp.',
    },
    validation: {
      required: 'Please fill in this field.',
      pairsRequired: 'Select at least one language pair.',
      email: 'Enter a valid email address.',
      consent: 'We need your consent in order to reply.',
    },
  },

  contact: {
    title: 'Contact',
    whatsapp: 'WhatsApp',
    email: 'Email',
    legalTitle: 'Company details',
    razaoSocial: 'Registered name',
    cnpj: 'CNPJ',
    nf: 'Nota fiscal',
    nfYes: 'We issue nota fiscal for companies, institutions and public bodies.',
    areaTitle: 'Where we work',
    areaBody: 'Based in Recife, travelling to:',
    responseTitle: 'Response time',
    responseBody: `Within ${site.contact.responseTimeHours} hours on business days.`,
  },

  privacy: {
    title: 'Privacy policy',
    updated: 'Last updated',
  },

  footer: {
    tagline: 'Simultaneous, consecutive and remote interpretation. Recife, Pernambuco.',
    servicesTitle: 'Services',
    companyTitle: 'Company',
    contactTitle: 'Contact',
    rights: 'All rights reserved.',
  },

  common: {
    breadcrumb: 'You are here',
    home: 'Home',
    backTo: 'Back to',
  },
} satisfies Strings;
