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
                sendJsonResponse(['error' => 'Все поля обязательны'], 400);
            }
            
            // Проверка существования пользователя
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->fetch()) {
                sendJsonResponse(['error' => 'Пользователь с таким email уже существует'], 409);
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
                sendJsonResponse(['error' => 'Email и пароль обязательны'], 400);
            }
            
            // Поиск пользователя
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            
            if (!$user || !password_verify($password, $user['password_hash'])) {
                sendJsonResponse(['error' => 'Неверный email или пароль'], 401);
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
        sendJsonResponse(['error' => 'Метод не разрешен'], 405);
}
?>
