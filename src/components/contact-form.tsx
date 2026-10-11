import { useEffect, useRef, useState } from 'react';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { copy, services, publicConfig, whatsappUrl, type Locale } from '@/lib/content';
import { useStudioTheme } from './use-theme';
type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}
export function ContactForm({ locale }: { locale: Locale }) {
  const theme = useStudioTheme();
  const t = copy[locale].form,
    [service, setService] = useState(''),
    [token, setToken] = useState(''),
    [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle'),
    [error, setError] = useState('');
  const slot = useRef<HTMLDivElement>(null),
    widget = useRef<string>(''),
    submission = useRef('');
  const ready = !!publicConfig.turnstile;
  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get('service');
    if (services[locale].some((s) => s.id === selected)) setService(selected!);
  }, [locale]);
  useEffect(() => {
    if (!ready || !slot.current) return;
    setToken('');
    let disposed = false;
    const render = () => {
      if (disposed || !window.turnstile || !slot.current || widget.current) return;
      widget.current = window.turnstile.render(slot.current, {
        sitekey: publicConfig.turnstile,
        action: 'contact',
        language: locale,
        theme,
        callback: (value: string) => {
          setToken(value);
          setError('');
        },
        'expired-callback': () => {
          setToken('');
          setError(t.expired);
        },
        'error-callback': () => {
          setToken('');
          setError(t.token);
        },
      });
    };
    let script = document.querySelector<HTMLScriptElement>('script[data-turnstile]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.dataset.turnstile = 'true';
      document.head.append(script);
    }
    script.addEventListener('load', render);
    render();
    return () => {
      disposed = true;
      script?.removeEventListener('load', render);
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = '';
    };
  }, [locale, ready, t.expired, t.token, theme]);
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'loading' || !ready) return;
    if (!token) {
      setError(t.token);
      setStatus('error');
      return;
    }
    const form = event.currentTarget,
      fields = new FormData(form);
    submission.current ||= crypto.randomUUID();
    setStatus('loading');
    setError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          name: fields.get('name'),
          email: fields.get('email'),
          firm: fields.get('firm'),
          service: fields.get('service'),
          message: fields.get('message'),
          website: fields.get('website'),
          locale,
          token,
          submissionId: submission.current,
        }),
      });
      if (!response.ok) throw new Error('delivery');
      const result = await response.json();
      if (result.status !== 'accepted') throw new Error('response');
      setStatus('success');
      form.reset();
      setService('');
      submission.current = '';
    } catch {
      setStatus('error');
      setError(t.error);
    } finally {
      setToken('');
      if (widget.current) window.turnstile?.reset(widget.current);
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onChange={() => {
        submission.current = '';
        if (status === 'success') setStatus('idle');
      }}
    >
      {!ready && <p className="form-notice">{t.unavailable}</p>}
      <label htmlFor="name">
        {t.name}
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          disabled={status === 'loading'}
        />
      </label>
      <label htmlFor="email">
        {t.email}
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          disabled={status === 'loading'}
        />
      </label>
      <label htmlFor="firm">
        {t.firm}
        <input
          id="firm"
          name="firm"
          autoComplete="organization"
          required
          maxLength={150}
          disabled={status === 'loading'}
        />
      </label>
      <label htmlFor="service">
        {t.service}
        <select
          id="service"
          name="service"
          required
          value={service}
          onChange={(e) => setService(e.target.value)}
          disabled={status === 'loading'}
        >
          <option value="">{t.choose}</option>
          {services[locale].map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="message" className="full">
        {t.message}
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={4000}
          rows={5}
          aria-describedby="message-help"
          disabled={status === 'loading'}
        />
      </label>
      <small id="message-help" className="full form-help">
        {locale === 'id'
          ? '20–4.000 karakter. Hindari informasi perkara atau data klien sensitif.'
          : '20–4,000 characters. Exclude case details and sensitive client data.'}
      </small>
      <label htmlFor="website" className="full">
        {t.website}
        <input
          id="website"
          name="website"
          type="url"
          placeholder="https://"
          maxLength={500}
          disabled={status === 'loading'}
        />
      </label>
      {ready && <div ref={slot} className="turnstile-slot" />}
      <div className="form-bottom">
        <p>
          {t.consent} <a href={`/${locale}/privacy/`}>{copy[locale].privacy}</a>
        </p>
        <button type="submit" className="button" disabled={!ready || status === 'loading'}>
          {status === 'loading' ? t.sending : t.send}
          <ArrowUpRightIcon size={20} />
        </button>
      </div>
      <div aria-live="polite" className="full">
        {status === 'success' && <p className="form-notice">{t.success}</p>}
        {error && (
          <p className="form-notice error" role="alert">
            {error}
            {publicConfig.whatsapp && (
              <>
                <br />
                <a
                  className="text-link"
                  href={whatsappUrl(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.whatsapp}
                  <ArrowUpRightIcon size={20} aria-hidden="true" />
                </a>
              </>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
