import { useState } from 'react';
import type { Locale } from '@/lib/content';
export function DemoContact({ locale }: { locale: Locale }) {
  const id = locale === 'id',
    [response, setResponse] = useState('');
  return (
    <form
      className="demo-contact"
      onChange={() => setResponse('')}
      onSubmit={(event) => {
        event.preventDefault();
        const fields = new FormData(event.currentTarget);
        if (
          String(fields.get('name')).trim().length < 2 ||
          String(fields.get('message')).trim().length < 20
        ) {
          setResponse(
            id
              ? 'Isi nama minimal 2 karakter dan pesan minimal 20 karakter.'
              : 'Enter a name of at least 2 characters and a message of at least 20 characters.',
          );
          return;
        }
        setResponse(
          id
            ? 'Demonstrasi selesai. Tidak ada pesan yang dikirim atau disimpan. Anda dapat kembali ke keXar untuk membahas website serupa.'
            : 'Demonstration complete. No message has been sent or stored. Return to keXar to discuss a website like this.',
        );
      }}
    >
      <label>
        {id ? 'Nama' : 'Name'}
        <input name="name" autoComplete="name" required minLength={2} maxLength={100} />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required maxLength={254} />
      </label>
      <label className="full">
        {id ? 'Bidang yang ingin dibahas' : 'Area you would like to discuss'}
        <select name="area" defaultValue="" required>
          <option value="">{id ? 'Pilih bidang' : 'Select an area'}</option>
          <option value="general">{id ? 'Percakapan awal' : 'Initial conversation'}</option>
          <option value="documents">{id ? 'Tinjauan dokumen' : 'Document review'}</option>
          <option value="other">{id ? 'Urusan lainnya' : 'Another matter'}</option>
        </select>
      </label>
      <label className="full">
        {id ? 'Pesan contoh' : 'Example message'}
        <textarea
          name="message"
          rows={5}
          required
          minLength={20}
          maxLength={2000}
          aria-describedby="demo-message-help"
        />
      </label>
      <p className="full" id="demo-message-help">
        {id
          ? 'Gunakan contoh fiktif. Minimal 20 karakter. Tidak dikirim atau disimpan.'
          : 'Use fictional information. At least 20 characters. Nothing is sent or stored.'}
      </p>
      <button type="submit" className="demo-button">
        {id ? 'Coba form demonstrasi' : 'Try the demonstration form'}{' '}
        <span aria-hidden="true">↗</span>
      </button>
      <p className="full demo-form-response" role="status">
        {response}
      </p>
    </form>
  );
}
