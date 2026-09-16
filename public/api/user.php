<?php
require_once 'config.php';

$userId = getCurrentUser();
if (!$userId) {
    sendJsonResponse(['error' => 'Необходима авторизация'], 401);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Получение всех данных пользователя
        $userData = [];
        
        // Информация о пользователе
        $stmt = $pdo->prepare("SELECT name, email, created_at FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $user = $stmt->fetch();
        $userData['name'] = $user['name'];
        $userData['email'] = $user['email'];
        $userData['joinDate'] = $user['created_at'];
        
        // Прогресс уроков
        $stmt = $pdo->prepare("SELECT lesson_id FROM user_progress WHERE user_id = ?");
        $stmt->execute([$userId]);
        $userData['completedLessons'] = array_map('intval', array_column($stmt->fetchAll(), 'lesson_id'));
        
        // Результаты тестов
        $stmt = $pdo->prepare("SELECT lesson_id, percentage FROM quiz_results WHERE user_id = ?");
        $stmt->execute([$userId]);
        $results = $stmt->fetchAll();
        $userData['quizScores'] = new stdClass();
        foreach ($results as $result) {
            $userData['quizScores']->{(string)$result['lesson_id']} = (int)$result['percentage'];
        }
        
        // Дневник
        $stmt = $pdo->prepare("SELECT * FROM diary_entries WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        $entries = $stmt->fetchAll();
        $userData['diaryEntries'] = array_map(function($entry) {
            return [
                'id' => (int)$entry['id'],
                'date' => $entry['created_at'],
                'prayerRequest' => $entry['prayer_request'],
                'category' => $entry['category'],
                'answered' => (bool)$entry['answered'],
                'answer' => $entry['answer']
            ];
        }, $entries);
        
        // Избранные молитвы
        $stmt = $pdo->prepare("SELECT prayer_id FROM favorite_prayers WHERE user_id = ?");
        $stmt->execute([$userId]);
        $userData['favoritePrayers'] = array_map('intval', array_column($stmt->fetchAll(), 'prayer_id'));
        
        // Серия молитв
        $stmt = $pdo->prepare("SELECT * FROM prayer_streaks WHERE user_id = ?");
        $stmt->execute([$userId]);
        $streak = $stmt->fetch();
        $userData['prayerStreak'] = (int)($streak['current_streak'] ?? 0);
        $userData['lastPrayerDate'] = $streak['last_prayer_date'] ?? null;
        
        // Сертификаты
        $stmt = $pdo->prepare("SELECT * FROM certificates WHERE user_id = ?");
        $stmt->execute([$userId]);
        $certs = $stmt->fetchAll();
        $userData['certificates'] = array_map(function($cert) {
            return [
                'id' => (int)$cert['id'],
                'lessonId' => (int)$cert['lesson_id'],
                'lessonTitle' => $cert['lesson_title'],
                'earnedDate' => $cert['earned_at'],
                'score' => (int)$cert['score']
            ];
        }, $certs);
        
        sendJsonResponse($userData);
        break;
        
    default:
        sendJsonResponse(['error' => 'Метод не разрешен'], 405);
}
?>
