<?php
require_once 'config.php';

$userId = getCurrentUser();
if (!$userId) {
    sendJsonResponse(['error' => 'Необходима авторизация'], 401);
}

$method = $_SERVER['REQUEST_METHOD'];
$input = getJsonInput();

switch ($method) {
    case 'POST':
        // Завершение урока
        $lessonId = $input['lessonId'] ?? 0;
        
        if ($lessonId <= 0) {
            sendJsonResponse(['error' => 'Неверный ID урока'], 400);
        }
        
        try {
            $stmt = $pdo->prepare("INSERT INTO user_progress (user_id, lesson_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE completed_at = CURRENT_TIMESTAMP");
            $stmt->execute([$userId, $lessonId]);
            
            sendJsonResponse(['success' => true]);
        } catch (PDOException $e) {
            sendJsonResponse(['error' => 'Не удалось сохранить прогресс'], 500);
        }
        break;
        
    default:
        sendJsonResponse(['error' => 'Метод не разрешен'], 405);
}
?>
