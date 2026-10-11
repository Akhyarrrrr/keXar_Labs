import { locales, serviceIds } from './content';
export const marketingPaths = [
  '',
  'services/',
  'showcase/',
  'studio/',
  'contact/',
  'privacy/',
  ...serviceIds.map((id) => `services/${id}/`),
];
export const localePaths = () =>
  locales.map((locale) => ({ params: { locale }, props: { locale } }));
