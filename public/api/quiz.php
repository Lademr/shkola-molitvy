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
        // Сохранение результата теста
        $lessonId = $input['lessonId'] ?? 0;
        $score = $input['score'] ?? 0;
        $total = $input['total'] ?? 0;
        
        if ($lessonId <= 0 || $total <= 0) {
            sendJsonResponse(['error' => 'Неверные данные'], 400);
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
            sendJsonResponse(['error' => 'Не удалось сохранить результат теста'], 500);
        }
        break;
        
    default:
        sendJsonResponse(['error' => 'Метод не разрешен'], 405);
}
?>
