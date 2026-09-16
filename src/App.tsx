import { useState, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Heart, MessageCircle, CheckSquare, Bell, Sparkles, Home, Menu, X, User, Moon, Sun, BookMarked, Video, Award, FileText } from 'lucide-react';
import { useTheme } from './contexts/ThemeContext';
import { useUser } from './contexts/UserContext';
import ScrollToTop from './components/ScrollToTop';

// Lazy loading страниц для улучшения производительности
const HomePage = lazy(() => import('./pages/HomePage'));
const LessonsPage = lazy(() => import('./pages/LessonsPage'));
const PrayersPage = lazy(() => import('./pages/PrayersPage'));
const ScripturePage = lazy(() => import('./pages/ScripturePage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const RemindersPage = lazy(() => import('./pages/RemindersPage'));
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const DiaryPage = lazy(() => import('./pages/DiaryPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const VideosPage = lazy(() => import('./pages/VideosPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminStudentsPage = lazy(() => import('./pages/AdminStudentsPage'));
const AdminMessagesPage = lazy(() => import('./pages/AdminMessagesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Компонент загрузки
const LoadingSpinner = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Загрузка...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
        <Navigation />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/prayers" element={<PrayersPage />} />
            <Route path="/scripture" element={<ScripturePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/reminders" element={<RemindersPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/diary" element={<DiaryPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/videos" element={<VideosPage />} />
            
            {/* Админ-панель */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/students" element={<AdminStudentsPage />} />
            <Route path="/admin/messages" element={<AdminMessagesPage />} />
            
            {/* 404 страница */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, user } = useUser();

  const navItems = [
    { path: '/', label: 'Главная', icon: Home },
    { path: '/lessons', label: 'Уроки', icon: BookOpen },
    { path: '/prayers', label: 'Молитвы', icon: Heart },
    { path: '/scripture', label: 'Писание', icon: BookMarked },
    { path: '/quiz', label: 'Тесты', icon: CheckSquare },
    { path: '/diary', label: 'Дневник', icon: FileText },
    { path: '/community', label: 'Сообщество', icon: MessageCircle },
    { path: '/blog', label: 'Блог', icon: FileText },
    { path: '/videos', label: 'Видео', icon: Video },
    { path: '/reminders', label: 'Напоминания', icon: Bell },
    { path: '/feedback', label: 'Связь', icon: MessageCircle },
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-amber-100 dark:border-gray-700 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <span className="font-bold text-lg text-gray-800 dark:text-gray-100">Школа Молитвы</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === item.path
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 hover:text-amber-700 dark:hover:text-amber-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Переключить тему"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
            </button>

            {/* Profile */}
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{user?.name}</span>
              </Link>
            ) : (
              <Link
                to="/profile"
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Войти</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6 dark:text-gray-300" /> : <Menu className="w-6 h-6 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-amber-100 dark:border-gray-700 mt-2 pt-2">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700"
            >
              <User className="w-4 h-4" />
              {isLoggedIn ? `Профиль (${user?.name})` : 'Войти'}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-white/60 dark:bg-gray-800/60 border-t border-amber-100 dark:border-gray-700 mt-16 transition-colors" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Школа Молитвы
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Бесплатный интерактивный курс для христиан, направленный на развитие глубокой молитвенной жизни и отношений с Богом через водительство Святым Духом.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Разделы</h3>
            <nav aria-label="Навигация в подвале">
              <ul className="space-y-2 text-sm">
                <li><Link to="/lessons" className="text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Уроки молитвы</Link></li>
                <li><Link to="/prayers" className="text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Коллекция молитв</Link></li>
                <li><Link to="/scripture" className="text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Разбор Писания</Link></li>
                <li><Link to="/diary" className="text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Молитвенный дневник</Link></li>
                <li><Link to="/community" className="text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Сообщество</Link></li>
              </ul>
            </nav>
          </div>

          {/* Topics */}
          <div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Темы</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>Водительство Святым Духом</li>
              <li>Интуиция духа и совесть</li>
              <li>Обновление разума</li>
              <li>Молитва по Слову</li>
              <li>Ходатайственная молитва</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-100 dark:border-gray-700 pt-6 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            ✝️ Школа Молитвы — Интерактивное обучение молитвенной жизни для христиан
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
            «Непрестанно молитесь» — 1 Фессалоникийцам 5:17
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            © {new Date().getFullYear()} shkola-molitvy.ru — Все материалы бесплатны
          </p>
        </div>
      </div>
    </footer>
  );
}

export default App;
