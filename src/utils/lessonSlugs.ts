// Утилиты для генерации slug уроков
import { generateSlug } from './transliterate';

// Маппинг ID уроков на их slug
export const lessonSlugs: Record<number, string> = {
  1: 'edinstvennyj-uchitel',
  2: 'istinnye-poklonniki',
  3: 'naedine-s-bogom',
  4: 'obrazec-molitvy',
  5: 'nesomnennyj-otvet',
  6: 'beskonechnoe-otcovstvo',
  7: 'vseobemlyushchij-dar',
  8: 'smelost-bozhih-detey',
  9: 'molitva-o-delatelyah'
};

// Функция для получения slug урока по ID
export function getLessonSlug(lessonId: number): string {
  return lessonSlugs[lessonId] || `urok-${lessonId}`;
}

// Функция для получения ID урока по slug
export function getLessonIdBySlug(slug: string): number | null {
  const entry = Object.entries(lessonSlugs).find(([_, value]) => value === slug);
  return entry ? parseInt(entry[0]) : null;
}

// Функция для генерации полного URL урока
export function getLessonUrl(lessonId: number): string {
  return `/lessons/${lessonId}/${getLessonSlug(lessonId)}`;
}
