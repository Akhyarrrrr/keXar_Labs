export const en = {
  headline: 'Websites and systems built around your business.',
  heroNote:
    'We design and build websites, web applications, and practical automation around your goals, your users, and the way your team works.',
  privacy: 'Privacy',
  privacySections: [
    [
      'Browsing the website',
      'The marketing website uses one English interface and does not set a theme or language preference. Demonstration sites retain their own appearance and language controls. No analytics or marketing cookies are used in this version.',
    ],
    [
      'Information you provide',
      'The form asks for your name, email, company or organisation, service, project brief, and optional website URL. Please exclude passwords, private documents and sensitive personal data from an initial enquiry.',
    ],
    [
      'How we use it',
      'Information is used to reply and prepare a project conversation. The form does not create an account or store the brief in a website database.',
    ],
    [
      'Service providers',
      'After deployment and contact activation, Cloudflare serves the website and API, Turnstile checks for form abuse, and Resend delivers the brief to the configured studio inbox. If you open WhatsApp, subsequent processing follows WhatsApp’s policies.',
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
    firm: 'Company / Organisation',
    service: 'Service',
    message: 'Project brief',
    website: 'Current website (optional)',
    choose: 'Choose a service',
    send: 'Send your brief',
    sending: 'Sending…',
    success:
      'The delivery service has accepted your brief. Please keep your submission reference while you wait for a reply.',
    error: 'Your brief could not be sent. Your entries are preserved; please try again.',
    unavailable:
      'Brief delivery is not active yet. You can review the form, but sending will be available after the studio inbox is configured and tested.',
    consent: 'By sending, you allow us to use this information to respond to your project enquiry.',
    token: 'Complete the security verification before sending.',
    whatsapp: 'Continue on WhatsApp',
    emailLink: 'Send an email directly',
    expired: 'Verification expired. Please verify again.',
  },
} as const;
