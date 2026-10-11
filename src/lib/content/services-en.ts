import type { Service } from './types';
export const enServices: Service[] = [
  {
    id: 'legal-web',
    title: 'Law firm websites',
    short: 'A clear home for your firm’s expertise.',
    intro:
      'A website that introduces your firm, practice areas, and a way to start a conversation. Structure and design follow your identity and requirements.',
    needs: [
      'A first website for a firm or independent practice.',
      'Practice areas, partner profiles, and publications.',
      'Indonesian and English content for different audiences.',
    ],
    deliverables: [
      'Agreed page structure and visual direction.',
      'A responsive website with contact flows and SEO foundations.',
      'Content review, deployment, and usage guidance.',
    ],
    example:
      'A company profile with practice areas, professional profiles, articles, and enquiry options.',
  },
  {
    id: 'redesign',
    title: 'Website redesign',
    short: 'Reconsider the impression and the journey.',
    intro:
      'A website can evolve while keeping the information that matters. We review visitor journeys and technical foundations before redesigning.',
    needs: [
      'An older layout that is difficult to use on mobile.',
      'Services and profiles that are hard to find.',
      'Changes in identity, content, or business direction.',
    ],
    deliverables: [
      'Structure review and improvement priorities.',
      'A prototype and new interface implementation.',
      'URL mapping and redirects where required.',
    ],
    example:
      'Updated navigation and practice pages, with a considered migration of existing content.',
  },
  {
    id: 'web-app',
    title: 'Web applications',
    short: 'Make everyday workflows easier.',
    intro:
      'From internal portals to service platforms, we design applications around their users and the work they need to complete.',
    needs: [
      'Document portals or internal dashboards.',
      'Spreadsheet processes becoming difficult to manage.',
      'Integrations with existing organisational services.',
    ],
    deliverables: [
      'User, workflow, and access requirements.',
      'Interfaces and application features within scope.',
      'Workflow testing and operational guidance.',
    ],
    example: 'A request portal with authentication, progress tracking, and role-based access.',
  },
  {
    id: 'seo',
    title: 'SEO & performance',
    short: 'Easier to find. Comfortable to use.',
    intro:
      'Information structure and website performance help people find and read your services. Improvements follow the website’s current state and content goals.',
    needs: [
      'Inconsistent page structure or metadata.',
      'Slow pages or heavy assets.',
      'Content planning around prospective clients’ needs.',
    ],
    deliverables: [
      'Technical audit and priorities.',
      'Metadata, structure, and asset improvements as needed.',
      'Review results and further recommendations.',
    ],
    example: 'Practice page and mobile speed optimisation. Search rankings are not guaranteed.',
  },
  {
    id: 'server',
    title: 'Server & deployment',
    short: 'Foundations that support your website.',
    intro:
      'Hosting and deployment follow workload, integrations, and operational needs. We help prepare the path from code to a usable website.',
    needs: [
      'Domain, DNS, HTTPS, and hosting setup.',
      'Application deployment or environment migration.',
      'Backup and monitoring requirements.',
    ],
    deliverables: [
      'Environment configuration suited to the application.',
      'Deployment process and access documentation.',
      'Agreed backup and operational checks.',
    ],
    example: 'A static website on Cloudflare, or an application server selected for the project.',
  },
  {
    id: 'ai',
    title: 'AI & automation',
    short: 'Considered help for repetitive work.',
    intro:
      'We start with a defined workflow and assess where AI or automation can help. Data boundaries and human review are planned from the outset.',
    needs: [
      'Draft preparation and internal information retrieval.',
      'Moving data between services.',
      'Repetitive processes that require review.',
    ],
    deliverables: [
      'Workflow and data boundary mapping.',
      'An integration prototype to evaluate.',
      'Access controls, output review, and usage guidance.',
    ],
    example:
      'An internal document search assistant with references and human review; it does not replace legal judgement.',
  },
];
