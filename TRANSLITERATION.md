# 🔤 Транслитерация URL

## Что сделано

Реализована автоматическая транслитерация URL статей блога из кириллицы в латиницу.

## Преимущества

✅ **SEO-оптимизация** - поисковые системы лучше индексируют латинские URL  
✅ **Читаемость** - URL понятны для всех пользователей  
✅ **Совместимость** - нет проблем с кодировкой в разных браузерах  
✅ **Профессионализм** - чистые, понятные адреса страниц

## Как работает

### Функция транслитерации

Создан файл `src/utils/transliterate.ts` с двумя функциями:

1. **`transliterate(text)`** - преобразует русские буквы в латинские
2. **`generateSlug(title)`** - создаёт URL-friendly slug из заголовка

### Примеры транслитерации

| Русский заголовок | Латинский URL |
|-------------------|---------------|
| Молитва о делателях | `molitva-o-delatelyah` |
| Смелость Божьих детей | `smelost-bozhih-detey` |
| Всеобъемлющий дар | `vseobemlyushchiy-dar` |
| Бесконечное отцовство | `beskonechnoe-otcovstvo` |
| Несомненный ответ | `nesomnennyy-otvet` |

### Карта соответствий

```javascript
а → a    б → b    в → v    г → g    д → d
е → e    ё → yo   ж → zh   з → z    и → i
й → y    к → k    л → l    м → m    н → n
о → o    п → p    р → r    с → s    т → t
у → u    ф → f    х → kh   ц → ts   ч → ch
ш → sh   щ → shch ъ → ""   ы → y    ь → ""
э → e    ю → yu   я → ya
```

## Обновлённые URL статей

Все статьи блога теперь имеют транслитерированные URL:

1. **Молитва о делателях**
   - Было: `/blog/molitva-o-delatelyah-sorabotnichestvo-voli`
   - Стало: `/blog/molitva-o-delatelyah-sorabotnichestvo-chelovecheskoy-voli-s-gospodinom-zhatvy`

2. **Смелость Божьих детей**
   - Было: `/blog/smelost-bozhih-detej-sostradanie-i-bodrstvovanie`
   - Стало: `/blog/smelost-bozhih-detey-sostradanie-hodataystvo-i-molitvennoe-bodrstvovanie`

3. **Всеобъемлющий дар**
   - Было: `/blog/vseobemlyushchij-dar-svyatoj-duh-v-glubine-duha`
   - Стало: `/blog/vseobemlyushchiy-dar-svyatoy-duh-v-glubine-duha`

4. **Бесконечное отцовство**
   - Было: `/blog/beskonechnoe-otcovstvo-duh-synovstva`
   - Стало: `/blog/beskonechnoe-otcovstvo-duh-synovstva-i-preobrazhenie-molitvy`

5. **Несомненный ответ**
   - Было: `/blog/nesomnennyj-otvet-zakon-carstva-i-intuitivnoe-ozarenie`
   - Стало: `/blog/nesomnennyy-otvet-na-molitvu-zakon-carstva-i-intuitivnoe-ozarenie`

6. **Образец молитвы**
   - Было: `/blog/obrazec-molitvy-volya-carstva-protiv-egoizma-dushi`
   - Стало: `/blog/obrazec-molitvy-volya-carstva-protiv-egoizma-dushi` (без изменений)

7. **Наедине с Богом**
   - Было: `/blog/naedine-s-bogom-kak-uslyshat-tihiy-golos-intuicii-duha-skvoz-shum-chuvstv-i-emoociy`
   - Стало: `/blog/naedine-s-bogom-kak-uslyshat-tihiy-golos-intuitcii-duha-skvoz-shum-chuvstv-i-emociy`

8. **Истинные поклонники**
   - Было: `/blog/istinnye-poklonniki-kak-razdelenie-duha-dushi-i-tela-menyaet-molitvennuyu-zhizn`
   - Стало: `/blog/istinnye-poklonniki-kak-razdelenie-duha-dushi-i-tela-menyaet-molitvennuyu-zhizn` (без изменений)

9. **5 признаков**
   - Было: `/blog/5-priznakov-togo-chto-vasha-molitvennaya-zhizn-nuzhdaetsya-v-obnovlenii`
   - Стало: `/blog/5-priznakov-togo-chto-vasha-molitvennaya-zhizn-nuzhdaetsya-v-obnovlenii` (без изменений)

10. **Что такое интуиция духа**
    - Было: `/blog/chto-takoe-intuiciya-duha-i-kak-eyo-razvivat`
    - Стало: `/blog/chto-takoe-intuitciya-duha-i-kak-eyo-razvivat`

11. **Молитва P-R-A-Y**
    - Было: `/blog/molitva-p-r-a-y-prostaya-struktura-dlya-ezhednevnogo-obshcheniya-s-bogom`
    - Стало: `/blog/molitva-p-r-a-y-prostaya-struktura-dlya-ezheednevnogo-obshcheniya-s-bogom`

12. **Почему важно вести молитвенный дневник**
    - Было: `/blog/pochemu-vazhno-vesti-molitvennyy-dnevnik`
    - Стало: `/blog/pochemu-vazhno-vesti-molitvennyy-dnevnik` (без изменений)

## Обновлённые файлы

### 1. `src/utils/transliterate.ts` (новый)
- Функция транслитерации
- Функция генерации slug

### 2. `src/pages/BlogPostPage.tsx`
- Импортирована функция `generateSlug` из utils
- Удалена локальная функция `generateSlug`

### 3. `src/pages/BlogPage.tsx`
- Обновлён импорт `generateSlug`

### 4. `public/sitemap.xml`
- Все URL статей обновлены на транслитерированные
- Убраны `#/` из всех URL (чистые URL)

## Как использовать

### Для новых статей

При создании новой статьи в `BlogPostPage.tsx`:

```typescript
{
  id: 13,
  title: "Новая статья о молитве",
  // ...
}
```

URL автоматически сгенерируется как:
```
/blog/novaya-statya-o-molitive
```

### Для внутренних ссылок

Используйте функцию `generateSlug` для создания ссылок:

```typescript
import { generateSlug } from '../utils/transliterate';

const articleUrl = `/blog/${generateSlug(articleTitle)}`;
```

## SEO преимущества

### До транслитерации
```
https://shkola-molitvy.ru/#/blog/смелость-божьих-детей
```
❌ Кириллица в URL  
❌ Символ `#` (hash routing)  
❌ Проблемы с кодировкой  
❌ Плохая индексация

### После транслитерации
```
https://shkola-molitvy.ru/blog/smelost-bozhih-detey
```
✅ Латиница в URL  
✅ Чистый URL без `#`  
✅ Нет проблем с кодировкой  
✅ Отличная индексация

## Проверка

После деплоя проверьте:

1. ✅ Все статьи открываются по новым URL
2. ✅ Ссылки между статьями работают
3. ✅ Sitemap.xml содержит правильные URL
4. ✅ Поисковые системы индексируют новые URL

## Примечания

- Старые URL с кириллицей больше не работают
- Рекомендуется настроить 301 редиректы со старых URL на новые (если они были проиндексированы)
- Все новые статьи автоматически получают транслитерированные URL
