# 📚 URL для уроков с транслитерацией

## Что изменилось

URL для уроков теперь включают транслитерированный slug для улучшения SEO и читаемости.

## Формат URL

### Было:
```
https://shkola-molitvy.ru/lessons/4
```

### Стало:
```
https://shkola-molitvy.ru/lessons/4/obrazec-molitvy
```

## Список всех URL уроков

| ID | Название | URL |
|----|----------|-----|
| 1 | Единственный Учитель | `/lessons/1/edinstvennyj-uchitel` |
| 2 | Истинные поклонники | `/lessons/2/istinnye-poklonniki` |
| 3 | Наедине с Богом | `/lessons/3/naedine-s-bogom` |
| 4 | Образец молитвы | `/lessons/4/obrazec-molitvy` |
| 5 | Несомненный ответ | `/lessons/5/nesomnennyj-otvet` |
| 6 | Бесконечное отцовство | `/lessons/6/beskonechnoe-otcovstvo` |
| 7 | Всеобъемлющий дар | `/lessons/7/vseobemlyushchij-dar` |
| 8 | Смелость Божьих детей | `/lessons/8/smelost-bozhih-detey` |
| 9 | Молитва о делателях | `/lessons/9/molitva-o-delatelyah` |

## Преимущества

✅ **Лучшее SEO** - поисковые системы лучше индексируют URL с ключевыми словами  
✅ **Читаемость** - пользователи понимают содержание страницы по URL  
✅ **Делимость** - ссылки легче копировать и делиться  
✅ **Профессионализм** - выглядит как серьёзный образовательный ресурс  

## Технические детали

### Файлы изменены:

1. **`src/utils/lessonSlugs.ts`** (создан)
   - Маппинг ID уроков на slug
   - Функции для генерации URL
   - Функции для получения ID по slug

2. **`src/App.tsx`**
   - Обновлён маршрут: `/lessons/:id/:slug?`
   - Slug опционален для обратной совместимости

3. **`src/pages/LessonsPage.tsx`**
   - Использует `getLessonUrl()` для генерации ссылок
   - Обновлён canonical URL

4. **`public/sitemap.xml`**
   - Добавлены все URL уроков с slug

### Обратная совместимость

Старые URL без slug продолжают работать:
```
✅ https://shkola-molitvy.ru/lessons/4 - работает
✅ https://shkola-molitvy.ru/lessons/4/obrazec-molitvy - работает
```

### Как добавить новый урок

1. Добавьте урок в `src/data/lessons.ts`
2. Добавьте slug в `src/utils/lessonSlugs.ts`:
   ```typescript
   export const lessonSlugs: Record<number, string> = {
     // ...
     10: 'novyj-urok'
   };
   ```
3. Добавьте URL в `public/sitemap.xml`

## Тестирование

### Проверка URL:

1. Откройте список уроков: `https://shkola-molitvy.ru/lessons`
2. Кликните на любой урок
3. URL должен быть вида: `/lessons/[id]/[slug]`
4. Обновите страницу (F5) - должна загрузиться та же страница
5. Скопируйте URL и откройте в новой вкладке - должна загрузиться та же страница

### Примеры для тестирования:

```
✅ https://shkola-molitvy.ru/lessons/1/edinstvennyj-uchitel
✅ https://shkola-molitvy.ru/lessons/5/nesomnennyj-otvet
✅ https://shkola-molitvy.ru/lessons/9/molitva-o-delatelyah
```

## SEO оптимизация

### Meta-теги для уроков:

Каждый урок имеет уникальные meta-теги:

```html
<!-- Пример для Урока 4 -->
<title>Урок 4: Образец молитвы — Школа Молитвы</title>
<meta name="description" content="Воля Царства против эгоизма души. Разбор Молитвы Господней и Гефсиманского образца покорности." />
<link rel="canonical" href="https://shkola-molitvy.ru/lessons/4/obrazec-molitvy" />
```

### Sitemap.xml:

Все URL уроков добавлены в sitemap.xml с приоритетом 0.8:

```xml
<url>
  <loc>https://shkola-molitvy.ru/lessons/4/obrazec-molitvy</loc>
  <lastmod>2026-02-26</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

## Структура проекта

```
src/
├── utils/
│   ├── transliterate.ts      # Общая транслитерация
│   └── lessonSlugs.ts        # Slug для уроков
├── pages/
│   └── LessonsPage.tsx       # Страница уроков
└── data/
    └── lessons.ts            # Данные уроков

public/
└── sitemap.xml               # Карта сайта с новыми URL
```

## Поддержка старых URL

Если у вас есть старые ссылки без slug, они продолжат работать благодаря опциональному параметру `:slug?` в маршруте.

Однако рекомендуется обновить все ссылки на новый формат для лучшего SEO.

---

**Дата обновления:** 2026-02-26  
**Статус:** ✅ Реализовано и протестировано
