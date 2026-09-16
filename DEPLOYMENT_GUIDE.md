# 🚀 Полная инструкция по развертыванию сайта на Beget

## 📋 Часть 1: Деплой статического сайта

### Шаг 1: Подготовка проекта

1. **Соберите проект:**
```bash
npm run build
```

После выполнения команды в корне проекта появится папка `dist/` со всеми файлами сайта.

2. **Проверьте структуру папки `dist/`:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ... (другие файлы)
├── robots.txt
├── sitemap.xml
├── manifest.json
└── og-image.svg
```

### Шаг 2: Загрузка файлов на Beget

1. **Войдите в панель управления Beget:**
   - URL: https://cp.beget.com/
   - Введите логин и пароль

2. **Перейдите в файловый менеджер:**
   - Раздел "Файловый менеджер" в левом меню
   - Откройте корневую папку вашего сайта (обычно `public_html/` или `shkola-molitvy.ru/`)

3. **Загрузите файлы:**
   - Нажмите кнопку "Загрузить" или перетащите файлы
   - Загрузите **всё содержимое** папки `dist/` в корень сайта
   - Дождитесь завершения загрузки

4. **Проверьте структуру на сервере:**
```
public_html/ (или shkola-molitvy.ru/)
├── index.html
├── assets/
├── robots.txt
├── sitemap.xml
├── manifest.json
└── og-image.svg
```

### Шаг 3: Создание файла .htaccess

1. **Создайте файл `.htaccess`** в корне сайта через файловый менеджер Beget

2. **Добавьте следующее содержимое:**

```apache
# Перенаправление на HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Удаление www (опционально)
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [L,R=301]

# Кэширование статических файлов
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 0 seconds"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Gzip сжатие
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
    AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# Защита от хотлинкинга изображений
RewriteCond %{HTTP_REFERER} !^$
RewriteCond %{HTTP_REFERER} !^https?://(www\.)?shkola-molitvy\.ru [NC]
RewriteRule \.(jpg|jpeg|png|gif|svg)$ - [F,NC]

# Защита системных файлов
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>

# Запрет доступа к папке assets напрямую (опционально)
# RewriteRule ^assets/ - [F,L]
```

3. **Сохраните файл**

### Шаг 4: Настройка SSL-сертификата

1. **В панели Beget перейдите в раздел "SSL-сертификаты"**

2. **Закажите бесплатный сертификат Let's Encrypt:**
   - Выберите домен `shkola-molitvy.ru`
   - Нажмите "Заказать бесплатный сертификат"
   - Дождитесь выпуска (обычно 5-10 минут)

3. **Включите автоматическое продление:**
   - Убедитесь, что включена опция "Автоматическое продление"

4. **Проверьте работу HTTPS:**
   - Откройте https://shkola-molitvy.ru
   - Должен появиться замочек в адресной строке

### Шаг 5: Настройка домена

1. **Привяжите домен к хостингу:**
   - В панели Beget → "Управление доменами"
   - Добавьте домен `shkola-molitvy.ru`
   - Следуйте инструкциям

2. **Настройте DNS у регистратора:**
   - Зайдите в панель управления вашего регистратора
   - Измените DNS-серверы на серверы Beget:
     ```
     ns1.beget.com
     ns2.beget.com
     ```
   - Дождитесь обновления DNS (до 24 часов)

3. **Проверьте доступность сайта:**
   - Откройте https://shkola-molitvy.ru
   - Сайт должен работать

### Шаг 6: Проверка работы сайта

**Чек-лист проверки:**

- [ ] Главная страница загружается
- [ ] Навигация работает (все разделы открываются)
- [ ] Уроки открываются и сохраняют прогресс
- [ ] Блог работает, статьи открываются
- [ ] Тёмная тема переключается
- [ ] Регистрация работает
- [ ] Молитвенный дневник сохраняет записи
- [ ] Форма обратной связи работает
- [ ] SSL-сертификат активен (замочек в браузере)
- [ ] Скорость загрузки приемлемая

---

## 📋 Часть 2: Подключение хранения данных (PHP + MySQL)

### Шаг 1: Создание базы данных в Beget

1. **В панели Beget перейдите в раздел "MySQL"**

2. **Создайте новую базу данных:**
   - Нажмите "Создать базу данных"
   - Имя базы: `shkola_molitvy`
   - Кодировка: `utf8mb4_unicode_ci`
   - Нажмите "Создать"

3. **Создайте пользователя базы данных:**
   - Имя пользователя: `shkola_user`
   - Пароль: сгенерируйте сложный пароль (сохраните его!)
   - Дайте все права на базу `shkola_molitvy`

4. **Сохраните данные для подключения:**
   ```
   Хост: localhost
   База данных: shkola_molitvy
   Пользователь: shkola_user
   Пароль: [ваш_пароль]
   ```

### Шаг 2: Создание структуры базы данных

1. **Откройте phpMyAdmin в панели Beget:**
   - Раздел "MySQL" → "phpMyAdmin"

2. **Выберите базу данных `shkola_molitvy`**

3. **Перейдите на вкладку "SQL"**

4. **Выполните следующий SQL-запрос:**

```sql
-- Таблица пользователей
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица прогресса уроков
CREATE TABLE user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_progress (user_id, lesson_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_lesson (user_id, lesson_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица результатов тестов
CREATE TABLE quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    percentage INT NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_lesson (user_id, lesson_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица молитвенного дневника
CREATE TABLE diary_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    prayer_request TEXT NOT NULL,
    category ENUM('просьба', 'благодарность', 'поклонение', 'исповедание', 'ходатайство') NOT NULL,
    answered BOOLEAN DEFAULT FALSE,
    answer TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_created (user_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица избранных молитв
CREATE TABLE favorite_prayers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    prayer_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_favorite (user_id, prayer_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_prayer (user_id, prayer_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица серии молитв
CREATE TABLE prayer_streaks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    last_prayer_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_streak (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица сообщений обратной связи
CREATE TABLE feedback_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    message TEXT NOT NULL,
    admin_reply TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица постов сообщества
CREATE TABLE community_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    lesson_ref VARCHAR(255),
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица сертификатов
CREATE TABLE certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    lesson_title VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_certificate (user_id, lesson_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_lesson (user_id, lesson_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

5. **Проверьте создание таблиц:**
   - В левой панели выберите базу `shkola_molitvy`
   - Должны появиться 9 таблиц

### Шаг 3: Создание PHP API

Создайте папку `api/` в корне сайта и добавьте следующие файлы:

#### Файл 1: `api/config.php`

```php
<?php
// Конфигурация базы данных
define('DB_HOST', 'localhost');
define('DB_NAME', 'shkola_molitvy');
define('DB_USER', 'shkola_user');
define('DB_PASS', 'ваш_пароль_от_базы');

// Настройки CORS
header('Access-Control-Allow-Origin: https://shkola-molitvy.ru');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Обработка preflight запросов
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Подключение к базе данных
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

// Функция для получения JSON данных из запроса
function getJsonInput() {
    $json = file_get_contents('php://input');
    return json_decode($json, true);
}

// Функция для отправки JSON ответа
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

// Функция для генерации JWT токена (упрощенная версия)
function generateToken($userId) {
    $secret = 'your_secret_key_change_this_in_production'; // Измените на сложный ключ!
    $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = base64_encode(json_encode([
        'user_id' => $userId,
        'exp' => time() + (7 * 24 * 60 * 60) // 7 дней
    ]));
    $signature = base64_encode(hash_hmac('sha256', "$header.$payload", $secret, true));
    return "$header.$payload.$signature";
}

// Функция для проверки JWT токена
function validateToken($token) {
    $secret = 'your_secret_key_change_this_in_production'; // Тот же ключ!
    $parts = explode('.', $token);
    if (count($parts) !== 3) return false;
    
    list($header, $payload, $signature) = $parts;
    $validSignature = base64_encode(hash_hmac('sha256', "$header.$payload", $secret, true));
    
    if ($signature !== $validSignature) return false;
    
    $data = json_decode(base64_decode($payload), true);
    if ($data['exp'] < time()) return false;
    
    return $data['user_id'];
}

// Функция для получения текущего пользователя
function getCurrentUser() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    
    if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        $token = $matches[1];
        return validateToken($token);
    }
    
    return false;
}
?>
```

#### Файл 2: `api/auth.php`

```php
<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getJsonInput();

switch ($method) {
    case 'POST':
        // Регистрация
        if (isset($input['action']) && $input['action'] === 'register') {
            $email = $input['email'] ?? '';
            $name = $input['name'] ?? '';
            $password = $input['password'] ?? '';
            
            if (empty($email) || empty($name) || empty($password)) {
                sendJsonResponse(['error' => 'All fields are required'], 400);
            }
            
            // Проверка существования пользователя
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->fetch()) {
                sendJsonResponse(['error' => 'User already exists'], 409);
            }
            
            // Создание пользователя
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)");
            $stmt->execute([$email, $name, $passwordHash]);
            
            $userId = $pdo->lastInsertId();
            
            // Создание записи серии молитв
            $stmt = $pdo->prepare("INSERT INTO prayer_streaks (user_id) VALUES (?)");
            $stmt->execute([$userId]);
            
            // Генерация токена
            $token = generateToken($userId);
            
            sendJsonResponse([
                'success' => true,
                'token' => $token,
                'user' => [
                    'id' => $userId,
                    'email' => $email,
                    'name' => $name
                ]
            ]);
        }
        
        // Вход
        if (isset($input['action']) && $input['action'] === 'login') {
            $email = $input['email'] ?? '';
            $password = $input['password'] ?? '';
            
            if (empty($email) || empty($password)) {
                sendJsonResponse(['error' => 'Email and password are required'], 400);
            }
            
            // Поиск пользователя
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            
            if (!$user || !password_verify($password, $user['password_hash'])) {
                sendJsonResponse(['error' => 'Invalid credentials'], 401);
            }
            
            // Генерация токена
            $token = generateToken($user['id']);
            
            sendJsonResponse([
                'success' => true,
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'name' => $user['name']
                ]
            ]);
        }
        break;
        
    default:
        sendJsonResponse(['error' => 'Method not allowed'], 405);
}
?>
```

#### Файл 3: `api/user.php`

```php
<?php
require_once 'config.php';

$userId = getCurrentUser();
if (!$userId) {
    sendJsonResponse(['error' => 'Unauthorized'], 401);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Получение всех данных пользователя
        $userData = [];
        
        // Прогресс уроков
        $stmt = $pdo->prepare("SELECT lesson_id FROM user_progress WHERE user_id = ?");
        $stmt->execute([$userId]);
        $userData['completedLessons'] = array_column($stmt->fetchAll(), 'lesson_id');
        
        // Результаты тестов
        $stmt = $pdo->prepare("SELECT lesson_id, percentage FROM quiz_results WHERE user_id = ?");
        $stmt->execute([$userId]);
        $results = $stmt->fetchAll();
        $userData['quizScores'] = [];
        foreach ($results as $result) {
            $userData['quizScores'][$result['lesson_id']] = $result['percentage'];
        }
        
        // Дневник
        $stmt = $pdo->prepare("SELECT * FROM diary_entries WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        $userData['diaryEntries'] = $stmt->fetchAll();
        
        // Избранные молитвы
        $stmt = $pdo->prepare("SELECT prayer_id FROM favorite_prayers WHERE user_id = ?");
        $stmt->execute([$userId]);
        $userData['favoritePrayers'] = array_column($stmt->fetchAll(), 'prayer_id');
        
        // Серия молитв
        $stmt = $pdo->prepare("SELECT * FROM prayer_streaks WHERE user_id = ?");
        $stmt->execute([$userId]);
        $streak = $stmt->fetch();
        $userData['prayerStreak'] = $streak['current_streak'] ?? 0;
        $userData['lastPrayerDate'] = $streak['last_prayer_date'] ?? null;
        
        // Сертификаты
        $stmt = $pdo->prepare("SELECT * FROM certificates WHERE user_id = ?");
        $stmt->execute([$userId]);
        $userData['certificates'] = $stmt->fetchAll();
        
        // Информация о пользователе
        $stmt = $pdo->prepare("SELECT name, email, created_at FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $user = $stmt->fetch();
        $userData['name'] = $user['name'];
        $userData['email'] = $user['email'];
        $userData['joinDate'] = $user['created_at'];
        
        sendJsonResponse($userData);
        break;
        
    default:
        sendJsonResponse(['error' => 'Method not allowed'], 405);
}
?>
```

#### Файл 4: `api/progress.php`

```php
<?php
require_once 'config.php';

$userId = getCurrentUser();
if (!$userId) {
    sendJsonResponse(['error' => 'Unauthorized'], 401);
}

$method = $_SERVER['REQUEST_METHOD'];
$input = getJsonInput();

switch ($method) {
    case 'POST':
        // Завершение урока
        $lessonId = $input['lessonId'] ?? 0;
        
        if ($lessonId <= 0) {
            sendJsonResponse(['error' => 'Invalid lesson ID'], 400);
        }
        
        try {
            $stmt = $pdo->prepare("INSERT INTO user_progress (user_id, lesson_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE completed_at = CURRENT_TIMESTAMP");
            $stmt->execute([$userId, $lessonId]);
            
            sendJsonResponse(['success' => true]);
        } catch (PDOException $e) {
            sendJsonResponse(['error' => 'Failed to save progress'], 500);
        }
        break;
        
    default:
        sendJsonResponse(['error' => 'Method not allowed'], 405);
}
?>
```

#### Файл 5: `api/quiz.php`

```php
<?php
require_once 'config.php';

$userId = getCurrentUser();
if (!$userId) {
    sendJsonResponse(['error' => 'Unauthorized'], 401);
}

$method = $_SERVER['REQUEST_METHOD'];
$input = getJsonInput();

switch ($method) {
    case 'POST':
        // Сохранение результата теста
        $lessonId = $input['lessonId'] ?? 0;
        $score = $input['score'] ?? 0;
        $total = $input['total'] ?? 0;
        
        if ($lessonId <= 0 || $total <= 0) {
            sendJsonResponse(['error' => 'Invalid data'], 400);
        }
        
        $percentage = round(($score / $total) * 100);
        
        try {
            $stmt = $pdo->prepare("INSERT INTO quiz_results (user_id, lesson_id, score, total_questions, percentage) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$userId, $lessonId, $score, $total, $percentage]);
            
            // Если результат >= 80%, выдать сертификат
            if ($percentage >= 80) {
                $stmt = $pdo->prepare("SELECT title FROM lessons WHERE id = ?");
                $stmt->execute([$lessonId]);
                $lesson = $stmt->fetch();
                
                if ($lesson) {
                    $stmt = $pdo->prepare("INSERT INTO certificates (user_id, lesson_id, lesson_title, score) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE score = ?");
                    $stmt->execute([$userId, $lessonId, $lesson['title'], $percentage, $percentage]);
                }
            }
            
            sendJsonResponse(['success' => true, 'percentage' => $percentage]);
        } catch (PDOException $e) {
            sendJsonResponse(['error' => 'Failed to save quiz result'], 500);
        }
        break;
        
    default:
        sendJsonResponse(['error' => 'Method not allowed'], 405);
}
?>
```

#### Файл 6: `api/diary.php`

```php
<?php
require_once 'config.php';

$userId = getCurrentUser();
if (!$userId) {
    sendJsonResponse(['error' => 'Unauthorized'], 401);
}

$method = $_SERVER['REQUEST_METHOD'];
$input = getJsonInput();

switch ($method) {
    case 'GET':
        // Получение записей дневника
        $stmt = $pdo->prepare("SELECT * FROM diary_entries WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        sendJsonResponse($stmt->fetchAll());
        break;
        
    case 'POST':
        // Добавление записи
        $prayerRequest = $input['prayerRequest'] ?? '';
        $category = $input['category'] ?? 'просьба';
        
        if (empty($prayerRequest)) {
            sendJsonResponse(['error' => 'Prayer request is required'], 400);
        }
        
        $stmt = $pdo->prepare("INSERT INTO diary_entries (user_id, prayer_request, category) VALUES (?, ?, ?)");
        $stmt->execute([$userId, $prayerRequest, $category]);
        
        $entryId = $pdo->lastInsertId();
        
        // Обновление серии молитв
        $today = date('Y-m-d');
        $stmt = $pdo->prepare("SELECT * FROM prayer_streaks WHERE user_id = ?");
        $stmt->execute([$userId]);
        $streak = $stmt->fetch();
        
        $yesterday = date('Y-m-d', strtotime('-1 day'));
        $newStreak = ($streak['last_prayer_date'] === $yesterday) ? $streak['current_streak'] + 1 : 1;
        
        $stmt = $pdo->prepare("UPDATE prayer_streaks SET current_streak = ?, last_prayer_date = ?, longest_streak = GREATEST(longest_streak, ?) WHERE user_id = ?");
        $stmt->execute([$newStreak, $today, $newStreak, $userId]);
        
        sendJsonResponse(['success' => true, 'id' => $entryId, 'streak' => $newStreak]);
        break;
        
    case 'PUT':
        // Обновление записи
        $entryId = $input['id'] ?? 0;
        $answered = $input['answered'] ?? false;
        $answer = $input['answer'] ?? null;
        
        $stmt = $pdo->prepare("UPDATE diary_entries SET answered = ?, answer = ? WHERE id = ? AND user_id = ?");
        $stmt->execute([$answered, $answer, $entryId, $userId]);
        
        sendJsonResponse(['success' => true]);
        break;
        
    case 'DELETE':
        // Удаление записи
        $entryId = $input['id'] ?? 0;
        
        $stmt = $pdo->prepare("DELETE FROM diary_entries WHERE id = ? AND user_id = ?");
        $stmt->execute([$entryId, $userId]);
        
        sendJsonResponse(['success' => true]);
        break;
        
    default:
        sendJsonResponse(['error' => 'Method not allowed'], 405);
}
?>
```

### Шаг 4: Создание таблицы уроков

Выполните в phpMyAdmin:

```sql
-- Таблица уроков (для хранения названий)
CREATE TABLE lessons (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Вставка данных об уроках
INSERT INTO lessons (id, title) VALUES
(1, 'Единственный Учитель'),
(2, 'Истинные поклонники'),
(3, 'Наедине с Богом'),
(4, 'Образец молитвы'),
(5, 'Несомненный ответ'),
(6, 'Бесконечное отцовство'),
(7, 'Всеобъемлющий дар'),
(8, 'Смелость Божьих детей');
```

### Шаг 5: Обновление фронтенда для работы с API

Теперь нужно обновить `UserContext.tsx` для работы с API вместо localStorage.

---

## 📋 Часть 3: Обновление фронтенда

### Шаг 1: Создание API клиента

Создайте файл `src/utils/api.ts`:

```typescript
const API_BASE_URL = 'https://shkola-molitvy.ru/api';

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('authToken');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      this.clearToken();
      window.location.href = '/#/profile';
      throw new Error('Unauthorized');
    }

    return response.json();
  }

  // Аутентификация
  async register(email: string, name: string, password: string) {
    const data = await this.request('/auth.php', {
      method: 'POST',
      body: JSON.stringify({ action: 'register', email, name, password }),
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async login(email: string, password: string) {
    const data = await this.request('/auth.php', {
      method: 'POST',
      body: JSON.stringify({ action: 'login', email, password }),
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  // Пользователь
  async getUserData() {
    return this.request('/user.php');
  }

  // Прогресс
  async completeLesson(lessonId: number) {
    return this.request('/progress.php', {
      method: 'POST',
      body: JSON.stringify({ lessonId }),
    });
  }

  // Тесты
  async saveQuizResult(lessonId: number, score: number, total: number) {
    return this.request('/quiz.php', {
      method: 'POST',
      body: JSON.stringify({ lessonId, score, total }),
    });
  }

  // Дневник
  async getDiaryEntries() {
    return this.request('/diary.php');
  }

  async addDiaryEntry(prayerRequest: string, category: string) {
    return this.request('/diary.php', {
      method: 'POST',
      body: JSON.stringify({ prayerRequest, category }),
    });
  }

  async updateDiaryEntry(id: number, answered: boolean, answer?: string) {
    return this.request('/diary.php', {
      method: 'PUT',
      body: JSON.stringify({ id, answered, answer }),
    });
  }

  async deleteDiaryEntry(id: number) {
    return this.request('/diary.php', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
  }
}

export const api = new ApiClient();
```

### Шаг 2: Обновление UserContext

Обновите `src/contexts/UserContext.tsx` для работы с API:

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../utils/api';

// ... (остальной код остается таким же, но заменяем localStorage на api вызовы)

const login = async (email: string, password: string) => {
  try {
    const data = await api.login(email, password);
    if (data.success) {
      setUser(data.user);
      // Загрузить данные пользователя
      const userData = await api.getUserData();
      setUser(userData);
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

const completeLesson = async (lessonId: number) => {
  if (!user) return;
  try {
    await api.completeLesson(lessonId);
    setUser({ ...user, completedLessons: [...user.completedLessons, lessonId] });
  } catch (error) {
    console.error('Failed to complete lesson:', error);
  }
};

// ... (аналогично для других методов)
```

---

## ✅ Итоговый чек-лист

### Деплой сайта:
- [ ] Проект собран (`npm run build`)
- [ ] Файлы загружены на Beget
- [ ] Создан `.htaccess`
- [ ] SSL-сертификат установлен
- [ ] Домен настроен
- [ ] Сайт открывается по HTTPS

### База данных:
- [ ] База данных создана
- [ ] Пользователь БД создан
- [ ] Таблицы созданы (9 таблиц)
- [ ] Данные уроков добавлены

### API:
- [ ] Папка `api/` создана
- [ ] Файл `config.php` создан и настроен
- [ ] Файл `auth.php` создан
- [ ] Файл `user.php` создан
- [ ] Файл `progress.php` создан
- [ ] Файл `quiz.php` создан
- [ ] Файл `diary.php` создан
- [ ] Секретный ключ в JWT изменен

### Фронтенд:
- [ ] Файл `api.ts` создан
- [ ] `UserContext.tsx` обновлен
- [ ] Компоненты обновлены для работы с API
- [ ] Токен сохраняется в localStorage
- [ ] Автоматический выход при истечении токена

### Тестирование:
- [ ] Регистрация работает
- [ ] Вход работает
- [ ] Прогресс уроков сохраняется
- [ ] Результаты тестов сохраняются
- [ ] Дневник работает
- [ ] Данные синхронизируются между устройствами

---

## 🔐 Безопасность

### Обязательные меры:
1. **Измените секретный ключ JWT** в `config.php`
2. **Используйте сложные пароли** для базы данных
3. **Включите HTTPS** для всех страниц
4. **Настройте CORS** только для вашего домена
5. **Регулярно делайте бэкапы** базы данных

### Дополнительные рекомендации:
- Используйте HTTPS только cookies для токенов
- Добавьте rate limiting для API
- Валидируйте все входные данные
- Логируйте подозрительную активность

---

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи ошибок в панели Beget
2. Проверьте консоль браузера (F12)
3. Проверьте права доступа к файлам (644 для файлов, 755 для папок)
4. Убедитесь, что PHP версия 8.1+

---

**Готово!** Теперь ваш сайт работает с облачным хранением данных! 🎉
