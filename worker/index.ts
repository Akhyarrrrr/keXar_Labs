import { preferredLocale } from './locale';
const MAX_BYTES = 12000;
const SERVICES = ['legal-web', 'redesign', 'web-app', 'seo', 'server', 'ai'];
type Brief = {
  name: string;
  email: string;
  firm: string;
  service: string;
  message: string;
  website: string;
  locale: 'id' | 'en';
  token: string;
  submissionId: string;
};
function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
export function validateBrief(input: unknown): Brief | null {
  if (!input || typeof input !== 'object') return null;
  const d = input as Record<string, unknown>;
  for (const [key, min, max] of [
    ['name', 1, 100],
    ['email', 3, 254],
    ['firm', 1, 150],
    ['message', 20, 4000],
    ['token', 1, 2048],
    ['submissionId', 36, 36],
  ] as const) {
    if (
      typeof d[key] !== 'string' ||
      d[key].trim().length < min ||
      d[key].length > max ||
      /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(d[key])
    )
      return null;
  }
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email as string) ||
    /[\r\n]/.test(d.email as string) ||
    !SERVICES.includes(d.service as string) ||
    (d.locale !== 'id' && d.locale !== 'en') ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      d.submissionId as string,
    )
  )
    return null;
  if (d.website !== undefined && typeof d.website !== 'string') return null;
  const website = ((d.website as string) || '').trim();
  if (website.length > 500) return null;
  if (website) {
    try {
      const u = new URL(website);
      if (!['http:', 'https:'].includes(u.protocol) || u.username || u.password) return null;
    } catch {
      return null;
    }
  }
  return {
    name: (d.name as string).trim(),
    email: (d.email as string).trim(),
    firm: (d.firm as string).trim(),
    service: d.service as string,
    message: (d.message as string).trim(),
    website,
    locale: d.locale,
    token: d.token as string,
    submissionId: d.submissionId as string,
  };
}
async function boundedBody(request: Request): Promise<unknown> {
  if (Number(request.headers.get('Content-Length')) > MAX_BYTES) throw new Error('large');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('body');
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        throw new Error('large');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return JSON.parse(new TextDecoder('utf-8', { fatal: true, ignoreBOM: false }).decode(bytes));
}
export async function contact(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST')
    return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  if (
    !env.RESEND_API_KEY ||
    !env.TURNSTILE_SECRET_KEY ||
    !env.CONTACT_TO_EMAIL ||
    !env.MAIL_FROM ||
    !env.ALLOWED_ORIGIN
  )
    return json(503, { error: 'unconfigured' });
  if (request.headers.get('Origin') !== env.ALLOWED_ORIGIN) return json(403, { error: 'origin' });
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json'))
    return json(415, { error: 'content-type' });
  let input: unknown;
  try {
    input = await boundedBody(request);
  } catch (e) {
    return json(e instanceof Error && e.message === 'large' ? 413 : 400, {
      error: 'invalid-body',
    });
  }
  const brief = validateBrief(input);
  if (!brief) return json(400, { error: 'validation' });
  const record = (status: string) =>
    console.log(JSON.stringify({ id: brief.submissionId, status }));
  try {
    const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: brief.token,
      }),
      signal: AbortSignal.timeout(8000),
    });
    const result = (await verification.json()) as {
      success?: boolean;
      hostname?: string;
      action?: string;
    };
    if (
      !verification.ok ||
      !result.success ||
      result.hostname !== new URL(env.ALLOWED_ORIGIN).hostname ||
      result.action !== 'contact'
    ) {
      record('verification-rejected');
      return json(422, { error: 'verification' });
    }
    const email = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `contact/${brief.submissionId}`,
      },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: brief.email,
        subject: `keXar Labs: ${brief.service}`,
        text: `Name: ${brief.name}\nEmail: ${brief.email}\nFirm: ${brief.firm}\nService: ${brief.service}\nWebsite: ${brief.website || 'Not provided'}\nLanguage: ${brief.locale}\n\n${brief.message}`,
      }),
    });
    if (!email.ok) {
      record('provider-rejected');
      return json(email.status === 429 ? 429 : 502, { error: 'delivery' });
    }
    const accepted = (await email.json()) as { id?: string };
    if (!accepted.id) {
      record('provider-invalid');
      return json(502, { error: 'delivery' });
    }
    record('accepted');
    return json(202, { status: 'accepted', submissionId: brief.submissionId });
  } catch {
    record('upstream-error');
    return json(502, { error: 'upstream' });
  }
}
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') return contact(request, env);
    if (url.pathname.startsWith('/api/')) return json(404, { error: 'not-found' });
    if (url.pathname === '/') {
      const locale = preferredLocale(
        request.headers.get('Cookie'),
        request.headers.get('Accept-Language'),
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: new URL(`/${locale}/${url.search}`, url).toString(),
          'Cache-Control': 'private, no-store',
          Vary: 'Accept-Language, Cookie',
        },
      });
    }
    if (/^\/(id|en)\/demo\/boutique\/?$/.test(url.pathname)) {
      return Response.redirect(
        new URL(url.pathname.replace(/boutique\/?$/, 'litigation/') + url.search, url).toString(),
        302,
      );
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
