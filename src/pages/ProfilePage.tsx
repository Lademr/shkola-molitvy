import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import { User, Mail, Calendar, Award, BookOpen, CheckCircle2, TrendingUp, Flame, LogOut, Edit2, Save, X, FileText, MessageCircle } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoggedIn, login, logout, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Вход в Школу Молитвы</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Зарегистрируйтесь, чтобы отслеживать прогресс, вести молитвенный дневник и получать сертификаты
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (loginName.trim() && loginEmail.trim()) {
                login(loginName, loginEmail);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">Ваше имя</label>
              <input
                type="text"
                value={loginName}
                onChange={e => setLoginName(e.target.value)}
                placeholder="Как к вам обращаться?"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900 outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              Зарегистрироваться
            </button>
          </form>

          <p className="text-center text-gray-400 dark:text-gray-500 text-xs mt-4">
            Все данные хранятся локально в вашем браузере
          </p>
        </div>
      </div>
    );
  }

  const totalLessons = 7; // Общее количество уроков
  const progress = Math.round((user!.completedLessons.length / totalLessons) * 100);
  const avgScore = Object.values(user!.quizScores).length > 0
    ? Math.round(Object.values(user!.quizScores).reduce((a, b) => a + b, 0) / Object.values(user!.quizScores).length)
    : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">👤 Личный кабинет</h1>
        <p className="text-gray-500 dark:text-gray-400">Ваш прогресс и достижения</p>
      </header>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
              {user!.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user!.name}</h2>
              <p className="text-amber-100 text-sm flex items-center gap-1">
                <Mail className="w-3 h-3" /> {user!.email}
              </p>
              <p className="text-amber-100 text-xs flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3" /> С нами с {new Date(user!.joinDate).toLocaleDateString('ru-RU')}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditName(user!.name);
                setEditEmail(user!.email);
                setIsEditing(true);
              }}
              className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors flex items-center gap-1 text-sm"
            >
              <Edit2 className="w-4 h-4" /> Изменить
            </button>
            <button
              onClick={logout}
              className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors flex items-center gap-1 text-sm"
            >
              <LogOut className="w-4 h-4" /> Выйти
            </button>
          </div>
        </div>

        {/* Edit modal */}
        {isEditing && (
          <div className="mt-4 bg-white/10 rounded-xl p-4">
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none"
                placeholder="Имя"
              />
              <input
                type="email"
                value={editEmail}
                onChange={e => setEditEmail(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none"
                placeholder="Email"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  updateUser({ name: editName, email: editEmail });
                  setIsEditing(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-white text-amber-600 text-sm font-medium flex items-center gap-1"
              >
                <Save className="w-3 h-3" /> Сохранить
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 rounded-lg bg-white/20 text-white text-sm flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Отмена
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Уроки</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{user!.completedLessons.length}/{totalLessons}</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Средний балл</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{avgScore}%</p>
          <p className="text-xs text-gray-400 mt-2">{Object.keys(user!.quizScores).length} тестов</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Серия молитв</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{user!.prayerStreak}</p>
          <p className="text-xs text-gray-400 mt-2">дней подряд</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-purple-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Сертификаты</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{user!.certificates.length}</p>
          <p className="text-xs text-gray-400 mt-2">получено</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Link
          to="/diary"
          className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-700 transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100">Молитвенный дневник</h3>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {user!.diaryEntries.length} записей • Записывайте молитвы и ответы
          </p>
        </Link>

        <Link
          to="/community"
          className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-700 transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100">Сообщество</h3>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Обсуждайте уроки и делитесь опытом с другими учениками
          </p>
        </Link>
      </div>

      {/* Certificates */}
      {user!.certificates.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-500" /> Ваши сертификаты
          </h3>
          <div className="grid gap-3">
            {user!.certificates.map(cert => (
              <div key={cert.id} className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-100">{cert.lessonTitle}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Получен {new Date(cert.earnedDate).toLocaleDateString('ru-RU')} • Результат: {cert.score}%
                  </p>
                </div>
                <Award className="w-8 h-8 text-purple-500" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
