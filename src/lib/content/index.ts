import { id } from './copy-id';
import { en } from './copy-en';
import { idServices } from './services-id';
import { enServices } from './services-en';
import type { Locale, Service } from './types';
export * from './types';
export * from './config';
export const copy = { id, en };
export const services: Record<Locale, Service[]> = { id: idServices, en: enServices };
