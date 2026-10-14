import type { Service } from './types';
export const enServices: Service[] = [
  {
    id: 'legal-web',
    title: 'Websites & Digital Experiences',
    short: 'Give people a clear reason to choose your business.',
    intro:
      'A business website, a distinctive brand experience, or a focused digital launch. We bring structure, content and development together around what your visitors need to understand and do.',
    needs: [
      'Introduce a business, service or new offer.',
      'Help visitors find the right information and make an enquiry.',
      'Create an experience that carries your visual identity across devices.',
    ],
    deliverables: [
      'Agreed information architecture and visual direction.',
      'Responsive pages, navigation and contact flows within scope.',
      'Accessible content, technical SEO foundations and launch guidance.',
    ],
    example:
      'A service business website with a clear offer, useful service pages, approved work examples and a project enquiry flow.',
  },
  {
    id: 'web-app',
    title: 'Web Applications',
    short: 'Build around the work your team needs to complete.',
    intro:
      'Portals, dashboards and service platforms shaped around users, roles and workflows. We define the important tasks first, then build the interfaces, features and integrations that support them.',
    needs: [
      'Replace a spreadsheet process that has become difficult to manage.',
      'Give customers or staff a portal for requests, documents or progress.',
      'Connect existing tools with clear access and operational requirements.',
    ],
    deliverables: [
      'User journeys, workflow definitions and access requirements.',
      'Application features and integrations within an agreed scope.',
      'Workflow checks, deployment documentation and practical handover.',
    ],
    example:
      'A request portal with authentication, role-based access, status tracking and notifications, defined around the organisation’s process.',
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    short: 'Make a defined workflow easier to run.',
    intro:
      'Practical assistance for information retrieval, drafting and repetitive work. We assess the workflow, its data boundaries and the decisions that need human review before choosing an integration.',
    needs: [
      'Find information in an approved internal knowledge base.',
      'Prepare drafts or move routine data between services.',
      'Reduce repeated manual steps while retaining review and control.',
    ],
    deliverables: [
      'A workflow map, data boundaries and success criteria.',
      'A scoped prototype or integration to evaluate with real tasks.',
      'Access rules, review steps, failure handling and usage guidance.',
    ],
    example:
      'An internal search assistant that returns references to approved documents and leaves decisions with the person reviewing the result.',
  },
  {
    id: 'redesign',
    title: 'Website Redesign',
    short: 'Make the next version serve the business better.',
    intro:
      'We review what your current website does well, where visitors struggle, and what your business now needs. The rebuild follows an agreed plan for content, navigation, identity and migration.',
    needs: [
      'An older website is difficult to read or use on mobile.',
      'Services, enquiries or important content are hard to find.',
      'The business has changed and the website needs to catch up.',
    ],
    deliverables: [
      'A review of existing structure and improvement priorities.',
      'An approved prototype and responsive implementation.',
      'Content migration and URL redirects where agreed.',
    ],
    example:
      'A new service structure and enquiry flow, with useful existing content retained and old page addresses mapped to their replacements.',
  },
  {
    id: 'seo',
    title: 'SEO & Performance',
    short: 'Help people find, load and read your website.',
    intro:
      'Technical improvements to page structure, metadata and loading performance. We examine the current website and content goals, then prioritise changes with a clear reason behind each one.',
    needs: [
      'Inconsistent headings, metadata or indexable page structure.',
      'Heavy images or pages that load slowly on mobile.',
      'Content that needs a clearer connection to your services and audience.',
    ],
    deliverables: [
      'A technical review and prioritised recommendations.',
      'Agreed improvements to structure, metadata and assets.',
      'Recorded checks and guidance for further content work.',
    ],
    example:
      'Service-page metadata, clearer internal links and lighter media. Search rankings and commercial results depend on factors beyond a technical update.',
  },
  {
    id: 'server',
    title: 'Server & Deployment',
    short: 'Prepare a clear path from build to operation.',
    intro:
      'Hosting and deployment selected around workload, integrations and ownership. We prepare the environment and document how the website or application is released and accessed.',
    needs: [
      'Domain, DNS, HTTPS and hosting configuration.',
      'An application launch or migration to a new environment.',
      'Agreed backup, monitoring and operational responsibilities.',
    ],
    deliverables: [
      'Environment configuration for the agreed workload.',
      'A documented deployment process and access handover.',
      'Backup and operational checks included in the scope.',
    ],
    example:
      'A static business website on a managed platform, or an application environment selected after its requirements have been reviewed.',
  },
];
