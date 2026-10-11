import type { Locale } from '@/lib/content';
import { demos, type ConceptId } from '@/lib/demos';
export function DemoPreview({
  kind,
  locale,
  baseline = false,
  priority = false,
}: {
  kind: ConceptId;
  locale: Locale;
  baseline?: boolean;
  priority?: boolean;
}) {
  const id = locale === 'id';
  if (baseline)
    return (
      <div className="baseline-preview">
        <strong>Aruna Counsel</strong>
        <div>Home &nbsp; Services &nbsp; About &nbsp; Contact</div>
        <h3>{id ? 'Solusi hukum untuk bisnis Anda' : 'Legal solutions for your business'}</h3>
        <p>
          {id
            ? 'Korporasi • Transaksi • Penyelesaian sengketa'
            : 'Corporate • Transactions • Dispute resolution'}
        </p>
        <span>{id ? 'Hubungi kami' : 'Contact us'}</span>
        <img src="/images/corporate-hero-800.webp" alt="" width={800} height={452} />
      </div>
    );
  return (
    <picture className={`demo-preview screenshot ${kind}`}>
      <source
        srcSet={`/images/concept-${kind}-${locale}-700.webp 700w, /images/concept-${kind}-${locale}-1400.webp 1400w`}
        sizes="(max-width:767px) 90vw, 55vw"
      />
      <img
        src={`/images/concept-${kind}-${locale}-1400.webp`}
        width={1351}
        height={760}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        alt={
          id
            ? `Screenshot website konsep fiktif ${demos[kind][locale].name}`
            : `Screenshot of the fictional ${demos[kind][locale].name} website concept`
        }
      />
    </picture>
  );
}
