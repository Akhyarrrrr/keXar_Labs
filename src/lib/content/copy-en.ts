export const en = {
  nav: ['Services', 'Showcase', 'Studio', 'Contact'],
  talk: 'Discuss your website',
  explore: 'Explore the concepts',
  close: 'Close',
  menu: 'Menu',
  headline: 'Websites that reflect your firm’s reputation.',
  heroNote:
    'A web studio for lawyers and law firms. Distinctive design, clear information, and an experience that helps prospective clients take the next step.',
  galleryTitle: 'See the quality. Experience it yourself.',
  galleryNote:
    'Three distinct practices. Three considered digital identities. Explore every page, from the first impression to the enquiry.',
  fiction: 'Demonstration concept; all identities and content are fictional.',
  preview: 'Take a closer look',
  openDemo: 'Open interactive demo',
  capabilityTitle: 'Reputation deserves clarity.',
  capabilityNote:
    'Visitors need to find your practice areas, understand who can help them, and know how to reach your firm. We design around that journey.',
  capabilities: [
    [
      'Practice areas, clearly presented',
      'A service structure that helps prospective clients find what they need.',
    ],
    [
      'Profiles with context',
      'Expertise, approved experience, and professional information presented with care.',
    ],
    [
      'A straightforward way to connect',
      'Thoughtful prompts, a short form, and a comfortable mobile experience.',
    ],
  ],
  servicesTitle: 'From the first impression to the systems behind it.',
  servicesNote:
    'Websites are our focus. Supporting services can be part of a project or a separate engagement.',
  allServices: 'All services',
  detail: 'Explore service',
  processTitle: 'Clear from our first conversation.',
  processNote:
    'We agree on scope, deliverables, and stages before starting. Pricing follows your project’s requirements.',
  steps: [
    ['Brief', 'Understand your firm, prospective clients, materials, and website goals.'],
    ['Design', 'Shape information and visual direction, then review a working prototype together.'],
    ['Development', 'Build pages and interactions within the agreed scope.'],
    ['Review', 'Check content, devices, accessibility, and contact flows.'],
    ['Launch', 'Prepare the domain, deployment, and usage guidance.'],
  ],
  faqTitle: 'Before we begin.',
  faqs: [
    [
      'Do you only work with law firms?',
      'Law firms are our focus. We can also discuss websites and applications for other sectors when the requirements and project are a good fit.',
    ],
    [
      'How much does it cost, and how long does it take?',
      'Both are determined after the brief. Pages, content readiness, features, integrations, and editing requirements inform a proposal with clear stages.',
    ],
    [
      'Can you update an existing website?',
      'Yes. We review its structure, content, visual design, and technical requirements, then agree on what to retain and what to rebuild.',
    ],
    [
      'How do you handle confidential material?',
      'Access, publication permissions, and content approval are discussed at the outset. The showcase here contains original, fictional concepts.',
    ],
    [
      'Will I be able to edit content myself?',
      'We can plan for that. CMS options and guidance depend on how often content changes and who will maintain it.',
    ],
    [
      'Are SEO and maintenance included?',
      'Technical foundations are discussed within the website scope. Content strategy, further optimisation, and routine maintenance can be separate services.',
    ],
  ],
  contactTitle: 'Give your firm a considered digital home.',
  contactNote:
    'Tell us what you want to build, improve, or simplify. We begin with your requirements.',
  formTitle: 'Tell us about your project',
  footerNote: 'Websites, systems, and digital experiences made with care.',
  privacy: 'Privacy',
  back: 'Back to keXar',
  studioTitle: 'Care in the details. Clarity in the process.',
  studioIntro:
    'keXar Labs is a web studio focused on lawyers and law firms. We bring design, content, and development together so your website feels aligned with the way your firm works.',
  principles: [
    [
      'Design has a purpose',
      'Composition and interaction follow the information visitors need to find.',
    ],
    [
      'Technology follows requirements',
      'The stack is chosen around functionality, budget, editing, and integrations.',
    ],
    [
      'Approval before publication',
      'Materials, identities, and confidentiality boundaries are reviewed together before going public.',
    ],
  ],
  compareTitle: 'The same information. A different experience.',
  compareNote:
    'Move the divider to see how structure and typography change a concept. Both versions were created for this demonstration.',
  baseline: 'Initial concept',
  refined: 'Refined concept',
  slider: 'Percentage of the initial concept visible',
  privacyTitle: 'Privacy, in clear language.',
  privacyIntro:
    'This page explains how data moves through the keXar Labs website. Production contact settings are not enabled in this prototype.',
  privacySections: [
    [
      'Appearance and language',
      'Your appearance preference is saved in localStorage. A functional cookie remembers the language you select for one year. Without a saved preference, the website follows your device theme and browser language. Neither preference contains your brief or personal contact details.',
    ],
    [
      'Information you provide',
      'The form asks for your name, email, firm, service, project summary, and optional website URL. Please exclude case documents, sensitive data, and client information from an initial enquiry.',
    ],
    [
      'How we use it',
      'Information is used to reply and prepare a project conversation. The form does not create an account or store the brief in a website database.',
    ],
    [
      'Service providers',
      'Cloudflare serves the website and API. Turnstile checks for form abuse. Resend delivers the brief to the studio inbox configured for production. If you open WhatsApp, subsequent processing follows WhatsApp’s policies.',
    ],
    [
      'Storage and logs',
      'Email is held by the delivery service and recipient inbox according to their settings. Application logs contain only submission IDs and status, without brief contents. Infrastructure logs may contain technical metadata such as IP addresses.',
    ],
    [
      'Your choices and requests',
      'Once production contact is active, use the displayed email to request correction or deletion of emails, subject to applicable retention obligations. This prototype uses no analytics or marketing cookies.',
    ],
  ],
  form: {
    name: 'Name',
    email: 'Email',
    firm: 'Firm / organisation',
    service: 'Service',
    message: 'Project summary',
    website: 'Current website (optional)',
    choose: 'Choose a service',
    send: 'Send your brief',
    sending: 'Sending…',
    success: 'The delivery service has accepted your brief. We will reply to your email.',
    error: 'Your brief could not be sent. Your entries are preserved; please try again.',
    unavailable:
      'Email delivery is not active in this prototype. You can explore the form; production contacts will appear after configuration.',
    consent: 'By sending, you allow us to use this information to respond to your project enquiry.',
    token: 'Complete the security verification before sending.',
    whatsapp: 'Continue on WhatsApp',
    emailLink: 'Send an email directly',
    required: 'Required',
    expired: 'Verification expired. Please verify again.',
  },
} as const;
