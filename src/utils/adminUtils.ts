import { User } from '../contexts/UserContext';

// ============================================================================
// АДМИН-ПАНЕЛЬ: Утилиты для работы с данными учеников
// ============================================================================

// Получить всех зарегистрированных учеников
export const getAllStudents = (): User[] => {
  const students: User[] = [];
  
  // В реальном приложении данные приходят с сервера
  // Здесь используем localStorage для демонстрации
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('user_')) {
      try {
        const userData = localStorage.getItem(key);
        if (userData) {
          students.push(JSON.parse(userData));
        }
      } catch (e) {
        console.error('Ошибка чтения данных ученика:', e);
      }
    }
  }
  
  return students;
};

// Получить статистику по ученикам
export const getStudentStats = () => {
  const students = getAllStudents();
  
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.completedLessons.length > 0).length;
  const totalLessonsCompleted = students.reduce((sum, s) => sum + s.completedLessons.length, 0);
  const totalDiaryEntries = students.reduce((sum, s) => sum + s.diaryEntries.length, 0);
  const totalQuizScores = students.reduce((sum, s) => sum + Object.keys(s.quizScores).length, 0);
  
  // Средняя прогрессия
  const avgProgress = totalStudents > 0 
    ? Math.round((totalLessonsCompleted / (totalStudents * 2)) * 100) 
    : 0;
  
  // Топ ученики
  const topStudents = [...students]
    .sort((a, b) => b.completedLessons.length - a.completedLessons.length)
    .slice(0, 5);
  
  // Прогресс по урокам
  const lessonProgress = [0, 0]; // Урок 1 и Урок 2
  students.forEach(s => {
    s.completedLessons.forEach((lessonId: number) => {
      if (lessonId <= 2) {
        lessonProgress[lessonId - 1]++;
      }
    });
  });
  
  return {
    totalStudents,
    activeStudents,
    totalLessonsCompleted,
    totalDiaryEntries,
    totalQuizScores,
    avgProgress,
    topStudents,
    lessonProgress,
  };
};

// Получить все сообщения (из обратной связи и сообщества)
export const getAllMessages = () => {
  const messages: Array<{
    id: number;
    type: 'feedback' | 'community';
    author: string;
    email?: string;
    text: string;
    date: string;
    adminReply?: string;
  }> = [];
  
  // Сообщения из обратной связи
  try {
    const feedbackMessages = localStorage.getItem('feedbackMessages');
    if (feedbackMessages) {
      const parsed = JSON.parse(feedbackMessages);
      parsed.forEach((msg: any) => {
        messages.push({
          ...msg,
          type: 'feedback',
        });
      });
    }
  } catch (e) {
    console.error('Ошибка чтения сообщений обратной связи:', e);
  }
  
  // Сообщения из сообщества
  try {
    const forumPosts = localStorage.getItem('forumPosts');
    if (forumPosts) {
      const parsed = JSON.parse(forumPosts);
      parsed.forEach((post: any) => {
        messages.push({
          ...post,
          type: 'community',
        });
      });
    }
  } catch (e) {
    console.error('Ошибка чтения сообщений сообщества:', e);
  }
  
  return messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Добавить ответ администратора к сообщению
export const addAdminReply = (messageId: number, reply: string, type: 'feedback' | 'community') => {
  if (type === 'feedback') {
    try {
      const feedbackMessages = localStorage.getItem('feedbackMessages');
      if (feedbackMessages) {
        const messages = JSON.parse(feedbackMessages);
        const msgIndex = messages.findIndex((m: any) => m.id === messageId);
        if (msgIndex !== -1) {
          messages[msgIndex].adminReply = reply;
          localStorage.setItem('feedbackMessages', JSON.stringify(messages));
        }
      }
    } catch (e) {
      console.error('Ошибка сохранения ответа:', e);
    }
  } else if (type === 'community') {
    try {
      const forumPosts = localStorage.getItem('forumPosts');
      if (forumPosts) {
        const posts = JSON.parse(forumPosts);
        const postIndex = posts.findIndex((p: any) => p.id === messageId);
        if (postIndex !== -1) {
          posts[postIndex].adminReply = reply;
          localStorage.setItem('forumPosts', JSON.stringify(forumPosts));
        }
      }
    } catch (e) {
      console.error('Ошибка сохранения ответа:', e);
    }
  }
};

// Экспорт всех данных (для синхронизации между устройствами)
export const exportAllData = (): string => {
  const data = {
    students: getAllStudents(),
    feedbackMessages: JSON.parse(localStorage.getItem('feedbackMessages') || '[]'),
    forumPosts: JSON.parse(localStorage.getItem('forumPosts') || '[]'),
    exportDate: new Date().toISOString(),
  };
  
  return JSON.stringify(data, null, 2);
};

// Импорт данных
export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.students) {
      data.students.forEach((student: User) => {
        localStorage.setItem(`user_${student.email}`, JSON.stringify(student));
      });
    }
    
    if (data.feedbackMessages) {
      localStorage.setItem('feedbackMessages', JSON.stringify(data.feedbackMessages));
    }
    
    if (data.forumPosts) {
      localStorage.setItem('forumPosts', JSON.stringify(data.forumPosts));
    }
    
    return true;
  } catch (e) {
    console.error('Ошибка импорта данных:', e);
    return false;
  }
};
