import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { getAllStudents } from '../utils/adminUtils';
import { User } from '../contexts/UserContext';
import { Search, BookOpen, FileText, Award } from 'lucide-react';

export default function AdminStudentsPage() {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [students, setStudents] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
      return;
    }
    setStudents(getAllStudents());
  }, [isAdmin, navigate]);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Ученики
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Просмотр прогресса и активности всех зарегистрированных учеников
        </p>
      </header>

      {/* Поиск */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по имени или email..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 outline-none transition-all"
          />
        </div>
      </div>

      {/* Список учеников */}
      <div className="space-y-4">
        {filteredStudents.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-100 dark:border-gray-700 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery ? 'Ученики не найдены' : 'Пока нет зарегистрированных учеников'}
            </p>
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div
              key={student.email}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                      {student.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{student.email}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Регистрация: {new Date(student.joinDate).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {Math.round((student.completedLessons.length / 2) * 100)}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Прогресс</p>
                </div>
              </div>

              {/* Статистика */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Уроки</span>
                  </div>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {student.completedLessons.length}/2
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Дневник</span>
                  </div>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {student.diaryEntries.length}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Сертификаты</span>
                  </div>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {student.certificates.length}
                  </p>
                </div>
              </div>

              {/* Прогресс бар */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Прогресс обучения</span>
                  <span>{student.completedLessons.length} из 2 уроков</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                    style={{ width: `${(student.completedLessons.length / 2) * 100}%` }}
                  />
                </div>
              </div>

              {/* Серия молитв */}
              {student.prayerStreak > 0 && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                  🔥 Серия молитв: {student.prayerStreak} дней
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
