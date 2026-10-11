import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const raw = await readFile('.env.local', 'utf8').catch(() => '');
const local = Object.fromEntries(
  raw
    .split(/\r?\n/)
    .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [
        l.slice(0, i).trim(),
        l
          .slice(i + 1)
          .trim()
          .replace(/^['"]|['"]$/g, ''),
      ];
    }),
);
const required = [
  'PUBLIC_SITE_URL',
  'PUBLIC_CONTACT_EMAIL',
  'PUBLIC_WHATSAPP_NUMBER',
  'PUBLIC_TURNSTILE_SITE_KEY',
];
const values = { ...local, ...process.env };
const missing = required.filter((k) => !values[k]);
if (missing.length)
  throw new Error(
    `Production configuration is incomplete: ${missing.join(', ')}. See README.md.`,
  );
const url = new URL(values.PUBLIC_SITE_URL);
if (url.protocol !== 'https:' || url.pathname !== '/' || url.hostname === 'localhost')
  throw new Error('Set a production HTTPS origin without a path.');
if (!/^\d{8,15}$/.test(values.PUBLIC_WHATSAPP_NUMBER))
  throw new Error('WhatsApp must contain the international number, digits only.');
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.PUBLIC_CONTACT_EMAIL))
  throw new Error('Set a valid public contact email.');
const { config: workerConfig, error } = ts.parseConfigFileTextToJson(
  'wrangler.jsonc',
  await readFile('wrangler.jsonc', 'utf8'),
);
if (error) throw new Error(ts.flattenDiagnosticMessageText(error.messageText, '\n'));
if (
  !workerConfig.vars.CONTACT_TO_EMAIL ||
  !workerConfig.vars.MAIL_FROM ||
  workerConfig.vars.ALLOWED_ORIGIN !== url.origin
)
  throw new Error(
    'Set CONTACT_TO_EMAIL, MAIL_FROM, and matching ALLOWED_ORIGIN in wrangler.jsonc before deploying.',
  );
console.log(
  'Public configuration is ready. Verify Worker secrets and real inbox delivery before production release.',
);
