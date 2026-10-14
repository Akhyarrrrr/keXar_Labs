import { useEffect, useId, useState } from 'react';
import type { Locale } from '@/lib/content';

type FieldName = 'name' | 'email' | 'area' | 'message';
type FieldErrors = Partial<Record<FieldName, string>>;

export function DemoContact({ locale }: { locale: Locale }) {
  const id = locale === 'id';
  const prefix = useId();
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [complete, setComplete] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  useEffect(() => setReady(true), []);

  const validate = (form: HTMLFormElement): FieldErrors => {
    const fields = new FormData(form);
    const next: FieldErrors = {};
    const name = String(fields.get('name') || '').trim();
    const email = String(fields.get('email') || '').trim();
    const area = String(fields.get('area') || '');
    const message = String(fields.get('message') || '').trim();
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    if (name.length < 2) {
      next.name = id ? 'Masukkan nama contoh minimal 2 karakter.' : 'Enter an example name of at least 2 characters.';
    }
    if (!email || emailInput.validity.typeMismatch) {
      next.email = id ? 'Masukkan alamat email yang valid, misalnya nama@example.com.' : 'Enter a valid email address, such as name@example.com.';
    }
    if (!['general', 'documents', 'other'].includes(area)) {
      next.area = id ? 'Pilih satu bidang untuk contoh percakapan ini.' : 'Choose an area for this example conversation.';
    }
    if (message.length < 20) {
      next.message = id ? 'Tulis pesan contoh minimal 20 karakter, tidak termasuk spasi di awal atau akhir.' : 'Write an example message of at least 20 characters, excluding spaces at the beginning or end.';
    }
    return next;
  };
  const describedBy = (field: FieldName, help?: string) =>
    [help && `${prefix}-${help}`, errors[field] && `${prefix}-${field}-error`].filter(Boolean).join(' ') || undefined;
  const error = (field: FieldName) => errors[field] && (
    <span className="demo-field-error" id={`${prefix}-${field}-error`}>{errors[field]}</span>
  );

  return (
    <form
      className="demo-contact"
      noValidate
      aria-describedby={`${prefix}-notice`}
      onChange={(event) => {
        setComplete(false);
        const field: EventTarget = event.target;
        if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) return;
        if (field.name === 'message') setMessageLength(field.value.length);
        if (attempted) {
          const current = validate(event.currentTarget);
          const key = field.name as FieldName;
          setErrors((previous) => ({ ...previous, [key]: current[key] }));
        }
      }}
      onSubmit={(event) => {
        event.preventDefault();
        const next = validate(event.currentTarget);
        setAttempted(true);
        setErrors(next);
        setComplete(false);
        const firstInvalid = (['name', 'email', 'area', 'message'] as const).find((field) => next[field]);
        if (firstInvalid) {
          const field = event.currentTarget.elements.namedItem(firstInvalid) as HTMLElement;
          requestAnimationFrame(() => field.focus());
          return;
        }
        setComplete(true);
      }}
    >
      <div className="full demo-form-notice" id={`${prefix}-notice`}>
        <strong>{id ? 'Form demonstrasi — tidak dikirim' : 'Demonstration form — no sending'}</strong>
        <p>{id
          ? 'Semua kolom wajib diisi. Gunakan informasi fiktif; jangan masukkan informasi rahasia. Isian hanya diperiksa di browser, tidak dikirim atau disimpan oleh website ini.'
          : 'All fields are required. Use fictional information; do not include confidential details. Entries are checked only in your browser, never sent or saved by this website.'}</p>
      </div>
      <p className="full demo-form-error-summary" role="alert" aria-atomic="true">
        {Object.values(errors).some(Boolean) && (id
          ? 'Periksa kolom yang ditandai di bawah. Tidak ada pesan yang dikirim.'
          : 'Check the highlighted fields below. No message has been sent.')}
      </p>
      <label htmlFor={`${prefix}-name`}>
        <span>{id ? 'Nama contoh' : 'Example name'}</span>
        <input id={`${prefix}-name`} name="name" autoComplete="off" required minLength={2} maxLength={100}
          disabled={!ready} aria-invalid={errors.name ? true : undefined} aria-describedby={describedBy('name')} />
        {error('name')}
      </label>
      <label htmlFor={`${prefix}-email`}>
        <span>Email</span>
        <input id={`${prefix}-email`} name="email" type="email" autoComplete="off" required maxLength={254}
          disabled={!ready} aria-invalid={errors.email ? true : undefined} aria-describedby={describedBy('email')} />
        {error('email')}
      </label>
      <label className="full" htmlFor={`${prefix}-area`}>
        <span>{id ? 'Bidang yang ingin dibahas' : 'Area you would like to discuss'}</span>
        <select id={`${prefix}-area`} name="area" defaultValue="" required disabled={!ready}
          aria-invalid={errors.area ? true : undefined} aria-describedby={describedBy('area')}>
          <option value="">{id ? 'Pilih bidang' : 'Select an area'}</option>
          <option value="general">{id ? 'Percakapan awal' : 'Initial conversation'}</option>
          <option value="documents">{id ? 'Tinjauan dokumen' : 'Document review'}</option>
          <option value="other">{id ? 'Urusan lainnya' : 'Another matter'}</option>
        </select>
        {error('area')}
      </label>
      <label className="full" htmlFor={`${prefix}-message`}>
        <span>{id ? 'Pesan contoh' : 'Example message'}</span>
        <textarea id={`${prefix}-message`} name="message" rows={6} required minLength={20} maxLength={2000}
          disabled={!ready} aria-invalid={errors.message ? true : undefined} aria-describedby={describedBy('message', 'message-help')} />
        <span className="demo-field-help" id={`${prefix}-message-help`}>
          {id ? 'Minimal 20 karakter. Maksimal 2.000 karakter.' : 'At least 20 characters. Maximum 2,000 characters.'}
          <span className="demo-character-count" aria-hidden="true">{messageLength.toLocaleString(locale)} / 2,000</span>
        </span>
        {error('message')}
      </label>
      <button type="submit" className="demo-button" disabled={!ready}>
        {id ? 'Coba form demonstrasi' : 'Try the demonstration form'} <span aria-hidden="true">↗</span>
      </button>
      <noscript className="full demo-form-no-script">
        {id ? 'Aktifkan JavaScript untuk mencoba validasi lokal. Form ini dinonaktifkan agar tidak mengirim isian.' : 'Enable JavaScript to try local validation. This form is disabled so your entries cannot be submitted.'}
      </noscript>
      <p className={`full demo-form-response${complete ? ' is-complete' : ''}`} role="status" aria-atomic="true">
        {complete && (id
          ? 'Demonstrasi selesai. Isian contoh valid; tidak ada pesan yang dikirim atau disimpan. Gunakan tautan ke keXar untuk membahas website serupa.'
          : 'Demonstration complete. Your example entries are valid; no message has been sent or saved. Use the keXar link to discuss a website like this.')}
      </p>
    </form>
  );
}
