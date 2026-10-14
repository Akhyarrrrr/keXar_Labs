import { locales, serviceIds } from './content';
import type { ServiceId } from './content';
export const servicePath = (id: ServiceId) => (id === 'legal-web' ? 'websites' : id);
export const marketingPaths = [
  '',
  'services/',
  'showcase/',
  'studio/',
  'contact/',
  'privacy/',
  ...serviceIds.map((id) => `services/${servicePath(id)}/`),
];
export const localePaths = () =>
  locales.map((locale) => ({ params: { locale }, props: { locale } }));
