import * as Accordion from '@radix-ui/react-accordion';
import { PlusIcon } from '@phosphor-icons/react';
import { copy, type Locale } from '@/lib/content';
// Adapted from shadcn/ui's accordion, surfaced on 21st.dev; Radix owns keyboard semantics.
export function FAQ({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="section faq-section">
      <div className="faq-intro">
        <h2>{t.faqTitle}</h2>
        <img src="/images/library-800.webp" alt="" width="800" height="452" loading="lazy" />
        <p>
          {locale === 'id'
            ? 'Percakapan yang jelas adalah awal pekerjaan yang baik.'
            : 'A clear conversation is the beginning of good work.'}
        </p>
      </div>
      <Accordion.Root type="single" collapsible className="faq-list">
        {t.faqs.map(([q, a], i) => (
          <Accordion.Item value={`q-${i}`} key={q} className="faq-item">
            <Accordion.Header>
              <Accordion.Trigger className="faq-trigger">
                <span className="faq-number">0{i + 1}</span>
                <span>{q}</span>
                <PlusIcon size={21} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="faq-content">
              <p>{a}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
