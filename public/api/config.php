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

// Функция для генерации JWT токена
function generateToken($userId) {
    $secret = 'your_secret_key_change_this_in_production_2024';
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
    $secret = 'your_secret_key_change_this_in_production_2024';
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
