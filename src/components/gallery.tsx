import { useEffect, useId, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, MotionConfig, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRightIcon, ArrowsHorizontalIcon, XIcon } from '@phosphor-icons/react';
import { copy, type Locale } from '@/lib/content';
import { DemoPreview } from './demo-preview';
import { conceptIds, demos, type ConceptId } from '@/lib/demos';

// Aceternity Container Scroll's scroll-driven perspective, with native mobile/reduced-motion presentation.
function ScrollPerspective({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [9, 0]);
  return (
    <div ref={ref} className="scroll-stage">
      <motion.div className="scroll-card" style={{ rotateX: rotate }}>
        {children}
      </motion.div>
    </div>
  );
}
export function ContainerScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion(),
    [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width:768px) and (pointer:fine)');
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return desktop && !reduced ? (
    <ScrollPerspective>{children}</ScrollPerspective>
  ) : (
    <div className="scroll-stage">
      <div className="scroll-card">{children}</div>
    </div>
  );
}

// Motion Primitives' shared layout transition, paired with Radix for focus trapping and restoration.
export function ShowcaseCard({
  kind,
  locale,
  featured = false,
  priority = false,
}: {
  kind: ConceptId;
  locale: Locale;
  featured?: boolean;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false),
    [armed, setArmed] = useState(false),
    uid = useId(),
    reduced = useReducedMotion(),
    t = copy[locale];
  const concept = demos[kind][locale];
  const title = concept.name;
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <motion.button
          layoutId={reduced || !armed ? undefined : `card-${uid}`}
          onPointerEnter={() => setArmed(true)}
          onPointerMove={(event) => {
            if (reduced || !window.matchMedia('(pointer: fine)').matches) return;
            const box = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty(
              '--tilt-x',
              `${((event.clientY - box.top) / box.height - 0.5) * -4}deg`,
            );
            event.currentTarget.style.setProperty(
              '--tilt-y',
              `${((event.clientX - box.left) / box.width - 0.5) * 4}deg`,
            );
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty('--tilt-x', '0deg');
            event.currentTarget.style.setProperty('--tilt-y', '0deg');
          }}
          onFocus={() => setArmed(true)}
          className={`showcase-card ${featured ? 'featured' : ''}`}
        >
          <DemoPreview kind={kind} locale={locale} priority={priority} />
          <span className="showcase-caption">
            <span>
              <strong>{title}</strong>
              <span>{concept.descriptor}</span>
            </span>
            <span className="preview-action">
              {t.preview}
              <ArrowUpRightIcon size={22} />
            </span>
          </span>
        </motion.button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content asChild>
          <motion.div
            layoutId={reduced ? undefined : `card-${uid}`}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="showcase-dialog"
            data-lenis-prevent
          >
            <Dialog.Close className="dialog-close" aria-label={t.close}>
              <XIcon size={24} />
            </Dialog.Close>
            <Dialog.Title className="dialog-title">{title}</Dialog.Title>
            <Dialog.Description>{concept.heroNote}</Dialog.Description>
            <DemoPreview kind={kind} locale={locale} priority />
            <p className="fiction-note">{t.fiction}</p>
            <a href={`/${locale}/demo/${kind}/`} className="button">
              {t.openDemo}
              <ArrowUpRightIcon size={20} />
            </a>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export function Gallery({ locale, home = false }: { locale: Locale; home?: boolean }) {
  const t = copy[locale];
  return (
    <MotionConfig reducedMotion="user">
      <section className={`section gallery-section ${home ? 'home-gallery' : ''}`} id="showcase">
        <div className="section-intro">
          {home ? <h2>{t.galleryTitle}</h2> : <h1>{t.galleryTitle}</h1>}
          <p>{t.galleryNote}</p>
        </div>
        <div className="gallery-grid">
          {conceptIds.map((kind) => (
            <ContainerScroll key={kind}>
              <ShowcaseCard kind={kind} locale={locale} />
            </ContainerScroll>
          ))}
        </div>
        <p className="fiction-note">{t.fiction}</p>
      </section>
    </MotionConfig>
  );
}
// Aceternity Compare's clip-path composition; a native range supplies keyboard and touch control.
export function Compare({ locale }: { locale: Locale }) {
  const [value, setValue] = useState(42),
    t = copy[locale];
  return (
    <section className="section compare-section">
      <div className="section-intro">
        <h2>{t.compareTitle}</h2>
        <p>{t.compareNote}</p>
      </div>
      <div className="compare-frame">
        <div className="compare-layer">
          <DemoPreview kind="corporate" locale={locale} />
        </div>
        <div className="compare-layer" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
          <DemoPreview kind="corporate" locale={locale} baseline />
        </div>
        <div className="compare-divider" style={{ left: `${value}%` }}>
          <span>
            <ArrowsHorizontalIcon size={23} />
          </span>
        </div>
        <span className="compare-label before">{t.baseline}</span>
        <span className="compare-label after">{t.refined}</span>
        <input
          aria-label={t.slider}
          aria-valuetext={`${value}%`}
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>
      <p className="fiction-note">{t.fiction}</p>
    </section>
  );
}
