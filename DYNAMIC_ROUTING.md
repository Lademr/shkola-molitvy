# 🎯 Динамический роутинг для уроков

## Что было реализовано

Реализован полный динамический роутинг для страниц уроков с уникальными URL для каждого урока.

## Изменения в URL

### Было:
```
https://shkola-molitvy.ru/lessons
```
Все уроки на одной странице, контент меняется через состояние React.

### Стало:
```
https://shkola-molitvy.ru/lessons          - список всех уроков
https://shkola-molitvy.ru/lessons/1        - Урок 1: Единственный Учитель
https://shkola-molitvy.ru/lessons/2        - Урок 2: Истинные поклонники
https://shkola-molitvy.ru/lessons/3        - Урок 3: Наедине с Богом
https://shkola-molitvy.ru/lessons/4        - Урок 4: Образец молитвы
https://shkola-molitvy.ru/lessons/5        - Урок 5: Несомненный ответ
https://shkola-molitvy.ru/lessons/6        - Урок 6: Бесконечное отцовство
https://shkola-molitvy.ru/lessons/7        - Урок 7: Всеобъемлющий дар
https://shkola-molitvy.ru/lessons/8        - Урок 8: Смелость Божьих детей
https://shkola-molitvy.ru/lessons/9        - Урок 9: Молитва о делателях
```

## Технические изменения

### 1. Маршруты в App.tsx

Добавлен динамический маршрут:
```typescript
<Route path="/lessons" element={<LessonsPage />} />
<Route path="/lessons/:id" element={<LessonsPage />} />
```

### 2. Компонент LessonsPage.tsx

**Использование useParams:**
```typescript
const { id } = useParams<{ id: string }>();
const selectedLesson = id ? lessons.find(lesson => lesson.id === parseInt(id)) || null : null;
```

**Навигация через Link:**
```typescript
<Link to={`/lessons/${lesson.id}`}>
  {/* Карточка урока */}
</Link>
```

**Возврат к списку через navigate:**
```typescript
const navigate = useNavigate();
<Link to="/lessons">Назад к урокам</Link>
```

### 3. Обработка 404 для уроков

Если урок не найден:
```typescript
if (id && !selectedLesson) {
  return (
    <div>
      <h1>Урок не найден</h1>
      <Link to="/lessons">Вернуться к списку уроков</Link>
    </div>
  );
}
```

## Преимущества

### ✅ SEO оптимизация

- Каждый урок имеет уникальный URL
- Поисковики индексируют каждую страницу отдельно
- Можно оптимизировать meta-теги для каждого урока
- Улучшается ранжирование в поисковых системах

### ✅ Возможность делиться ссылками

Пользователи могут:
- Скопировать ссылку на конкретный урок
- Отправить её другу
- Поделиться в соцсетях
- Добавить в закладки

Пример:
```
https://shkola-molitvy.ru/lessons/3
```

### ✅ Обновление страницы (F5)

При обновлении страницы на любом уроке:
- Страница корректно загружается
- Отображается нужный урок
- Не теряется контекст

### ✅ Прямые ссылки

Можно перейти напрямую по ссылке:
```
https://shkola-molitvy.ru/lessons/5
```

И сразу попасть на Урок 5, минуя список уроков.

### ✅ История браузера

Работает кнопка "Назад" в браузере:
- Переход между уроками сохраняется в истории
- Можно вернуться к предыдущему уроку
- Корректная работа с историей навигации

## Проверка работоспособности

### 1. Тестирование навигации

```bash
# Откройте сайт
https://shkola-molitvy.ru/lessons

# Кликните на любой урок
# URL должен измениться на /lessons/1, /lessons/2 и т.д.

# Нажмите "Назад к урокам"
# URL должен вернуться на /lessons
```

### 2. Тестирование обновления страницы

```bash
# Перейдите на конкретный урок
https://shkola-molitvy.ru/lessons/3

# Нажмите F5 (обновить страницу)
# Страница должна загрузиться корректно
# Должен отображаться Урок 3
```

### 3. Тестирование прямых ссылок

```bash
# Откройте новую вкладку или режим инкогнито
# Вставьте прямую ссылку
https://shkola-molitvy.ru/lessons/7

# Должен открыться Урок 7
```

### 4. Тестирование 404

```bash
# Попробуйте несуществующий урок
https://shkola-molitvy.ru/lessons/999

# Должна появиться страница "Урок не найден"
# С кнопкой "Вернуться к списку уроков"
```

### 5. Тестирование истории браузера

```bash
# Перейдите на /lessons/1
# Затем на /lessons/2
# Затем на /lessons/3

# Нажмите кнопку "Назад" в браузере
# Должны вернуться на /lessons/2
# Ещё раз "Назад" - на /lessons/1
```

## Интеграция с другими компонентами

### HomePage.tsx

Кнопка "Начать урок" ведёт на список уроков:
```typescript
<Link to="/lessons">Начать урок</Link>
```

### PrayerLifePage.tsx

Ссылки на уроки ведут на конкретные уроки:
```typescript
<Link to="/lessons/1">Урок 1</Link>
<Link to="/lessons/2">Урок 2</Link>
```

### ProfilePage.tsx

Прогресс пользователя связан с URL уроков:
```typescript
<Link to={`/lessons/${lessonId}`}>
  Урок {lessonId}
</Link>
```

## SEO улучшения

### Meta-теги для уроков

Теперь можно добавить уникальные meta-теги для каждого урока:

```typescript
useEffect(() => {
  if (selectedLesson) {
    document.title = `${selectedLesson.title} | Школа Молитвы`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', selectedLesson.description);
    }
  }
}, [selectedLesson]);
```

### Structured Data

Можно добавить Schema.org разметку для каждого урока:

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Урок 1: Единственный Учитель",
  "description": "Переход от автономии разума к водительству Духом",
  "provider": {
    "@type": "Organization",
    "name": "Школа Молитвы"
  }
}
```

## Совместимость с 404.html

Файл `public/404.html` обеспечивает корректную работу динамических маршрутов на GitHub Pages:

1. Пользователь переходит на `/lessons/3`
2. GitHub Pages не находит файл `lessons/3/index.html`
3. Показывает `404.html`
4. `404.html` перенаправляет на `index.html` с сохранением пути
5. React Router обрабатывает путь `/lessons/3`
6. Отображается Урок 3

## Будущие улучшения

### 1. Slug вместо ID

Можно использовать slug вместо числового ID:
```
/lessons/edinstvennyj-uchitel
/lessons/istinnye-poklonniki
```

### 2. Хлебные крошки (Breadcrumbs)

Добавить навигационную цепочку:
```
Главная → Уроки → Урок 3: Наедине с Богом
```

### 3. Навигация между уроками

Добавить кнопки "Предыдущий урок" и "Следующий урок":
```typescript
<Link to={`/lessons/${selectedLesson.id - 1}`}>
  ← Предыдущий урок
</Link>
<Link to={`/lessons/${selectedLesson.id + 1}`}>
  Следующий урок →
</Link>
```

### 4. Прогресс-бар

Показывать прогресс прохождения курса:
```
Урок 3 из 9 [████████░░░░░░░░░░░░] 33%
```

## Итоги

✅ Реализован полный динамический роутинг для уроков  
✅ Каждый урок имеет уникальный URL  
✅ Работает обновление страницы (F5)  
✅ Работают прямые ссылки  
✅ Корректная обработка 404  
✅ Улучшено SEO  
✅ Улучшен UX  

Проект готов к деплою! 🚀
