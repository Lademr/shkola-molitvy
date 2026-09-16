import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { getStudentStats, getAllMessages, exportAllData } from '../utils/adminUtils';
import { Users, BookOpen, MessageCircle, TrendingUp, Download, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboardPage() {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
      return;
    }

    setStats(getStudentStats());
    setMessages(getAllMessages());
  }, [isAdmin, navigate]);

  if (!stats) return null;

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shkola-molitvy-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Данные для графика прогресса по урокам
  const lessonData = [
    { name: 'Урок 1', students: stats.lessonProgress[0] || 0 },
    { name: 'Урок 2', students: stats.lessonProgress[1] || 0 },
  ];

  // Данные для круговой диаграммы
  const activityData = [
    { name: 'Активные', value: stats.activeStudents },
    { name: 'Неактивные', value: stats.totalStudents - stats.activeStudents },
  ];

  const COLORS = ['#10b981', '#e5e7eb'];

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Панель управления
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Обзор активности учеников и статистики сайта
            </p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            Экспорт данных
          </button>
        </div>
      </header>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-blue-500" />
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.totalStudents}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Всего учеников</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-8 h-8 text-green-500" />
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.totalLessonsCompleted}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Уроков пройдено</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <MessageCircle className="w-8 h-8 text-purple-500" />
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{messages.length}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Сообщений</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-amber-500" />
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.avgProgress}%</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Средний прогресс</p>
        </div>
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            Прогресс по урокам
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={lessonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#f3f4f6'
                }} 
              />
              <Bar dataKey="students" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            Активность учеников
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#f3f4f6'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Топ ученики */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Топ ученики
          </h3>
          <Link
            to="/admin/students"
            className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
          >
            Все ученики →
          </Link>
        </div>
        <div className="space-y-3">
          {stats.topStudents.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              Пока нет зарегистрированных учеников
            </p>
          ) : (
            stats.topStudents.map((student: any, index: number) => (
              <div
                key={student.email}
                className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-gray-800 dark:text-gray-100">{student.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{student.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800 dark:text-gray-100">
                    {student.completedLessons.length} уроков
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {student.diaryEntries.length} записей
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Последние сообщения */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Последние сообщения
          </h3>
          <Link
            to="/admin/messages"
            className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
          >
            Все сообщения →
          </Link>
        </div>
        <div className="space-y-3">
          {messages.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              Пока нет сообщений
            </p>
          ) : (
            messages.slice(0, 5).map((msg) => (
              <div
                key={msg.id}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">{msg.author}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(msg.date).toLocaleDateString('ru-RU')} • {msg.type === 'feedback' ? 'Обратная связь' : 'Сообщество'}
                    </p>
                  </div>
                  {msg.adminReply && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded">
                      Отвечено
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{msg.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
