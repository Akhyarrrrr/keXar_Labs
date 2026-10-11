import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import { copy, services, type Locale } from '@/lib/content';
export function CTA({
  locale,
  service,
  secondary = false,
}: {
  locale: Locale;
  service?: string;
  secondary?: boolean;
}) {
  return (
    <a
      className={secondary ? 'text-link' : 'button'}
      href={`/${locale}/contact/${service ? `?service=${service}` : ''}`}
    >
      {copy[locale].talk}
      <ArrowUpRightIcon size={20} />
    </a>
  );
}
export function ContactBand({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="contact-band">
      <h2>{t.contactTitle}</h2>
      <div>
        <p>{t.contactNote}</p>
        <CTA locale={locale} />
      </div>
    </section>
  );
}
export function ServiceRows({ locale }: { locale: Locale }) {
  const images = [
    'corporate-hero',
    'library',
    'litigation-hero',
    'hero-light',
    'corporate-hero',
    'private-hero',
  ];
  return (
    <div className="services-display">
      <figure className="service-image">
        <img
          data-service-image
          src="/images/corporate-hero-800.webp"
          width="800"
          height="452"
          loading="lazy"
          alt={
            locale === 'id'
              ? 'Arsitektur imajiner untuk konsep firma hukum'
              : 'Imagined architecture for a law firm concept'
          }
        />
        <p>
          {locale === 'id'
            ? 'Arah visual mengikuti kebutuhan dan karakter firma.'
            : 'Visual direction follows the needs and character of your firm.'}
        </p>
      </figure>
      <div className="service-rows">
        {services[locale].map((s, i) => (
          <div key={s.id} className="service-row" data-service-preview={images[i]}>
            <h3>
              <a href={`/${locale}/services/${s.id}/`}>{s.title}</a>
            </h3>
            <p>{s.short}</p>
            <button
              className="service-preview-button"
              aria-label={`${locale === 'id' ? 'Pratinjau' : 'Preview'} ${s.title}`}
            >
              <ArrowUpRightIcon size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export function Process({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="section process-section">
      <div className="section-intro">
        <h2>{t.processTitle}</h2>
        <p>{t.processNote}</p>
        <img
          className="process-photo"
          data-process-photo
          src="/images/library-800.webp"
          width="800"
          height="452"
          loading="lazy"
          alt={
            locale === 'id'
              ? 'Ruang dan cahaya, studi visual orisinal keXar'
              : 'Space and light, an original keXar visual study'
          }
        />
      </div>
      <ol className="process-list">
        {t.steps.map(([title, desc], i) => (
          <li key={title}>
            <span className="step-number">0{i + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
