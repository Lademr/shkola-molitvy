<?php
require_once 'config.php';

$userId = getCurrentUser();
if (!$userId) {
    sendJsonResponse(['error' => 'Необходима авторизация'], 401);
}

$method = $_SERVER['REQUEST_METHOD'];
$input = getJsonInput();

switch ($method) {
    case 'GET':
        // Получение записей дневника
        $stmt = $pdo->prepare("SELECT * FROM diary_entries WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        $entries = $stmt->fetchAll();
        
        $result = array_map(function($entry) {
            return [
                'id' => (int)$entry['id'],
                'date' => $entry['created_at'],
                'prayerRequest' => $entry['prayer_request'],
                'category' => $entry['category'],
                'answered' => (bool)$entry['answered'],
                'answer' => $entry['answer']
            ];
        }, $entries);
        
        sendJsonResponse($result);
        break;
        
    case 'POST':
        // Добавление записи
        $prayerRequest = $input['prayerRequest'] ?? '';
        $category = $input['category'] ?? 'просьба';
        
        if (empty($prayerRequest)) {
            sendJsonResponse(['error' => 'Молитвенная просьба обязательна'], 400);
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
        sendJsonResponse(['error' => 'Метод не разрешен'], 405);
}
?>
